import { RouteWithModels, AttrPage } from '@flumens';
import savedSamples from 'models/collections/samples';
import StartNewSurvey from 'Survey/common/Components/StartNewSurvey';
import TaxonSearchPage from 'Survey/common/Components/TaxonSearchPage';
import Location from '../common/Components/Location';
import Additional from './Additional';
import Home from './Home';
import OccurrenceHome from './Occurrence/Home';
import OccurrenceList from './Occurrence/List';
import survey from './config';

const baseURL = `/survey/${survey.name}`;

const { AttrPageFromRoute } = AttrPage;

const routes = [
  [`${baseURL}`, StartNewSurvey.with(survey), true],
  [`${baseURL}/:smpId`, Home],
  [`${baseURL}/:smpId/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/location`, Location],
  [`${baseURL}/:smpId/additional`, Additional],
  [`${baseURL}/:smpId/additional/:attr`, AttrPageFromRoute],
  [`${baseURL}/:smpId/occurrences`, OccurrenceList],
  [`${baseURL}/:smpId/occurrences/:occId`, OccurrenceHome],
  [`${baseURL}/:smpId/occurrences/search`, TaxonSearchPage],
];

export default RouteWithModels.fromArray(savedSamples, routes);
