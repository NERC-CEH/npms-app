import React from 'react';
import { observer } from 'mobx-react';
import exact from 'prop-types-exact';
import { Main, Toggle, InfoMessage, alert } from '@apps';
import PropTypes from 'prop-types';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import {
  shareSocialOutline,
  paperPlaneOutline,
  schoolOutline,
} from 'ionicons/icons';
import './styles.scss';

@observer
class Component extends React.Component {
  static propTypes = exact({
    onToggle: PropTypes.func.isRequired,
    uploadAll: PropTypes.func.isRequired,
    useTraining: PropTypes.bool,
    sendAnalytics: PropTypes.bool,
  });

  sendAllDialog = () => {
    const { uploadAll } = this.props;

    alert({
      header: 'Submit All',
      message: 'Are you sure you want to set all valid records for submission?',
      buttons: [
        { text: 'Cancel', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: uploadAll,
        },
      ],
      skipTranslation: true,
    });
  };

  render() {
    const { sendAnalytics, onToggle, useTraining } = this.props;

    const onSendAnalyticsToggle = checked => onToggle('sendAnalytics', checked);
    const onTrainingToggle = checked => onToggle('useTraining', checked);

    return (
      <Main>
        <IonList lines="full">
          <IonItem id="app-reset-btn" onClick={this.sendAllDialog}>
            <IonIcon icon={paperPlaneOutline} size="small" slot="start" />
            Sumbit All
          </IonItem>
          <InfoMessage color="medium">
            Submit all finished records to NPMS website.
          </InfoMessage>

          <IonItem>
            <IonIcon icon={schoolOutline} size="small" slot="start" />
            <IonLabel>Use Training</IonLabel>
            <Toggle onToggle={onTrainingToggle} checked={useTraining} />
          </IonItem>
          <InfoMessage color="medium">
            When in training mode, the records you create will be only used for
            your training purposes.
          </InfoMessage>

          <IonItem>
            <IonIcon icon={shareSocialOutline} size="small" slot="start" />
            <IonLabel>Share App Analytics</IonLabel>
            <Toggle onToggle={onSendAnalyticsToggle} checked={sendAnalytics} />
          </IonItem>
          <InfoMessage color="medium">
            Share app crash data so we can make the app more reliable.
          </InfoMessage>
        </IonList>
      </Main>
    );
  }
}

export default Component;
