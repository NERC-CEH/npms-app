import { IonList } from '@ionic/react';
import InfoBackgroundMessage from 'common/Components/InfoBackgroundMessage';
import { Level } from 'Survey/common/config';
import Species from './components/Species';

/**
 * Some common names might be identical so needs to add
 * a latin name next to it.
 * @param suggestions
 */
function deDuplicateSuggestions(suggestions: any) {
  let previous: any = {};
  const results: any = [];

  const taxonWrap = (taxon: any) => {
    const name = taxon[taxon.foundInName] || '';
    const nameNormalized = name.toLocaleLowerCase();

    const previousName = previous[previous.foundInName] || '';
    const previousNameNormalized = previousName.toLocaleLowerCase();

    const noCommonNames = !nameNormalized || !previousNameNormalized;
    const isUnique = noCommonNames || nameNormalized !== previousNameNormalized;

    if (!isUnique) {
      return;
    }

    results.push(taxon);
    previous = taxon;
  };

  suggestions.forEach(taxonWrap);

  return results;
}

const getNPMSLevelInfo = (level?: Level) => {
  if (!level || level === 'inventory') return null;
  return (
    <InfoBackgroundMessage className="text-left">
      Remember that if you are surveying at the Wildflower or Indicator levels,
      then only NPMS indicator species will be available for selection.
    </InfoBackgroundMessage>
  );
};

const getSearchInfo = () => (
  <InfoBackgroundMessage className="text-left">
    For quicker searching of the taxa you can use different shortcuts. For
    example, to find <i>Bellis perennis</i> you can type in the search bar:
    <br />
    <br />
    <i>bel per</i>
    <br />
    <i>belpe</i>
    <br />
    <i>bel .is</i>
    <br />
    <i>. perennis</i>
  </InfoBackgroundMessage>
);

type Props = {
  searchResults?: any[];
  searchPhrase: string;
  onSpeciesSelected: any;
  level?: Level;
};
const Suggestions = ({
  searchResults,
  searchPhrase,
  onSpeciesSelected,
  level,
}: Props) => {
  if (!searchResults) {
    return (
      <IonList id="suggestions" lines="none">
        {getNPMSLevelInfo(level)}
        {getSearchInfo()}
      </IonList>
    );
  }

  let suggestionsList;
  if (!searchResults.length) {
    suggestionsList = (
      <InfoBackgroundMessage>
        No species found with this name
      </InfoBackgroundMessage>
    );
  } else {
    const deDuped = deDuplicateSuggestions(searchResults);

    const speciesWrap = (species: any) => {
      const key = `${species.warehouseId}-${species.foundInName}-${species.isFavourite}`;

      return (
        <Species
          key={key}
          species={species}
          searchPhrase={searchPhrase}
          onSelect={onSpeciesSelected}
        />
      );
    };

    suggestionsList = deDuped.map(speciesWrap);
  }

  return (
    <IonList id="suggestions" lines="none">
      {suggestionsList}
    </IonList>
  );
};

export default Suggestions;
