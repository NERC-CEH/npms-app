import { IObservableArray } from 'mobx';
import {
  Occurrence as OccurrenceOriginal,
  OccurrenceAttrs,
  validateRemoteModel,
} from '@flumens';
import { Taxon } from 'Survey/common/Components/TaxonSearchPage/TaxonSearch';
import { Survey } from 'Survey/common/config';
import Media from './image';
import Sample from './sample';

export { type Taxon } from 'Survey/common/Components/TaxonSearchPage/TaxonSearch';

export type Grid =
  | 'canopy-grid'
  | 'ground-layer-grid'
  // NPMS
  | 'main-species-grid'
  | 'additional-species-grid';

export const byGrid = (grid: Grid) => (occ: Occurrence) =>
  occ.attrs.grid === grid;

export type CoverKeys =
  | 'cover'
  | 'coverDomin'
  | 'coverBB'
  | 'coverPresence'
  | 'coverPercentage'
  | 'coverCount'
  | 'coverFrequency';

type CoverAttrs = { [key in CoverKeys]?: any };
export type Attrs = OccurrenceAttrs &
  CoverAttrs & {
    taxon: Taxon;
    grid: Grid;
  };

export default class Occurrence extends OccurrenceOriginal<Attrs> {
  static fromJSON(json: any) {
    return super.fromJSON(json, Media);
  }

  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  declare getSurvey: () => Survey;

  validateRemote = validateRemoteModel;

  isDisabled = () => this.isUploaded();

  getPrettyName() {
    // eslint-disable-next-line prefer-destructuring
    const taxon: Taxon = this.attrs.taxon;
    if (!taxon) return '';

    if (Number.isFinite(taxon.foundInName))
      return taxon.commonNames?.[taxon.foundInName as number];

    return taxon.scientificName;
  }

  getCover() {
    return (
      this.attrs.cover ||
      this.attrs.coverBB ||
      this.attrs.coverDomin ||
      this.attrs.coverPresence ||
      this.attrs.coverCount ||
      this.attrs.coverPercentage ||
      this.attrs.coverFrequency
    );
  }
}
