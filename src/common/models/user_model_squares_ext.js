/** ***************************************************************************
 * User Model squares locations extension.
 *****************************************************************************/

import Indicia from 'indicia';
import CONFIG from 'config';
import Log from 'helpers/log';

const extension = {
  syncSquares(force) {
    const that = this;
    if (this.synchronizingSquares) {
      return this.synchronizingSquares;
    }

    if (this.hasLogIn() && this._lastSquaresSyncExpired() || force) {
      // init or refresh
      this.synchronizingSquares = this.fetchSquaresSpecies(() => {
        delete that.synchronizingSquares;
      });

      return this.synchronizingSquares;
    }

    return Promise.resolve();
  },

  resetSquares() {
    Log('UserModel: resetting squares');
    this.set('squares', this.defaults.squares);
    this.save();
  },

  /**
   * Loads the list of available squares from the warehouse then updates the
   * collection in the main view.
   */
  fetchSquaresSpecies(callback) {
    Log('UserModel:Squares: fetching');
    this.trigger('sync:user:squares:start');
    const that = this;
    const squares = this.get('squares');

    const report = new Indicia.Report({
      report: '/reports_for_prebuilt_forms/Splash/get_my_squares_and_plots.xml',

      api_key: CONFIG.indicia.api_key,
      host_url: CONFIG.indicia.host,
      user: this.getUser.bind(this),
      password: this.getPassword.bind(this),
      params: {
        // todo check which ones will change per user
        core_square_location_type_id: 3297,
        additional_square_location_type_id: 3748,
        vice_county_location_attribute_id: 66,
        no_vice_county_found_message: '1km%20square',
        user_square_attr_id: 6,
        plot_number_attr_id: 68,
      },
    });

    const promise = report.run()
      .then((receivedData) => {
        if (typeof receivedData.data !== 'object') {
          const err = new Error('Error while retrieving response.');
          return Promise.reject(err);
        }


        const data = {};
        receivedData.data.forEach((location) => {
          const parent = parseInt(location.parent_id, 10);
          const id = parseInt(location.id, 10);
          if (!parent) {
            // square
            data[id] = {
              sref: location.square_entered_sref, // todo change to new one
              plots: {},
            };
          } else {
            // plot
            // show only user plots
            if (location.my_plot !== 'YES') {
              return;
            }

            if (!data[parent]) {
              // create new square if doesn't exist
              data[parent] = {
                sref: location.square_entered_sref,
                plots: {},
              };
            }

            data[parent].plots[id] = {
              sref: location.location_entered_sref,
            };
          }

          return null;
        });

        // save and exit
        squares.synced_on = new Date().toString();
        squares.data = data;
        that.set('squares', squares);
        that.save();
        callback();
        that.trigger('sync:user:squares:end');
      })
      .catch((err) => {
        Log('UserModel:SquaresExt: fetch failed');
        that.trigger('sync:user:squares:end');
        return Promise.reject(err);
      });

    return promise;
  },

  /**
   * Checks if the last sync was done too long ago.
   * @returns {boolean}
   * @private
   */
  _lastSquaresSyncExpired() {
    const squares = this.get('squares');

    if (!squares.synced_on) return true;

    const lastSync = new Date(squares.synced_on);

    function daydiff(first, second) {
      return Math.round((second - first) / (1000 * 60 * 60 * 24));
    }

    if (daydiff(lastSync, new Date()) >= 1) return true;

    return false;
  },
};

export default extension;
