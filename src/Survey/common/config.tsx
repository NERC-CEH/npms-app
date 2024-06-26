/* eslint-disable no-param-reassign */
import { listOutline, locationOutline, peopleOutline } from 'ionicons/icons';
import {
  RemoteConfig,
  MenuAttrItemFromModelMenuProps,
  PageProps,
  BlockT,
} from '@flumens';
import { IonIcon } from '@ionic/react';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import Occurrence, { Grid, Taxon } from 'common/models/occurrence';
import Media from 'models/image';
import Sample, { Attrs as SampleAttrs } from 'models/sample';

const peopleOutlineIcon = (
  <IonIcon src={peopleOutline} className="size-6" />
) as any;

const listOutlineIcon = (
  <IonIcon src={listOutline} className="size-6" />
) as any;

const locationOutlineIcon = (
  <IonIcon src={locationOutline} className="size-6" />
) as any;

export const commentAttr = {
  id: 'comment',
  type: 'text_input',
  title: 'Comments',
  appearance: 'multiline',
} as const;

export const MANAGEMENT_OTHER_VALUE = '1816';

export const dominCoverValues = [
  { title: '< 1% (1-2 indivs)', data_name: '3333' },
  { title: '< 1% (several indivs)', data_name: '3334' },
  { title: '1-4%', data_name: '3335' },
  { title: '5-10%', data_name: '3336' },
  { title: '11-25%', data_name: '3337' },
  { title: '26-33%', data_name: '3338' },
  { title: '34-50%', data_name: '3339' },
  { title: '51-75%', data_name: '3340' },
  { title: '76-90%', data_name: '3341' },
  { title: '91-100%', data_name: '3342' },
];

export const grazingAttr = {
  id: 'smpAttr:215',
  type: 'choice_input',
  title: 'Grazing',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Not selected', data_name: '' },
    { title: 'Low', data_name: '1817' },
    { title: 'Moderate', data_name: '1818' },
    { title: 'High', data_name: '1819' },
  ],
} as const;

export const grazingAnimalsAttr = {
  id: 'smpAttr:224',
  type: 'text_input',
  title: 'Grazing animals',
  appearance: 'multiline',
} as const;

export const coverAttr = {
  id: 'occAttr:214',
  type: 'choice_input',
  container: 'inline',
  choices: dominCoverValues,
  //       id_wild: 104,
  //       id: 214,
  //       values(value, submission, occ) {
  //         // wildflower uses different abundance attribute and values
  //         if (
  //           occ.parent.metadata.survey_id ===
  //           CONFIG.indicia.sample.surveys.wildflower
  //         ) {
  //           // eslint-disable-next-line
  //           submission.fields[this.id_wild] =
  //             rangeValuesWildflower.indexOf(value) + 1; // eslint-disable-line
  //           return null;
  //         }
  //         return rangeValues[value];
  //       },
} as const;

