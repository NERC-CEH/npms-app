/** ****************************************************************************
 * Sample Taxa List header view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'samples-header',
  tagName: 'nav',
  template: JST['samples/taxa/list/header'],

  events: {
    'click a[data-rel="back"]': 'navigateBack',
  },

  navigateBack() {
    window.history.back();
  },

  serializeData() {
    const sample = this.model.get('sample');

    return {
      id: sample.id || sample.cid,
    };
  },
});

