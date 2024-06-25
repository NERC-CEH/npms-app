import { IObservableArray } from 'mobx';
import {
  Occurrence as OccurrenceOriginal,
  OccurrenceAttrs,
  validateRemoteModel,
} from '@flumens';
import {
  dominCoverAttr,
  bbCoverAttr,
  presenceCoverAttr,
  percentageCoverAttr,
  frequencyCoverAttr,
  countCoverAttr,
} from 'Survey/Standard/config';
import { Survey, gridAttr } from 'Survey/common/config';
import Media from './image';
import Sample from './sample';

export type Grid =
  | 'canopy-grid'
  | 'ground-layer-grid'
  // NPMS
  | 'main-species-grid'
  | 'additional-species-grid';

export const byGrid = (grid: Grid) => (occ: Occurrence) =>
  occ.attrs[gridAttr.id] === grid;

export type CoverKeys =
  | 'cover'
  | typeof dominCoverAttr.id
  | typeof bbCoverAttr.id
  | typeof presenceCoverAttr.id
  | typeof percentageCoverAttr.id
  | typeof frequencyCoverAttr.id
  | typeof countCoverAttr.id;

export type Taxon = {
  /**
   * Warehouse id
   */
  taxaTaxonListId: string;
  /**
   * Picked by user name.
   */
  taxon: string;
  /**
   * Scientific name.
   */
  preferredTaxon?: string;
  /**
   * Common name.
   */
  defaultCommonName?: string;
};

export type Attrs = OccurrenceAttrs & { [key in CoverKeys]?: any } & Taxon & {
    [gridAttr.id]: Grid;
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

  getPrettyName = () =>
    this.attrs.taxon ||
    this.attrs.defaultCommonName ||
    this.attrs.preferredTaxon ||
    '';
}
