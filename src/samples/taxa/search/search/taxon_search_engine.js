/** ****************************************************************************
 * Generates species list suggestions.
 **************************************************************************** */
import Backbone from 'backbone';
import _ from 'lodash';
import indicatorNames from 'common/data/indicator_names.data.json';
import indicator from 'common/data/indicator.data.json';
import inventoryNames from 'common/data/inventory_names.data.json';
import inventory from 'common/data/inventory.data.json';
import wildflowerNames from 'common/data/wildflower_names.data.json';
import wildflower from 'common/data/wildflower.data.json';
import searchCommonNames from './commonNamesSearch';
import searchSciNames from './scientificNamesSearch';
import helpers from './searchHelpers';

const speciesNames = {
  indicator: indicatorNames,
  inventory: inventoryNames,
  wildflower: wildflowerNames,
};

const species = {
  indicator,
  inventory,
  wildflower,
};

const MAX = 20;

const API = {
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
  search(
    list = 'inventory',
    searchPhrase,
    callback,
    maxResults = MAX,
    scientificOnly
  ) {
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
      results = searchCommonNames(
        species[list],
        speciesNames[list],
        normSearchPhrase
      );

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
