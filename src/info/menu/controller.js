import Backbone from 'backbone';
import Log from 'helpers/log';
import radio from 'radio';
import userModel from 'user_model';
import appModel from 'app_model';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

function showLogoutConfirmationDialog(callbackIfTrue) {
  radio.trigger('app:dialog', {
    title: 'Logout',
    body: `Are you sure you want to logout?
    
    <p>
      <label>
      <input id="delete-all-records" type="checkbox" checked/>
      <i>Delete all the locally stored app data.</i>
      </label>
    </p>
    
    `,
    buttons: [
      {
        title: 'Cancel',
        fill: 'clear',
        onClick() {
          radio.trigger('app:dialog:hide');
        },
      },
      {
        title: 'Logout',
        class: 'btn-negative',
        onClick() {
          const deleteAllData = document.getElementById('delete-all-records')
            .checked;
          callbackIfTrue(deleteAllData);
          radio.trigger('app:dialog:hide');
        },
      },
    ],
  });
}

const API = {
  show() {
    const mainView = new MainView({ model: userModel });
    radio.trigger('app:main', mainView);

    mainView.on('user:logout', API.logout);

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: 'Info',
      }),
    });
    radio.trigger('app:header', headerView);
  },

  logout() {
    Log('Info:Menu:Controller: logging out.');
    showLogoutConfirmationDialog(deleteAllData => {
      appModel.resetDefaults();
      userModel.logOut();

      if (deleteAllData) {
        savedSamples.resetDefaults();
      }
    });
  },
};

export { API as default };
