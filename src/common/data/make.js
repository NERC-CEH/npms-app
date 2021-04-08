const fs = require('fs');
const fetchSheet = require('@flumens/fetch-onedrive-excel'); // eslint-disable-line
const optimise = require('./makeSpeciesOptimised');
const extractCommonNames = require('./makeSpeciesCommonNames');

const drive =
  'sites/flumensio.sharepoint.com,6230bb4b-9d52-4589-a065-9bebfdb9ce63,21520adc-6195-4b5f-91f6-7af0b129ff5c/drive';

const file = '01UPL42ZV7BRDOIRFZNJH3DVIAANZISEPX';

function saveToFile(data, fileName) {
  const saveSpeciesToFileWrap = (resolve, reject) => {
    console.log(`Writing ${fileName}`);

    const dataOption = err => {
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

(async () => {
  let sheetData = await fetchSheet({ drive, file, sheet: 'wildflower' });
  saveToFile(sheetData, `./cache/wildflower.json`);
  let normalized = await optimise(sheetData);
  saveToFile(normalized, `./wildflower.data.json`);
  let commonNames = extractCommonNames(normalized);
  saveToFile(commonNames, `./wildflower_names.data.json`);

  sheetData = await fetchSheet({ drive, file, sheet: 'indicator' });
  saveToFile(sheetData, `./cache/indicator.json`);
  normalized = await optimise(sheetData);
  saveToFile(normalized, `./indicator.data.json`);
  commonNames = extractCommonNames(normalized);
  saveToFile(commonNames, `./indicator_names.data.json`);

  sheetData = await fetchSheet({ drive, file, sheet: 'inventory' });
  saveToFile(sheetData, `./cache/inventory.json`);
  normalized = await optimise(sheetData);
  saveToFile(normalized, `./inventory.data.json`);
  commonNames = extractCommonNames(normalized);
  saveToFile(commonNames, `./inventory_names.data.json`);

  console.log('All done! 🚀');
})();
