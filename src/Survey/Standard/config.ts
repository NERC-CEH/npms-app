/* eslint-disable no-param-reassign */
import { locationOutline, peopleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import SampleModel from 'common/models/sample';
import appModel from 'models/app';
import { byGroup, groupAttr, Survey } from 'Survey/common/config';

export const getPlotGroups = (survey: Survey['name'], groupId?: string) => {
  const plotGroups: any = {};
  locations
    .filter(bySurvey(survey))
    .filter(byGroup(groupId))
    .forEach((location: Location) => {
      if (!location.attrs.plotGroupIdsAndNamesForPlot) return;
      Object.assign(plotGroups, location.attrs.plotGroupIdsAndNamesForPlot);
    });
  return plotGroups;
};

const plotGroupAttr = {
  menuProps: { label: 'Plot group', icon: locationOutline },
  pageProps: {
    headerProps: { title: 'Plot group' },
    attrProps: {
      input: 'radio',
      inputProps: (sample: SampleModel) => {
        const plotGroups: any = getPlotGroups(
          sample.getSurvey().name,
          sample.attrs.group?.id
        );

        const getOption = ([value, label]: any) => ({ value, label });
        return { options: Object.entries(plotGroups).map(getOption) };
      },
      set(id: any, sample: SampleModel) {
        const plotGroups: any = getPlotGroups(
          sample.getSurvey().name,
          sample.attrs.group?.id
        );
        const name = plotGroups[id];
        if (!name) {
          console.warn(`Plot Group with ID ${id} was not found`);
          return;
        }
        sample.attrs.location = undefined; // unset
        sample.attrs.plotGroup = { id, name };
      },
      get(sample: SampleModel) {
        return sample.attrs.plotGroup?.id;
      },
    },
  },
  remote: { id: 'group_id', values: (val: any) => val.id },
};

const abundanceOptions = [
  { value: 'Domin', id: 18881 },
  { value: 'Braun-Blanquet', id: 18882 },
  { value: 'Percentage', id: 18883 },
  { value: 'Individual plant count', id: 18884 },
  { value: 'Cell frequency', id: 18885 },
  { value: 'Present/Absent', id: 18892 },
];

export type AbundanceType =
  | 'Domin'
  | 'Braun-Blanquet'
  | 'Percentage'
  | 'Individual plant count'
  | 'Cell frequency'
  | 'Present/Absent';

const survey: Survey = {
  id: 599,
  name: 'standard',
  label: 'Standard',

  attrs: {
    group: groupAttr,
    plotGroup: plotGroupAttr,
    abundanceType: {
      menuProps: { label: 'Abundance type', icon: peopleOutline },
      pageProps: {
        headerProps: { title: 'Abundance type' },
        attrProps: {
          input: 'radio',
          inputProps: { options: abundanceOptions },
        },
      },
      remote: { id: 1625, values: abundanceOptions },
    },

    speciesComments: {
      menuProps: { label: 'Species comments', icon: peopleOutline },
      pageProps: {
        headerProps: { title: 'Species comments' },
        attrProps: {
          input: 'textarea',
          inputProps: { placeholder: 'Comments...' },
        },
      },
      remote: { id: 1796 },
    },
  },

  occ: {
    attrs: {
      grid: { remote: { id: 153 } },
    },

    create({ Occurrence: AppOccurrence, taxon, grid }) {
      return new AppOccurrence({ attrs: { taxon, grid } });
    },

    verify: attrs =>
      object({
        cover: z.string({ required_error: 'Cover is missing' }),
      }).safeParse(attrs).error,
  },

  create({ Sample }) {
    const sample = new Sample({
      metadata: {
        surveyId: survey.id,
        survey: survey.name,
      },
      attrs: {
        training: appModel.attrs.useTraining,
      },
    });

    return sample;
  },
};

export default survey;
