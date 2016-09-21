/** ****************************************************************************
 * Record Taxa Edit main view.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'marionette';
import JST from 'JST';

export default Marionette.View.extend({
  tagName: 'div',
  template: JST['records/taxa/edit/abundance'],

  events: {
    'change input[type=radio]': function (e) {
      const value = $(e.target).val();
      this.trigger('save', value);
    },
  },

});
