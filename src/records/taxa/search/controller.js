/** ****************************************************************************
 * Taxon controller.
 *****************************************************************************/
import Backbone from 'backbone';
import App from '../../../app';
import Log from 'log';
import userModel from '../../../common/models/user_model';
import recordManager from '../../../common/record_manager';
import Occurrence from '../../../common/models/occurrence';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import SpeciesSearchEngine from './search/taxon_search_engine';

const API = {
  show(recordID) {
    this.id = recordID;

    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        Log(err, 'e');
      }

      // Not found
      if (!recordModel) {
        Log('No record model found', 'e');
        App.trigger('404:show', {replace: true});
        return;
      }

      const level = recordModel.get('level');
      SpeciesSearchEngine.init(level);

      const mainView = new MainView({model: userModel});
      API._showMainView(mainView, this, level);

      // should be done in the view
      App.regions.main.$el.find('#taxon').select();
    });

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Species',
      }),
    });
    App.regions.header.show(headerView);

    // FOOTER
    App.regions.footer.hide().empty();
  },

  _showMainView(mainView, that, level) {
    const sampleID = that.id;
    mainView.on('taxon:selected', (taxon, edit) => {
      API.addTaxon(sampleID, taxon, (err, occurrence) => {
        if (err) {
          Log(err, 'e');
          App.regions.dialog.error(err);
          return;
        }

        App.trigger('records:taxa:edit', sampleID, occurrence.cid, { replace: true });
      });
    }, that);

    mainView.on('taxon:searched', (searchPhrase) => {
      SpeciesSearchEngine.search(level, searchPhrase, (selection) => {
        mainView.updateSuggestions(new Backbone.Collection(selection), searchPhrase);
      });
    });

    App.regions.main.show(mainView);
  },

  addTaxon(sampleID, taxon, callback) {
    recordManager.get(sampleID, (getError, recordModel) => {
      if (getError) {
        callback(getError);
        return;
      }

      // create new sighting
      const occurrence = new Occurrence({
        taxon,
      });

      recordModel.addOccurrence(occurrence);

      recordModel.save(null, {
        success: () => {
          callback(null, occurrence);
        },
        error: (saveError) => {
          callback(saveError);
        },
      });
    });
  },
};

export { API as default };
