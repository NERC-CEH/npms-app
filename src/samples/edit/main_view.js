/** ****************************************************************************
 * Sample Edit main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';
import DateHelp from 'helpers/date';

import './styles.scss';

export default Marionette.View.extend({
  template: JST['samples/edit/main'],

  initialize() {
    const sample = this.model.get('sample');
    this.listenTo(sample, 'request sync error', this.render);
  },

  serializeData() {
    const sample = this.model.get('sample');
    const level = sample.get('level');
    const taxa = sample.occurrences.length;
    const identifiers = sample.get('identifiers');
    const location = sample.get('location') || {};
    const square = location.square;
    const plot = location.plot;

    const habitat = sample.get('habitat') || {};
    return {
      id: sample.id || sample.cid,
      level,
      training: sample.metadata.training,
      square,
      plot,
      taxa,
      date: DateHelp.print(sample.get('date')),
      habitat: habitat.broad,
      'fine-habitat': habitat.fine,
      identifiers,
    };
  },
});
