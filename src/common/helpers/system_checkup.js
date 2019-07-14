/** ****************************************************************************
 * Print App information for debugging, BRC ACII art and a link to BRC website.
 **************************************************************************** */

/* eslint-disable */

import Indicia from 'indicia';
import Log from './log';
import CONFIG from 'config';

// Print Hello
const art = [
  '\n',
  '1 0000000000   1 0000000000        00000000    ',
  '1 0000     00  1 0000     00     0000      00  ',
  '1 0000      00 1 0000      00  1 0000        0 ',
  '1 0000      00 1 0000      00 11 0000          ',
  '1 0000     00  1 0000     00  11 0000          ',
  '1 0000000000   1 0000000000   11 0000          ',
  '1 0000     00  1 0000 00      11 0000          ',
  '1 0000      00 1 0000  00      1 0000        0 ',
  '1 0000     00  1 0000    00      0000      00  ',
  '1 0000000000   1 0000      00      00000000	  ',
  '',
  '* Find us: www.brc.ac.uk',
].join('\n');

Log(art);

// Print System values
Log(`
* System info:
  Environment: ${CONFIG.environment}
  
  Version: ${CONFIG.version}
  Build: ${CONFIG.build}
  Indicia: ${Indicia.VERSION}
  
  Google Analytics: ${window.cordova && CONFIG.ga.id ? 'true' : 'false'}
  Server error logs: ${CONFIG.sentry.key ? 'true' : 'false'}


`);

// Print missing configuration errors
if (!CONFIG.indicia.api_key) {
  Log(
    'Indicia API key is missing! Set APP_INDICIA_API_KEY build env. variable.',
    'e'
  );
}
