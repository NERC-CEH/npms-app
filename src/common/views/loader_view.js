/** ****************************************************************************
 * Loader view with a spinner for async and other components.
 *****************************************************************************/
import Marionette from 'marionette';
import '../styles/loading.scss';

export default Marionette.ItemView.extend({
  tagName: 'span',
  className: 'icon icon-plus icon-spin centered color-positive',
  template: false,
});

