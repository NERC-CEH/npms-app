/** ****************************************************************************
 * Sample List controller.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import $ from 'jquery';
import Indicia from 'indicia';
import radio from 'radio';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import userModel from 'user_model';
import appModel from 'app_model';
import JST from 'JST';
import CONFIG from 'config';
import savedSamples from 'saved_samples';
import Sample from 'sample';
import MainView from './main_view';
import HeaderView from './header_view';

const API = {
  show() {
    Log(`Samples:List:Controller: showing ${savedSamples.length}.`);

    // MAIN
    const mainView = new MainView({
      collection: savedSamples,
      appModel,
    });

    mainView.on('childview:sample:edit:attr', (childView, attr) => {
      radio.trigger('samples:edit:attr', childView.model.cid, attr);
    });

    mainView.on('survey', () => {
      API.addSurvey();
    });

    mainView.on('childview:sample:delete', (childView) => {
      const sample = childView.model;
      API.sampleDelete(sample);
    });
    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on('survey', () => {
      API.addSurvey();
    });

    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  sampleDelete(sample) {
    Log('Samples:List:Controller: deleting sample.');

    const syncStatus = sample.getSyncStatus();
    let body = 'This record hasn\'t been saved to NPMS yet, ' +
      'are you sure you want to remove it from your device?';

    if (syncStatus === Indicia.SYNCED) {
      body = 'Are you sure you want to remove this record from your device?';
      body += '</br><i><b>Note:</b> it will remain on the server.</i>';
    }
    radio.trigger('app:dialog', {
      title: 'Delete',
      body,
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Delete',
          class: 'btn-negative',
          onClick() {
            sample.destroy();
            radio.trigger('app:dialog:hide');
            Analytics.trackEvent('List', 'sample remove');
          },
        },
      ],
    });
  },

  addSurvey() {
    if (!userModel.hasLogIn()) {
      radio.trigger('user:login');
      return;
    }

    Log('Samples:List:Controller: adding survey');
    const View = Marionette.View.extend({
      template: JST['samples/list/levels'],
      events: {
        'click input[type="radio"]'() { // eslint-disable-line
          // find the option
          let option;
          const $inputs = this.$el.find('input');
          $inputs.each((int, elem) => {
            if ($(elem).prop('checked')) {
              option = $(elem).val();
            }
          });

          // create new sample
          API.createNewSample(option, (sample) => {
            radio.trigger('app:dialog:hide');

            // open sample page
            radio.trigger('samples:edit:attr', sample.cid, 'habitat');
          });
        },
      },
    });

    const body = new View();

    radio.trigger('app:dialog', {
      title: 'Survey level',
      body,
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
      ],
    });
  },


  /**
   * Creates a new sample with an image passed as an argument.
   */
  createNewSample(level, callback) {
    const survey_id = CONFIG.indicia.sample.surveys[level]; // eslint-disable-line
    let input_form = `content/${level}-recording-form`; // eslint-disable-line

    const sample = new Sample(null, { survey_id, input_form });
    sample.set('level', level);

    savedSamples.add(sample);
    sample.save()
      .then(callback)
      .catch((err) => {
        Log(err, 'e');
        radio.trigger('app:dialog:error', err);
      });
  },
};

export { API as default };
