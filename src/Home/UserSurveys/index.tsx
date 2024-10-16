import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { Page, Main, Badge } from '@flumens';
import {
  IonSegment,
  IonLabel,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
} from '@ionic/react';
import { getPending } from 'models/collections/samples';
import PendingSurveys from './Pending';
import UploadedSurveys from './Uploaded';
import './styles.scss';

const UserSurveyComponent = () => {
  const [segment, setSegment] = useState<'pending' | 'uploaded'>('pending');
  const match = useRouteMatch<{ id?: 'pending' | 'uploaded' }>();

  useEffect(() => {
    match.params?.id && setSegment(match.params?.id);
  }, [match.params?.id]);

  const onSegmentClick = (e: any) => {
    const newSegment = e.detail.value;
    setSegment(newSegment);

    const basePath = match.path.split('/:id?')[0];
    const path = `${basePath}/${newSegment}`;
    window.history.replaceState(null, '', path); // https://stackoverflow.com/questions/57101831/react-router-how-do-i-update-the-url-without-causing-a-navigation-reload
  };

  const showingPending = segment === 'pending';
  const showingUploaded = segment === 'uploaded';

  const getPendingSurveysCount = () => {
    const pendingSurveysCount = getPending().length;
    if (!pendingSurveysCount) return null;

    return (
      <Badge
        color="warning"
        skipTranslation
        size="small"
        fill="solid"
        className="mx-1"
      >
        {pendingSurveysCount}
      </Badge>
    );
  };

  return (
    <Page id="home-user-surveys">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonSegment onIonChange={onSegmentClick} value={segment}>
            <IonSegmentButton value="pending">
              <IonLabel className="ion-text-wrap">
                <T>Pending</T>
                {getPendingSurveysCount()}
              </IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="uploaded">
              <IonLabel className="ion-text-wrap">
                <T>Uploaded</T>
              </IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <Main
        className="[--padding-bottom:0] [--padding-top:0]"
        forceOverscroll={false}
        scrollY={false}
      >
        {showingPending && <PendingSurveys />}

        {showingUploaded && <UploadedSurveys />}
      </Main>
    </Page>
  );
};

export default observer(UserSurveyComponent);
