import { Model, ModelAttrs } from '@flumens';
import { genericStore } from './store';

export type SurveyDraftKeys = {
  'draftId:npms'?: string;
  'draftId:npmsPlus'?: string;
  'draftId:standard'?: string;
};

export interface Attrs extends ModelAttrs, SurveyDraftKeys {
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

class AppModel extends Model {
  // eslint-disable-next-line
  // @ts-ignore
  attrs: Attrs = Model.extendAttrs(this.attrs, defaults);

  resetDefaults() {
    return super.resetDefaults(defaults);
  }
}

const appModel = new AppModel({ cid: 'app', store: genericStore });

export { appModel as default, AppModel };
