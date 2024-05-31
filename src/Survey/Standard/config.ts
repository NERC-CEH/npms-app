/* eslint-disable no-param-reassign */
import { locationOutline } from 'ionicons/icons';
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

const survey: Survey = {
  id: 599,
  name: 'standard',
  label: 'Standard',

  attrs: {
    group: groupAttr,
    plotGroup: plotGroupAttr,
  },

  occ: {
    attrs: {},
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
