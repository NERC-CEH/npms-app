/** ****************************************************************************
 * Record Taxa Edit controller.
 *****************************************************************************/

import App from '../../../app';
import Log from 'log';
import appModel from '../../../common/models/app_model';
import recordManager from '../../../common/record_manager';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import LoaderView from '../../../common/views/loader_view';


const API = {
  show() {
    const loaderView = new LoaderView();
    App.regions.main.show(loaderView);

    recordManager.getAll((getError, recordsCollection) => {
      Log('Records:List:Controller: showing');
      if (getError) {
        Log(getError, 'e');
        App.regions.dialog.error(getError);
        return;
      }

      // MAIN
      const mainView = new MainView({
        collection: recordsCollection,
        appModel,
      });


      App.regions.main.show(mainView);

    });

    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on('survey', (e) => {
      API.addSurvey();
    });

    App.regions.header.show(headerView);

    // FOOTER
    App.regions.footer.hide().empty();
  },
};

export { API as default };
