import { Capacitor } from '@capacitor/core';
import {
  Filesystem,
  Directory as FilesystemDirectory,
} from '@capacitor/filesystem';
import { Media as MediaOriginal } from '@flumens';
import { isPlatform } from '@ionic/react';
import CONFIG from 'common/config';
import Occurrence from './occurrence';
import Sample from './sample';

export type URL = string;

export default class Media extends MediaOriginal {
  declare parent?: Sample | Occurrence;

  async destroy(silent?: boolean) {
    console.log('MediaModel: destroying.');

    // remove from internal storage
    if (!isPlatform('hybrid')) {
      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
    }

    const URL = this.attrs.data;

    try {
      if (this.attrs.path) {
        // backwards compatible - don't delete old media
        await Filesystem.deleteFile({
          path: URL,
          directory: FilesystemDirectory.Data,
        });
      }

      if (!this.parent) return;

      this.parent.media.remove(this);

      if (silent) return;

      this.parent.save();
    } catch (err) {
      console.error(err);
    }
  }

  validateRemote() {
    return null;
  }

  getURL() {
    const { data: name, path } = this.attrs;

    if (!isPlatform('hybrid') || process.env.NODE_ENV === 'test') {
      return name;
    }

    const isURL = name.startsWith('https://');
    if (isURL) return name;

    let pathToFile = CONFIG.dataPath;

    // backwards compatible
    if (!path) {
      pathToFile = CONFIG.dataPath.replace('/Documents/', '/Library/NoCloud/');
    }

    return Capacitor.convertFileSrc(`${pathToFile}/${name}`);
  }
}
