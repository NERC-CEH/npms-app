/** ****************************************************************************
 * User router.
 *****************************************************************************/
import Marionette from 'marionette';
import Log from 'log';
import App from '../app';
import LoginController from './login/controller';

App.user = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    'user/login(/)': LoginController.show,
    'user/*path': function () { App.trigger('404:show'); },
  },
});

App.on('user:login', (options) => {
  App.navigate('user/login', options);
  LoginController.show();
});

App.on('before:start', () => {
  Log('User:router: initializing');
  App.user.router = new Router();
});
