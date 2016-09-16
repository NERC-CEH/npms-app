/** ****************************************************************************
 * Record Taxa Edit controller.
 *****************************************************************************/

import Backbone from 'backbone';
import App from 'app';
import { Log } from 'helpers';
import recordManager from '../../../common/record_manager';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import LoaderView from '../../../common/views/loader_view';

const API = {
  show(recordID, occurrenceID) {
    const loaderView = new LoaderView();
    App.regions.main.show(loaderView);

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
      const occurrences = recordModel.occurrences.filter((occurrence) => {
        return occurrence.cid === occurrenceID;
      });

      if (occurrences.length !== 1) {
        Log(`Records:Taxa:Edit:Controller: no occurrence with id (${occurrenceID})`, 'e');
        return;
      }

      const occurrenceModel = occurrences[0];

      const mainView = new MainView({ model: occurrenceModel });
      App.regions.main.show(mainView);

      // if exit on selection click
      mainView.on('save', (value) => {
        const abundance = occurrenceModel.get('abundance');

        API.save(value, occurrenceModel, () => {
          // editing existing record
          if (abundance) {
            window.history.back();
            return;
          }
          // todo: skipping habitat makes two back clicks
          App.trigger('records:taxa:search', recordModel.cid, { replace: true });
        });
      });
    });

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({ title: 'Cover' }),
    });
    App.regions.header.show(headerView);

    // FOOTER
    App.regions.footer.hide().empty();
  },


  /**
   * Update record with new values
   * @param values
   * @param recordModel
   */
  save(value, occurrenceModel, callback) {
    occurrenceModel.set('abundance', value);

    // save it
    occurrenceModel.save(null, {
      success: callback,
      error: (err) => {
        Log(err, 'e');
        App.regions.dialog.error(err);
      },
    });
  },
};

export { API as default };
