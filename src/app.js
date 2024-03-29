/** ****************************************************************************
 * App object.
 **************************************************************************** */
import 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import FastClick from 'fastclick';
import radio from 'radio';
import Log from 'helpers/log';
import config from 'config';
import userModel from 'user_model';
import appModel from 'app_model';
import { initAnalytics } from '@apps';
import Update from 'helpers/update';
import Device from 'helpers/device';
import CommonController from './common/controller';
import DialogRegion from './common/views/dialog_region';
import HideableRegion from './common/views/hideable_region';
import './common/router_extension';

const App = new Marionette.Application();

App.navigate = (route, options = {}) => {
  Log(`App: navigating to ${route}.`);
  const defaultOptions = { trigger: true };
  Backbone.history.navigate(route, $.extend(defaultOptions, options));
};

App.restart = () => {
  window.location.href = '/';
};

App.getCurrentRoute = () => Backbone.history.fragment;

App.on('before:start', () => {
  Log('App: initializing main regions.');
  const RegionContainer = Marionette.View.extend({
    el: '#app',

    regions: {
      header: new HideableRegion({ el: '#header' }),
      footer: new HideableRegion({ el: '#footer' }),
      main: '#main',
      dialog: DialogRegion,
    },
  });

  App.regions = new RegionContainer();
});

App.on('start', () => {
  appModel.attributes.sendAnalytics &&
    initAnalytics({
      dsn: config.sentryDNS,
      environment: config.environment,
      build: config.build,
      release: config.version,
      userId: userModel.attributes.drupalID,
      tags: {
        'app.appSession': appModel.attributes.appSession,
      },
    });

  appModel.attributes.appSession += 1;
  appModel.save();

  // update app first
  Update.run(() => {
    // release the beast
    Log('App: starting.');

    FastClick.attach(document.body);

    if (Backbone.history) {
      Backbone.history.start();

      if (App.getCurrentRoute() === '') {
        radio.trigger('samples:list');
      }

      if (!window.cordova) {
        return;
      }

      // Although StatusBar in the global scope,
      // it is not available until after the deviceready event.
      document.addEventListener(
        'deviceready',
        () => {
          Log('Showing the app.');

          // iOS make space for statusbar
          if (Device.isIOS()) {
            $('body').addClass('ios');
          }

          // hide loader
          if (navigator && navigator.splashscreen) {
            navigator.splashscreen.hide();
          }
        },
        false
      );
    }
  });
});

// events
radio.on('app:restart', App.restart);

radio.on('app:dialog', options => {
  App.regions.getRegion('dialog').show(options);
});
radio.on('app:dialog:hide', options => {
  App.regions.getRegion('dialog').hide(options);
});
radio.on('app:dialog:error', options => {
  App.regions.getRegion('dialog').error(options);
});
radio.on('app:main', view => {
  const region = App.regions.getRegion('main');
  const $el = document.getElementById('main');
  if (view instanceof Backbone.View) {
    $el.classList.add('old');
    if (ReactDOM.unmountComponentAtNode && region.$el[0]) {
      ReactDOM.unmountComponentAtNode(region.$el[0]);
    } else {
      // TODO: for some reason the unmount function is sometimes not found
      Log("App: main view React DOM unmount did't happen", 'w');
    }
    region.show(view);
    return;
  }

  if (region.currentView) {
    region.currentView.destroy();
  }

  $el.classList.remove('old');
  ReactDOM.render(view, $el);
});
radio.on('app:header', view => {
  const region = App.regions.getRegion('header');
  const $el = document.getElementById('header');
  if (view instanceof Backbone.View) {
    $el.classList.add('old');
    if (ReactDOM.unmountComponentAtNode && region.$el[0]) {
      ReactDOM.unmountComponentAtNode(region.$el[0]);
    } else {
      // TODO: for some reason the unmount function is sometimes not found
      Log("App: header view React DOM unmount did't happen", 'w');
    }
    region.show(view);
    return;
  }

  if (region.currentView) {
    region.currentView.destroy();
  }
  $(region.$el[0]).show();
  $el.classList.remove('old');
  ReactDOM.render(view, region.$el[0]);
});
radio.on('app:footer', options => {
  App.regions.getRegion('footer').show(options);
});
radio.on('app:main:hide', options => {
  App.regions.getRegion('main').hide(options).empty();
});
radio.on('app:header:hide', options => {
  App.regions.getRegion('header').hide(options).empty();
});
radio.on('app:footer:hide', options => {
  App.regions.getRegion('footer').hide(options).empty();
});
radio.on('app:loader', () => {
  App.regions.getRegion('dialog').showLoader();
});
radio.on('app:loader:hide', () => {
  App.regions.getRegion('dialog').hideLoader();
});

radio.on('app:404:show', () => {
  CommonController.show({
    App,
    route: 'common/404',
    title: 404,
  });
});

export { App as default };
