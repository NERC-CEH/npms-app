/* eslint-disable no-param-reassign */
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
  coverAttr,
  gridAttr,
  groupAttr,
} from 'Survey/common/config';
import npmsConfig, { getFineHabitatOptions } from '../NPMS/config';

const landIconIcon = (<IonIcon src={landIcon} className="size-6" />) as any;

const habitats = [
  {
    value: 'Arable margins',
    id: 18978,
    values: {
      'Arable field margins': 19013,
    },
  },
  {
    value: 'Bog and wet heath',
    id: 18979,
    values: {
      'Blanket bog': 19014,
      'Raised bog': 19015,
      'Wet heath': 19016,
    },
  },
  {
    value: 'Broadleaved woodland, hedges and scrub',
    id: 18982,
    values: {
      'Broadleaved woodland': 19020,
      'Dry deciduous woodland': 19017,
      'Hedgerows of native species': 19018,
      'Wet woodland': 19019,
    },
  },
  {
    value: 'Brownfield',
    id: 18986,
    values: { Brownfield: 19021 },
  },
  {
    value: 'Coast',
    id: 18987,
    values: {
      'Coastal saltmarsh': 19022,
      'Coastal sand dunes': 19023,
      'Coastal vegetated shingle': 19024,
      Machair: 19025,
      'Maritime cliffs and slopes': 19026,
    },
  },
  {
    value: 'Freshwater',
    id: 18992,
    values: {
      'Nutrient-poor lakes and ponds': 19027,
      'Nutrient-rich lakes and ponds': 19028,
      'Rivers and streams': 19029,
    },
  },
  {
    value: 'Heathland',
    id: 18995,
    values: {
      'Dry heathland': 19030,
      'Montane dry heathland': 19031,
    },
  },
  {
    value: 'Lowland grassland',
    id: 18997,
    values: {
      'Amenity grassland': 19036,
      'Dry acid grassland': 19032,
      'Dry calcareous grassland': 19033,
      'Neutral damp grassland': 19034,
      'Neutral pastures and meadows': 19035,
    },
  },
  {
    value: 'Marsh and fen',
    id: 19002,
    values: {
      'Acid fens': 19037,
      'Acid fens, mires and springs': 19039,
      'Base-rich fens': 19038,
      'Base-rich fens, mires and springs': 19040,
    },
  },
  {
    value: 'Upland grassland',
    id: 19010,
    values: {
      'Montane acid grassland': 19045,
      'Montane calcareous grassland': 19046,
    },
  },
  {
    value: 'Native pinewood and juniper scrub',
    id: 19006,
    values: {
      'Native conifer woods and juniper scrub': 19041,
    },
  },
  {
    value: 'Rock outcrops, cliffs and scree',
    id: 19007,
    values: {
      'Inland rocks and scree': 19042,
      'Montane rocks and scree': 19043,
      'Rock outcrops': 19044,
    },
  },
  {
    value: 'Not in scheme',
    id: 19012,
    values: {
      'Not in scheme': 19047,
    },
  },
] as const;

export const broadHabitatAttr = {
  id: 'parent-smpAttr:1641',
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

export const fineHabitatAttr = (attrs?: Attrs) =>
  ({
    id: 'smpAttr:1641',
    type: 'choice_input',
    title: 'Fine Habitat',
    prefix: landIconIcon,
    container: 'page',
    choices: getFineHabitatOptions(attrs?.[broadHabitatAttr.id], habitats),
  } as const);

const surveys: { [key in Level]: number } = {
  wildflower: 650,
  indicator: 651,
  inventory: 652,
};

const survey: Survey = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  id: null,
  name: 'npmsPlus',
  label: 'NPMS+',

  attrs: {
    ...npmsConfig.attrs,
    ...blockToAttr(broadHabitatAttr),
    ...blockToAttr(fineHabitatAttr),
    ...blockToAttr(groupAttr),
  },

  occ: {
    attrs: {
      ...npmsConfig.occ!.attrs,
      ...blockToAttr(gridAttr),
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
      date: z.string(),
      [broadHabitatAttr.id]: z.string({ required_error: 'Habitat is missing' }),
      recorderNames: z.string().min(1, { message: 'Recorder is missing' }),
      locationId: z.string({ required_error: 'Location is missing' }),
    }).safeParse(attrs).error,

  create: ({ Sample, surveyName, level }) =>
    new Sample({
      metadata: {
        survey: surveyName || survey.name,
        level,
      },
      attrs: {
        surveyId: surveys[level!],
        training: appModel.attrs.useTraining,
        date: new Date().toISOString().split('T')[0],
        recorderNames: userModel.getPrettyName(),
      },
    }),
};

export default survey;
