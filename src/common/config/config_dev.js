/** ****************************************************************************
 * Main app development configuration file.
 **************************************************************************** */
import $ from 'jquery';
import Indicia from 'indicia';
import config from './config';

const HOST = 'http://test.brc.ac.uk/npms_training/'; // Backend URL - needs trailing slash

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

const newConfig = $.extend(true, config, {
  site_url: HOST,

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${
      HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH
    }`,
    timeout: 80000,
  },

  indicia: {
    host: HOST,
    website_id: 109,

    sample: {
      surveys: {
        indicator: 195,
        inventory: 196,
        wildflower: 197,
      },

      survey_1: {
        id: 474,
      },

      device: {
        id: 829,
        values: {
          iOS: 14317,
          Android: 14318,
        },
      },
      device_version: { id: 836 },

      habitat: {
        type: 'radio',
        id: 481,
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

      management: {
        type: 'checkbox',
        id: 472,
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
        id: 462,
        id_text: 471,
        _values: {
          low: 1982,
          moderate: 1983,
          high: 1984,
        },
      },

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
      abundance: {
        type: 'radio',
        id_wild: 263,
        id: 264,
      }, // 1-10
    },

    reports: {
      core_square_location_type_id: 3297,
      additional_square_location_type_id: 3748,
      vice_county_location_attribute_id: 66,
      user_square_attr_id: 6,
      plot_number_attr_id: 68,
    },
  },
});

export default newConfig;
