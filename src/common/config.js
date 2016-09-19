/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import { DateHelp } from 'helpers';

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
  // variables replaced on build
  /* global APP_VERSION, APP_BUILD, APP_NAME, REGISTER_URL,
   REPORT_URL, RECORD_URL, APP_SECRET */
  version: APP_VERSION,
  build: APP_BUILD,
  name: APP_NAME,

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
    url: REGISTER_URL,
    timeout: 30000,
  },

  report: {
    url: REPORT_URL,
    timeout: 80000,
  },

  // morel configuration
  morel: {
    manager: {
      url: RECORD_URL,
      appname: 'npms',
      appsecret: APP_SECRET,
      website_id: 109,
      survey_id: 195,
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

      // todo implement the survey 2
      // survey_1: {
      //   id: 474,
      // },

      location: {
        id: 'location_id',
        values(value, options) {
          // add other location related attributes
          options.flattener({
            'sample:entered_sref': value.plot,
          }, options);

          return value.id;
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

      habitat: {
        id: 481,
        values(value, options) {
        let key = `smpAttr:${this.id}`;
          let habitat = this._values[value.broad].id;

          if (value.fine) {
            // add fine habitat
            key = `${key}:${habitat}`;
            habitat = this._values[value.broad].values[value.fine];
          }

          const attrs = {};
          attrs[key] = habitat;
          options.flattener(attrs, options);
        },
        _values: {
          'Arable margins': {
            id: 3705,
            values: {
              'Arable field margins': 3717,
            },
          },
          'Bog and wet heath': {
            id: 3706,
            values: {
              'Raised bog': 3718,
              'Blanket bog': 3719,
              'Wet heath': 3720,
            },
          },
          'Broadleaved woodland, hedges and scrub': {
            id: 3707,
            values: {
              'Hedgerows of native species': 3721,
              'Wet woodland': 3722,
              'Dry deciduous woodland': 3723,
            },
          },
          Coast: {
            id: 3708,
            values: {
              'Coastal saltmarsh': 3724,
              'Coastal sand dunes': 3725,
              Machair: 3726,
              'Coastal vegetated shingle': 3727,
              'Maritime cliffs and slopes': 3728,
            },
          },
          Freshwater: {
            id: 3709,
            values: {
              'Nutrient-poor lakes and ponds': 3729,
              'Nutrient-rich lakes and ponds': 3730,
              'Rivers and streams': 3731,
            },
          },
          Heathland: {
            id: 3710,
            values: {
              'Dry heathland': 3732,
              'Montane dry heathland': 3733,
            },
          },
          'Lowland grassland': {
            id: 3711,
            values: {
              'Dry calcareous grassland': 3734,
              'Dry acid grassland': 3735,
              'Neutral pastures and meadows': 3736,
              'Neutral damp grassland': 3737,
            },
          },
          'Marsh and fen': {
            id: 3712,
            values: {
              'Acid fens, mires and springs': 738,
              'Base-rich fens, mires and springs': 3739,
            },
          },
          'Upland grassland': {
            id: 3713,
            values: {
              'Montane calcareous grassland': 3740,
              'Montane acid grassland': 3741,
            },
          },
          'Native pinewood and juniper scrub': {
            id: 3714,
            values: {
              'Native conifer woods and juniper scrub': 3742,
            },
          },
          'Rock outcrops, cliffs and scree': {
            id: 3715,
            values: {
              'Inland rocks and scree': 3743,
              'Montane rocks and scree': 3744,
            },
          },
          'Not in scheme': {
            id: 3716,
            values: {
              'Not in scheme': 3745,
            },
          },
        },
      },
      identifiers: {
        values(value, options) {
          // todo: clean up once morel is updated
          options.flattener({
            'sample:recorder_names': value,
          }, options);
        },
      },


      management: {
        id: 473,
        values: {
          'Arable cropping': 3658,
          Burning: 3659,
          Coppicing: 3660,
          'Cutting / mowing': 3661,
          'Ditch-clearance': 3662,
          'Fenced to exclude grazing': 3663,
          'Fertilised to improve soil fertility': 3664,
          'Grazing - livestock': 3665,
          'Grazing - rabbits / deer': 3666,
          'Hedge-laying': 3667,
          'Herbicides to control weeds': 3668,
          'Path, track or road works': 3669,
          Quarrying: 3670,
          'Scrub clearance / tree felling': 3671,
          'Silage production (i.e. black bags)': 3672,
          'Tree planting': 3673,
          'Water regime regulation': 3674,
          Other: 3675,
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
          'Woodland canopy': 1985,
          'Scattered trees or shrubs': 1986,
          Hedgerow: 1987,
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
      taxon: {
        values(taxon) {
          return taxon.warehouse_id;
        },
      },
      abundance: {
        id: 263,
        values(value) {
          return Object.keys(rangeValues).indexOf(value) + 1;
        },
      }, //1-10
    },
  },
};

