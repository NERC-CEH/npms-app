import { useContext } from 'react';
import { observer } from 'mobx-react';
import { useRouteMatch } from 'react-router';
import { Page, Main, Header } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence, { Grid, Taxon } from 'models/occurrence';
import Sample from 'models/sample';
import TaxonSearch, { Taxon as SearchTaxon } from './TaxonSearch';

type Props = {
  sample: Sample;
  subSample?: Sample;
  subSubSample?: Sample;
};

const TaxonSearchPage = ({ sample, subSample, subSubSample }: Props) => {
  const { navigate, goBack } = useContext(NavContext);
  const match = useRouteMatch<{ grid: Grid }>();
  const { grid } = match.params;

  const onSpeciesSelected = async (taxonUKSI: SearchTaxon) => {
    const model: Sample = subSample || sample;
    const subModel = subSubSample || subSample;

    const taxon: Taxon = {
      taxon: taxonUKSI.commonNames?.[0] || taxonUKSI.scientificName,
      defaultCommonName: taxonUKSI.commonNames?.[0],
      preferredTaxon: taxonUKSI.scientificName,
      taxaTaxonListId: `${taxonUKSI.warehouseId}`,
    };

    if (!subModel) {
      const modelSurvey = model.getSurvey();
      const newOcc: Occurrence = modelSurvey.occ!.create!({
        Occurrence,
        taxon,
        grid,
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
    Object.assign(occ.attrs, taxon);

    model.save();

    goBack();
  };

  let { level } = sample.metadata;

  if (grid === 'additional-species-grid') {
    level = 'inventory';
  }

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
