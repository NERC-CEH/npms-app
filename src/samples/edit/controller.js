/** ****************************************************************************
 * Sample Edit controller.
 **************************************************************************** */
import Backbone from 'backbone';
import _ from 'lodash';
import Indicia from 'indicia';
import Device from 'helpers/device';
import Log from 'helpers/log';
import App from 'app';
import radio from 'radio';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import { alert } from '@apps';
import PhotoPicker from '../../common/photo_picker';
import MainView from './main_view';
import HeaderView from './header_view';
import FooterView from './footer_view';

const API = {
  show(sampleID) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID]);
      });
      return;
    }

    Log('Samples:Edit:Controller: showing.');

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // can't edit a saved one - to be removed when sample update
    // is possible on the server
    if (sample.getSyncStatus() === Indicia.SYNCED) {
      radio.trigger('samples:show', sampleID, { replace: true });
      return;
    }

    // MAIN
    const mainView = new MainView({
      model: new Backbone.Model({ sample, appModel }),
    });
    radio.trigger('app:main', mainView);

    // on finish sync move to show
    function checkIfSynced() {
      if (sample.getSyncStatus() === Indicia.SYNCED) {
        radio.trigger('samples:show', sampleID, { replace: true });
      }
    }
    sample.on('request sync error', checkIfSynced);
    mainView.on('destroy', () => {
      // unbind when page destroyed
      sample.off('request sync error', checkIfSynced);
    });

    // HEADER
    const headerView = new HeaderView({
      model: sample,
    });

    headerView.on('save', () => {
      API.save(sample);
    });

    radio.trigger('app:header', headerView);

    // FOOTER
    const footerView = new FooterView({
      model: sample,
    });

    footerView.on('photo:upload', e => {
      const photo = e.target.files[0];
      PhotoPicker.photoUpload(sample, photo);
    });

    footerView.on('childview:photo:delete', model => {
      PhotoPicker.photoDelete(model);
    });

    // android gallery/camera selection
    footerView.on('photo:selection', () => {
      PhotoPicker.photoSelect(sample);
    });

    radio.trigger('app:footer', footerView);
  },

  save(sample) {
    Log('Samples:Edit:Controller: save clicked.');

    const promise = sample.setToSend();

    // invalid sample
    if (!promise) {
      const invalids = sample.validationError;
      API.showInvalidsMessage(invalids);
      return;
    }

    promise
      .then(() => {
        // should we sync?
        if (!Device.isOnline()) {
          radio.trigger('app:dialog:error', {
            message: 'Looks like you are offline!',
          });
          return;
        }

        if (!userModel.hasLogIn()) {
          radio.trigger('user:login', { replace: true });
          return;
        }

        // sync
        sample.save(null, { remote: true }).catch((err = {}) => {
          Log(err, 'e');

          const visibleDialog = App.regions
            .getRegion('dialog')
            .$el.is(':visible');
          // we don't want to close any other dialog
          if (err.message && !visibleDialog) {
            radio.trigger(
              'app:dialog:error',
              `Sorry, we have encountered a problem while sending the record.
                
                 <p><i>${err.message}</i></p>`
            );
          } else {
            alert({
              header: 'Sorry, try again later',
              message:
                'Apologies, the NPMS site is currently offline for updates. It will be back shortly.',
              buttons: [
                {
                  text: 'OK',
                },
              ],
              skipTranslation: true,
            });
          }
        });
        radio.trigger('sample:saved');
      })
      .catch(err => {
        Log(err, 'e');
        radio.trigger('app:dialog:error', err);
      });
  },

  showInvalidsMessage(invalids) {
    // it wasn't saved so of course this error
    delete invalids.sample.saved; // eslint-disable-line

    let missing = '';
    if (invalids.occurrences) {
      _.each(invalids.occurrences, () => {
        missing += '<b>occurrence cover</b> - missing</br>';
      });
    }
    if (invalids.sample) {
      const labels = {
        identifiers: 'recorder names',
      };
      _.each(invalids.sample, (message, invalid) => {
        const invalidLabel = labels[invalid] || invalid;
        missing += `<b>${invalidLabel}</b> - ${message}</br>`;
      });
    }

    radio.trigger('app:dialog', {
      title: 'Sorry',
      body: missing,
      timeout: 2000,
    });
  },
};

export { API as default };
