/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import * as dotenv from 'dotenv';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import { z, object } from 'zod';
// import indicator from './cache/indicator.json';
// import inventory from './cache/inventory.json';
// import wildflower from './cache/wildflower.json';
import makeCommonNameMap from './extractCommonNames';
import optimise from './optimise';

const remoteSchema = object({
  id: z.string(),
  taxonGroup: z.string(),
  taxon: z.string(),
  organismKey: z.string(),
  frequency: z.string(),
  difficulty: z.string().optional(),
  commonName: z.string().optional(),
  synonym: z.record(z.string(), z.string()).optional(),
});

export type RemoteAttributes = z.infer<typeof remoteSchema>;

dotenv.config({ path: '../../../../.env' }); // eslint-disable-line

const warehouseURL = 'https://warehouse1.indicia.org.uk';

const { ANON_WAREHOUSE_TOKEN } = process.env;
if (!ANON_WAREHOUSE_TOKEN) {
  throw new Error('ANON_WAREHOUSE_TOKEN is missing from env.');
}

function saveToFile(data: any, fileName: string) {
  const saveSpeciesToFileWrap = (resolve: any, reject: any) => {
    console.log(`Writing ${fileName}`);

    const dataOption = (err: any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    };

    fs.writeFile(fileName, JSON.stringify(data, null, 2), dataOption);
  };
  return new Promise(saveSpeciesToFileWrap);
}

async function fetch(listID: any): Promise<RemoteAttributes[]> {
  const { data } = await axios({
    method: 'GET',
    url: `${warehouseURL}/index.php/services/rest/reports/projects/plant_portal/app_get_species_lists_4.xml?species_list=${listID}&count_website_list=106,32,23&occ_row_limit=30000&limit=10000000`,
    headers: {
      Authorization: `Bearer ${ANON_WAREHOUSE_TOKEN}`,
    },
  });

  const getValues = (doc: any) =>
    mapKeys(doc, (_, key) => (key.includes(':') ? key : camelCase(key)));
  const parseNames = ({ synonym, ...doc }: any) => {
    return {
      ...doc,
      synonym: synonym ? JSON.parse(synonym) : undefined,
    };
  };
  const byTaxon = (s1: any, s2: any) => s1.taxon.localeCompare(s2.taxon);
  const docs = data.data.map(getValues).map(parseNames).sort(byTaxon);

  docs.forEach(remoteSchema.parse);

  return docs;
}

(async () => {
  let reportData = await fetch('wildflower');
  await saveToFile(reportData, `./cache/wildflower.json`);
  let normalized: any = await optimise(reportData);
  // let normalized: any = await optimise(wildflower);
  await saveToFile(normalized, `./wildflower.data.json`);
  let commonNames = makeCommonNameMap(normalized);
  await saveToFile(commonNames, `./wildflower_names.data.json`);

  reportData = await fetch('indicator');
  await saveToFile(reportData, `./cache/indicator.json`);
  normalized = await optimise(reportData);
  // normalized = await optimise(indicator);
  await saveToFile(normalized, `./indicator.data.json`);
  commonNames = makeCommonNameMap(normalized);
  await saveToFile(commonNames, `./indicator_names.data.json`);

  reportData = await fetch('inventory');
  await saveToFile(reportData, `./cache/inventory.json`);
  normalized = await optimise(reportData);
  // normalized = await optimise(inventory);
  await saveToFile(normalized, `./inventory.data.json`);
  commonNames = makeCommonNameMap(normalized);
  await saveToFile(commonNames, `./inventory_names.data.json`);

  console.log('All done! 🚀');
})();
