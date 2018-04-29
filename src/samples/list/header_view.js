/** ****************************************************************************
 * Sample List header view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'samples-header',
  tagName: 'nav',
  template: JST['samples/list/header'],

  events: {
    'change input': 'photoUpload',
  },

  triggers: {
    'click button#add-survey': 'survey',
  },

  photoUpload(e) {
    this.trigger('photo:upload', e);
  },

  onAttach() {
    const that = this;

    // create camera/gallery selection
    if (window.cordova) {
      this.$el.find('.img-picker input').remove();

      this.$el.find('.img-picker').on('click', () => {
        that.trigger('photo:selection');
      });
    }
  },
});
