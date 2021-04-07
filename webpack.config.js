require('dotenv').config({ silent: true });
const webpack = require('webpack');
const appConfig = require('@flumens/webpack-config');
// const WebpackShellPluginNext = require('webpack-shell-plugin-next');

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

// // for some reason script didn't accept ~ or $HOME
// appConfig.plugins.push(
//   new WebpackShellPluginNext({
//     dev: false, // run more than once
//     onBuildEnd: {
//       scripts: ['grunt jst'],
//       blocking: true,
//       parallel: false,
//     },
//   })
// );

module.exports = appConfig;
