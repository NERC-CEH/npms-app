/** ***************************************************************************
 * Samples Location Mainview.
 **************************************************************************** */

import $ from 'jquery';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import LoaderView from '../../common/views/loader_view';

const View = Marionette.View.extend({
  id: 'sample-locations',
  template: JST['samples/location/main'],

  events: {
    // eslint-disable-next-line
    'click li': function(e) {
      const elem = $(e.target);
      const plotID = parseInt(elem.data('id'), 10);
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
      squares: this.model.get('squares').data || {},
    };
  },
});

export default View;
