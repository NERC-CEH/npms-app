/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import DateHelp from 'date';

const rangeValues = {
  '< 1% (1-2 indivs)': 3648,
  '< 1% (several indivs)': 3649,
  '1-4%': 3650,
  '5-10%': 3651,
  '11-25%': 3652,
  '26-33%': 3653,
  '34-50%': 3654,
  '51-75%': 3655,
  '76-90%': 3656,
  '91-100%': 3657,
};

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
    },
    sample: {
      survey: {
        id: 'survey_id',
        values: {
          indicator: 195,
          inventory: 196,
          wildflower: 197,
        },
      },
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

      habitat: { id: 461 },
      identifiers: { id: 465 },


      management: {
        id: 473,
        values: {
          'Arable cropping': 3658,
          'Burning': 3659,
          'Coppicing': 3660,
          'Cutting / mowing': 3661,
          'Ditch-clearance': 3662,
          'Fenced to exclude grazing': 3663,
          'Fertilised to improve soil fertility': 3664,
          'Grazing - livestock': 3665,
          'Grazing - rabbits / deer': 3666,
          'Hedge-laying': 3667,
          'Herbicides to control weeds': 3668,
          'Path, track or road works': 3669,
          'Quarrying': 3670,
          'Scrub clearance / tree felling': 3671,
          'Silage production (i.e. black bags)': 3672,
          'Tree planting': 3673,
          'Water regime regulation': 3674,
          'Other': 3675,
        },
      },
      'management other': { id: 472 },
      grazing: {
        id: 462,
        values: {
          low: 1982,
          moderate: 1983,
          high: 1984,
        },
      },
      'grazing other': { id: 471 },
      wooded: {
        id: 463,
        values: {
          'Woodland canopy':  1985,
          'Scattered trees or shrubs': 1986,
          'Hedgerow': 1987,
          'No trees or shrubs': 1988,
        },
      },
      'veg 10': { id: 466 },
      'veg 11-30': { id: 467 },
      'veg 31-100': { id: 468 },
      'veg 101-300': { id: 469 },
      'veg 300': { id: 470 },

      soil: { id: 475, values: rangeValues },
      gravel: { id: 477, values: rangeValues },
      litter: { id: 476, values: rangeValues },
      lichens: { id: 478, values: rangeValues },

      plot: { id: 479 },
    },
    occurrence: {
      abundance: { id: 263 }, //1-10
    },
  },
};

