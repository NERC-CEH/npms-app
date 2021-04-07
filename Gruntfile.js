require('dotenv').config({ silent: true }); // get local environment variables from .env
const pkg = require('./package.json');

const build = process.env.BITRISE_BUILD_NUMBER || pkg.build;
const OFFSET = 2000000;

const replace = {
  // Cordova config changes
  config: {
    src: ['cordova.xml'],
    dest: 'cordova/config.xml',
    replacements: [
      {
        from: /\{ID\}/g, // string replacement
        to: () => pkg.id,
      },
      {
        from: /\{APP_VER\}/g, // string replacement
        to: () => pkg.version,
      },
      {
        from: /\{APP_TITLE\}/g,
        to: () => pkg.title,
      },
      {
        from: /\{APP_DESCRIPTION\}/g,
        to: () => pkg.description,
      },
      {
        from: /\{BUNDLE_VER\}/g,
        to: () => build,
      },
      {
        from: /\{ANDROID_BUNDLE_VER\}/g,
        to() {
          return OFFSET + parseInt(build);
        },
      },
    ],
  },
};

const exec = grunt => ({
  build: {
    command: 'npm run clean && NODE_ENV=production npm run build',
  },
  init: {
    command: 'cordova create cordova',
    stdout: true,
  },
  resources: {
    command: `mkdir -p resources &&
        
              cp -R other/designs/android resources &&
              cp -R other/designs/*.png resources &&

              ./node_modules/.bin/cordova-res --resources resources`,
  },
  clean_www: {
    command: 'rm -R -f cordova/www/* && rm -f cordova/config.xml',
    stdout: true,
  },
  copy_dist: {
    command: 'cp -R build/* cordova/www/',
    stdout: true,
  },
  add_platforms: {
    command: 'cd cordova && cordova platforms add ios android',
    stdout: true,
  },
  android_build: {
    command() {
      return 'cd cordova && mkdir -p dist && cordova --release build android';
    },
    stdout: true,
    stdin: true,
  },

  build_ios: {
    command: 'cd cordova && cordova build ios',
    stdout: true,
  },

  android: {
    command: 'cd cordova && cordova build android',
    stdout: true,
  },
});

const jst = {
  compile: {
    options: {
      amd: true,
      namespace: 'JST',
      templateSettings: {
        variable: 'obj',
      },
      prettify: true,
      processName(filepath) {
        const templatesDir = '/templates';
        let path = filepath;

        // strip all until components folder
        path = path.split('src/')[1];

        // remove 'pages' from common/pages
        if (path.indexOf('common/pages') >= 0) {
          path = path.replace('/pages', '');
        }

        // remove extension
        path = path.split('.')[0];

        // cut out templates dir
        const dirIndex = path.indexOf(templatesDir);
        if (dirIndex) {
          path =
            path.substr(0, dirIndex) +
            path.substr(dirIndex + templatesDir.length);
        }

        return path;
      },
    },
    files: {
      'src/JST.js': ['src/**/**/**/**/*.tpl', 'src/common/templates/*.tpl'],
    },
  },
};

function init(grunt) {
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-jst');

  grunt.initConfig({
    exec: exec(grunt),
    replace,
    jst,
  });
}

module.exports = grunt => {
  init(grunt);

  grunt.registerTask('default', [
    'exec:build',

    'exec:init',
    'exec:resources',

    'exec:clean_www',
    'exec:copy_dist',
    'replace:config',
    'exec:add_platforms',

    'exec:android_build',
    'exec:build_ios',
  ]);
};
