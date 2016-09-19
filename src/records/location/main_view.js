/** ***************************************************************************
 * Records Location Mainview.
 *****************************************************************************/

import $ from 'jquery';
import Marionette from 'marionette';
import JST from 'JST';
import LoaderView from '../../common/views/loader_view';

const View = Marionette.ItemView.extend({
  id: 'record-locations',
  template: JST['records/location/main'],

  events: {
    'click li'(e) {
      const elem = $(e.target);
      const plotID = parseInt(elem.data('id'));
      if (plotID) this.trigger('select', plotID);
    },
  },

  initialize() {
    this.listenTo(this.model, 'sync:user:squares:start', this.showLoader, this);
    this.listenTo(this.model, 'sync:user:squares:end', this.hideLoader, this);
  },

  showLoader() {
    if (!this.loaderView) this.loaderView = new LoaderView();
    this.$el.html(this.loaderView.el);
  },

  hideLoader() {
    if (!this.loaderView) return;

    this.loaderView.destroy();
    delete this.loaderView;
    this.render();
  },

  serializeData() {
    return {
      squares: this.model.get('squares').data,
    };
  },
});

export default View;
