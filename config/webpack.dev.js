const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  resolve: {
    alias: {
      config: 'config_dev',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        ENV: JSON.stringify(ENV),
        BUILD: JSON.stringify(process.env.TRAVIS_BUILD_ID || new Date().getTime()),
      },
    }),
  ],
});