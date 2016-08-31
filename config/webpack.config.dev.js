var _ = require('lodash');

const webpackConfig = require('./webpack.config.js');
const development = _.cloneDeep(webpackConfig);

// development configuration
development.resolve.alias.config = 'config_dev';

module.exports = development;