var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: './src/',
  entry: {
    app: './main.js',
  },
  output: {
    path: 'dist/main',
    filename: '[name].js', // Notice we use a variable
  },
  resolve: {
    root: [
      path.resolve('./dist/_build'),
      path.resolve('./dist/_build/vendor'),
      path.resolve('./src/'),
      path.resolve('./src/common/vendor'),
    ],
    alias: {
      // data
      'species_names.data': 'species_names.data.json',
      'species.data': 'species.data.json',

      // helpers
      device: 'common/helpers/device',
      gps: 'common/helpers/gps',
      string: 'common/helpers/string',
      date: 'common/helpers/date',
      image: 'common/helpers/image',
      log: 'common/helpers/log',
      location: 'common/helpers/location',
      analytics: 'common/helpers/analytics',
      error: 'common/helpers/error',
      validate: 'common/helpers/validate',
      update: 'common/helpers/update',

      // vendor
      jquery: 'jquery/js/jquery',
      lodash: 'lodash/js/lodash',
      fastclick: 'fastclick/js/fastclick',
      typeahead: 'typeahead.js/js/typeahead.jquery',
      bootstrap: 'bootstrap/js/bootstrap',
      ratchet: 'ratchet/js/ratchet',
      indexedDBShim: 'IndexedDBShim/js/IndexedDBShim',
      hammer: 'hammerjs/js/hammer',
      underscore: 'lodash/js/lodash',
      backbone: 'backbone/js/backbone',
      'backbone.localStorage': 'backbone.localStorage/js/backbone.localStorage',
      marionette: 'marionette/js/backbone.marionette',
      morel: 'morel/js/morel',

      leaflet: 'leaflet/js/leaflet',
      OSOpenSpace: 'os-leaflet/js/OSOpenSpace',
      'Leaflet.GridRef': 'leaflet.gridref/js/L.GridRef',
      proj4leaflet: 'proj4Leaflet/js/proj4leaflet',
      LatLon: 'latlon/js/latlon-ellipsoidal',
      OsGridRef: 'latlon/js/osgridref',
      'latlon-ellipsoidal': 'latlon/js/latlon-ellipsoidal',
      proj4: 'proj4/js/proj4',

      'photoswipe-lib': 'photoswipe/js/photoswipe',
      'photoswipe-ui-default': 'photoswipe/js/photoswipe-ui-default',
},
  },
  module: {
    loaders: [
      {
        test: /^((?!data\.).)*\.js$/,
        exclude: /(node_modules|bower_components|vendor)/,
        loader: 'babel-loader',
      },
      { test: /\.json/, loader: 'json' },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      cacheFolder: path.resolve(__dirname, 'dist/_build/.cached_uglify/'),
      minimize: true,
      compressor: {
        warnings: false,
      },
    }),
  ],
  cache: true,
};
