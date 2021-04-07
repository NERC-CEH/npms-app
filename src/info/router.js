/** ****************************************************************************
 * Info router.
 **************************************************************************** */
import React from 'react';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import CONFIG from 'config';
import App from 'app';
import radio from 'radio';
import Header from 'common/Components/Header';
import CommonController from '../common/controller';
import InfoMenuController from './menu/controller';
import About from './About';
import './credits/sponsor_logo.png?originalName';

App.info = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    'info(/)': InfoMenuController.show,
    'info/about(/)': () => {
      Log('Info:About: visited.');
      radio.trigger('app:header', <Header>About</Header>);
      radio.trigger(
        'app:main',
        <About version={CONFIG.version} build={CONFIG.build} />
      );
    },
    'info/help(/)': () => {
      CommonController.show({
        title: 'Help',
        App,
        route: 'info/help/main',
        model: new Backbone.Model({
          site_url: CONFIG.site_url,
        }),
      });
    },
    'info/privacy(/)': () => {
      CommonController.show({
        title: 'Privacy Policy',
        App,
        route: 'info/privacy/main',
      });
    },
    'info/credits(/)': () => {
      CommonController.show({
        title: 'Credits',
        App,
        route: 'info/credits/main',
      });
    },
    'info/*path': () => {
      radio.trigger('app:404:show');
    },
  },
});

App.on('before:start', () => {
  Log('Info:router: initializing.');
  App.info.router = new Router();
});
