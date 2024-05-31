import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Button, InfoMessage } from '@flumens';
import { IonIcon } from '@ionic/react';
import config from 'common/config';
import userModel from 'common/models/user';

const UploadedRecordInfoMessage = () => {
  const url = userModel.isPlantPortal()
    ? config.backend.ppUrl
    : config.backend.npmsUrl;

  return (
    <InfoMessage
      color="tertiary"
      prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
      skipTranslation
    >
      <T>
        This record has been submitted and cannot be edited within this App.
      </T>
      <Button
        href={`${url}`}
        fill="outline"
        color="primary"
        className="mx-auto mt-5 max-w-sm"
      >
        Website
      </Button>
    </InfoMessage>
  );
};

export default UploadedRecordInfoMessage;
