import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { NavContext } from '@ionic/react';
import { Header, Page } from 'common/flumens';
import Occurrence, { CoverKeys } from 'common/models/occurrence';
import Sample from 'common/models/sample';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import Main from './Main';

type Props = { sample: Sample; occurrence: Occurrence };

const OccurrenceHome = ({ sample, occurrence }: Props) => {
  const match = useRouteMatch();
  const { navigate, goBack } = useContext(NavContext);

  const abundanceType = sample.attrs.abundanceType!;
  const isPercentage = abundanceType === 'Percentage';
  const isCount = abundanceType === 'Individual plant count';
  const isFrequency = abundanceType === 'Cell frequency';
  const isNotSingleChoice = isPercentage || isCount || isFrequency;

  const navigateToNextSearch = () => {
    let baseUrl: any = match.url.split('/');
    baseUrl.pop();
    baseUrl = baseUrl.join('/');

    navigate(`${baseUrl}/search`, 'none', 'replace');
  };

  const isUpdating = occurrence.getCover();

  const onCoverChange = (coverType: CoverKeys) => (cover: any) => {
    // eslint-disable-next-line no-param-reassign
    occurrence.attrs[coverType] = cover;

    if (isNotSingleChoice) return;

    if (isUpdating) {
      goBack();
      return;
    }

    navigateToNextSearch();
  };

  const nextButton = (
    <HeaderButton onPress={navigateToNextSearch}>Next</HeaderButton>
  );

  return (
    <Page id="npms-occurrence-home">
      <Header
        title="Occurrence"
        rightSlot={isNotSingleChoice && !isUpdating && nextButton}
      />
      <Main
        occurrence={occurrence}
        onCoverChange={onCoverChange}
        abundanceType={abundanceType}
      />
    </Page>
  );
};

export default OccurrenceHome;
