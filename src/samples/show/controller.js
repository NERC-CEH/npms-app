/** ****************************************************************************
 * Sample Show controller.
 *****************************************************************************/
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import Device from 'helpers/device';
import Sample from 'sample';
import appModel from 'app_model';
import userModel from 'user_model';
import CONFIG from 'config';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

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

    Log('Samples:Show:Controller: showing.');
    const sample = savedSamples.get(sampleID);

    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // MAIN
    const mainView = new MainView({
      model: new Backbone.Model({ sample, appModel }),
    });

    mainView.on('survey', () => {
      API.addSurvey(sampleID);
    });

    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Record',
      }),
    });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  syncSample(sample) {
    if (Device.isOnline()) {
      if (!userModel.hasLogIn()) {
        radio.trigger('user:login');
        return;
      }

      sample.save(null, { remote: true })
        .catch((err) => {
          Log(err, 'e');
          radio.trigger('app:dialog:error', err);
        });
    } else {
      radio.trigger('app:dialog:error', {
        message: 'Looks like you are offline!',
      });
    }
  },


  addSurvey(sampleID) {
    if (!userModel.hasLogIn()) {
      radio.trigger('user:login');
      return;
    }

    Log('Samples:List:Controller: adding survey');
    API.createNewSample(sampleID, (sample) => {
      radio.trigger('app:dialog:hide');

      // open sample page
      radio.trigger('samples:edit:attr', sample.cid, 'habitat');
    });
  },

  /**
   * Creates a new sample.
   */
  // TODO: copy survey 1 attrs
  createNewSample(sampleID, callback) {
    const sample1 = savedSamples.get(sampleID);
    const level = sample1.get('level');

    const survey_id = CONFIG.indicia.sample.surveys[level]; // eslint-disable-line
    let input_form = `content/${level}-recording-form`; // eslint-disable-line

    const survey_1 = sample1.id; // eslint-disable-line

    const sample = new Sample({ survey_1 }, { survey_id, input_form });
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
