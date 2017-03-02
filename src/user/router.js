/** ****************************************************************************
 * User router.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import App from 'app';
import radio from 'radio';
import LoginController from './login/controller';

App.user = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    'user/login(/)': LoginController.show,
    'user/*path': () => { radio.trigger('app:404:show'); },
  },
});

radio.on('user:login', (options) => {
  App.navigate('user/login', options);
  LoginController.show();
});

App.on('before:start', () => {
  Log('User:router: initializing.');
  App.user.router = new Router();
});
