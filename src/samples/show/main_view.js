/** ****************************************************************************
 * Sample Show main view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import JST from 'JST';
import CONFIG from 'config';
import DateHelp from 'helpers/date';
import Gallery from '../../common/gallery';
import './styles.scss';

export default Marionette.View.extend({
  template: JST['samples/show/main'],

  events: {
    'click img': 'photoView',
  },

  triggers: {
    'click button': 'survey',
  },

  photoView(e) {
    e.preventDefault();

    const items = [];
    const sample = this.model.get('sample');
    sample.media.each(image => {
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
    const sample = this.model.get('sample');
    const occ = sample.occurrences;
    const identifiers = sample.get('identifiers');

    const location = sample.get('location');
    const gridref = location.gridref;
    const plot = location.plot;

    const habitat = sample.get('habitat') || {};

    const editUrl = `${CONFIG.site_url}${
      sample.metadata.input_form
    }?sample_id=${sample.id}`;

    return {
      id: sample.cid,
      show_survey2: !sample.get('survey_1'), // show if empty
      taxa: occ.length,
      site_url: CONFIG.site_url,
      editUrl,
      gridref,
      plot,
      habitat: habitat.broad,
      'fine-habitat': habitat.fine,
      date: DateHelp.print(sample.get('date')),
      identifiers,
      images: sample.images || {},
    };
  },
});