export const rockCoverAttr = {
  id: 'smpAttr:405',
  type: 'choice_input',
  title: 'Bare rock',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const litterAttr = {
  id: 'smpAttr:404',
  type: 'choice_input',
  title: 'Litter',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const lichensAttr = {
  id: 'smpAttr:408',
  type: 'choice_input',
  title: 'Mosses & Lichens',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const managementAttr = {
  id: 'smpAttr:225',
  type: 'choice_input',
  title: 'Management',
  multiple: true,
  prefix: listOutlineIcon,
  container: 'page',
  choices: [
    { title: 'Arable cropping', data_name: '1799' },
    { title: 'Burning', data_name: '1800' },
    { title: 'Coppicing', data_name: '1801' },
    { title: 'Cutting / mowing', data_name: '1802' },
    { title: 'Ditch-clearance', data_name: '1803' },
    { title: 'Fenced to exclude grazing', data_name: '1804' },
    { title: 'Fertilised to improve soil fertility', data_name: '1805' },
    { title: 'Grazing - livestock', data_name: '1806' },
    { title: 'Grazing - rabbits / deer', data_name: '1807' },
    { title: 'Hedge-laying', data_name: '1808' },
    { title: 'Herbicides to control weeds', data_name: '1809' },
    { title: 'Path, track or road works', data_name: '1810' },
    { title: 'Quarrying', data_name: '1811' },
    { title: 'Scrub clearance / tree felling', data_name: '1812' },
    { title: 'Silage production', data_name: '1813' },
    { title: 'Tree planting', data_name: '1814' },
    { title: 'Water regime regulation', data_name: '1815' },
    { title: 'Other', data_name: MANAGEMENT_OTHER_VALUE },
  ],
} as const;

export const managementOtherAttr = {
  id: 'smpAttr:226',
  type: 'text_input',
  title: 'Other management',
  appearance: 'multiline',
} as const;

export const soilAttr = {
  id: 'smpAttr:403',
  type: 'choice_input',
  title: 'Bare soil',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const locationAttr = (attrs?: SampleAttrs) => {
  const byId = (id?: string) => (loc: Location) => loc.id === id;
  const location = locations.find(byId(attrs?.locationId));

  return {
    id: 'locationId',
    type: 'choice_input',
    title: 'Location',
    prefix: locationOutlineIcon,
    container: 'page',
    choices: location
      ? [{ data_name: location.id!, title: location.attrs.name! }] // only one is fine - using as a link to a custom page
      : [],
  } as const;
};

export const woodCoverAttr = {
  id: 'smpAttr:216',
  type: 'choice_input',
  title: 'Woody cover',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Woodland canopy', data_name: '1820' },
    { title: 'Scattered trees or shrubs', data_name: '1821' },
    { title: 'Hedgerow', data_name: '1822' },
    { title: 'No trees or shrubs', data_name: '1823' },
  ],
} as const;

export const byGroup = (group?: string) => (loc: Location) =>
  group ? loc.attrs.projectId === group : true;

export const getGroups = (survey: Survey['name']) => {
  const groups: any = {};
  locations.filter(bySurvey(survey)).forEach((location: Location) => {
    if (!location.attrs.projectId) return;
    groups[location.attrs.projectId] = location.attrs.projectName;
  });
  return groups;
};

export const recorderAttr = {
  id: 'recorderNames',
  type: 'text_input',
  title: 'Recorder names',
  // description: 'Please only add additional recorders here.',
  appearance: 'multiline',
} as const;

export const gridAttr = {
  id: 'occAttr:153',
  type: 'text_input',
} as const;

export const STANDARD_SURVEY_ID = 599;
const getGroupChoices = (surveyId: number) => {
  const surveyName = surveyId === STANDARD_SURVEY_ID ? 'standard' : 'npmsPlus';

  const groups: any = getGroups(surveyName);
  const getOption = ([value, title]: any) => ({ title, data_name: value });
  return Object.entries(groups).map(getOption);
};

export const groupAttr = (attrs?: any) => {
  return {
    id: 'groupId',
    type: 'choice_input',
    title: 'Project',
    prefix: peopleOutlineIcon,
    container: 'page',
    choices: attrs ? getGroupChoices(attrs.surveyId) : [],
    //       set(id: any, sample: Sample) {
    //         sample.attrs.location = undefined; // unset
    //         sample.attrs.plotGroup = undefined; // unset
    //         sample.attrs.group = { id, name };
    //       },
  } as const;
};

export type Level = 'wildflower' | 'indicator' | 'inventory';

type AttrType = { [x: string]: { block: BlockT | ((record?: any) => BlockT) } };
export const blockToAttr = (blockOrFn: BlockOrFn): AttrType =>
  typeof blockOrFn === 'function'
    ? { [blockOrFn().id]: { block: blockOrFn } }
    : { [blockOrFn.id]: { block: blockOrFn } };

type MenuProps = MenuAttrItemFromModelMenuProps;

export type BlockOrFn = BlockT | ((record?: any) => BlockT);

export type AttrConfig = {
  menuProps?: MenuProps;
  pageProps?: Omit<PageProps, 'attr' | 'model'>;
  block?: BlockOrFn;
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
  verify?: (attrs: any, model: any) => any;
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
