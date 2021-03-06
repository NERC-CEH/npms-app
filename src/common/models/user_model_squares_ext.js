/** ***************************************************************************
 * User Model squares locations extension.
 **************************************************************************** */

import Indicia from 'indicia';
import CONFIG from 'config';
import Log from 'helpers/log';

const extension = {
  syncSquares(force) {
    const that = this;
    if (this.synchronizingSquares) {
      return this.synchronizingSquares;
    }

    if (this.hasLogIn() && (this._lastSquaresSyncExpired() || force)) {
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
      report: '/projects/npms/get_my_squares_and_plots.xml',

      api_key: CONFIG.indicia.api_key,
      host_url: CONFIG.indicia.host,
      user: this.getUser.bind(this),
      password: this.getPassword.bind(this),
      params: {
        // todo check which ones will change per user
        core_square_location_type_id:
          CONFIG.indicia.reports.core_square_location_type_id,
        additional_square_location_type_id:
          CONFIG.indicia.reports.additional_square_location_type_id,
        vice_county_location_attribute_id:
          CONFIG.indicia.reports.vice_county_location_attribute_id,
        no_vice_county_found_message:
          CONFIG.indicia.reports.no_vice_county_found_message,
        user_square_attr_id: CONFIG.indicia.reports.user_square_attr_id,
        plot_number_attr_id: CONFIG.indicia.reports.plot_number_attr_id,
        only_show_my_useable_plots_squares: 1,
        bustCache: Math.random(),
      },
    });

    const promise = report
      .run()
      .then(receivedData => {
        if (!receivedData.data) {
          const err = new Error('Error while retrieving response.');
          return Promise.reject(err);
        }

        const data = {};
        receivedData.data.forEach(location => {
          if (!location.location_entered_sref) {
            return;
          }

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
            if (!data[parent]) {
              // create new square if doesn't exist
              data[parent] = {
                sref: location.square_entered_sref,
                plots: {},
              };
            }

            data[parent].plots[id] = {
              sref: location.location_entered_sref,
              label: location.plot_label,
            };
          }
        });

        // save and exit
        squares.synced_on = new Date().toString();
        squares.data = data;
        that.set('squares', squares);
        that.save();
        callback();
        that.trigger('sync:user:squares:end');
        return null;
      })
      .catch(err => {
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
