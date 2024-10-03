import { z, object } from 'zod';
import {
  DrupalUserModel,
  DrupalUserModelAttrs,
  useToast,
  useLoader,
  device,
} from '@flumens';
import CONFIG from 'common/config';
import { genericStore } from './store';

export type Portal = 'npms' | 'pp';

export interface Attrs extends DrupalUserModelAttrs {
  firstName?: string;
  lastName?: string;
}

const defaults: Attrs = {
  firstName: '',
  lastName: '',
  email: '',
};

export class UserModel extends DrupalUserModel {
  // eslint-disable-next-line
  // @ts-ignore
  attrs: Attrs = DrupalUserModel.extendAttrs(this.attrs, defaults);

  static registerSchema = object({
    email: z.string().email('Please fill in'),
    password: z.string().min(1, 'Please fill in'),
    firstName: z.string().min(1, 'Please fill in'),
    lastName: z.string().min(1, 'Please fill in'),
  });

  static resetSchema = object({
    email: z.string().email('Please fill in'),
  });

  static loginSchema = object({
    username: z.string().min(1, 'Please fill in'),
    password: z.string().min(1, 'Please fill in'),
  });

  constructor(options: any) {
    super(options);

    const updateBackendUrl = () => {
      if (this.isPlantPortal()) this.config.url = CONFIG.backend.ppUrl;
    };
    this.ready?.then(updateBackendUrl);

    const checkForValidation = () => {
      if (this.isLoggedIn() && !this.attrs.verified) {
        console.log('User: refreshing profile for validation');
        this.refreshProfile();
      }
    };
    this.ready?.then(checkForValidation);
  }

  async logIn(email: string, password: string, isPlantPortal?: boolean) {
    this.config.url = isPlantPortal
      ? CONFIG.backend.ppUrl
      : CONFIG.backend.npmsUrl;
    return super.logIn(email, password);
  }

  async register(
    email: string,
    password: string,
    otherFields: any,
    isPlantPortal?: boolean
  ) {
    this.config.url = isPlantPortal
      ? CONFIG.backend.ppUrl
      : CONFIG.backend.npmsUrl;
    return super.register(email, password, otherFields);
  }

  async reset(email: string, isPlantPortal?: boolean) {
    this.config.url = isPlantPortal
      ? CONFIG.backend.ppUrl
      : CONFIG.backend.npmsUrl;
    return super.reset(email);
  }

  async checkActivation() {
    if (!this.isLoggedIn()) return false;

    if (!this.attrs.verified) {
      try {
        await this.refreshProfile();
      } catch (e) {
        // do nothing
      }

      if (!this.attrs.verified) return false;
    }

    return true;
  }

  async resendVerificationEmail() {
    if (!this.isLoggedIn() || this.attrs.verified) return false;

    await this._sendVerificationEmail();

    return true;
  }

  resetDefaults() {
    return super.resetDefaults(defaults);
  }

  isPlantPortal() {
    return !!this.attrs.iss?.includes(CONFIG.backend.ppUrl);
  }

  getPrettyName = () => {
    if (!this.isLoggedIn()) return '';

    return `${this.attrs.firstName} ${this.attrs.lastName}`;
  };
}

const userModel = new UserModel({
  cid: 'user',
  store: genericStore,
  config: { ...CONFIG.backend, url: CONFIG.backend.npmsUrl },
});

export const useUserStatusCheck = () => {
  const toast = useToast();
  const loader = useLoader();

  return async () => {
    if (!device.isOnline) {
      toast.warn('Looks like you are offline!');
      return false;
    }

    if (!userModel.isLoggedIn()) {
      toast.warn('Please log in first.');
      return false;
    }

    if (!userModel.attrs.verified) {
      await loader.show('Please wait...');
      const isVerified = await userModel.checkActivation();
      loader.hide();

      if (!isVerified) {
        toast.warn('The user has not been activated or is blocked.');
        return false;
      }
    }

    return true;
  };
};

export default userModel;
