/** ****************************************************************************
 * Sample Edit main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  template: JST['samples/edit_additional/main'],

  serializeData() {
    const sample = this.model.get('sample');

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
