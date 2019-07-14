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
    // eslint-disable-next-line
    'change input[type=radio]': function(e) {
      const value = $(e.target).val();
      this.trigger('save', value);
    },
  },
});
