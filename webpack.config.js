require('dotenv').config({ silent: true });
const webpack = require('webpack');
const appConfig = require('@flumens/webpack-config');
const CopyPlugin = require('copy-webpack-plugin');

const required = [
  'APP_BACKEND_CLIENT_ID',
  'APP_BACKEND_CLIENT_PASS',
  'APP_SENTRY_KEY',
];

const development = {
  APP_BACKEND_INDICIA_URL: '',
  APP_BACKEND_URL: '',
};

appConfig.plugins.unshift(
  new webpack.EnvironmentPlugin(required),
  new webpack.EnvironmentPlugin(development)
);

// For capacitor sqlite
appConfig.resolve.fallback = { crypto: false };
appConfig.plugins.push(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  new CopyPlugin({
    patterns: [
      { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: 'assets' },
    ],
  })
);

module.exports = appConfig;
