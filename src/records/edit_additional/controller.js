/** ****************************************************************************
 * Record Edit controller.
 *****************************************************************************/
import Backbone from 'backbone';
import { Log } from 'helpers';
import App from 'app';
import appModel from '../../common/models/app_model';
import recordManager from '../../common/record_manager';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show(recordID) {
    Log('Records:Edit:Controller: showing');

    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        Log(err, 'e');
      }

      // MAIN
      const mainView = new MainView({
        model: new Backbone.Model({ recordModel, appModel }),
      });
      App.regions.getRegion('main').show(mainView);

      // HEADER
      const headerView = new HeaderView({
        model: new Backbone.Model({
          title: 'Additional',
        }),
      });
      App.regions.getRegion('header').show(headerView);

      // FOOTER
      App.regions.getRegion('footer').hide().empty();
    });
  },
};

export { API as default };
