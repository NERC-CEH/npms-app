import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { NavContext } from '@ionic/react';
import { Header, Page } from 'common/flumens';
import Occurrence from 'common/models/occurrence';
import Main from './Main';

type Props = { occurrence: Occurrence };

const OccurrenceHome = ({ occurrence }: Props) => {
  const match = useRouteMatch();
  const { navigate, goBack } = useContext(NavContext);

  const onCoverChange = (cover: any) => {
    const isUpdating = occurrence.attrs.cover;

    // eslint-disable-next-line no-param-reassign
    occurrence.attrs.cover = cover;

    let baseUrl: any = match.url.split('/');
    baseUrl.pop();
    baseUrl = baseUrl.join('/');
    if (isUpdating) {
      goBack();
      return;
    }
    navigate(`${baseUrl}/search`, 'none', 'replace');
  };

  return (
    <Page id="npms-occurrence-home">
      <Header title="Home" />
      <Main occurrence={occurrence} onCoverChange={onCoverChange} />
    </Page>
  );
};

export default OccurrenceHome;