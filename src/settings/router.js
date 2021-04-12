/** ****************************************************************************
 * Settings router.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import React from 'react';
import App from 'app';
import radio from 'radio';
import Log from 'helpers/log';
import appModel from 'app_model';
import savedSamples from 'saved_samples';
import Header from 'common/Components/Header';
import Menu from './Menu';

App.settings = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    'settings(/)': () => {
      radio.trigger('app:header', <Header>Settings</Header>);
      radio.trigger(
        'app:main',
        <Menu appModel={appModel} savedSamples={savedSamples} />
      );
    },
    'settings/*path': () => {
      radio.trigger('app:404:show');
    },
  },
});

App.on('before:start', () => {
  Log('Settings:router: initializing.');
  App.settings.router = new Router();
});
