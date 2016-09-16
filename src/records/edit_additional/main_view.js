/** ****************************************************************************
 * Record Edit main view.
 *****************************************************************************/
import Marionette from 'marionette';
import JST from 'JST';

export default Marionette.ItemView.extend({
  template: JST['records/edit_additional/main'],

  serializeData() {
    const recordModel = this.model.get('recordModel');

    return {
      // management,
      // grazing,
      // wooded,
      // vegetation,
      // comment,
      // soil,
      // gravel,
      // litter,
      // lichens,
    };
  },
});
