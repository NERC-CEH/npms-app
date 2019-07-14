/** ****************************************************************************
 * Sample Edit header view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import radio from 'radio';
import Indicia from 'indicia';
import JST from 'JST';

export default Marionette.View.extend({
  tagName: 'nav',
  template: JST['samples/edit/header'],

  events: {
    'click a[data-rel="back"]': 'navigateBack',
    'click #sample-save-btn': 'showConfirmationDialog'
  },

  showConfirmationDialog() {
    radio.trigger('app:dialog', {
      title: 'Upload',
      body: 'Are you sure you want to upload the survey to the website?',
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            radio.trigger('app:dialog:hide');
          }
        },
        {
          title: 'Upload',
          class: 'btn-positive',
          onClick: () => {
            this.trigger('save');
          }
        }
      ]
    });
  },

  modelEvents: {
    'request sync error': 'render'
  },

  navigateBack() {
    window.history.back();
  },

  serializeData() {
    return {
      isSynchronising: this.model.getSyncStatus() === Indicia.SYNCHRONISING
    };
  }
});
