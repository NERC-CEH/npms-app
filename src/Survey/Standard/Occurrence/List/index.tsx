import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { Header, Page } from '@flumens';
import { NavContext } from '@ionic/react';
import Occurrence, { Grid } from 'common/models/occurrence';
import Sample from 'models/sample';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import Main from './Main';

type Props = { sample: Sample };

const OccurrenceList = ({ sample }: Props) => {
  const { navigate } = useContext(NavContext);
  const match = useRouteMatch<{ grid: Grid }>();

  const onSpeciesAdd = () => navigate(`${match.url}/search`);
  const onSpeciesDelete = (occ: Occurrence) => occ.destroy();

  const addSpeciesButton = !sample.isDisabled() ? (
    <HeaderButton onPress={onSpeciesAdd}>Add</HeaderButton>
  ) : null;

  return (
    <Page id="npms-occurrence-list">
      <Header title="Species" rightSlot={addSpeciesButton} />
      <Main
        sample={sample}
        onDelete={onSpeciesDelete}
        grid={match.params.grid}
      />
    </Page>
  );
};

export default OccurrenceList;
