/** ****************************************************************************
 * Record Edit main view.
 *****************************************************************************/
import './styles.scss';

import Marionette from 'marionette';
import Morel from 'morel';
import JST from 'JST';
import DateHelp from 'date';
import StringHelp from 'string';

export default Marionette.ItemView.extend({
  template: JST['records/edit/main'],

  serializeData() {
    const recordModel = this.model.get('recordModel');
    const taxa = recordModel.occurrences.length;
    const identifiers = recordModel.get('identifiers');
    const location = recordModel.get('location');
    const gridref = location.gridref;
    const plot = location.plot;

    return {
      id: recordModel.id || recordModel.cid,
      gridref,
      plot,
      taxa,
      date: DateHelp.print(recordModel.get('date')),
      habitat: recordModel.get('habitat'),
      'fine-habitat': recordModel.get('fine-habitat'),
      identifiers,
    };
  },
});
