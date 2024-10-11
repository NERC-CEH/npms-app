import { RouteWithModels, AttrPage } from '@flumens';
import samples from 'models/collections/samples';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import TaxonSearchPage from 'Survey/common/Components/TaxonSearchPage';
import Location from '../common/Components/Location';
import Habitat from './Habitat';
import Home from './Home';
import Management from './Management';
import Miscellaneous from './Miscellaneous';
import OccurrenceHome from './Occurrence/Home';
import OccurrenceList from './Occurrence/List';
import Vegetation from './Vegetation';
import survey from './config';

const baseURL = `/survey/${survey.name}`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId`, Home],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/locationId`, Location],
  [`${baseURL}/:smpId/management`, Management],
  [`${baseURL}/:smpId/management/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/habitat`, Habitat],
  [`${baseURL}/:smpId/habitat/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/vegetation`, Vegetation],
  [`${baseURL}/:smpId/miscellaneous`, Miscellaneous],
  [`${baseURL}/:smpId/:grid/occurrences`, OccurrenceList],
  [`${baseURL}/:smpId/:grid/occurrences/:occId`, OccurrenceHome],
  [`${baseURL}/:smpId/:grid/occurrences/search`, TaxonSearchPage],
];

export default RouteWithModels.fromArray(samples, routes);
