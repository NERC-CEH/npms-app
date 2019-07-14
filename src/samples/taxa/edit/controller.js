/** ****************************************************************************
 * Sample Taxa Edit controller.
 **************************************************************************** */

import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import LoaderView from '../../../common/views/loader_view';

const API = {
  show(sampleID, occurrenceID) {
    const loaderView = new LoaderView();
    radio.trigger('app:main', loaderView);

    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID, occurrenceID]);
      });
      return;
    }

    Log('Samples:Taxa:List:Controller: showing');

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // MAIN
    const occurrences = sample.occurrences.filter(
      occurrence => occurrence.cid === occurrenceID
    );

    if (occurrences.length !== 1) {
      Log(
        `Samples:Taxa:Edit:Controller: no occurrence with id (${occurrenceID})`,
        'e'
      );
      return;
    }

    const occurrenceModel = occurrences[0];

    const mainView = new MainView({ model: occurrenceModel });
    radio.trigger('app:main', mainView);

    // if exit on selection click
    mainView.on('save', value => {
      const abundance = occurrenceModel.get('abundance');

      API.save(value, occurrenceModel, () => {
        // editing existing sample
        if (abundance) {
          window.history.back();
          return;
        }
        // todo: skipping habitat makes two back clicks
        radio.trigger('samples:taxa:search', sample.cid, { replace: true });
      });
    });

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({ title: 'Cover' }),
    });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  /**
   * Update sample with new values
   * @param values
   * @param sample
   */
  save(value, occurrenceModel, callback) {
    occurrenceModel.set('abundance', value);

    // save it
    occurrenceModel
      .save()
      .then(callback)
      .catch(err => {
        Log(err, 'e');
        radio.trigger('app:dialog:error', err);
      });
  },
};

export { API as default };
