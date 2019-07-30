/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import CONFIG from 'config';

const AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    autosync: true,
    useTraining: CONFIG.training,

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
