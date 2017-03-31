/** ****************************************************************************
 * Main app configuration file.
 *****************************************************************************/
import Indicia from 'indicia';
import DateHelp from 'helpers/date';

const HOST = 'http://www.npms.org.uk/';

// wildflower survey
const rangeValuesWildflower = [
  '< 1% (1-2 indivs)',
  '< 1% (several indivs)',
  '1-4%',
  '5-10%',
  '11-25%',
  '26-33%',
  '34-50%',
  '51-75%',
  '76-90%',
  '91-100%',
];

// indicator and inventory surveys
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

  site_url: HOST,

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
    mapbox_api_key: 'pk.eyJ1IjoiY2VoYXBwcyIsImEiOiJjaXBxdTZyOWYwMDZoaWVuYjI3Y3Z0a2x5In0.YXrZA_DgWCdjyE0vnTCrmw', // eslint-disable-line
    mapbox_osm_id: 'cehapps.0fenl1fe',
    mapbox_satellite_id: 'cehapps.0femh3mh',
  },

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: API_KEY,
    website_id: 109,

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
          submission.fields.entered_sref = value.plot; // eslint-disable-line

          // lat lon
          if (value.plot.match(/\d+\.\d+N \d+\.\d+W/g)) {
            submission.fields.entered_sref_system = 4326; // eslint-disable-line
          }

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
        type: 'radio',
        id: 481,
        values(value, submission) {
          // add broad habitat
          let habitat = this._values[value.broad].id;
          submission.fields[this.id] = habitat; // eslint-disable-line

          // add fine habitat
          if (value.fine) {
            const key = `${this.id}:${habitat}`;
            habitat = this._values[value.broad].values[value.fine];
            submission.fields[key] = habitat; // eslint-disable-line
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
        type: 'input',
        id: 'recorder_names',
      },


      management: {
        type: 'checkbox',
        id: 472,
        values(value) {
          const that = this;
          const values = [];
          value.forEach((option) => {
            values.push(that._values[option]);
          });
          return values;
        },
        _values: {
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
          'Silage production': 3672,
          'Tree planting': 3673,
          'Water regime regulation': 3674,
          Other: 3675,
        },
      },

      'management other': { id: 472 },

      grazing: {
        type: 'radio',
        id: 462,
        values: {
          low: 1982,
          moderate: 1983,
          high: 1984,
        },
      },

      'grazing other': { id: 471 },
      wooded: {
        type: 'radio',
        id: 463,
        values: {
          'Woodland canopy': 1985,
          'Scattered trees or shrubs': 1986,
          Hedgerow: 1987,
          'No trees or shrubs': 1988,
        },
      },

      vegetation: {
        values(value, submission) {
          const that = this;
          const selection = Object.keys(value);

          selection.forEach((key) => {
            submission.fields[that._values[key]] = value[key]; // eslint-disable-line
          });
        },
        _values: {
          '<=10cm': 466,
          '11-30cm': 467,
          '31-100cm': 468,
          '101-300cm': 469,
          '>300cm': 470,
        },
      },

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
        type: 'radio',
        id_wild: 263,
        id: 264,
        values(value, submission, occ) {
          // wildflower uses different abundance attribute and values
          if (occ.parent.metadata.survey_id === CONFIG.indicia.sample.surveys.wildflower) {
            submission.fields[this.id_wild] = rangeValuesWildflower.indexOf(value) + 1; // eslint-disable-line
            return null;
          }

          return rangeValues[value];
        },
      }, //1-10
    },
  },
};

export default CONFIG;
