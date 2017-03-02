/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import $ from 'jquery';
import Indicia from 'indicia';
import DateHelp from 'helpers/date';
import LocHelp from 'helpers/location';

const HOST = 'http://www.npms.org.uk/';

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

const CONFIG = {
  // variables replaced on build
  /* global APP_VERSION, APP_BUILD, APP_NAME, REGISTER_URL, API_KEY, API_SECRET,
   REPORT_URL, STATISTICS_URL, RECORD_URL, APP_SECRET */
  version: APP_VERSION,
  build: APP_BUILD,
  name: APP_NAME,

  gps_accuracy_limit: 100,

  // logging
  log: true,

  // google analytics
  ga: {
    status: true,
    ID: 'UA-58378803-7',
  },

  // error analytics
  sentry: {
    key: 'f70f481cf1ba4a4e8ae19123bf20d8ea',
    project: '143655',
  },

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  // mapping
  map: {
    os_api_key: '28994B5673A86451E0530C6CA40A91A5',
    mapbox_api_key: 'pk.eyJ1IjoiY2VoYXBwcyIsImEiOiJjaXBxdTZyOWYwMDZoaWVuYjI3Y3Z0a2x5In0.YXrZA_DgWCdjyE0vnTCrmw',
    mapbox_osm_id: 'cehapps.0fenl1fe',
    mapbox_satellite_id: 'cehapps.0femh3mh',
  },

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: API_KEY,
    website_id: 109,
    survey_id: 195,

    sample: {
      // todo: add input form
      surveys: {
        indicator: 195,
        inventory: 196,
        wildflower: 197,
      },

      // todo implement the survey 2
      survey_1: {
        id: 474,
      },

      location: {
        id: 'location_id',
        values(value, submission) {
          // add other location related attributes
          submission.fields.entered_sref = value.plot;

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
        values(value, submission) {
          // add broad habitat
          let habitat = this._values[value.broad].id;
          submission.fields[this.id] = habitat;

          // add fine habitat
          if (value.fine) {
            const key = `${this.id}:${habitat}`;
            habitat = this._values[value.broad].values[value.fine];
            submission.fields[key] = habitat;
          }
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
        id: 'recorder_names',
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

export default CONFIG;
