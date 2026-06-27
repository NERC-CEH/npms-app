import { IObservableArray } from 'mobx';
import { useTranslation } from 'react-i18next';
import {
  device,
  ModelValidationMessage,
  useAlert,
  SampleModel,
  SampleData,
  SampleOptions,
  SampleMetadata,
  ChoiceValues,
} from '@flumens';
import config from 'common/config';
import userModel from 'models/user';
import npmsSurvey, {
  broadHabitatAttr,
  firstSurveyAttr,
  noSpeciesAttr,
} from 'Survey/NPMS/config';
import npmsPlusSurvey, {
  broadHabitatAttr as portalBroadHabitatAttr,
} from 'Survey/NPMSPlus/config';
import standardSurvey, {
  abundanceAttr,
  grazingAnimalNumberAttr,
} from 'Survey/Standard/config';
import {
  Level,
  Survey,
  grazingAttr,
  groupAttr,
  managementAttr,
  woodCoverAttr,
} from 'Survey/common/config';
import Media from './image';
import Occurrence from './occurrence';
import { samplesStore } from './store';

type Group = { id: string; name: string };
type PlotGroup = { id: string; name: string };
const groupAttrId = groupAttr().id;

export type Data = SampleData & {
  group?: Group;
  plotGroup?: PlotGroup;
  location: any;
  locationId: string;
  enteredSref: string;
  enteredSrefSystem: string;
  [managementAttr.id]?: ChoiceValues<typeof managementAttr.choices>[];
  [abundanceAttr.id]?: ChoiceValues<typeof abundanceAttr.choices>;
  [grazingAttr.id]?: ChoiceValues<typeof grazingAttr.choices>;
  [woodCoverAttr.id]?: ChoiceValues<typeof woodCoverAttr.choices>;
  [broadHabitatAttr.id]?: ChoiceValues<typeof broadHabitatAttr.choices>;
  [portalBroadHabitatAttr.id]?: ChoiceValues<
    typeof portalBroadHabitatAttr.choices
  >;
  [grazingAnimalNumberAttr.id]?: number;
  [firstSurveyAttr.id]?: string;
  [noSpeciesAttr.id]?: boolean;
  [groupAttrId]?: string;
  /**
   * For internal use. We don't need to store in the warehouse this one.
   */
  plotGroupId?: string;
  noSpecies: any;
};

export const surveyConfigs = {
  [npmsSurvey.name]: npmsSurvey,
  [npmsPlusSurvey.name]: npmsPlusSurvey,
  [standardSurvey.name]: standardSurvey,
};

type Metadata = SampleMetadata & {
  /**
   * Survey name.
   */
  survey: keyof typeof surveyConfigs;
  /**
   * Survey id.
   */
  surveyId: number;
  /**
   * If the sample was saved and ready for upload.
   */
  saved?: boolean;
  /**
   * NPMS species level
   */
  level: Level;
};

export default class Sample<T extends SampleData = Data> extends SampleModel<
  T,
  Metadata
> {
  declare occurrences: IObservableArray<Occurrence>;

  declare samples: IObservableArray<Sample<any>>;

  declare media: IObservableArray<Media>;

  declare parent?: Sample<any>;

  declare survey: Survey;

  constructor(options: SampleOptions) {
    super({
      ...options,
      url: config.backend.indicia.url,
      getAccessToken: () => userModel.getAccessToken(),
      Occurrence,
      Media,
      store: samplesStore,
    });

    const surveyName = this.metadata.survey;
    this.survey = surveyConfigs[surveyName];
  }

  getSurvey() {
    try {
      return super.getSurvey() as Survey;
    } catch (error) {
      console.error(`Survey config was missing ${this.metadata.survey}`);
      return {} as Survey;
    }
  }

  async upload() {
    if (this.isSynchronising || this.isUploaded) {
      return true;
    }

    const invalids = this.validateRemote();
    if (invalids) return false;

    if (!device.isOnline) return false;

    const isActivated = await userModel.checkActivation();
    if (!isActivated) return false;

    return this.saveRemote();
  }

  // getSubmission() {
  //   const sub = super.getSubmission();
  //   console.log(sub);

  //   throw 1;
  //   return sub;
  // }
}

export const useValidateCheck = (sample?: Sample) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return () => {
    const invalids = sample?.validateRemote();
    if (invalids) {
      alert({
        header: t('Survey incomplete'),
        skipTranslation: true,
        message: <ModelValidationMessage {...invalids} />,
        buttons: [
          {
            text: t('Got it'),
            role: 'cancel',
          },
        ],
      });
      return false;
    }
    return true;
  };
};

export function bySurveyDate(sample1: Sample, sample2: Sample) {
  const date1 = new Date(sample1.data.date);
  const moveToTop = !date1 || date1.toString() === 'Invalid Date';
  if (moveToTop) return -1;

  const date2 = new Date(sample2.data.date);
  return date2.getTime() - date1.getTime();
}
