import { useContext } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import { Page, Main, Header } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence from 'models/occurrence';
import Sample from 'models/sample';
import TaxonSearch from './TaxonSearch';

type Props = {
  sample: Sample;
  subSample?: Sample;
  subSubSample?: Sample;
};

type Taxon = {
  scientificName: string;
  commonName?: string;
  warehouseId: number;
};

const TaxonSearchPage = ({ sample, subSample, subSubSample }: Props) => {
  const { navigate, goBack } = useContext(NavContext);
  const match = useRouteMatch();

  const transformUKSIToAppTaxon = (taxon: Taxon) => ({
    commonName: taxon.commonName || '',
    scientificName: taxon.scientificName,
    warehouseId: taxon.warehouseId,
  });

  const onSpeciesSelected = async (taxon: Taxon) => {
    const model: Sample = subSample || sample;
    const subModel = subSubSample || subSample;

    if (!subModel) {
      const modelSurvey = model.getSurvey();
      const newOcc: Occurrence = modelSurvey.occ!.create!({
        Occurrence,
        taxon,
      });

      model.occurrences.push(newOcc);

      model.save();

      let baseUrl: any = match.url.split('/');
      baseUrl.pop();
      baseUrl = baseUrl.join('/');
      navigate(`${baseUrl}/${newOcc.cid}`, 'none', 'replace');
      // goBack();
      return;
    }

    const [occ] = subModel.occurrences;
    occ.attrs.taxon = {
      ...occ.attrs.taxon,
      ...transformUKSIToAppTaxon(taxon),
    };

    model.save();

    goBack();
  };

  const { level } = sample.metadata;

  return (
    <Page id="taxon-search">
      <Header title="Species" />
      <Main>
        <TaxonSearch onSpeciesSelected={onSpeciesSelected} level={level} />
      </Main>
    </Page>
  );
};

export default observer(TaxonSearchPage);
