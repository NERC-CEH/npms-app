'use strict'; // eslint-disable-line
const taxonCleaner = require('./makeSpeciesClean');

function normalizeValue(value) {
  // check if int
  // https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
  const int = value * 1;
  if (!Number.isNaN(int)) {
    return int;
  }
  return value;
}

/**
 * Optimises the array by grouping species to genus.
 */
function optimise(speciesFromReport) {
  const optimised = [];

  function addGenus(taxa) {
    const taxon = taxonCleaner(taxa.taxon, false, true);
    if (!taxon) {
      return;
    }

    const genus = [
      taxa.id, // id
      taxa.taxon_group, // group
      taxon, // taxon
    ];

    const name = taxonCleaner(taxa.common_name, true, true);
    if (name) {
      genus.push(name);
    }

    const synonym = taxonCleaner(taxa.synonym, true, true);
    if (synonym) {
      genus.push(synonym);
    }

    optimised.push(genus);
  }

  /**
   * Finds the last genus entered in the optimised list.
   * Looks for the matching taxa and informal group.
   * @param taxa
   * @param taxaNameSplitted
   * @returns {*}
   */
  function getLastGenus(taxa, taxaNameSplitted, index) {
    const lastEntry = index || optimised.length - 1;
    if (lastEntry < 0) {
      return null;
    }

    let lastGenus = optimised[lastEntry];

    // no genus with the same name and group was found
    if (lastGenus[2] !== taxaNameSplitted[0]) {
      // create a new genus with matching group
      lastGenus = [0, taxa.taxon_group, taxaNameSplitted[0], []];
      optimised.push(lastGenus);
      return lastGenus;
    }

    // if taxa groups don't match then recursively go to check
    // next entry that matches the taxa and the group
    if (lastGenus[1] !== taxa.taxon_group) {
      return getLastGenus(taxa, taxaNameSplitted, lastEntry - 1);
    }

    return lastGenus;
  }

  function addSpecies(taxa, taxaNameSplitted) {
    // species that needs to be appended to genus
    let lastGenus = getLastGenus(taxa, taxaNameSplitted);
    if (!lastGenus) {
      addGenus({
        id: 0,
        taxon: taxaNameSplitted[0],
        taxon_group: taxa.taxon_group,
      });
      lastGenus = optimised[optimised.length - 1];
    }

    // check genus species array - must be last
    let speciesArray = lastGenus[lastGenus.length - 1];
    if (typeof speciesArray !== 'object') {
      // new one if doesn't exist
      speciesArray = [];
      lastGenus.push(speciesArray);
    }

    const species = [];
    // id
    species.push(normalizeValue(taxa.id));

    // difficulty
    species.push(taxa.difficulty);

    // taxon
    const taxon = taxaNameSplitted.slice(1).join(' ');
    const taxonClean = taxonCleaner(taxon, false);
    if (!taxonClean) {
      // cleaner might stripped all
      return;
    }
    species.push(taxonClean); // remove genus name

    // common name
    const commonName = taxonCleaner(taxa.common_name, true);
    if (commonName) {
      species.push(commonName);
    }

    // synonym name
    const synonym = taxonCleaner(taxa.synonym, true);
    if (synonym) {
      species.push(synonym);
    }

    speciesArray.push(species);
  }

  function isGenusDuplicate(taxa, index) {
    const lastEntry = index || optimised.length - 1;
    if (lastEntry < 0) {
      // empty array
      return false;
    }
    const genus = optimised[lastEntry];
    if (genus.taxon !== taxa.taxon) {
      // couldn't find duplicate
      return false;
    }

    if (genus.taxon_group !== taxa.taxon_group) {
      // recursively look for another one down the line
      return isGenusDuplicate(taxa, lastEntry - 1);
    }
    return true;
  }

  speciesFromReport.forEach(taxa => {
    const taxaNameSplitted = taxa.taxon.split(' ');

    // hybrid genus names starting with X should
    // have a full genus eg. X Agropogon littoralis
    if (taxaNameSplitted[0] === 'X') {
      taxaNameSplitted[0] = `${taxaNameSplitted.shift()} ${
        taxaNameSplitted[0]
      }`;
    }
    if (taxaNameSplitted.length === 1) {
      // genus
      if (isGenusDuplicate(taxa)) {
        console.warn(`Duplicate genus found: ${taxa.toString()}`);
        return;
      }
      addGenus(taxa);
    } else {
      addSpecies(taxa, taxaNameSplitted);
    }
  });

  return optimised;
}

module.exports = optimise;
