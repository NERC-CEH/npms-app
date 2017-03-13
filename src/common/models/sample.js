/** ****************************************************************************
 * Indicia Sample.
 *****************************************************************************/
import _ from 'lodash';
import Indicia from 'indicia';
import CONFIG from 'config';
import userModel from 'user_model';
import appModel from 'app_model';
import Occurrence from 'occurrence';
import Device from 'helpers/device';
import Log from 'helpers/log';
import ImageModel from './image';
import store from '../store';

const Sample = Indicia.Sample.extend({
  api_key: CONFIG.indicia.api_key,
  host_url: CONFIG.indicia.host,
  user: userModel.getUser.bind(userModel),
  password: userModel.getPassword.bind(userModel),

  store, // offline store

  Media: ImageModel,

  Occurrence,

  keys: CONFIG.indicia.sample, // warehouse attribute keys

  metadata() {
    return {
      training: appModel.get('useTraining'),
    };
  },

  /**
   * Need a function because Device might not be ready on module load.
   * @returns {{device: *, device_version: *}}
   */
  defaults() {
    let identifiers = '';
    if (userModel.hasLogIn()) {
      identifiers = `${userModel.get('firstname')} ${userModel.get('secondname')}`;
    }
    return {
      // attach device information
      device: Device.getPlatform(),
      device_version: Device.getVersion(),
      identifiers,
    };
  },

  validateRemote(attributes) {
    const attrs = _.extend({}, this.attributes, attributes);

    const sample = {};
    const occurrences = {};

    // todo: remove this bit once sample DB update is possible
    // check if saved or already send
    if (!this.metadata.saved || this.getSyncStatus() === Indicia.SYNCED) {
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
        sample.date = (new Date(date) > new Date()) ? 'future date' : 'invalid';
      }
    }

    // habitat
    if (!attrs.habitat || !attrs.habitat.broad) {
      sample['broad habitat'] = 'missing';
    }

    // habitat
    if (!attrs.identifiers) {
      sample.identifiers = 'missing';
    }

    // occurrences
    this.occurrences.each((occurrence) => {
      const errors = occurrence.validate(null, { remote: true });
      if (errors) {
        const occurrenceID = occurrence.id || occurrence.cid;
        occurrences[occurrenceID] = errors;
      }
    });

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
   * Set the sample for submission and send it.
   */
  setToSend() {
    // don't change it's status if already saved
    if (this.metadata.saved) {
      return Promise.resolve(this);
    }

    this.metadata.saved = true;

    if (!this.isValid({ remote: true })) {
      // since the sample was invalid and so was not saved
      // we need to revert it's status
      this.metadata.saved = false;
      return false;
    }

    Log('SampleModel: was set to send.');

    // save sample
    return this.save();
  },

  isLocalOnly() {
    const status = this.getSyncStatus();
    return this.metadata.saved &&
      (status === Indicia.LOCAL || status === Indicia.SYNCHRONISING);
  },

  timeout() {
    if (!Device.connectionWifi()) {
      return 180000; // 3 min
    }
    return 60000; // 1 min
  },
});

export { Sample as default };
