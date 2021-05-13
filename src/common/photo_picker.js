import radio from 'radio';
import Log from 'helpers/log';
import ImageHelp from 'helpers/image';
import ImageModel from './models/image';

const API = {
  photoUpload(model, photo) {
    Log('Common:PhotoPicker: photo uploaded.');

    // show loader
    API.addPhoto(model, photo).catch(err => {
      Log(err, 'e');
      radio.trigger('app:dialog:error', err);
    });
  },

  photoDelete(photo) {
    radio.trigger('app:dialog', {
      title: 'Delete',
      body:
        'Are you sure you want to remove this photo from the record?' +
        '</br><i><b>Note:</b> it will remain in the gallery.</i>',
      buttons: [
        {
          title: 'Cancel',
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: 'Delete',
          class: 'btn-negative',
          onClick() {
            // show loader
            photo.destroy({
              success: () => {
                Log('Common:PhotoPicker: photo deleted.');

                // hide loader
              },
            });
            radio.trigger('app:dialog:hide');
          },
        },
      ],
    });
  },

  photoSelect(model) {
    return new Promise(resolve => {
      Log('Common:PhotoPicker: photo selection.');
      radio.trigger('app:dialog', {
        title: 'Choose a method to upload a photo',
        buttons: [
          {
            title: 'Camera',
            onClick() {
              ImageHelp.getImage(entry => {
                API.addPhoto(model, entry.nativeURL, occErr => {
                  if (occErr) {
                    radio.trigger('app:dialog:error', occErr);
                  }
                  resolve();
                }).then(resolve);
              });
              radio.trigger('app:dialog:hide');
            },
          },
          {
            title: 'Gallery',
            onClick() {
              ImageHelp.getImage(
                entry => {
                  API.addPhoto(model, entry.nativeURL, occErr => {
                    if (occErr) {
                      radio.trigger('app:dialog:error', occErr);
                    }
                  }).then(resolve);
                },
                {
                  sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
                  saveToPhotoAlbum: false,
                }
              );
              radio.trigger('app:dialog:hide');
            },
          },
        ],
      });
    });
  },

  /**
   * Adds a new image to model.
   */
  addPhoto(model, photo) {
    return ImageHelp.getImageModel(ImageModel, photo).then(image => {
      model.addMedia(image);
      return model.save();
    });
  },
};

export default API;
