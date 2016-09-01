/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import LocHelp from 'location';
import DateHelp from 'date';

export default {
  version: '{APP_VER}', // replaced on build
  build: '{APP_BUILD}', // replaced on build
  name: '{APP_NAME}', // replaced on build

  gps_accuracy_limit: 100,

  // logging
  log: {
    states: ['e', 'w', 'i', 'd'], // see log helper
    ga_error: true,
  },

  // google analytics
  ga: {
    status: true,
    ID: 'UA-58378803-7',
  },

  login: {
    url: 'http://192.171.199.230/npms_training/user/mobile/register',
    timeout: 30000,
  },

  report: {
    url: 'http://192.171.199.230/npms_training/mobile/report',
    timeout: 80000,
  },

  // morel configuration
  morel: {
    manager: {
      url: 'http://192.171.199.230/npms_training/mobile/submit',
      appname: 'npms',
      appsecret: 'npmstest',
      website_id: 109,
      survey_id: 474,
    },
    sample: {
     device: {
        id: 273,
        values: {
          iOS: 2398,
          Android: 2399,
        },
      },

      device_version: { id: 759 },

      date: {
        values(date) {
          return DateHelp.print(date);
        },
      },
    },
    occurrence: {    },
  },
};
