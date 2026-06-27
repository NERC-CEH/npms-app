import { observer } from 'mobx-react';
import {
  cloudDownloadOutline,
  cloudUploadOutline,
  personRemoveOutline,
  schoolOutline,
  shareOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, Toggle, InfoMessage, useAlert } from '@flumens';
import { IonIcon, IonList, IonItem, IonLabel, isPlatform } from '@ionic/react';
import config from 'common/config';

function useDatabaseExportDialog(exportFn: any) {
  const alert = useAlert();

  const showDatabaseExportDialog = () => {
    alert({
      header: 'Export',
      message: (
        <T>
          Are you sure you want to export the data?
          <p className="my-2 font-bold">
            This feature is intended solely for technical support and is not a
            supported method for exporting your data
          </p>
        </T>
      ),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Export',
          handler: exportFn,
        },
      ],
    });
  };

  return showDatabaseExportDialog;
}

type Props = {
  onToggle: (prop: string, checked: boolean) => void;
  sendAnalytics: boolean;
  useTraining: boolean;
  userId: any;
  exportDatabase: any;
  importDatabase: any;
  isPlantPortal: boolean;
};

const Menu = ({
  onToggle,
  useTraining,
  sendAnalytics,
  isPlantPortal,
  exportDatabase,
  importDatabase,
  userId,
}: Props) => {
  const showDatabaseExportDialog = useDatabaseExportDialog(exportDatabase);

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
          <IonItem onClick={showDatabaseExportDialog}>
            <IonIcon icon={cloudDownloadOutline} size="small" slot="start" />
            <T>Export database</T>
          </IonItem>

          {!isPlatform('hybrid') && (
            <IonItem onClick={importDatabase}>
              <IonIcon icon={cloudUploadOutline} size="small" slot="start" />
              Import database
            </IonItem>
          )}
        </div>

        <>
          <h3 className="list-title">Account</h3>
          <div className="rounded-list">
            <IonItem
              href={`mailto:support%40npms.org.uk?subject=Delete%20User%20Account%20Request&body=Please%20delete%20my%20${
                isPlantPortal ? 'PlantPortal' : 'NPMS'
              }%20user%20account%20ID=${userId}.`}
              className="text-danger-600"
            >
              <IonIcon icon={personRemoveOutline} size="small" slot="start" />
              <IonLabel>Delete account</IonLabel>
            </IonItem>
            <InfoMessage inline>
              You can delete your user account from the system.
            </InfoMessage>
          </div>
        </>
      </IonList>

      <p className="my-2 w-full max-w-2xl p-2.5 text-right opacity-60">{`v${config.version} (${config.build})`}</p>
    </Main>
  );
};

export default observer(Menu);
