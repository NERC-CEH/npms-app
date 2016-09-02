/** ****************************************************************************
 * Record Edit controller.
 *****************************************************************************/
import Backbone from 'backbone';
import _ from 'lodash';
import Device from 'device';
import ImageHelp from 'image';
import Analytics from 'analytics';
import Log from 'log';
import App from '../../app';
import appModel from '../../common/models/app_model';
import userModel from '../../common/models/user_model';
import recordManager from '../../common/record_manager';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

let id;
let record;

const API = {
  show(recordID) {
    Log('Records:Edit:Controller: showing');

    id = recordID;
    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        Log(err, 'e');
      }

      // MAIN
      const mainView = new MainView({
        model: new Backbone.Model({ recordModel, appModel }),
      });
      App.regions.main.show(mainView);

      // HEADER
      const headerView = new HeaderView({
        model: new Backbone.Model({
          title: 'Additional',
        }),
      });
      App.regions.header.show(headerView);

      // FOOTER
      App.regions.footer.hide().empty();
    });
  },
};

export { API as default };
