/** ****************************************************************************
 * Sample Taxa List controller.
 *****************************************************************************/
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import savedSamples from 'saved_samples';
import appModel from '../../../common/models/app_model';
import PhotoPicker from '../../../common/photo_picker';
import MainView from './main_view';
import HeaderView from './header_view';

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

    Log('Samples:Taxa:List:Controller: showing');

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // MAIN
    const mainView = new MainView({
      sampleID: sample.id || sample.cid,
      sample,
      collection: sample.occurrences,
      appModel,
    });

    mainView.on('childview:species:delete', API.delete);

    mainView.on('childview:photo:upload', (e, model) => {
      const photo = e.target.files[0];
      PhotoPicker.photoUpload(model, photo);
    });

    mainView.on('childview:photo:delete', (model) => {
      PhotoPicker.photoDelete(model);
    });

    // android gallery/camera selection
    mainView.on('childview:photo:selection', (model) => {
      PhotoPicker.photoSelect(model);
    });

    radio.trigger('app:main', mainView);

    // HEADER
    const model = new Backbone.Model({ appModel, sample });
    const headerView = new HeaderView({ model });
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  delete(childView) {
    Log('Samples:Taxa:List:Controller: deleting occurrence.');

    const occurrence = childView.model;
    occurrence.destroy();
  },
};

export { API as default };
