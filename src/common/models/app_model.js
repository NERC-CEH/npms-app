/** ****************************************************************************
 * App model. Persistent.
 *****************************************************************************/
import Backbone from 'backbone';
import Store from 'backbone.localStorage';
import CONFIG from 'config'; // Replaced with alias

const AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    exceptions: [],
    autosync: true,
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the object.
   */
  initialize() {
    this.fetch();
  },
});


const appModel = new AppModel();
export { appModel as default, AppModel };
