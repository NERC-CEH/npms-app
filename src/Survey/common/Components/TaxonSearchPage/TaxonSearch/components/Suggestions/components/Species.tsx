import { IonItem } from '@ionic/react';
import { Taxon } from '../../../index';
import './styles.scss';

const onClick = (e: any, species: Taxon, onSelect: any) => {
  const edit = e.target.tagName === 'BUTTON';

  onSelect(species, edit);
};

/**
 * Highlight the searched parts of taxa names.
 * @param name
 * @param searchPhrase
 * @returns {*}
 * @private
 */
function prettifyName(species: Taxon, searchPhrase: string) {
  const { commonNames } = species as any;
  const name = Number.isFinite(species.foundInName)
    ? (commonNames[species.foundInName as any] as string)
    : species.scientificName;

  const searchPos = name.toLowerCase().indexOf(searchPhrase);
  if (!(searchPos >= 0)) {
    return name;
  }
  return (
    <>
      {name.slice(0, searchPos)}
      <b>{name.slice(searchPos, searchPos + searchPhrase.length)}</b>
      {name.slice(searchPos + searchPhrase.length)}
    </>
  );
}

type Props = {
  species: Taxon & { isRecorded?: boolean };
  searchPhrase: any;
  onSelect: (species: Taxon, edit: boolean) => void;
};

const SpeciesItem = ({ species, searchPhrase, onSelect }: Props) => {
  const prettyName = prettifyName(species, searchPhrase);
  const { isRecorded } = species;

  const onClickWrap = (e: any) => !isRecorded && onClick(e, species, onSelect);
  return (
    <IonItem
      className={`search-result ${isRecorded ? 'recorded' : ''}`}
      onClick={onClickWrap}
    >
      <div className="taxon">{prettyName}</div>
    </IonItem>
  );
};

export default SpeciesItem;
