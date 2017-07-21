/** ****************************************************************************
 * Taxon controller.
 *****************************************************************************/
import Backbone from 'backbone';
import App from 'app';
import radio from 'radio';
import Log from 'helpers/log';
import savedSamples from 'saved_samples';
import userModel from '../../../common/models/user_model';
import Occurrence from '../../../common/models/occurrence';
import MainView from './main_view';
import HeaderView from '../../../common/views/header_view';
import SpeciesSearchEngine from './search/taxon_search_engine';

const API = {
  show(sampleID) {
    this.id = sampleID;

    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID]);
      });
      return;
    }

    Log('Samples:Taxa:List:Search: showing');

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    const level = sample.get('level');
    SpeciesSearchEngine.init(level);

    const mainView = new MainView({ model: userModel });
    API._showMainView(mainView, this, level);

    // should be done in the view
    App.regions.getRegion('main').$el.find('#taxon').select();

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Species',
      }),
    });
    radio.trigger('app:header', headerView);

// FOOTER
    radio.trigger('app:footer:hide');
  },

  _showMainView(mainView, that, level) {
    const sampleID = that.id;

    let existingSelection; // cache selection
    let occurrences;

    mainView.on('taxon:selected', (taxon) => {
      API.addTaxon(sampleID, taxon)
        .then(occurrence =>
          radio.trigger('samples:taxa:edit', sampleID, occurrence.cid, { replace: true })
        )
        .catch((err) => {
          Log(err, 'e');
          radio.trigger('app:dialog:err', err);
          return;
        });
    }, that);

    mainView.on('taxon:searched', (searchPhrase) => {
      SpeciesSearchEngine.search(level, searchPhrase, (selection) => {
        // remove already selected ones
        const uniqueSelection = [];

        if (!occurrences || !existingSelection) {
          existingSelection = [];
          occurrences = savedSamples.get(sampleID).occurrences;
          occurrences.each((occ) => {
            existingSelection.push(occ.get('taxon').warehouse_id);
          });
        }

        selection.forEach((taxa) => {
          if (existingSelection.indexOf(taxa.warehouse_id) === -1) {
            uniqueSelection.push(taxa);
          }
        });
        mainView.updateSuggestions(new Backbone.Collection(uniqueSelection), searchPhrase);
      });
    });

    radio.trigger('app:main', mainView);
  },

  addTaxon(sampleID, taxon) {
    const sample = savedSamples.get(sampleID);

    // create new sighting
    const occurrence = new Occurrence({
      taxon,
    });

    sample.addOccurrence(occurrence);
    return sample.save().then(() => occurrence);
  },
};

export { API as default };
