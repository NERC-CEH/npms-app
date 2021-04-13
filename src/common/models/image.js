import Indicia from 'indicia';
import ImageHelp from 'helpers/image'; // eslint-disable-line
import Log from 'helpers/log';

function fixPreviousVersions(URL) {
  if (URL.search('file://') >= 0) {
    return URL.split('/').pop();
  }
  return URL;
}

export default Indicia.Media.extend({
  destroy(...args) {
    Log('MediaModel: destroying.');

    // remove from internal storage
    if (window.cordova) {
      const URL = this.getURL();
      ImageHelp.deleteInternalStorage(URL, () => {
        Indicia.Media.prototype.destroy.apply(this, args);
      });
    }

    return Indicia.Media.prototype.destroy.apply(this, args);
  },

  getURL() {
    let URL = this.attributes.data;

    if (!window.cordova || window.testing) {
      return URL;
    }

    URL = cordova.file.dataDirectory + fixPreviousVersions(URL);
    return window.Ionic.WebView.convertFileSrc(URL);
  },
});
