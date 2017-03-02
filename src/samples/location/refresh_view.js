/** ****************************************************************************
 * Locations list refresh view.
 * Provides button for top right of header.
 *****************************************************************************/
import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
  template: () => '<a id="refresh-btn" class="icon icon-arrows-cw">Refresh</a>',

  // Trigger a refresh even when the button is clicked
  triggers: {
    'click #refresh-btn': 'refreshClick',
  },
});
