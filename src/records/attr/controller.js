/** ****************************************************************************
 * Record Attribute controller.
 *****************************************************************************/
import Backbone from 'backbone';
import Morel from 'morel';
import { Log } from 'helpers';
import App from 'app';
import recordManager from '../../common/record_manager';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show(recordID, attr) {
    Log('Records:Attr:Controller: showing');
    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        Log(err, 'e');
      }

      // Not found
      if (!recordModel) {
        Log('No record model found.', 'e');
        App.trigger('404:show', { replace: true });
        return;
      }

      // can't edit a saved one - to be removed when record update
      // is possible on the server
      if (recordModel.getSyncStatus() === Morel.SYNCED) {
        App.trigger('records:show', recordID, { replace: true });
        return;
      }

      // MAIN
      const mainView = new MainView({
        attr,
        model: recordModel,
      });
      App.regions.main.show(mainView);

      // HEADER
      const headerView = new HeaderView({
        onExit() {
          API.onExit(mainView, recordModel, attr, () => {
            window.history.back();
          });
        },
        model: new Backbone.Model({ title: attr }),
      });

      App.regions.header.show(headerView);

      // if exit on selection click
      mainView.on('save', () => {
        const habitat = recordModel.get('habitat') || {};

        API.onExit(mainView, recordModel, attr, () => {
          // editing existing record
          if (attr === 'habitat' && habitat.broad) {
            window.history.back();
            return;
          }
          // todo: skipping habitat makes two back clicks
          App.trigger('records:edit', recordModel.cid, { replace: true });
        });
      });

      // FOOTER
      App.regions.footer.hide().empty();
    });
  },


  onExit(mainView, recordModel, attr, callback) {
    Log('Records:Attr:Controller: exiting');
    const values = mainView.getValues();
    // todo: remove the record if the habitat is empty
    API.save(attr, values, recordModel, callback);
  },

  /**
   * Update record with new values
   * @param values
   * @param recordModel
   */
  save(attr, values, recordModel, callback) {
    let currentVal;
    let newVal;
    const occ = recordModel.occurrences.at(0);

    switch (attr) {
      case 'date':
        currentVal = recordModel.get('date');

        // validate before setting up
        if (values.date && values.date.toString() !== 'Invalid Date') {
          newVal = values.date;
          recordModel.set('date', newVal);
        }
        break;
      case 'habitat':
        // todo:validate before setting up
        const habitat = recordModel.get('habitat') || {};
        habitat.broad = values.habitat;
        delete habitat.fine;
        recordModel.set('habitat', habitat);
        break;
      case 'fine-habitat':
        // todo:validate before setting up
        const oldhabitat = recordModel.get('habitat') || {};
        oldhabitat.fine = values['fine-habitat'];
        recordModel.set('habitat', oldhabitat);
        break;
      case 'identifiers':
        currentVal = recordModel.get('identifiers');

        // todo:validate before setting up
        // don't save default values
        newVal = values.identifiers;
        recordModel.set('identifiers', newVal);
        break;
      case 'comment':
        currentVal = occ.get('comment');

        // todo:validate before setting up
        newVal = values.comment;
        recordModel.set('comment', newVal);
        break;
      default:
    }

    // save it
    recordModel.save(null, {
      success: callback,
      error: (err) => {
        Log(err, 'e');
        App.regions.dialog.error(err);
      },
    });
  },
};

export { API as default };
