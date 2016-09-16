/** ****************************************************************************
 * Morel Sample.
 *****************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import Morel from 'morel';
import CONFIG from 'config'; // Replaced with alias
import recordManager from '../record_manager';
import ImageModel from './image';
import Occurrence from './occurrence';
import GeolocExtension from './sample_geoloc_ext';

let Sample = Morel.Sample.extend({
  constructor(...args) {
    this.manager = recordManager;
    Morel.Sample.prototype.constructor.apply(this, args);
  },

  Image: ImageModel,

  Occurrence,

  validate(attributes) {
    const attrs = _.extend({}, this.attributes, attributes);

    const sample = {};
    const occurrences = {};

    // todo: remove this bit once sample DB update is possible
    // check if saved
    if (!this.metadata.saved) {
      sample.send = false;
    }

    // location
    const location = attrs.location || {};
    if (!location.id) {
      sample.location = 'missing';
    }

    // date
    if (!attrs.date) {
      sample.date = 'missing';
    } else {
      const date = new Date(attrs.date);
      if (date === 'Invalid Date' || date > new Date()) {
        sample.date = (new Date(date) > new Date) ? 'future date' : 'invalid';
      }
    }

    // occurrences
    // if (this.occurrences.length === 0) {
    //   sample.occurrences = 'no species selected';
    // } else {
    //   this.occurrences.each((occurrence) => {
    //     const errors = occurrence.validate();
    //     if (errors) {
    //       const occurrenceID = occurrence.id || occurrence.cid;
    //       occurrences[occurrenceID] = errors;
    //     }
    //   });
    // }

    if (!_.isEmpty(sample) || !_.isEmpty(occurrences)) {
      const errors = {
        sample,
        occurrences,
      };
      return errors;
    }

    return null;
  },

  /**
   * Set the record for submission and send it.
   */
  setToSend(callback) {
    this.metadata.saved = true;

    if (!this.isValid()) {
      // since the sample was invalid and so was not saved
      // we need to revert it's status
      this.metadata.saved = false;
      return false;
    }

    // save record
    const promise = this.save(null, {
      success: () => {
        callback && callback();
      },
      error: (err) => {
        callback && callback(err);
      },
    });

    return promise;
  },
});

// add geolocation functionality
Sample = Sample.extend(GeolocExtension);

$.extend(true, Morel.Sample.keys, CONFIG.morel.sample);
export { Sample as default };
