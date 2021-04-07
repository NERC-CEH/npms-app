/** ****************************************************************************
 * App start.
 **************************************************************************** */

import 'helpers/analytics';
import { setupConfig as ionicConfig } from '@ionic/react';
import App from 'app';

import 'photoswipe/dist/default-skin/default-skin.png';
import 'photoswipe/dist/default-skin/default-skin.svg';
import '@ionic/react/css/core.css';

import './samples/router';
import './info/router';
import './settings/router';
import './user/router';

import '../node_modules/ratchet/dist/css/ratchet.css';
import '../node_modules/ratchet/dist/fonts/ratchicons.ttf';
import '../node_modules/ratchet/dist/fonts/ratchicons.woff';
import './common/vendor/fontello/css/icons.css';
import './common/styles/app.scss';

// Load the mighty app :)
App.start();

ionicConfig({ hardwareBackButton: false, swipeBackEnabled: false });
