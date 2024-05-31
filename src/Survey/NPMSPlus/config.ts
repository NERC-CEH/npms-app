/* eslint-disable no-param-reassign */
import { z, object } from 'zod';
import appModel from 'models/app';
import { Level, Survey, groupAttr } from 'Survey/common/config';
import npmsConfig from '../NPMS/config';

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

    group: groupAttr,
  },

  occ: {
    attrs: {
      ...npmsConfig.occ!.attrs,
    },

    create({ Occurrence: AppOccurrence, taxon }) {
      return new AppOccurrence({ attrs: { taxon } });
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
