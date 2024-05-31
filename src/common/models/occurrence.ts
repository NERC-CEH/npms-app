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

export type Attrs = OccurrenceAttrs & {
  taxon: Taxon;
  cover: string;
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
}
