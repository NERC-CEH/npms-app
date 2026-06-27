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
import Sample, { Data as SampleAttrs } from 'models/sample';

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
  type: 'textInput',
  title: 'Comments',
  appearance: 'multiline',
} as const;

export const MANAGEMENT_OTHER_VALUE = '1816';

export const dominCoverValues = [
  { title: '< 1% (1-2 indivs)', dataName: '3333' },
  { title: '< 1% (several indivs)', dataName: '3334' },
  { title: '1-4%', dataName: '3335' },
  { title: '5-10%', dataName: '3336' },
  { title: '11-25%', dataName: '3337' },
  { title: '26-33%', dataName: '3338' },
  { title: '34-50%', dataName: '3339' },
  { title: '51-75%', dataName: '3340' },
  { title: '76-90%', dataName: '3341' },
  { title: '91-100%', dataName: '3342' },
];

export const grazingAttr = {
  id: 'smpAttr:215',
  type: 'choiceInput',
  title: 'Grazing',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Not selected', dataName: '' },
    { title: 'Low', dataName: '1817' },
    { title: 'Moderate', dataName: '1818' },
    { title: 'High', dataName: '1819' },
  ],
} as const;

export const grazingAnimalsAttr = {
  id: 'smpAttr:224',
  type: 'textInput',
  title: 'Grazing animals',
  appearance: 'multiline',
} as const;

export const coverAttr = {
  id: 'occAttr:214',
  type: 'choiceInput',
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
  type: 'choiceInput',
  title: 'Bare Rock/Gravel',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const litterAttr = {
  id: 'smpAttr:404',
  type: 'choiceInput',
  title: 'Litter',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const lichensAttr = {
  id: 'smpAttr:408',
  type: 'choiceInput',
  title: 'Mosses & Lichens',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const managementAttr = {
  id: 'smpAttr:225',
  type: 'choiceInput',
  title: 'Management',
  multiple: true,
  prefix: listOutlineIcon,
  container: 'page',
  choices: [
    { title: 'Arable cropping', dataName: '1799' },
    { title: 'Burning', dataName: '1800' },
    { title: 'Coppicing', dataName: '1801' },
    { title: 'Cutting / mowing', dataName: '1802' },
    { title: 'Ditch-clearance', dataName: '1803' },
    { title: 'Fenced to exclude grazing', dataName: '1804' },
    { title: 'Fertilised to improve soil fertility', dataName: '1805' },
    { title: 'Grazing - livestock', dataName: '1806' },
    { title: 'Grazing - rabbits / deer', dataName: '1807' },
    { title: 'Hedge-laying', dataName: '1808' },
    { title: 'Herbicides to control weeds', dataName: '1809' },
    { title: 'Path, track or road works', dataName: '1810' },
    { title: 'Quarrying', dataName: '1811' },
    { title: 'Scrub clearance / tree felling', dataName: '1812' },
    { title: 'Silage production', dataName: '1813' },
    { title: 'Tree planting', dataName: '1814' },
    { title: 'Water regime regulation', dataName: '1815' },
    { title: 'Other', dataName: MANAGEMENT_OTHER_VALUE },
  ],
} as const;

export const managementOtherAttr = {
  id: 'smpAttr:226',
  type: 'textInput',
  title: 'Other management',
  appearance: 'multiline',
} as const;

export const soilAttr = {
  id: 'smpAttr:403',
  type: 'choiceInput',
  title: 'Bare soil',
  prefix: listOutlineIcon,
  container: 'page',
  choices: dominCoverValues,
} as const;

export const locationAttr = (data?: SampleAttrs) => {
  const byId = (id?: string) => (loc: Location) => loc.id === id;
  const location = locations.find(byId(data?.locationId));

  return {
    id: 'locationId',
    type: 'choiceInput',
    title: 'Location',
    prefix: locationOutlineIcon,
    container: 'page',
    choices: location
      ? [{ dataName: location.id!, title: location.data.name }] // only one is fine - using as a link to a custom page
      : [],
  } as const;
};

export const woodCoverAttr = {
  id: 'smpAttr:216',
  type: 'choiceInput',
  title: 'Woody cover',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Woodland canopy', dataName: '1820' },
    { title: 'Scattered trees or shrubs', dataName: '1821' },
    { title: 'Hedgerow', dataName: '1822' },
    { title: 'No trees or shrubs', dataName: '1823' },
  ],
} as const;

export const byGroup = (group?: string) => (loc: Location) =>
  group ? loc.data.projectId === group : true;

export const getGroups = (survey: Survey['name']) => {
  const groups: any = {};
  locations.filter(bySurvey(survey)).forEach((location: Location) => {
    if (!location.data.projectId) return;
    groups[location.data.projectId] = location.data.projectName;
  });
  return groups;
};

export const recorderAttr = {
  id: 'recorderNames',
  type: 'textInput',
  title: 'Recorder names',
  // description: 'Please only add additional recorders here.',
  appearance: 'multiline',
} as const;

export const gridAttr = {
  id: 'occAttr:153',
  type: 'textInput',
} as const;

export const STANDARD_SURVEY_ID = 599;
const getGroupChoices = (surveyId: number) => {
  const surveyName = surveyId === STANDARD_SURVEY_ID ? 'standard' : 'npmsPlus';

  const groups: any = getGroups(surveyName);
  const getOption = ([value, title]: any) => ({ title, dataName: value });
  return Object.entries(groups).map(getOption);
};

export const groupAttr = (data?: any) =>
  ({
    id: 'groupId',
    type: 'choiceInput',
    title: 'Project',
    prefix: peopleOutlineIcon,
    container: 'page',
    choices: data ? getGroupChoices(data.surveyId) : [],
    //       set(id: any, sample: Sample) {
    //         sample.data.location = undefined; // unset
    //         sample.data.plotGroup = undefined; // unset
    //         sample.data.group = { id, name };
    //       },
  }) as const;

export type Level = 'wildflower' | 'indicator' | 'inventory';

type AttrType = Record<string, { block: BlockT | ((record?: any) => BlockT) }>;
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

type Attrs = Record<string, AttrConfig>;

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
  verify?: (data: any, model: any) => any;
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
  // NPMS-only
  firstSurvey?: string;
};

export type SampleConfig = {
  render?: any[] | ((model: Sample) => any[]);
  attrs?: Attrs;
  create?: (options: SampleCreateOptions) => Sample;
  verify?: (data: any, model: any) => any;
  modifySubmission?: (submission: any, model: any) => any;
  smp?: SampleConfig;
  occ?: OccurrenceConfig;
};

export type Survey = {
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
} & SampleConfig;
