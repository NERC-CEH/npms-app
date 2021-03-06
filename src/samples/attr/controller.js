/** ****************************************************************************
 * Sample Attribute controller.
 **************************************************************************** */
import Backbone from 'backbone';
import Indicia from 'indicia';
import Log from 'helpers/log';
import radio from 'radio';
import savedSamples from 'saved_samples';
import CONFIG from 'config';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show(sampleID, attr) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID, attr]);
      });
      return;
    }

    Log(`Samples:Attr:Controller: showing ${attr}.`);

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
      attr,
      model: sample,
    });
    radio.trigger('app:main', mainView);

    // HEADER
    let title = attr;
    switch (attr) {
      case 'identifiers':
        title = 'Recorder Names';
        break;
      case 'gravel':
        title = 'Bare Rock/Gravel';
        break;
      case 'soi':
        title = 'Bare Soil';
        break;
      default:
    }
    const headerView = new HeaderView({
      onExit() {
        API.onExit(mainView, sample, attr, () => {
          window.history.back();
        });
      },
      model: new Backbone.Model({ title }),
    });

    radio.trigger('app:header', headerView);

    // if exit on selection click
    mainView.on('save', () => {
      const habitat = sample.get('habitat') || {};

      API.onExit(mainView, sample, attr, () => {
        // editing existing sample
        if (attr === 'habitat' && !habitat.broad) {
          // todo: skipping habitat makes two back clicks
          radio.trigger('samples:edit', sample.cid, { replace: true });
          return;
        }
        window.history.back();
      });
    });

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  onExit(mainView, sample, attr, callback) {
    Log('Samples:Attr:Controller: exiting.');
    const values = mainView.getValues();
    // todo: remove the record if the habitat is empty
    API.save(attr, values, sample, callback);
  },

  /**
   * Update sample with new values
   * @param values
   * @param sample
   */
  save(attr, values, sample, callback) {
    Log('Samples:Attr:Controller: saving.');

    let newVal;
    switch (attr) {
      case 'date':
        // validate before setting up
        if (values.date && values.date.toString() !== 'Invalid Date') {
          newVal = values.date;
          sample.set('date', newVal);
        }
        break;
      case 'habitat':
        const habitat = sample.get('habitat') || {};

        // reset habitat only if new selection
        if (values.habitat && values.habitat !== habitat.broad) {
          habitat.broad = values.habitat;

          const allHabitats = CONFIG.indicia.sample.habitat._values;
          const fineHabitats = Object.keys(allHabitats[habitat.broad].values);
          if (fineHabitats.length === 1) {
            habitat.fine = fineHabitats[0]; // eslint-disable-line
          } else {
            delete habitat.fine;
          }
        }

        sample.set('habitat', habitat);
        break;
      case 'fine-habitat':
        const oldhabitat = sample.get('habitat') || {};
        oldhabitat.fine = values['fine-habitat'];
        sample.set('habitat', oldhabitat);
        break;
      case 'management':
        const managementValues = [...values[attr].values];
        const otherManagement = values[attr].other;
        sample.set('management other', otherManagement);
        if (otherManagement && !managementValues.includes('Other')) {
          managementValues.push('Other');
        } else if (!otherManagement && managementValues.includes('Other')) {
          const otherIndex = managementValues.indexOf('Other');
          managementValues.splice(otherIndex, 1);
        }
        sample.set(attr, managementValues);
        break;

      case 'comment':

      // extra attributes
      case 'identifiers': // eslint-disable-line
      case 'grazing':
      case 'wooded':
      case 'vegetation':
      case 'soil':
      case 'gravel':
      case 'litter':
      case 'lichens':
        sample.set(attr, values[attr]);
        break;
      default:
    }

    // save it
    sample
      .save()
      .then(callback)
      .catch(err => {
        Log(err, 'e');
        radio.trigger('app:dialog:error', err);
      });
  },
};

export { API as default };
