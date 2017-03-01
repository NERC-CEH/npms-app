/** ****************************************************************************
 * Sample router.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import Device from 'helpers/device';
import App from 'app';
import radio from 'radio';
import savedSamples from 'saved_samples';
import userModel from 'user_model';
import appModel from 'app_model';
import ListController from './list/controller';
import ShowController from './show/controller';
import EditController from './edit/controller';
import EditAdditionalController from './edit_additional/controller';
import EditLocationController from './location/controller';
import EditAttrController from './attr/controller';
import TaxaController from './taxa/list/controller';
import TaxaEditController from './taxa/edit/controller';
import TaxaSearchController from './taxa/search/controller';

App.samples = {};

let scroll = 0; // last scroll position
const $mainRegion = $('#main');

const Router = Marionette.AppRouter.extend({
  routes: {
    'samples(/)': {
      route: ListController.show,
      after() {
        if (Device.isIOS()) {
          // iOS scroll glitch fix
          setTimeout(() => {
            $mainRegion.scrollTop(scroll);
          }, 1);
        } else {
          $mainRegion.scrollTop(scroll);
        }
      },
      leave() {
        scroll = $mainRegion.scrollTop();
      },
    },
    'samples/:id': ShowController.show,
    'samples/:id/edit(/)': EditController.show,
    'samples/:id/edit/additional(/)': EditAdditionalController.show,
    'samples/:id/edit/location(/)': EditLocationController.show,
    'samples/:id/edit/taxa(/)': TaxaController.show,
    'samples/:id/edit/taxa/:id/edit(/)': TaxaEditController.show,
    'samples/:id/edit/taxa/search(/)': TaxaSearchController.show,
    'samples/:id/edit/:attr(/)': EditAttrController.show,
    'samples/*path': () => { radio.trigger('app:404:show'); },
  },
});

radio.on('samples:list', (options) => {
  App.navigate('samples', options);
  ListController.show();
});

radio.on('samples:show', (sampleID, options) => {
  App.navigate(`samples/${sampleID}`, options);
  ShowController.show(sampleID);
});

radio.on('samples:edit', (sampleID, options) => {
  App.navigate(`samples/${sampleID}/edit`, options);
  EditController.show(sampleID);
});

radio.on('samples:taxa:edit', (sampleID, occurrenceID, options) => {
  App.navigate(`samples/${sampleID}/edit/taxa/${occurrenceID}/edit`, options);
  TaxaEditController.show(sampleID, occurrenceID);
});

radio.on('samples:taxa:search', (sampleID, options) => {
  App.navigate(`samples/${sampleID}/edit/taxa/search`, options);
  TaxaSearchController.show(sampleID);
});

radio.on('samples:edit:additional', (sampleID, options) => {
  App.navigate(`samples/${sampleID}/edit-additional`, options);
  EditAdditionalController.show(sampleID);
});

radio.on('samples:edit:location', (sampleID, options) => {
  App.navigate(`samples/${sampleID}/edit/location`, options);
  EditLocationController.show(sampleID);
});

radio.on('samples:edit:attr', (sampleID, attrID, options) => {
  App.navigate(`samples/${sampleID}/edit/${attrID}`, options);
  switch (attrID) {
    default:
      EditAttrController.show(sampleID, attrID);
  }
});

radio.on('samples:new', (options) => {
  App.navigate('samples/new', options);
  EditController.show();
});

radio.on('samples:new:attr', (attrID, options) => {
  App.navigate(`samples/new/${attrID}`, options);
  switch (attrID) {
    case 'taxon':
      TaxonController.show();
      break;
    default:
      EditAttrController.show(null, attrID);
  }
});

radio.on('sample:saved', () => {
  window.history.back();
});

function syncSamples() {
  if (Device.isOnline() && appModel.get('autosync') && userModel.hasLogIn()) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      savedSamples.once('fetching:done', () => {
        Log('Samples:router: syncing all samples.');
        savedSamples.save(null, { remote: true });
      });
      return;
    }
    Log('Samples:router: syncing all samples.');
    savedSamples.save(null, { remote: true });
  }
}

userModel.on('login', syncSamples);

App.on('before:start', () => {
  Log('Samples:router: initializing.');
  App.samples.router = new Router();

  if (userModel.hasLogIn()) {
    syncSamples();
  }
});
