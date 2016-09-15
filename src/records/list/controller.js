/** ****************************************************************************
 * Record List controller.
 *****************************************************************************/
import $ from 'jquery';
import Morel from 'morel';
import Marionette from 'marionette';
import App from '../../app';
import Log from 'log';
import ImageHelp from 'image';
import Analytics from 'analytics';
import appModel from '../../common/models/app_model';
import recordManager from '../../common/record_manager';
import Sample from '../../common/models/sample';
import MainView from './main_view';
import HeaderView from './header_view';
import LoaderView from '../../common/views/loader_view';
import LocHelp from 'location';
import JST from 'JST';


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

      mainView.on('childview:record:edit:attr', (childView, attr) => {
        App.trigger('records:edit:attr', childView.model.id || childView.model.cid, attr);
      });

      mainView.on('childview:record:delete', (childView) => {
        const recordModel = childView.model;
        API.recordDelete(recordModel);
      });

      mainView.on('survey', (e) => {
        API.addSurvey();
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

  recordDelete(recordModel) {
    Log('Records:List:Controller: deleting record');

    const syncStatus = recordModel.getSyncStatus();
    let body = 'This record hasn\'t been saved to NPMS yet, ' +
      'are you sure you want to remove it from your device?';

    if (syncStatus === Morel.SYNCED) {
      body = 'Are you sure you want to remove this record from your device?';
      body += '</br><i><b>Note:</b> it will remain on the server.</i>';
    }
    App.regions.dialog.show({
      title: 'Delete',
      body,
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            App.regions.dialog.hide();
          },
        },
        {
          title: 'Delete',
          class: 'btn-negative',
          onClick() {
            recordModel.destroy();
            App.regions.dialog.hide();
            Analytics.trackEvent('List', 'record remove');
          },
        },
      ],
    });
  },

  addSurvey() {
    Log('Records:List:Controller: adding survey');
    const View = Marionette.ItemView.extend({
      template: JST['records/list/levels'],
      events: {
        'click input[type="radio"]': function () {
          // find the option
          let option;
          const $inputs = this.$el.find('input');
          $inputs.each((int, elem) => {
            if ($(elem).prop('checked')) {
              option = $(elem).val();
            }
          });

          // create new sample
          API.createNewRecord(option, (err, sample) => {
            if (err) {
              App.regions.dialog.error(err);
              return;
            }
            App.regions.dialog.hide();

            // open sample page
            App.trigger('records:edit:attr', sample.cid, 'habitat');
          });
        },
      },
    });

    const body = new View();

    App.regions.dialog.show({
      title: 'Survey level',
      body,
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            App.regions.dialog.hide();
          },
        },
      ],
    });
  },

  /**
   * Creates a new record with an image passed as an argument.
   */
  createNewRecord(level, callback) {
    const sample = new Sample();
    sample.set('level', level);

    recordManager.set(sample, (saveErr) => {
      if (saveErr) {
        callback(saveErr);
        return;
      }
      callback(null, sample);
    });
  },
};

export { API as default };
