import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Header, Page, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import Main from './Main';

type Props = {
  sample: Sample;
};

const Controller = ({ sample }: Props) => {
  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const checkUserStatus = useUserStatusCheck();
  const checkSampleStatus = useValidateCheck(sample);

  const onUpload = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    const isUploading = await sample.upload().catch(toast.error);
    if (!isUploading) return;

    navigate(`/home/surveys`, 'root');
  };

  const onFinish = async () => {
    const isValid = checkSampleStatus();
    if (!isValid) return;

    // eslint-disable-next-line no-param-reassign
    sample.metadata.saved = true;
    sample.save();

    appModel.attrs['draftId:standard'] = '';

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
    <Page id="standard-home">
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
