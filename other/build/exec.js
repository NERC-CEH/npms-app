require('dotenv').config({ silent: true }); // get local environment variables from .env

module.exports = function (grunt) {
  return {
    resources: {
      command: () => {
        return `mkdir -p dist/resources &&
                  cp -R other/designs/android dist/resources &&
  
                  ./node_modules/.bin/sharp -i other/designs/splash.svg -o dist/resources/splash.png resize 2737 2737 -- removeAlpha &&
                  ./node_modules/.bin/sharp -i other/designs/icon.svg -o dist/resources/icon.png resize 1024 1024 -- removeAlpha &&
  
                  ./node_modules/.bin/cordova-res ios --skip-config --resources dist/resources &&
                  ./node_modules/.bin/cordova-res android --skip-config --resources dist/resources`;
      },
      stdout: false,
    },
    data_init: {
      command(list) {
        return (
          `${
            'cd src/samples/taxa/search/data && ' + 'python make.py '
          }${list} &&` +
          'mkdir -p ../../../../../dist/main/data &&' +
          'mv *data.json ../../../../../dist/main/data &&' +
          'rm warnings.log'
        );
      },
      stdout: true,
    },
    cordova_init: {
      command: './node_modules/.bin/cordova create dist/cordova',
      stdout: true,
    },
    cordova_clean_www: {
      command: 'rm -R -f dist/cordova/www/* && rm -f dist/cordova/config.xml',
      stdout: true,
    },
    cordova_rebuild: {
      command:
        'cd dist/cordova/ && ../../node_modules/.bin/cordova prepare ios android',
      stdout: true,
    },
    cordova_copy_dist: {
      command: 'cp -R dist/main/* dist/cordova/www/',
      stdout: true,
    },
    cordova_add_platforms: {
      command:
        'cd dist/cordova && ../../node_modules/.bin/cordova platforms add ios android',
      stdout: true,
    },
    /**
     * $ANDROID_KEYSTORE must be set up to point to your android certificates keystore
     */
    cordova_android_build: {
      command() {
        const pass = grunt.config('keystore-password');
        return `cd dist/cordova/ && ../../node_modules/.bin/cordova --release build android && 
                cd platforms/android/app/build/outputs/apk/release/ &&
                jarsigner -keystore ${process.env.KEYSTORE}
                  -storepass ${pass} app-release-unsigned.apk irecord &&
                zipalign 4 app-release-unsigned.apk main.apk &&
                mv -f main.apk ../../../../../../../`;
      },

      stdout: true,
      stdin: true,
    },

    cordova_build_ios: {
      command: 'cd dist/cordova && ../../node_modules/.bin/cordova build ios',
      stdout: true,
    },

    cordova_run_android: {
      command: 'cd dist/cordova && ../../node_modules/.bin/cordova run android',
      stdout: true,
    },
  };
};
