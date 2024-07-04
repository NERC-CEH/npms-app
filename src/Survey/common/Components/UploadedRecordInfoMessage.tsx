import { informationCircleOutline } from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import { Button, InfoMessage } from '@flumens';
import { IonIcon } from '@ionic/react';
import config from 'common/config';
import userModel from 'common/models/user';

type Props = {
  sampleId?: string | number;
  groupId?: string | number;
  level?: string;
};

const UploadedRecordInfoMessage = ({ sampleId, groupId, level }: Props) => {
  const isPlantPortal = userModel.isPlantPortal();
  let url = isPlantPortal ? config.backend.ppUrl : config.backend.npmsUrl;

  if (level) {
    if (isPlantPortal) {
      if (level === 'inventory') {
        url = `${url}/${level}-data-entry?group_id=${groupId}&sample_id=${sampleId}`;
      } else {
        url = `${url}/npms-mode-${level}-data-entry?group_id=${groupId}&sample_id=${sampleId}`;
      }
    } else {
      url = `${url}/${level}-recording-form-2015?group_id=${groupId}&sample_id=${sampleId}`;
    }
  } else {
    url = `${url}/standard-mode-data-entry?group_id=${groupId}&sample_id=${sampleId}`;
  }

  return (
    <InfoMessage
      color="tertiary"
      prefix={<IonIcon src={informationCircleOutline} className="size-6" />}
      skipTranslation
      className="m-2"
    >
      <T>
        This record has been submitted and cannot be edited within this App.
      </T>

      <Button
        href={url}
        fill="outline"
        color="tertiary"
        className="mx-auto mt-5 max-w-sm p-1"
      >
        Website
      </Button>
    </InfoMessage>
  );
};

export default UploadedRecordInfoMessage;
