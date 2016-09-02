/** ****************************************************************************
 * App start.
 *****************************************************************************/

import '../dist/_build/styles/ratchet.css';
import '../dist/_build/styles/icons.css';
import '../dist/_build/vendor/photoswipe/css/photoswipe.css';
import '../dist/_build/vendor/photoswipe/css/default-skin.css';
import 'common/styles/app.scss';

import 'bootstrap';
import 'ratchet';
import 'indexedDBShim';

import App from './app';
import './records/router';
import './info/router';
import './settings/router';
import './user/router';

// Load the mighty app :)
App.start();