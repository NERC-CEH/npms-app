/** ****************************************************************************
 * User model describing the user model on backend. Persistent.
 **************************************************************************** */
import _ from 'lodash';
import Backbone from 'backbone';
import { LocalStorage as Store } from 'backbone.localstorage';
import CONFIG from 'config';
import Log from 'helpers/log';
import Validate from 'helpers/validate';
import squaresExtension from './user_model_squares_ext';

const UserModel = Backbone.Model.extend({
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
  },

  /**
   * Sets the app login state of the user account.
   * Saves the user account details into storage for permanent availability.
   *
   * @param user User object or empty object
   */
  async logIn(user) {
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

  validateRegistration(attrs) {
    const errors = {};

    if (!attrs.email) {
      errors.email = "can't be blank";
    } else if (!Validate.email(attrs.email)) {
      errors.email = 'invalid';
    }

    if (!attrs.firstname) {
      errors.firstName = "can't be blank";
    }

    if (!attrs.secondname) {
      errors.secondname = "can't be blank";
    }

    if (!attrs.password) {
      errors.password = "can't be blank";
    } else if (attrs.password.length < 2) {
      errors.password = 'is too short';
    }

    if (!attrs['password-confirm']) {
      errors['password-confirm'] = "can't be blank";
    } else if (attrs['password-confirm'] !== attrs.password) {
      errors['password-confirm'] = 'passwords are not equal';
    }

    if (!attrs['terms-agree']) {
      errors['terms-agree'] = 'you must agree to the terms';
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },

  validateReset(attrs) {
    const errors = {};

    if (!attrs.name) {
      errors.name = "can't be blank";
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },
});

// add Squares management
const UserModelSquares = UserModel.extend(squaresExtension);

const userModel = new UserModelSquares();
export { userModel as default, UserModelSquares };
