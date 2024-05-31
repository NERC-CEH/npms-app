/* eslint-disable camelcase */
import axios from 'axios';
import { camelCase, mapKeys } from 'lodash';
import { ZodError } from 'zod';
import { isAxiosNetworkError, HandledError } from '@flumens';
import CONFIG from 'common/config';
import LocationModel, { RemoteAttributes } from 'models/location';
import userModel from 'models/user';
import { type Survey } from 'Survey/common/config';

export default async function fetch(
  surveyName: Survey['name']
): Promise<RemoteAttributes[]> {
  const URLS = {
    npms: `${CONFIG.backend.indicia.url}/index.php/services/rest/reports/projects/npms/app_get_npms_website_plots_for_user_2.xml`,
    npmsPlus: `${CONFIG.backend.indicia.url}/index.php/services/rest/reports/projects/plant_portal/app_get_npms_plus_plots_for_user_2.xml`,
    standard: `${CONFIG.backend.indicia.url}/index.php/services/rest/reports/projects/plant_portal/app_get_standard_mode_plots_for_user_2.xml`,
  };

  const options = {
    params: {
      warehouse_user_id: userModel.attrs.indiciaUserId,
      // warehouse_user_id: 5553,
      project_id: '', // the report crashes without this
    },
    headers: {
      Authorization: `Bearer ${await userModel.getAccessToken()}`,
    },
    timeout: 80000,
  };

  try {
    const res = await axios.get(URLS[surveyName], options);

    if (!res?.data?.data)
      throw new Error('Could not fetch the resource, try again later.');

    const getValues = (doc: any) =>
      mapKeys(doc, (_, key) => (key.includes(':') ? key : camelCase(key)));

    const addSurveyName = (l: any) => ({ ...l, surveyName });
    const parsePlotGroups = (l: any) => {
      const plotGroupIdsAndNamesForPlot = l.plotGroupIdsAndNamesForPlot
        ?.split(',')
        .reduce((agg: any, plotGroup: string) => {
          const [plotGroupId, plotGroupName] = plotGroup?.split('|||') || [];
          // eslint-disable-next-line no-param-reassign
          agg[plotGroupId] = plotGroupName;
          return agg;
        }, {});

      return { ...l, plotGroupIdsAndNamesForPlot };
    };
    const docs = res.data.data
      .map(getValues)
      .map(addSurveyName)
      .map(parsePlotGroups);

    docs.forEach(LocationModel.remoteSchema.parse);

    return docs;
  } catch (error: any) {
    if (axios.isCancel(error)) return [];

    if (isAxiosNetworkError(error))
      throw new HandledError(
        'Request aborted because of a network issue (timeout or similar).'
      );

    if ('issues' in error) {
      const err: ZodError = error;
      throw new Error(
        err.issues.map(e => `${e.path.join(' ')} ${e.message}`).join(' ')
      );
    }

    throw error;
  }
}
