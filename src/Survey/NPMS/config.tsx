/* eslint-disable no-param-reassign */
import { listOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { IonIcon } from '@ionic/react';
import landIcon from 'common/images/habitat.svg';
import { Attrs } from 'common/models/sample';
import userModel from 'common/models/user';
import appModel from 'models/app';
import {
  Level,
  Survey,
  blockToAttr,
  commentAttr,
  coverAttr,
  grazingAnimalsAttr,
  grazingAttr,
  gridAttr,
  lichensAttr,
  litterAttr,
  locationAttr,
  managementAttr,
  managementOtherAttr,
  recorderAttr,
  rockCoverAttr,
  soilAttr,
  woodCoverAttr,
} from 'Survey/common/config';

const listOutlineIcon = (
  <IonIcon src={listOutline} className="size-6" />
) as any;

const landIconIcon = (<IonIcon src={landIcon} className="size-6" />) as any;

const habitats = [
  {
    value: 'Arable margins',
    id: 4871,
    values: {
      'Arable field margins': 4872,
    },
  },
  {
    value: 'Bog and wet heath',
    id: 4873,
    values: {
      'Raised bog': 4874,
      'Blanket bog': 4875,
      'Wet heath': 4877,
    },
  },
  {
    value: 'Broadleaved woodland, hedges and scrub',
    id: 4876,
    values: {
      'Hedgerows of native species': 4879,
      'Wet woodland': 4880,
      'Dry deciduous woodland': 4881,
    },
  },
  {
    value: 'Coast',
    id: 4878,
    values: {
      'Coastal saltmarsh': 4882,
      'Coastal sand dunes': 4883,
      Machair: 4884,
      'Coastal vegetated shingle': 4885,
      'Maritime cliffs and slopes': 4886,
    },
  },
  {
    value: 'Freshwater',
    id: 4887,
    values: {
      'Nutrient-poor lakes and ponds': 4888,
      'Nutrient-rich lakes and ponds': 4889,
      'Rivers and streams': 4890,
    },
  },
  {
    value: 'Heathland',
    id: 4891,
    values: {
      'Dry heathland': 4892,
      'Montane dry heathland': 4893,
    },
  },
  {
    value: 'Lowland grassland',
    id: 4894,
    values: {
      'Dry calcareous grassland': 4895,
      'Dry acid grassland': 4896,
      'Neutral pastures and meadows': 4897,
      'Neutral damp grassland': 4899,
    },
  },
  {
    value: 'Marsh and fen',
    id: 4898,
    values: {
      'Acid fens, mires and springs': 4900,
      'Base-rich fens, mires and springs': 4901,
    },
  },
  {
    value: 'Upland grassland',
    id: 4902,
    values: {
      'Montane calcareous grassland': 4903,
      'Montane acid grassland': 4904,
    },
  },
  {
    value: 'Native pinewood and juniper scrub',
    id: 4905,
    values: {
      'Native conifer woods and juniper scrub': 4906,
    },
  },
  {
    value: 'Rock outcrops, cliffs and scree',
    id: 4907,
    values: {
      'Inland rocks and scree': 4908,
      'Montane rocks and scree': 4909,
    },
  },
  {
    value: 'Not in scheme',
    id: 4910,
    values: {
      'Not in scheme': 4911,
    },
  },
] as const;

export const broadHabitatAttr = {
  id: 'parent-smpAttr:565',
  type: 'choice_input',
  title: 'Broad Habitat',
  prefix: landIconIcon,
  description:
    'Please ensure your choice of habitat matches the species list you are using.',
  container: 'page',
  choices: habitats.map(({ value, id }) => ({
    data_name: `${id}`,
    title: value,
  })),
  onChange(newValue: any, _: any, { record }: any) {
    record[broadHabitatAttr.id] = newValue;
    delete record[fineHabitatAttr().id]; // eslint-disable-line @typescript-eslint/no-use-before-define
    return newValue;
  },
} as const;

export const getFineHabitatOptions = (
  broadHabitat: any,
  broadHabitats: any
) => {
  const byId = (h: any) => `${h.id}` === broadHabitat;
  const broadHabitatValues = broadHabitats.find(byId)?.values || {};
  return Object.entries(broadHabitatValues).map(([value, id]: any) => ({
    data_name: `${id}`,
    title: value,
  }));
};

export const fineHabitatAttr = (attrs?: Attrs) =>
  ({
    id: 'smpAttr:565',
    type: 'choice_input',
    title: 'Fine Habitat',
    prefix: landIconIcon,
    container: 'page',
    choices: getFineHabitatOptions(attrs?.[broadHabitatAttr.id], habitats),
  } as const);

export const identifierAttr = {
  id: 'occAttr:18',
  type: 'text_input',
  title: 'Identifier',
  description: "Enter the recorder's name, if different.",
  appearance: 'multiline',
} as const;

export const vegetationValues = [
  { title: '0', data_name: '0' },
  { title: '1/3rd', data_name: '1' },
  { title: '1/3rd to 2/3rds', data_name: '2' },
  { title: 'over 2/3rds', data_name: '3' },
];

export const vegetation10Attr = {
  id: 'smpAttr:219',
  type: 'choice_input',
  title: 'Under 10cm',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: vegetationValues,
} as const;

export const vegetation30Attr = {
  id: 'smpAttr:220',
  type: 'choice_input',
  title: '11-30cm',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: vegetationValues,
} as const;

export const vegetation100Attr = {
  id: 'smpAttr:221',
  type: 'choice_input',
  title: '31-100cm',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: vegetationValues,
} as const;

export const vegetation300Attr = {
  id: 'smpAttr:222',
  type: 'choice_input',
  title: '101-300cm',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: vegetationValues,
} as const;

export const vegetation300PlusAttr = {
  id: 'smpAttr:223',
  type: 'choice_input',
  title: 'Over 300cm',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: vegetationValues,
} as const;

export const noSpeciesAttr = {
  id: 'smpAttr:1461',
  type: 'yes_no_input',
} as const;

export const firstSurveyAttr = {
  id: 'smpAttr:227',
} as const;

const surveys: { [key in Level]: number } = {
  indicator: 155,
  inventory: 154,
  wildflower: 87,
};

const survey: Survey = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  id: null,
  name: 'npms',
  label: 'NPMS',

  attrs: {
    //     plot: { id: 417 }, ?????

    ...blockToAttr(locationAttr),
    ...blockToAttr(commentAttr),
    ...blockToAttr(broadHabitatAttr),
    ...blockToAttr(fineHabitatAttr),
    ...blockToAttr(recorderAttr),
    ...blockToAttr(managementAttr),
    ...blockToAttr(managementOtherAttr),
    ...blockToAttr(grazingAttr),
    ...blockToAttr(grazingAnimalsAttr),
    ...blockToAttr(soilAttr),
    ...blockToAttr(woodCoverAttr),
    ...blockToAttr(rockCoverAttr),
    ...blockToAttr(litterAttr),
    ...blockToAttr(lichensAttr),
    ...blockToAttr(noSpeciesAttr),
  },

  occ: {
    attrs: {
      ...blockToAttr(commentAttr),
      ...blockToAttr(identifierAttr),
      ...blockToAttr(coverAttr),
    },

    create: ({ Occurrence: AppOccurrence, taxon, grid }) =>
      new AppOccurrence({ attrs: { ...taxon, [gridAttr.id]: grid } }),

    verify: attrs =>
      object({
        [coverAttr.id]: z.string({ required_error: 'Cover is missing' }),
      }).safeParse(attrs).error,
  },

  verify: attrs =>
    object({
      date: z.string(), // TODO: check future dates
      [broadHabitatAttr.id]: z.string({ required_error: 'Habitat is missing' }),
      recorderNames: z.string().min(1, { message: 'Recorder is missing' }),
      locationId: z.string({ required_error: 'Location is missing' }),
    }).safeParse(attrs).error,

  create: ({ Sample, surveyName, level, firstSurvey }) =>
    new Sample({
      metadata: {
        survey: surveyName || survey.name,
        level,
      },
      attrs: {
        surveyId: surveys[level!],
        training: appModel.attrs.useTraining,
        [firstSurveyAttr.id]: firstSurvey,
        date: new Date().toISOString().split('T')[0],
        recorderNames: userModel.getPrettyName(),
      },
    }),
};

export default survey;
