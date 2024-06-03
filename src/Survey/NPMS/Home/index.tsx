import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Header, Page, useAlert, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import Main from './Main';

const useEmptySpeciesCheck = () => {
  const alert = useAlert();

  const showEmptySpeciesCheck = () =>
    new Promise((resolve: any) => {
      alert({
        header: 'No species',
        message:
          'Are you sure you want to finish the survey without any species?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: 'Finish',
            handler: () => resolve(true),
          },
        ],
      });
    });

  return showEmptySpeciesCheck;
};

type Props = {
  sample: Sample;
};

const Controller = ({ sample }: Props) => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const showEmptySpeciesCheck = useEmptySpeciesCheck();
  const checkUserStatus = useUserStatusCheck();
  const checkSampleStatus = useValidateCheck(sample);

  const checkAndSetEmptySpecies = async () => {
    if (!sample.occurrences.length) {
      const finish = await showEmptySpeciesCheck();
      if (!finish) return true;
      // eslint-disable-next-line no-param-reassign
      sample.attrs.noSpecies = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      sample.attrs.noSpecies = false;
    }

    return false;
  };

  const onUpload = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    if (await checkAndSetEmptySpecies()) return;

    const isUploading = await sample.upload().catch(toast.error);
    if (!isUploading) return;

    navigate(`/home/surveys`, 'root');
  };

  const onFinish = async () => {
    const isValid = checkSampleStatus();
    if (!isValid) return;

    if (await checkAndSetEmptySpecies()) return;

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();

    appModel.attrs['draftId:npms'] = '';

    navigate(`/home/surveys`, 'root');
  };

  const isDisabled = sample.isUploaded();

  const isInvalid = sample.validateRemote();
  const uploadButton =
    isDisabled || sample.remote.synchronising ? null : (
      <HeaderButton
        onPress={sample.metadata.saved ? onUpload : onFinish}
        isInvalid={isInvalid}
      >
        {sample.metadata.saved ? 'Upload' : 'Finish'}
      </HeaderButton>
    );

  const isTraining = !!sample.attrs.training;
  const trainingModeSubheader = isTraining && (
    <div className="bg-black p-1 text-center text-sm text-white">
      Training Mode
    </div>
  );

  return (
    <Page id="npms-home">
      <Header
        title="Survey"
        rightSlot={uploadButton}
        subheader={trainingModeSubheader}
      />
      <Main sample={sample} />
    </Page>
  );
};

export default observer(Controller);
