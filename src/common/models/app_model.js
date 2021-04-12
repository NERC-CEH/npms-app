/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import Backbone from 'backbone';
import { LocalStorage as Store } from 'backbone.localstorage';
import CONFIG from 'config';

const AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    appSession: 0,
    autosync: true,
    useTraining: false,

    sendAnalytics: true,
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the object.
   */
  initialize() {
    this.fetch();
  },

  resetDefaults() {
    this.clear().set(this.defaults);
    return this.save();
  },
});

const appModel = new AppModel();
export { appModel as default, AppModel };
