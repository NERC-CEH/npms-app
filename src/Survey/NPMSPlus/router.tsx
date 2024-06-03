import { RouteWithModels, AttrPage } from '@flumens';
import savedSamples from 'models/collections/samples';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import TaxonSearchPage from 'Survey/common/Components/TaxonSearchPage';
import Details from '../NPMS/Details';
import Home from '../NPMS/Home';
import OccurrenceHome from '../NPMS/Occurrence/Home';
import OccurrenceList from '../NPMS/Occurrence/List';
import Location from '../common/Components/Location';
import survey from './config';

const baseURL = `/survey/${survey.name}`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId`, Home],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/location`, Location],
  [`${baseURL}/:smpId/details`, Details],
  [`${baseURL}/:smpId/details/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/:grid/occurrences`, OccurrenceList],
  [`${baseURL}/:smpId/:grid/occurrences/:occId`, OccurrenceHome],
  [`${baseURL}/:smpId/:grid/occurrences/search`, TaxonSearchPage],
];

export default RouteWithModels.fromArray(savedSamples, routes);
