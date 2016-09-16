/** ****************************************************************************
 * Record Show main view.
 *****************************************************************************/
import './styles.scss';

import Marionette from 'marionette';
import JST from 'JST';
import { DateHelp } from 'helpers';
import Gallery from '../../common/gallery';

export default Marionette.ItemView.extend({
  template: JST['records/show/main'],

  events: {
    'click img': 'photoView',
  },

  photoView(e) {
    e.preventDefault();

    const items = [];
    const recordModel = this.model.get('recordModel');
    recordModel.occurrences.at(0).images.each((image, index) => {
      items.push({
        src: image.getURL(),
        w: image.get('width') || 800,
        h: image.get('height') || 800,
      });
    });

// Initializes and opens PhotoSwipe
    const gallery = new Gallery(items);
    gallery.init();
  },

  serializeData() {
    const recordModel = this.model.get('recordModel');
    const occ = recordModel.occurrences;
    const identifiers = recordModel.get('identifiers');

    const location = recordModel.get('location');
    const gridref = location.gridref;
    const plot = location.plot;

    return {
      id: recordModel.cid,
      taxa: occ.length,
      gridref,
      plot,
      date: DateHelp.print(recordModel.get('date')),
      identifiers,
      images: recordModel.images || {},
    };
  },
});

