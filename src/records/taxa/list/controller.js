/** ****************************************************************************
 * Record Taxa List controller.
 *****************************************************************************/
import $ from 'jquery';
import App from '../../../app';
import Log from 'log';
import appModel from '../../../common/models/app_model';
import recordManager from '../../../common/record_manager';
import MainView from './main_view';
import HeaderView from './header_view';


const API = {
  show(recordID) {
    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        Log(err, 'e');
      }

      // Not found
      if (!recordModel) {
        Log('No record model found', 'e');
        App.trigger('404:show', { replace: true });
        return;
      }

      // MAIN
      const mainView = new MainView({
        collection: recordModel.occurrences,
        appModel,
      });

      App.regions.main.show(mainView);
    });

    // HEADER
    const headerView = new HeaderView({ model: appModel });
    App.regions.header.show(headerView);

    // FOOTER
    App.regions.footer.hide().empty();
  },

};

export { API as default };
