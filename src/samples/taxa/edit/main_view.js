/** ****************************************************************************
 * Sample Taxa Edit main view.
 **************************************************************************** */
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  tagName: 'div',
  template: JST['samples/taxa/edit/abundance'],

  events: {
    'change input[type=radio]': function(e) {
      // eslint-disable-line
      // eslint-disable-line
      const value = $(e.target).val();
      this.trigger('save', value);
    },
  },
});
