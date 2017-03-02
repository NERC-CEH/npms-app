/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 *****************************************************************************/
import _ from 'lodash';
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import CONFIG from 'config';
import Log from 'helpers/log';
import Analytics from 'helpers/analytics';
import squaresExtension from './user_model_squares_ext';

let UserModel = Backbone.Model.extend({
  id: 'user',

  defaults: {
    drupalID: '',
    name: '',
    firstname: '',
    secondname: '',
    email: '',
    password: '',

    squares: {},
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the user.
   */
  initialize() {
    this.fetch();
    this.syncSquares();
  },

  /**
   * Resets the user login information.
   */
  logOut() {
    Log('User: logging out.');

    this.set('email', '');
    this.set('password', '');
    this.set('name', '');
    this.set('firstname', '');
    this.set('secondname', '');

    this.resetSquares();

    this.save();
    this.trigger('logout');
    Analytics.trackEvent('User', 'logout');
  },

  /**
   * Sets the app login state of the user account.
   * Saves the user account details into storage for permanent availability.
   *
   * @param user User object or empty object
   */
  logIn(user) {
    Log('User: logging in.');

    this.set('drupalID', user.id || '');
    this.set('password', user.password || '');
    this.set('email', user.email || '');
    this.set('name', user.name || '');
    this.set('firstname', user.firstname || '');
    this.set('secondname', user.secondname || '');
    this.save();

    this.trigger('login');
    this.syncSquares();

    Analytics.trackEvent('User', 'login');
  },

  /**
   * Returns user contact information.
   */
  hasLogIn() {
    return this.get('password');
  },

  getUser() {
    return this.get('email');
  },

  getPassword() {
    return this.get('password');
  },

  validateLogin(attrs) {
    const errors = {};

    if (!attrs.name) {
      errors.name = "can't be blank";
    }

    if (!attrs.password) {
      errors.password = "can't be blank";
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },
});

// add Squares management
UserModel = UserModel.extend(squaresExtension);

const userModel = new UserModel();
export { userModel as default, UserModel };
