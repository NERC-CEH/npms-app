import { observer } from 'mobx-react';
import {
  settingsOutline,
  exitOutline,
  lockClosedOutline,
  heartOutline,
  informationCircleOutline,
  helpBuoyOutline,
  openOutline,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Main, InfoMessage } from '@flumens';
import { IonIcon, IonList, IonItem, IonButton } from '@ionic/react';
import config from 'common/config';
import './styles.scss';

type Props = {
  isPlantPortal: boolean;
  user: any;
  logOut: any;
  refreshAccount: any;
  resendVerificationEmail: any;
};

const MenuMain = ({
  isPlantPortal,
  user,
  logOut,
  refreshAccount,
  resendVerificationEmail,
}: Props) => {
  const userName = `${user.firstName} ${user.lastName}`;

  const backendUrl = isPlantPortal
    ? config.backend.ppUrl
    : config.backend.npmsUrl;
  const isNotVerified = user.verified === false; // verified is undefined in old versions
  const userEmail = user.email;

  return (
    <Main className="app-menu">
      <h1 className="text-center">Menu</h1>
      <IonList lines="full">
        <h3 className="list-title">
          <T>User</T>
        </h3>
        <div className="rounded-list">
          <IonItem detail id="logout-button" onClick={logOut}>
            <IonIcon icon={exitOutline} size="small" slot="start" />
            <T>Logout</T>
            {': '}
            {userName}
          </IonItem>

          {isNotVerified && (
            <InfoMessage className="verification-warning">
              Looks like your <b>{{ userEmail } as any}</b> email hasn't been
              verified yet.
              <div>
                <IonButton fill="outline" onClick={refreshAccount}>
                  Refresh
                </IonButton>
                <IonButton fill="clear" onClick={resendVerificationEmail}>
                  Resend Email
                </IonButton>
              </div>
            </InfoMessage>
          )}
        </div>

        <h3 className="list-title">
          <T>Settings</T>
        </h3>
        <div className="rounded-list">
          <IonItem routerLink="/settings/menu" detail>
            <IonIcon icon={settingsOutline} size="small" slot="start" />
            <T>App</T>
          </IonItem>
        </div>

        <h3 className="list-title">
          <T>Info</T>
        </h3>
        <div className="rounded-list">
          <IonItem routerLink="/info/about" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            <T>About</T>
          </IonItem>
          <IonItem routerLink="/info/help" detail>
            <IonIcon icon={helpBuoyOutline} size="small" slot="start" />
            <T>Help</T>
          </IonItem>
          <IonItem routerLink="/info/resources" detail>
            <IonIcon
              icon={informationCircleOutline}
              size="small"
              slot="start"
            />
            <T>Resources</T>
          </IonItem>
          <IonItem routerLink="/info/credits" detail>
            <IonIcon icon={heartOutline} size="small" slot="start" />
            <T>Credits</T>
          </IonItem>
          <IonItem
            href={`${backendUrl}/privacy-policy`}
            target="_blank"
            detail
            detailIcon={openOutline}
          >
            <IonIcon icon={lockClosedOutline} size="small" slot="start" />
            <T>Privacy Policy</T>
          </IonItem>
        </div>
      </IonList>
    </Main>
  );
};

export default observer(MenuMain);
