/** ****************************************************************************
 * Generates UKSI list search suggestions.
 *****************************************************************************/
import $ from 'jquery';
import Backbone from 'backbone';
import _ from 'lodash';
import searchCommonNames from './commonNamesSearch';
import searchSciNames from './scientificNamesSearch';
import helpers from './searchHelpers';
import Log from 'log';

let species = {};
let loading = false;
let species_names = {};

const MAX = 20;

const API = {
  init(list, callback) {
    Log('Taxon search engine: initializing');
    const that = this;

    loading = true;
    require.ensure([], () => {
      loading = false;
      $.getJSON(`data/${list}.data.json`, (data) => {
        species[list] = data;
      })
        .done($.getJSON( `data/${list}_names.data.json`, (data) => {
          species_names[list] = data;
        })
          .done(() => {
            loading = false;
            that.trigger('data:loaded');
            callback && callback();
          }))
    }, 'data');
  },

  /**
   * Returns an array of species in format
   {
     array_id: "Genus array index"
     species_id: "Species array index"
     species_name_id: "Species name index" //to know where found
     warehouse_id: "Warehouse id"
     group: "Species group"
     scientific_name: "Scientific name"
     common_name: "Common name"
     synonym: "Common name synonym"
   }
   */
  search(list = 'inventory', searchPhrase, callback, maxResults = MAX, scientificOnly) {
    if (!species[list]) {
      // initialize
      function proceed() {
        API.search(list, searchPhrase || '', callback, maxResults, scientificOnly);
      }

      if (!loading) {
        API.init(list, proceed);
      } else {
        // the process has started, wait until done
        this.on('data:loaded', proceed);
      }
      return;
    }

    let results = [];

    // normalize the search phrase
    const normSearchPhrase = searchPhrase.toLowerCase();

    // check if scientific search
    const isScientific = helpers.isPhraseScientific(normSearchPhrase);
    if (isScientific || scientificOnly) {
      // search sci names
      searchSciNames(species[list], normSearchPhrase, results, maxResults);
    } else {
      // search common names
      results = searchCommonNames(species[list], species_names[list], normSearchPhrase);

      // if not enough
      if (results.length <= MAX) {
        // search sci names
        searchSciNames(species[list], normSearchPhrase, results);
      }
    }

    // return results in the order
    callback(results);
  },
};

_.extend(API, Backbone.Events);

export { API as default };
