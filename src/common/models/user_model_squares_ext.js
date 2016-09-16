/** ***************************************************************************
 * User Model squares locations extension.
 *****************************************************************************/

import $ from 'jquery';
import CONFIG from 'config';
import { Log } from 'helpers';

const extension = {
  syncSquares(force) {
    const that = this;
    if (this.synchronizingSquares) {
      return;
    }

    if (this.hasLogIn() && this._lastSquaresSyncExpired() || force) {
      // init or refresh
      this.synchronizingSquares = true;

      this.fetchSquaresSpecies(() => {
        that.synchronizingSquares = false;
      });
    }
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
    Log('UserModel: fetching squares');
    this.trigger('sync:user:squares:start');
    const that = this;
    const squares = this.get('squares');

    const data = {
      report: 'reports_for_prebuilt_forms/Splash/get_my_squares_and_plots.xml',
      // user_id filled in by iform_mobile_auth proxy
      path: CONFIG.morel.manager.input_form,
      email: this.get('email'),
      appname: CONFIG.morel.manager.appname,
      appsecret: CONFIG.morel.manager.appsecret,
      usersecret: this.get('secret'),

      // todo check which ones will change per user
      core_square_location_type_id: 3297,
      additional_square_location_type_id: 3748,
      current_user_id: 178,
      vice_county_location_attribute_id: 66,
      no_vice_county_found_message: '1km%20square',
      user_square_attr_id: 6,
    };

    $.ajax({
      url: CONFIG.report.url,
      type: 'POST',
      data,
      dataType: 'JSON',
      timeout: CONFIG.report.timeout,
      success(receivedData) {
        const data = {};
        receivedData.forEach((location) => {
          const parent = parseInt(location.parent_id);
          const id = parseInt(location.id);
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
      },
      error(err) {
        Log('Squares load failed');
        callback(err);
        that.trigger('sync:user:squares:end');
      },
    });
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
