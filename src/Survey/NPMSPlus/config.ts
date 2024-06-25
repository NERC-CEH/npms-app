/* eslint-disable no-param-reassign */
import { z, object } from 'zod';
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
import npmsConfig, { broadHabitatAttr } from '../NPMS/config';

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
