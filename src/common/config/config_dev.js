/** ****************************************************************************
 * Main app development configuration file.
 *****************************************************************************/
import $ from 'jquery';
import Indicia from 'indicia';
import config from './config';

const HOST = 'http://192.171.199.230/npms_training/'; // Backend URL - needs trailing slash

const newConfig = $.extend(true, config, {
  // google analytics
  ga: {
    status: false,
  },

  site_url: HOST,

  // use prod logging if testing otherwise full log
  log: process.env.ENV !== 'testing',

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER + Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  indicia: {
    host: HOST,
  },
});

export default newConfig;
