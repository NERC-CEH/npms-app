/** ****************************************************************************
 * Record Taxa List header view.
 *****************************************************************************/
import Marionette from 'marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'records-header',
  tagName: 'nav',
  template: JST['records/taxa/list/header'],

  events: {
    'click a[data-rel="back"]': 'navigateBack',
  },

  navigateBack() {
    window.history.back();
  },

  serializeData() {
    const recordModel = this.model.get('recordModel');

    return {
      id: recordModel.id || recordModel.cid,
    };
  },
});

