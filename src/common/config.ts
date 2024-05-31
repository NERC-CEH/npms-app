/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import {
  Filesystem,
  Directory as FilesystemDirectory,
} from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react';

const indiciaUrl =
  process.env.APP_BACKEND_INDICIA_URL || 'https://warehouse1.indicia.org.uk';

const config = {
  dataPath: '',

  environment: process.env.NODE_ENV as string,
  version: process.env.APP_VERSION as string,
  build: process.env.APP_BUILD as string,

  sentryDNS: process.env.APP_SENTRY_KEY as string,

  backend: {
    npmsUrl: 'https://www.npms.org.uk',
    ppUrl: 'https://plantportal.ceh.ac.uk',
    clientId: process.env.APP_BACKEND_CLIENT_ID as string,
    clientPass: process.env.APP_BACKEND_CLIENT_PASS as string,

    mediaUrl: `${indiciaUrl}/upload/`,

    indicia: {
      url: indiciaUrl,
    },
  },
};

(async function getMediaDirectory() {
  if (isPlatform('hybrid')) {
    const { uri } = await Filesystem.getUri({
      path: '',
      directory: FilesystemDirectory.Data,
    });
    config.dataPath = uri;
  }
})();

export default config;
