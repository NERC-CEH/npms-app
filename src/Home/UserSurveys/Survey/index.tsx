import { observer } from 'mobx-react';
import { Trans as T } from 'react-i18next';
import { useToast, useAlert } from '@flumens';
import {
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
} from '@ionic/react';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import OnlineStatus from './OnlineStatus';
import './styles.scss';

function useDeleteSurveyPrompt(sample: Sample) {
  const alert = useAlert();

  function deleteSurvey() {
    alert({
      header: 'Delete',
      message: 'Are you sure you want to delete this survey?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => sample.destroy(),
        },
      ],
    });
  }
  return deleteSurvey;
}

const getSurveyLink = (sample: Sample) => {
  const survey = sample.getSurvey();

  return `/survey/${survey.name}/${sample.cid}`;
};

type Props = {
  sample: Sample;
  uploadIsPrimary?: boolean;
  style?: any;
};

const Survey = ({ sample, uploadIsPrimary, style }: Props) => {
  const toast = useToast();
  const checkSampleStatus = useValidateCheck(sample);
  const checkUserStatus = useUserStatusCheck();

  const showDeleteSurveyPrompt = useDeleteSurveyPrompt(sample);

  const { synchronising } = sample.remote;

  const survey = sample.getSurvey();

  const canShowLink = !synchronising && !survey.deprecated;
  const href = canShowLink ? getSurveyLink(sample) : '';

  const onUpload = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isValid = checkSampleStatus();
    if (!isValid) return;

    sample.upload().catch(toast.error);
  };

  return (
    <IonItemSliding className="survey-list-item" style={style}>
      <IonItem routerLink={href} detail={false}>
        <div className="flex w-full flex-nowrap items-center gap-2">
          <div className="flex w-full flex-col content-center gap-1 overflow-hidden">
            <h3 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-bold">
              <T>{survey.label}</T>
            </h3>
          </div>

          <OnlineStatus
            sample={sample}
            onUpload={onUpload}
            uploadIsPrimary={uploadIsPrimary}
          />
        </div>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={showDeleteSurveyPrompt}>
          <T>Delete</T>
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default observer(Survey);
