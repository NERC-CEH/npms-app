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
  '< 1% (1-2 indivs)': 3333,
  '< 1% (several indivs)': 3334,
  '1-4%': 3335,
  '5-10%': 3336,
  '11-25%': 3337,
  '26-33%': 3338,
  '34-50%': 3339,
  '51-75%': 3340,
  '76-90%': 3341,
  '91-100%': 3342,
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
    website_id: 32,

    sample: {
      surveys: {
        indicator: 155,
        inventory: 154,
        wildflower: 87,
      },

      survey_1: {
        id: 227,
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
        id: 565,
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
            id: 4871,
            values: {
              'Arable field margins': 4872,
            },
          },
          'Bog and wet heath': {
            id: 4873,
            values: {
              'Raised bog': 4874,
              'Blanket bog': 4875,
              'Wet heath': 4877,
            },
          },
          'Broadleaved woodland, hedges and scrub': {
            id: 4876,
            values: {
              'Hedgerows of native species': 4879,
              'Wet woodland': 4880,
              'Dry deciduous woodland': 4881,
            },
          },
          Coast: {
            id: 4878,
            values: {
              'Coastal saltmarsh': 4882,
              'Coastal sand dunes': 4883,
              Machair: 4884,
              'Coastal vegetated shingle': 4885,
              'Maritime cliffs and slopes': 4886,
            },
          },
          Freshwater: {
            id: 4887,
            values: {
              'Nutrient-poor lakes and ponds': 4888,
              'Nutrient-rich lakes and ponds': 4889,
              'Rivers and streams': 4890,
            },
          },
          Heathland: {
            id: 4891,
            values: {
              'Dry heathland': 4892,
              'Montane dry heathland': 4893,
            },
          },
          'Lowland grassland': {
            id: 4894,
            values: {
              'Dry calcareous grassland': 4895,
              'Dry acid grassland': 4896,
              'Neutral pastures and meadows': 4897,
              'Neutral damp grassland': 4899,
            },
          },
          'Marsh and fen': {
            id: 4898,
            values: {
              'Acid fens, mires and springs': 4900,
              'Base-rich fens, mires and springs': 4901,
            },
          },
          'Upland grassland': {
            id: 4902,
            values: {
              'Montane calcareous grassland': 4903,
              'Montane acid grassland': 4904,
            },
          },
          'Native pinewood and juniper scrub': {
            id: 4905,
            values: {
              'Native conifer woods and juniper scrub': 4906,
            },
          },
          'Rock outcrops, cliffs and scree': {
            id: 4907,
            values: {
              'Inland rocks and scree': 4908,
              'Montane rocks and scree': 4909,
            },
          },
          'Not in scheme': {
            id: 4910,
            values: {
              'Not in scheme': 4911,
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
        id: 225,
        values(value) {
          const that = this;
          const values = [];
          value.forEach((option) => {
            values.push(that._values[option]);
          });
          return values;
        },
        _values: {
          'Arable cropping': 1799,
          Burning: 1800,
          Coppicing: 1801,
          'Cutting / mowing': 1802,
          'Ditch-clearance': 1803,
          'Fenced to exclude grazing': 1804,
          'Fertilised to improve soil fertility': 1805,
          'Grazing - livestock': 1806,
          'Grazing - rabbits / deer': 1807,
          'Hedge-laying': 1808,
          'Herbicides to control weeds': 1809,
          'Path, track or road works': 1810,
          Quarrying: 1811,
          'Scrub clearance / tree felling': 1812,
          'Silage production': 1813,
          'Tree planting': 1814,
          'Water regime regulation': 1815,
          Other: 1816,
        },
      },

      'management other': { id: 226 },

      grazing: {
        id: 215,
        id_text: 224,
        values(value, submission) {
          submission.fields[this.id_text] = value.text;
          return this._values[value.selected];
        },
        _values: {
          low: 1817,
          moderate: 1818,
          high: 1819,
        },
      },

      wooded: {
        type: 'radio',
        id: 216,
        values: {
          'Woodland canopy': 1820,
          'Scattered trees or shrubs': 1821,
          Hedgerow: 1822,
          'No trees or shrubs': 1823,
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
          '<=10cm': 219,
          '11-30cm': 220,
          '31-100cm': 221,
          '101-300cm': 222,
          '>300cm': 223,
        },
      },

      soil: { id: 403, values: rangeValues },
      gravel: { id: 405, values: rangeValues },
      litter: { id: 404, values: rangeValues },
      lichens: { id: 408, values: rangeValues },

      plot: { id: 417 },
    },
    occurrence: {
      taxon: {
        values(taxon) {
          return taxon.warehouse_id;
        },
      },
      abundance: {
        type: 'radio',
        id_wild: 104,
        id: 214,
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

    reports: {
      core_square_location_type_id: 4009,
      additional_square_location_type_id: 4009,
      vice_county_location_attribute_id: 90,
      no_vice_county_found_message: '1km%20square',
      user_square_attr_id: 2,
      plot_number_attr_id: 118,
    },
  },
};

export default CONFIG;
