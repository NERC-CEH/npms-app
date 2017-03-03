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
      id: sample.cid,
      management: sample.get('management'),
      grazing: sample.get('grazing'),
      wooded: sample.get('wooded'),
      vegetation: sample.get('vegetation'),
      comment: sample.get('comment'),
      soil: sample.get('soil'),
      gravel: sample.get('gravel'),
      litter: sample.get('litter'),
      lichens: sample.get('lichens'),
    };
  },
});
