import { observer } from 'mobx-react';
import {
  personRemoveOutline,
  schoolOutline,
  shareOutline,
} from 'ionicons/icons';
import { Main, Toggle, InfoMessage } from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import config from 'common/config';

type Props = {
  onToggle: (prop: string, checked: boolean) => void;
  sendAnalytics: boolean;
  useTraining: boolean;
  userId: any;
  isPlantPortal: boolean;
};

const Menu = ({
  onToggle,
  useTraining,
  sendAnalytics,
  isPlantPortal,
  userId,
}: Props) => {
  const onTrainingToggle = (checked: boolean) =>
    onToggle('useTraining', checked);

  const onSendAnalyticsToggle = (checked: boolean) =>
    onToggle('sendAnalytics', checked);

  return (
    <Main className="app-settings">
      <IonList lines="full">
        <h3 className="list-title">App</h3>
        <div className="rounded-list">
          <Toggle
            prefix={<IonIcon src={schoolOutline} className="size-6" />}
            label="Training Mode"
            defaultSelected={useTraining}
            onChange={onTrainingToggle}
          />
          <InfoMessage inline>
            Mark any new records as &#39;training&#39; and exclude from all
            reports.
          </InfoMessage>
          <Toggle
            prefix={<IonIcon src={shareOutline} className="size-6" />}
            label="Share App Analytics"
            defaultSelected={sendAnalytics}
            onChange={onSendAnalyticsToggle}
          />
          <InfoMessage inline>
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </div>

        <>
          <h3 className="list-title">Account</h3>
          <div className="destructive-item rounded-list">
            <>
              <IonItem
                href={`mailto:support%40npms.org.uk?subject=Delete%20User%20Account%20Request&body=Please%20delete%20my%20${
                  isPlantPortal ? 'PlantPortal' : 'NPMS'
                }%20user%20account%20ID=${userId}.`}
                className="!text-danger"
              >
                <IonIcon icon={personRemoveOutline} size="small" slot="start" />
                <IonLabel>Delete account</IonLabel>
              </IonItem>
              <InfoMessage inline>
                You can delete your user account from the system.
              </InfoMessage>
            </>
          </div>
        </>
      </IonList>

      <p className="my-2 w-full max-w-2xl p-2.5 text-right opacity-60">{`v${config.version} (${config.build})`}</p>
    </Main>
  );
};

export default observer(Menu);
