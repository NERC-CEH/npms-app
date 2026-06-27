import { IObservableArray } from 'mobx';
import { OccurrenceModel, OccurrenceData, validateRemoteModel } from '@flumens';
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
  occ.data[gridAttr.id] === grid;

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
   * Picked by user name. The value is not stored in the warehouse.
   */
  taxon: string;
  /**
   * Scientific name. The value is not stored in the warehouse.
   */
  preferredTaxon?: string;
  /**
   * Common name. The value is not stored in the warehouse.
   */
  defaultCommonName?: string;
  /**
   * ID difficulty. The value is not stored in the warehouse.
   */
  taxonDifficulty?: number;
};

export type Data = OccurrenceData &
  Partial<Record<CoverKeys, any>> &
  Taxon & {
    [gridAttr.id]: Grid;
  };

export default class Occurrence<
  T extends Data = Data,
> extends OccurrenceModel<T> {
  declare media: IObservableArray<Media>;

  declare parent?: Sample;

  declare getSurvey: () => Survey;

  validateRemote = validateRemoteModel;

  constructor(options: any) {
    super({ ...options, Media });
  }

  getPrettyName = () =>
    this.data.taxon ||
    this.data.defaultCommonName ||
    this.data.preferredTaxon ||
    '';
}
