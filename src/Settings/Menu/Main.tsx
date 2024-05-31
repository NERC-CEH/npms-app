import { observer } from 'mobx-react';
import {
  personRemoveOutline,
  schoolOutline,
  shareOutline,
  warningOutline,
} from 'ionicons/icons';
import { Main, useAlert, Toggle, InfoMessage } from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import config from 'common/config';

function useUserDeleteDialog(deleteUser: any, isPlantPortal: boolean) {
  const alert = useAlert();
  const url = isPlantPortal ? config.backend.ppUrl : config.backend.npmsUrl;

  const showUserDeleteDialog = () => {
    alert({
      header: 'Account delete',
      message: (
        <>
          Are you sure you want to delete your account?
          <InfoMessage
            color="danger"
            prefix={<IonIcon src={warningOutline} />}
            skipTranslation
          >
            This will remove your account on the <b>{{ url } as any}</b>{' '}
            website. You will lose access to any records that you have
            previously submitted using the app or website.
          </InfoMessage>
        </>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: deleteUser,
        },
      ],
    });
  };

  return showUserDeleteDialog;
}

type Props = {
  onToggle: (prop: string, checked: boolean) => void;
  sendAnalytics: boolean;
  useTraining: boolean;
  isPlantPortal: boolean;
  deleteUser: any;
};

const Menu = ({
  onToggle,
  useTraining,
  isPlantPortal,
  sendAnalytics,
  deleteUser,
}: Props) => {
  const showUserDeleteDialog = useUserDeleteDialog(deleteUser, isPlantPortal);

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
              <IonItem onClick={showUserDeleteDialog} className="!text-danger">
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
