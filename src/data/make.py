import sys
import subprocess

sys.path.append('./scripts')

import _clean
import _json_translator

#get file names
if (len(sys.argv) < 2):
    sys.exit()

output_filename = sys.argv[1]

# Transform species.csv to json:
print('Transforming to JSON...')
_json_translator.run('species.csv', output_filename + '.data.json')

# Create common name map
print('Building name map...')
subprocess.call('node --harmony scripts/_makeCommonNameMap.js ../' + output_filename + '.data.json ' + output_filename + '_names.data.json', shell=True)

print('Done! :)')
