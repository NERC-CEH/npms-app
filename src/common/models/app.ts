import { Model, ModelData } from '@flumens';
import { mainStore } from './store';

export type Data = {
  appSession: number;
  showedWelcome: boolean;
  sendAnalytics: boolean;
  /**
   * Flag new samples for training.
   */
  useTraining: boolean;
} & ModelData;

const defaults: Data = {
  appSession: 0,
  showedWelcome: false,
  useTraining: false,
  sendAnalytics: true,
};

export class AppModel extends Model<Data> {
  constructor(options: any) {
    super({ ...options, data: { ...defaults, ...options.data } });
  }

  reset() {
    return super.reset(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: mainStore });

export default appModel;
