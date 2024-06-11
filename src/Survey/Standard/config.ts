/* eslint-disable no-param-reassign */
import { locationOutline, peopleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import SampleModel from 'common/models/sample';
import appModel from 'models/app';
import { dominCoverValues } from 'Survey/NPMS/config';
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

export const bbCoverValues = [
  { value: '+,<1%', id: 18886 },
  { value: '1,1-5%', id: 18887 },
  { value: '2,6-25%', id: 18888 },
  { value: '3,26-50%', id: 18889 },
  { value: '4,51-75%', id: 18890 },
  { value: '5,76-100%', id: 18891 },
];

export const presenceCoverValues = [
  { value: 'Present', id: 18893 },
  { value: 'Absent', id: 18894 },
];

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
      coverDomin: { remote: { id: 214, values: dominCoverValues } },
      coverBB: { remote: { id: 890, values: bbCoverValues } },
      coverPresence: { remote: { id: 894, values: presenceCoverValues } },
      coverPercentage: { remote: { id: 891 } },
      coverCount: { remote: { id: 892 } },
      coverFrequency: { remote: { id: 893 } },
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
