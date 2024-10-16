import { Model, ModelAttrs } from '@flumens';
import { mainStore } from './store';

export interface Attrs extends ModelAttrs {
  appSession: number;
  showedWelcome: boolean;
  sendAnalytics: boolean;
  /**
   * Flag new samples for training.
   */
  useTraining: boolean;
}

const defaults: Attrs = {
  appSession: 0,
  showedWelcome: false,
  useTraining: false,
  sendAnalytics: true,
};

class AppModel extends Model<Attrs> {
  constructor(options: any) {
    super({ ...options, attrs: { ...defaults, ...options.attrs } });
  }

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });

export { appModel as default, AppModel };
