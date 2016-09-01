/** ****************************************************************************
 * App start.
 *****************************************************************************/

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