/** ****************************************************************************
 * Functions to work with media.
 **************************************************************************** */
import Indicia from 'indicia';
import _ from 'lodash';
import Log from './log';
import Analytics from './analytics'; // eslint-disable-line
import Device from './device';

const resetStatusBar = () => {
  // see: https://github.com/apache/cordova-plugin-statusbar/issues/156
  if (Device.isAndroid()) {
    return;
  }

  StatusBar.hide(); // eslint-disable-line
  StatusBar.show(); // eslint-disable-line
};

const Image = {
  deleteInternalStorage(name, callback) {
    function errorHandler(err) {
      Log(err, 'e');
      callback(err);
    }
    window.resolveLocalFileSystemURL(
      cordova.file.dataDirectory,
      fileSystem => {
        const relativePath = name.replace(fileSystem.nativeURL, '');
        fileSystem.getFile(
          relativePath,
          { create: false },
          fileEntry => {
            if (!fileEntry) {
              callback();
              return;
            }

            fileEntry.remove(() => {
              Log('Helpers:Image: removed.');
              callback();
            }, errorHandler);
          },
          errorHandler
        );
      },
      errorHandler
    );
  },

  /**
   *
   * @param callback
   * @param options
   */
  getImage(callback, options = {}) {
    Log('Helpers:Image: getting.');

    const cameraOptions = {
      sourceType: window.Camera.PictureSourceType.CAMERA,
      // allow edit is unpredictable on Android and it should not be used!
      allowEdit: false,
      quality: 40,
      targetWidth: 1000,
      targetHeight: 1000,
      destinationType: window.Camera.DestinationType.FILE_URI,
      encodingType: window.Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };

    _.extend(cameraOptions, options);

    function onError() {
      resetStatusBar();

      const error = Error('Error capturing photo');
      callback(error);
    }

    function fail(error) {
      resetStatusBar();

      callback(error);
    }

    function onSuccess(fileURI) {
      resetStatusBar();

      let URI = fileURI;
      function copyFile(fileEntry) {
        const name = `${Date.now()}.jpeg`;
        window.resolveLocalFileSystemURL(
          cordova.file.dataDirectory,
          fileSystem => {
            // copy to app data directory
            fileEntry.copyTo(fileSystem, name, callback, fail);
          },
          fail
        );
      }

      // for some reason when selecting from Android gallery
      // the prefix is sometimes missing
      if (
        Device.isAndroid() &&
        options.sourceType === window.Camera.PictureSourceType.PHOTOLIBRARY
      ) {
        if (!/file:\/\//.test(URI)) {
          URI = `file://${URI}`;
        }
      }

      window.resolveLocalFileSystemURL(URI, copyFile, fail);
    }

    navigator.camera.getPicture(onSuccess, onError, cameraOptions);
    Analytics.trackEvent('Image', 'get', cameraOptions.sourceType);
  },

  /**
   * Create new record with a photo
   */
  getImageModel(ImageModel, file) {
    if (!file) {
      const err = new Error('File not found while creating image model.');
      return Promise.reject(err);
    }

    // create and add new record
    const success = args => {
      const [data, type, width, height] = args;
      const imageModel = new ImageModel({
        data,
        type,
        width,
        height,
      });

      return imageModel.addThumbnail().then(() => imageModel);
    };

    const isBrowser = !window.cordova && file instanceof File;
    if (isBrowser) {
      return Indicia.Media.getDataURI(file).then(success);
    }

    file = window.Ionic.WebView.convertFileSrc(file); // eslint-disable-line
    return Indicia.Media.getDataURI(file).then(args => {
      // don't resize, only get width and height
      const [, , width, height] = args;
      const fileName = file.split('/').pop();
      return success([fileName, 'jpeg', width, height]);
    });
  },
};

export { Image as default };
