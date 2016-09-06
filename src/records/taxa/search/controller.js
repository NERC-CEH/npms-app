/** ****************************************************************************
 * Taxon controller.
 *****************************************************************************/
import Backbone from 'backbone';
import Morel from 'morel';
import App from '../../../app';
import Log from 'log';
import appModel from '../../../common/models/app_model';
import userModel from '../../../common/models/user_model';
import recordManager from '../../../common/record_manager';
import Sample from '../../../common/models/sample';
import Occurrence from '../../../common/models/occurrence';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import SpeciesSearchEngine from './search/taxon_search_engine';

const API = {
  show(recordID) {
    SpeciesSearchEngine.init();

    this.id = recordID;

    const mainView = new MainView({ model: userModel });
    API._showMainView(mainView, this);

    // should be done in the view
    App.regions.main.$el.find('#taxon').select();


    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Species',
      }),
    });
    App.regions.header.show(headerView);

    // FOOTER
    App.regions.footer.hide().empty();
  },

  _showMainView(mainView, that) {
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
      SpeciesSearchEngine.search(searchPhrase, (selection) => {
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
