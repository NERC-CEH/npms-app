/** ***************************************************************************
 * Records Location Controller
 *****************************************************************************/

import Backbone from 'backbone';
import App from 'app';
import { Log, Analytics } from 'helpers';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';
import RefreshView from './refresh_view';
import userModel from '../../common/models/user_model';
import recordManager from '../../common/record_manager';

const API = {
  show(recordID) {
    Log('Records:Location:Controller: showing');

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


      // HEADER
      const refreshView = new RefreshView();
      refreshView.on('refreshClick', () => {
        Log('Records:Location:Controller: refresh clicked');
        API.refresh();
      });

      const headerView = new HeaderView({
        rightPanel: refreshView,
        model: new Backbone.Model({
          title: 'Location',
        }),
      });
      App.regions.header.show(headerView);

      // MAIN
      const mainView = new MainView({
        model: userModel,
      });

      mainView.on('select', (plotID) => {
        API.selectPlot(recordModel, plotID);
      });

      App.regions.main.show(mainView);

      // FOOTER
      App.regions.footer.hide();
    });
  },

  selectPlot(recordModel, plotID) {
    const { selectedSquare, selectedPlot } = API._findSquareAndPlot(plotID);

    if (!selectedPlot || !selectedSquare) {
      Log('Records:Location:Controller: no such selected plot ID', 'e');
      return;
    }

    recordModel.set('location_type', 'british'); // todo detect
    const location =  {
      id: plotID,
      plot: selectedPlot.sref,
      square: selectedSquare.sref,
    };
    recordModel.set('location', location).save();
    window.history.back();
  },

  refresh() {
    userModel.syncSquares(true);
    Analytics.trackEvent('Statistics', 'refresh');
  },

  _findSquareAndPlot(plotID) {
    const squares = userModel.get('squares');

    let selectedSquare;
    let selectedPlot;


    Object.keys(squares.data).forEach((squareKey) => {
      const square = squares.data[squareKey];

      Object.keys(square.plots).forEach((plotKey) => {
        if (parseInt(plotKey) === plotID) {
          selectedPlot = square.plots[plotKey];
          selectedSquare = square;
        }
      });
    });

    return { selectedSquare, selectedPlot };
  },
};

export default API;
