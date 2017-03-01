/** ****************************************************************************
 * Sample Edit controller.
 *****************************************************************************/
import Backbone from 'backbone';
import Log from 'helpers/log';
import App from 'app';
import appModel from '../../common/models/app_model';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show(sampleID) {
    Log('Samples:Edit:Controller: showing');

    savedSamples.get(sampleID, (err, sample) => {
      if (err) {
        Log(err, 'e');
      }

      // MAIN
      const mainView = new MainView({
        model: new Backbone.Model({ sample, appModel }),
      });
      radio.trigger('app:main', mainView);

      // HEADER
      const headerView = new HeaderView({
        model: new Backbone.Model({
          title: 'Additional',
        }),
      });
  radio.trigger('app:header', headerView);

      // FOOTER
      radio.trigger('app:footer:hide'); ;
    });
  },
};

export { API as default };
