/** ***************************************************************************
 * Samples Location Controller
 **************************************************************************** */

import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';
import RefreshView from './refresh_view';
import userModel from '../../common/models/user_model';

const API = {
  show(sampleID) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once('fetching:done', () => {
        API.show.apply(that, [sampleID]);
      });
      return;
    }

    Log('Samples:Location:Controller: showing');

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log('No sample model found.', 'e');
      radio.trigger('app:404:show', { replace: true });
      return;
    }

    // HEADER
    const refreshView = new RefreshView();
    refreshView.on('refreshClick', () => {
      Log('Samples:Location:Controller: refresh clicked');
      API.refresh();
    });

    const headerView = new HeaderView({
      rightPanel: refreshView,
      model: new Backbone.Model({
        title: 'Location',
      }),
    });
    radio.trigger('app:header', headerView);

    // MAIN
    const mainView = new MainView({
      model: userModel,
    });

    mainView.on('select', plotID => {
      API.selectPlot(sample, plotID);
    });

    radio.trigger('app:main', mainView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  selectPlot(sample, plotID) {
    const { selectedSquare, selectedPlot } = API._findSquareAndPlot(plotID);

    if (!selectedPlot || !selectedSquare) {
      Log('Samples:Location:Controller: no such selected plot ID', 'e');
      return;
    }

    sample.set('location_type', 'british'); // todo detect
    const location = {
      id: plotID,
      plot: selectedPlot.sref,
      square: selectedSquare.sref,
    };
    sample.set('location', location).save();
    window.history.back();
  },

  refresh() {
    userModel.syncSquares(true).catch(err => {
      radio.trigger('app:dialog:error', err);
    });
    Analytics.trackEvent('Statistics', 'refresh');
  },

  _findSquareAndPlot(plotID) {
    const squares = userModel.get('squares');

    let selectedSquare;
    let selectedPlot;

    Object.keys(squares.data).forEach(squareKey => {
      const square = squares.data[squareKey];

      Object.keys(square.plots).forEach(plotKey => {
        if (parseInt(plotKey, 10) === plotID) {
          selectedPlot = square.plots[plotKey];
          selectedSquare = square;
        }
      });
    });

    return { selectedSquare, selectedPlot };
  },
};

export default API;
