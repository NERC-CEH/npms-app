/* eslint-disable no-param-reassign */
import { chatboxOutline, peopleOutline } from 'ionicons/icons';
import {
  RemoteConfig,
  MenuAttrItemFromModelMenuProps,
  PageProps,
  dateFormat,
} from '@flumens';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import Occurrence, { Taxon } from 'common/models/occurrence';
import Media from 'models/image';
import Sample from 'models/sample';

export const locationAttr = {};

export const dateAttr = {
  remote: { values: (date: number) => dateFormat.format(new Date(date)) },
};

export const commentAttr = {
  menuProps: { icon: chatboxOutline, skipValueTranslation: true },
  pageProps: {
    attrProps: {
      input: 'textarea',
      info: 'Please add any extra info about this record.',
    },
  },
};

export const byGroup = (group?: string) => (loc: Location) =>
  group ? loc.attrs.projectId === group : true;

const getGroups = (survey: Survey['name']) => {
  const groups: any = {};
  locations.filter(bySurvey(survey)).forEach((location: Location) => {
    if (!location.attrs.projectId) return;
    groups[location.attrs.projectId] = location.attrs.projectName;
  });
  return groups;
};

export const groupAttr = {
  menuProps: { label: 'Project', icon: peopleOutline },
  pageProps: {
    headerProps: { title: 'Project' },
    attrProps: {
      input: 'radio',
      inputProps: (sample: Sample) => {
        const groups: any = getGroups(sample.getSurvey().name);
        const getOption = ([value, label]: any) => ({ value, label });
        return { options: Object.entries(groups).map(getOption) };
      },
      set(id: any, sample: Sample) {
        const groups: any = getGroups(sample.getSurvey().name);
        const name = groups[id];
        if (!name) {
          console.warn(`Group with ID ${id} was not found`);
          return;
        }
        sample.attrs.location = undefined; // unset
        sample.attrs.plotGroup = undefined; // unset
        sample.attrs.group = { id, name };
      },
      get(sample: Sample) {
        return sample.attrs.group?.id;
      },
    },
  },
  remote: { id: 'group_id', values: (val: any) => val.id },
};

export type Level = 'wildflower' | 'indicator' | 'inventory';

type MenuProps = MenuAttrItemFromModelMenuProps;

export type AttrConfig = {
  menuProps?: MenuProps;
  pageProps?: Omit<PageProps, 'attr' | 'model'>;
  remote?: RemoteConfig;
};

interface Attrs {
  [key: string]: AttrConfig;
}

type OccurrenceCreateOptions = {
  Occurrence: typeof Occurrence;
  taxon: Taxon;
  identifier?: string;
  photo?: Media;
};

type OccurrenceConfig = {
  render?: any[] | ((model: Occurrence) => any[]);
  attrs: Attrs;
  create?: (options: OccurrenceCreateOptions) => Occurrence;
  verify?: (attrs: any) => any;
  modifySubmission?: (submission: any, model: any) => any;
  /**
   * Set to true if multi-species surveys shouldn't auto-increment it to 1 when adding to lists.
   */
  skipAutoIncrement?: boolean;
};

type SampleCreateOptions = {
  Sample: typeof Sample;
  Occurrence?: typeof Occurrence;
  taxon?: Taxon;
  surveySample?: Sample;
  surveyId?: number;
  surveyName?: string;
  recorder?: string;
  location?: any;
  level?: Level;
};

export type SampleConfig = {
  render?: any[] | ((model: Sample) => any[]);
  attrs?: Attrs;
  create?: (options: SampleCreateOptions) => Sample;
  verify?: (attrs: any, model: any) => any;
  modifySubmission?: (submission: any, model: any) => any;
  smp?: SampleConfig;
  occ?: OccurrenceConfig;
};

export interface Survey extends SampleConfig {
  /**
   * Remote warehouse survey ID.
   */
  id: number;
  /**
   * In-App survey code name.
   */
  name: 'npms' | 'npmsPlus' | 'standard';
  /**
   * Pretty survey name to show in the UI.
   */
  label?: string;
  deprecated?: boolean;
  /**
   * Remote website survey edit page path.
   */
  webForm?: string;

  /** ? */
  metadata?: {
    speciesGroups: any;
  };
}
