/* eslint-disable no-param-reassign */
import { peopleOutline, personOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { RadioOption } from 'common/flumens';
import landIcon from 'common/images/habitat.svg';
import AppSample from 'common/models/sample';
import appModel from 'models/app';
import {
  Level,
  Survey,
  commentAttr,
  dateAttr,
  dominCoverValues,
  grazingAnimalsAttr,
  grazingAttr,
  lichensAttr,
  litterAttr,
  locationAttr,
  managementAttr,
  managementOtherAttr,
  recorderAttr,
  rockAttr,
  soilAttr,
  woodCoverAttr,
} from 'Survey/common/config';

const habitats = {
  'Arable margins': {
    id: 4871,
    values: {
      'Arable field margins': 4872,
    },
  },
  'Bog and wet heath': {
    id: 4873,
    values: {
      'Raised bog': 4874,
      'Blanket bog': 4875,
      'Wet heath': 4877,
    },
  },
  'Broadleaved woodland, hedges and scrub': {
    id: 4876,
    values: {
      'Hedgerows of native species': 4879,
      'Wet woodland': 4880,
      'Dry deciduous woodland': 4881,
    },
  },
  Coast: {
    id: 4878,
    values: {
      'Coastal saltmarsh': 4882,
      'Coastal sand dunes': 4883,
      Machair: 4884,
      'Coastal vegetated shingle': 4885,
      'Maritime cliffs and slopes': 4886,
    },
  },
  Freshwater: {
    id: 4887,
    values: {
      'Nutrient-poor lakes and ponds': 4888,
      'Nutrient-rich lakes and ponds': 4889,
      'Rivers and streams': 4890,
    },
  },
  Heathland: {
    id: 4891,
    values: {
      'Dry heathland': 4892,
      'Montane dry heathland': 4893,
    },
  },
  'Lowland grassland': {
    id: 4894,
    values: {
      'Dry calcareous grassland': 4895,
      'Dry acid grassland': 4896,
      'Neutral pastures and meadows': 4897,
      'Neutral damp grassland': 4899,
    },
  },
  'Marsh and fen': {
    id: 4898,
    values: {
      'Acid fens, mires and springs': 4900,
      'Base-rich fens, mires and springs': 4901,
    },
  },
  'Upland grassland': {
    id: 4902,
    values: {
      'Montane calcareous grassland': 4903,
      'Montane acid grassland': 4904,
    },
  },
  'Native pinewood and juniper scrub': {
    id: 4905,
    values: {
      'Native conifer woods and juniper scrub': 4906,
    },
  },
  'Rock outcrops, cliffs and scree': {
    id: 4907,
    values: {
      'Inland rocks and scree': 4908,
      'Montane rocks and scree': 4909,
    },
  },
  'Not in scheme': {
    id: 4910,
    values: {
      'Not in scheme': 4911,
    },
  },
};

const broadHabitatOptions = Object.entries(habitats).map(([value, h]: any) => ({
  id: h.id,
  value,
}));

const getFineHabitatOptions = (broadHabitat: keyof typeof habitats) => {
  const broadHabitatValues = habitats[broadHabitat]?.values || {};
  return Object.entries(broadHabitatValues).map(([fh, id]) => ({
    id,
    value: fh,
  }));
};

const fineHabitatOptions: RadioOption[] = Object.entries(habitats).map(
  ([name, h]: any) => ({ id: h.id, value: name })
);

export const vegetationValues = [
  { value: '0', id: '0' },
  { value: '1/3rd', id: '1' },
  { value: '1/3rd to 2/3rds', id: '2' },
  { value: 'over 2/3rds', id: '3' },
];

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
    // TODO:
    //     survey_1: {
    //       id: 227,
    //     },

    //     plot: { id: 417 }, ?????

    location: locationAttr,

    date: { remote: dateAttr.remote },

    comment: commentAttr,

    broadHabitat: {
      menuProps: { label: 'Broad Habitat', icon: landIcon },
      pageProps: {
        headerProps: { title: 'Broad Habitat' },
        attrProps: {
          input: 'radio',
          info: 'Please select a broad habitat. Please ensure your choice of habitat matches the species list you are using.',
          inputProps: { options: broadHabitatOptions },
          set(value, model) {
            model.attrs.broadHabitat = value;
            model.attrs.fineHabitat = undefined;
          },
        },
      },
      remote: { id: 565, values: broadHabitatOptions as any },
    },

    fineHabitat: {
      menuProps: { label: 'Fine Habitat', icon: landIcon },
      pageProps: {
        headerProps: { title: 'Fine Habitat' },
        attrProps: {
          input: 'radio',
          info: 'Please select your fine habitat.',
          inputProps: (smp: AppSample) => ({
            options: getFineHabitatOptions(smp.attrs.broadHabitat),
          }),
        },
      },
      remote: { id: 565, values: fineHabitatOptions as any },
    },

    recorder: recorderAttr,

    management: managementAttr,
    managementOther: managementOtherAttr,

    grazing: grazingAttr,
    grazingAnimals: grazingAnimalsAttr,

    soil: soilAttr,
    woodCover: woodCoverAttr,
    rock: rockAttr,
    litter: litterAttr,
    lichens: lichensAttr,
    noSpecies: { remote: { id: 1461 } },
  },

  occ: {
    attrs: {
      taxon: {
        remote: {
          id: 'taxa_taxon_list_id',
          values: (taxon: any) => taxon.warehouse_id,
        },
      },

      comment: commentAttr,

      identifier: {
        menuProps: { icon: personOutline },
        pageProps: {
          attrProps: {
            input: 'input',
            inputProps: {
              placeholder: 'Recorder name',
            },
            info: "Enter the recorder's name, if different.",
          },
        },
        remote: { id: 18 },
      },

      cover: {
        //     abundance: {
        //       type: 'radio',
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
        //     }, // 1-10
        remote: { id: -1, values: dominCoverValues },
      },
      // grid: { remote: { id: 153 } }, // not sending this to the warehouse
    },

    create({ Occurrence: AppOccurrence, taxon, grid }) {
      return new AppOccurrence({ attrs: { taxon, grid } });
    },

    verify: attrs =>
      object({
        cover: z.string({ required_error: 'Cover is missing' }),
      }).safeParse(attrs).error,
  },

  verify: attrs =>
    object({
      date: z.string(), // TODO: check future dates
      broadHabitat: z.string({ required_error: 'Habitat is missing' }),
      recorder: z.string().min(1, { message: 'Recorder is missing' }),
      location: object(
        { id: z.string() },
        { invalid_type_error: 'Please select plot.' }
      ),
    }).safeParse(attrs).error,

  create({ Sample, recorder, surveyName, level }) {
    const sample = new Sample({
      metadata: {
        surveyId: surveys[level!],
        survey: surveyName || survey.name,
        level,
      },
      attrs: {
        training: appModel.attrs.useTraining,
        location: null,
        comment: null,
        recorder,
      },
    });

    return sample;
  },
};

export default survey;
