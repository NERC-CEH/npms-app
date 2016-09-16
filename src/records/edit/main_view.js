/** ****************************************************************************
 * Record Edit main view.
 *****************************************************************************/

import Marionette from 'marionette';
import JST from 'JST';
import { DateHelp } from 'helpers';

import './styles.scss';

export default Marionette.ItemView.extend({
  template: JST['records/edit/main'],

  serializeData() {
    const recordModel = this.model.get('recordModel');
    const taxa = recordModel.occurrences.length;
    const identifiers = recordModel.get('identifiers');
    const location = recordModel.get('location') || {};
    const square = location.square;
    const plot = location.plot;

    return {
      id: recordModel.id || recordModel.cid,
      square,
      plot,
      taxa,
      date: DateHelp.print(recordModel.get('date')),
      habitat: recordModel.get('habitat'),
      'fine-habitat': recordModel.get('fine-habitat'),
      identifiers,
    };
  },
});
