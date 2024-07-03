/** ****************************************************************************
 * Generates species list suggestions.
 **************************************************************************** */
import indicatorSpecies from 'common/data/indicator.data.json';
import indicatorSpeciesNames from 'common/data/indicator_names.data.json';
import inventorySpecies from 'common/data/inventory.data.json';
import inventorySpeciesNames from 'common/data/inventory_names.data.json';
import wildflowerSpecies from 'common/data/wildflower.data.json';
import wildflowerSpeciesNames from 'common/data/wildflower_names.data.json';
import { Level } from 'Survey/common/config';
import searchCommonNames from './commonNamesSearch';
import searchSciNames from './scientificNamesSearch';
import { isPhraseScientific } from './searchHelpers';

type SpeciesId = number;
type SpeciesFrequency = number;
type SpeciesDifficulty = number;
type SpeciesName = string;
type SpeciesCommonName = string;
export type Species = {
  0: SpeciesId;
  1: SpeciesFrequency;
  2: SpeciesDifficulty;
  3: SpeciesName;
  4?: SpeciesCommonName[];
};

type GenusId = number;
type GroupId = number;
type GenusName = string;
type GenusCommonName = string;
export type Genus = {
  0: GenusId;
  1: GroupId;
  2: GenusName;
  3?: Species[];
  4?: GenusCommonName[];
};

export type Genera = Genus[];

const species = {
  wildflower: wildflowerSpecies as unknown as Genera,
  indicator: indicatorSpecies as unknown as Genera,
  inventory: inventorySpecies as unknown as Genera,
};

type GenusIndex = number;
type SpeciesIndex = number;
type NameIndex = number;
export type GenusNamePointer = { 0: GenusIndex; 1: NameIndex };
export type CommonNamePointer = {
  0: GenusIndex;
  1: SpeciesIndex;
  2: NameIndex;
};
export type NamePointer = GenusNamePointer | CommonNamePointer;
export type NamePointers = NamePointer[][];
const commonNamePointers = {
  wildflower: wildflowerSpeciesNames as unknown as NamePointers,
  indicator: indicatorSpeciesNames as unknown as NamePointers,
  inventory: inventorySpeciesNames as unknown as NamePointers,
};

const MAX = 20;

export type Options = {
  level: Level;
  maxResults?: number;
  namesFilter?: '' | 'scientific' | 'common';
  informalGroups?: number[];
};

export type Taxon = {
  /**
   * Warehouse id
   */
  warehouseId: number;
  /**
   * Species group
   */
  group?: number;
  /**
   * Scientific name
   */
  scientificName: string;
  /**
   * Common name array.
   */
  commonNames?: string[];
  /**
   * Where in the genera array the search result was found.
   */
  arrayId?: number;
  /**
   * Where in the species array the search result was found.
   */
  speciesId?: number;
  /**
   * Which common_names array index to use if any.
   */
  foundInName?: number;
  /**
   * Records with the species.
   */
  frequency?: number;
  /**
   * ID difficulty level.
   */
  difficulty?: number;
};

export type SearchResults = Taxon[];

/**
 * Returns an array of species in format
 */
// todo Accent Folding: https://alistapart.com/article/accent-folding-for-auto-complete
export default async function search(
  searchPhrase: string,
  options: Options
): Promise<SearchResults> {
  let results: any = [];

  if (!searchPhrase) return results;

  const { level } = options;
  let maxResults = options.maxResults || MAX;
  const scientificOnly = options.namesFilter === 'scientific';
  const skipSciNames = options.namesFilter === 'common';
  const informalGroups = options.informalGroups || [];

  // normalize the search phrase
  const normSearchPhrase = searchPhrase.toLowerCase();

  // check if scientific search
  const isScientific = isPhraseScientific(normSearchPhrase);
  const skipCommonNames = isScientific || scientificOnly;
  if (!skipCommonNames) {
    const foundNames = searchCommonNames(
      species[level],
      commonNamePointers[level],
      normSearchPhrase,
      maxResults,
      informalGroups
    );
    results = [...foundNames];
  }

  maxResults -= results.length;
  if (!skipSciNames) {
    const foundSciNames = searchSciNames(
      species[level],
      normSearchPhrase,
      maxResults,
      false,
      informalGroups
    );

    results = [...results, ...foundSciNames];
  }

  return results;
}
