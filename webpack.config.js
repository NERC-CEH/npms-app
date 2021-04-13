require('dotenv').config({ silent: true });
const webpack = require('webpack');
const appConfig = require('@flumens/webpack-config');

appConfig.entry = ['index.js'];

const required = ['APP_SENTRY_KEY', 'APP_INDICIA_API_KEY'];

const development = {
  APP_INDICIA_API_HOST: '',
};

appConfig.plugins.unshift(
  new webpack.EnvironmentPlugin(required),
  new webpack.EnvironmentPlugin(development)
);

const unusedFilesPlugin = appConfig.plugins.find(plugin => !!plugin.exclude);
unusedFilesPlugin.exclude.push('*.tpl');

appConfig.module.rules.push({
  test: /(\.eot)/,
  loader: 'file-loader',
  options: {
    name: 'fonts/[name].[ext]',
  },
});

module.exports = appConfig;
