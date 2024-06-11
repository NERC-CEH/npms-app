/* eslint-disable no-param-reassign */
import { chatboxOutline, listOutline, peopleOutline } from 'ionicons/icons';
import {
  RemoteConfig,
  MenuAttrItemFromModelMenuProps,
  PageProps,
  dateFormat,
} from '@flumens';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import Occurrence, { Grid, Taxon } from 'common/models/occurrence';
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

export const dominCoverValues = [
  { value: '< 1% (1-2 indivs)', id: 3333 },
  { value: '< 1% (several indivs)', id: 3334 },
  { value: '1-4%', id: 3335 },
  { value: '5-10%', id: 3336 },
  { value: '11-25%', id: 3337 },
  { value: '26-33%', id: 3338 },
  { value: '34-50%', id: 3339 },
  { value: '51-75%', id: 3340 },
  { value: '76-90%', id: 3341 },
  { value: '91-100%', id: 3342 },
];

const managementValues = [
  { value: 'Arable cropping', id: 1799 },
  { value: 'Burning', id: 1800 },
  { value: 'Coppicing', id: 1801 },
  { value: 'Cutting / mowing', id: 1802 },
  { value: 'Ditch-clearance', id: 1803 },
  { value: 'Fenced to exclude grazing', id: 1804 },
  { value: 'Fertilised to improve soil fertility', id: 1805 },
  { value: 'Grazing - livestock', id: 1806 },
  { value: 'Grazing - rabbits / deer', id: 1807 },
  { value: 'Hedge-laying', id: 1808 },
  { value: 'Herbicides to control weeds', id: 1809 },
  { value: 'Path, track or road works', id: 1810 },
  { value: 'Quarrying', id: 1811 },
  { value: 'Scrub clearance / tree felling', id: 1812 },
  { value: 'Silage production', id: 1813 },
  { value: 'Tree planting', id: 1814 },
  { value: 'Water regime regulation', id: 1815 },
  { value: 'Other', id: 1816 },
];

export const managementAttr = {
  menuProps: { icon: listOutline },
  pageProps: {
    attrProps: {
      input: 'checkbox',
      inputProps: { options: managementValues },
    },
  },

  remote: { id: 225, values: managementValues },
};

const grazingValues = [
  { label: 'Not selected', value: '' },
  { value: 'Low', id: 1817 },
  { value: 'Moderate', id: 1818 },
  { value: 'High', id: 1819 },
];

export const grazingAttr = {
  menuProps: { icon: listOutline },
  pageProps: {
    attrProps: {
      input: 'radio',
      inputProps: { options: grazingValues },
    },
  },
  remote: { id: 215, values: grazingValues },
};

export const grazingAnimalsAttr = { remote: { id: 224 } };

export const managementOtherAttr = { remote: { id: 226 } };

export const soilAttr = {
  menuProps: { label: 'Bare soil', icon: listOutline },
  pageProps: {
    headerProps: { title: 'Bare soil' },
    attrProps: {
      input: 'radio',
      inputProps: { options: dominCoverValues },
    },
  },
  remote: { id: 403, values: dominCoverValues },
};

export const rockAttr = {
  menuProps: { label: 'Bare rock', icon: listOutline },
  pageProps: {
    headerProps: { title: 'Bare rock' },
    attrProps: {
      input: 'radio',
      inputProps: { options: dominCoverValues },
    },
  },
  remote: { id: 405, values: dominCoverValues },
};

export const litterAttr = {
  menuProps: { label: 'Litter', icon: listOutline },
  pageProps: {
    headerProps: { title: 'Litter' },
    attrProps: {
      input: 'radio',
      inputProps: { options: dominCoverValues },
    },
  },
  remote: { id: 404, values: dominCoverValues },
};

export const lichensAttr = {
  menuProps: { label: 'Mosses & Lichens', icon: listOutline },
  pageProps: {
    headerProps: { title: 'Mosses & Lichens' },
    attrProps: {
      input: 'radio',
      inputProps: { options: dominCoverValues },
    },
  },
  remote: { id: 408, values: dominCoverValues },
};

const woodValues = [
  { value: 'Woodland canopy', id: 1820 },
  { value: 'Scattered trees or shrubs', id: 1821 },
  { value: 'Hedgerow', id: 1822 },
  { value: 'No trees or shrubs', id: 1823 },
];

export const woodCoverAttr = {
  menuProps: { label: 'Woody cover', icon: listOutline },
  pageProps: {
    headerProps: { title: 'Woody cover' },
    attrProps: {
      input: 'radio',
      info: 'How wooded is your plot?',
      inputProps: { options: woodValues },
    },
  },
  remote: { id: 216, values: woodValues },
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

export const recorderAttr = {
  menuProps: { label: 'Recorder names', icon: peopleOutline },
  pageProps: {
    headerProps: { title: 'Recorder names' },
    attrProps: {
      input: 'input',
      info: 'Please only add additional recorders here.',
    },
  },
  remote: { id: 'recorder_names' },
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
  grid?: Grid;
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
