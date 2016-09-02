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
  template: JST['records/edit_extra/main'],

  serializeData() {
    const recordModel = this.model.get('recordModel');

    return {
      management,
      grazing,
      wooded,
      vegetation,
      comment,
      soil,
      gravel,
      litter,
      lichens,
    };
  },
});
