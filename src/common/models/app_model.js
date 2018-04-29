/** ****************************************************************************
 * App model. Persistent.
 *****************************************************************************/
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import CONFIG from 'config';

const AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    autosync: true,
    useTraining: CONFIG.training,
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
