import { useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { NavContext } from '@ionic/react';
import { Header, Page } from 'common/flumens';
import Occurrence from 'common/models/occurrence';
import { coverAttr } from 'Survey/common/config';
import Main from './Main';

type Props = { occurrence: Occurrence };

const OccurrenceHome = ({ occurrence }: Props) => {
  const match = useRouteMatch();
  const { goBack } = useContext(NavContext);

  const onCoverChange = (cover: any) => {
    if (occurrence.isDisabled()) return;

    // const isUpdating = occurrence.attrs[coverAttr.id];

    // eslint-disable-next-line no-param-reassign
    occurrence.attrs[coverAttr.id] = cover;

    let baseUrl: any = match.url.split('/');
    baseUrl.pop();
    baseUrl = baseUrl.join('/');
    // if (isUpdating) {
    //   goBack();
    //   return;
    // }
    goBack();
    // navigate(`${baseUrl}/search`, 'none', 'replace');
  };

  return (
    <Page id="npms-occurrence-home">
      <Header title="Home" />
      <Main occurrence={occurrence} onCoverChange={onCoverChange} />
    </Page>
  );
};

export default OccurrenceHome;
