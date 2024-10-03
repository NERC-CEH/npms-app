import {
  ForwardRefRenderFunction,
  useState,
  createRef,
  forwardRef,
  RefObject,
} from 'react';
import { IonSearchbar, useIonViewDidEnter } from '@ionic/react';
import { Level } from 'Survey/common/config';
import Suggestions from './components/Suggestions';
import './styles.scss';
import searchSpecies, { Taxon } from './utils';

export { type Taxon } from './utils';

const MIN_SEARCH_LENGTH = 2;

const annotateRecordedTaxa = (searchResults: any, recordedTaxa: number[]) => {
  const recordedTaxaWrap = (result: Taxon) =>
    recordedTaxa.includes(result.warehouseId)
      ? { ...result, ...{ isRecorded: true } }
      : result;

  return searchResults.map(recordedTaxaWrap);
};

type Props = {
  level?: Level;
  onSpeciesSelected: any;
  recordedTaxa?: number[];
};

const TaxonSearch: ForwardRefRenderFunction<any, Props> = (
  { recordedTaxa, onSpeciesSelected, level = 'inventory' },
  ref
) => {
  const localRef = createRef<any>();
  const input = (ref as RefObject<any>) || localRef;

  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any>(null);

  const onInputKeystroke = async (e: any) => {
    let newSearchPhrase = e.target.value;

    const isValidSearch =
      typeof newSearchPhrase === 'string' &&
      newSearchPhrase.length >= MIN_SEARCH_LENGTH;
    if (!isValidSearch) {
      setSearchPhrase('');
      setSearchResults(null);
      return;
    }

    newSearchPhrase = newSearchPhrase.toLowerCase();

    // search
    const newSearchResults = await searchSpecies(newSearchPhrase, { level });

    const annotatedSearchResults = annotateRecordedTaxa(
      newSearchResults,
      recordedTaxa || []
    );

    setSearchPhrase(newSearchPhrase);
    setSearchResults(annotatedSearchResults);
  };

  const onInputClear = () => {
    setSearchPhrase('');
    setSearchResults(null);
  };

  useIonViewDidEnter(() => {
    if (input.current) {
      input.current.setFocus();
    }
  }, [input]);

  return (
    <>
      <IonSearchbar
        id="taxon"
        ref={input}
        placeholder="Species name"
        debounce={300}
        onIonInput={onInputKeystroke}
        onIonClear={onInputClear}
        showCancelButton="never"
      />

      <Suggestions
        searchResults={searchResults}
        searchPhrase={searchPhrase}
        onSpeciesSelected={onSpeciesSelected}
        level={level}
      />
    </>
  );
};

export default forwardRef(TaxonSearch);
