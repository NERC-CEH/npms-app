import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Header, Page, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import {
  share,
  useEmptySpeciesCheck,
  useFinishPrompt,
} from 'Survey/common/Components/hooks';
import { getCover } from '../config';
import Main from './Main';

type Props = {
  sample: Sample;
};

const Controller = ({ sample }: Props) => {
  const { navigate, goBack } = useContext(NavContext);
  const showFinishPrompt = useFinishPrompt();
  const toast = useToast();

  const showEmptySpeciesCheck = useEmptySpeciesCheck();
  const checkUserStatus = useUserStatusCheck();
  const checkSampleStatus = useValidateCheck(sample);

  const checkAndSetEmptySpecies = async () => {
    if (!sample.occurrences.length) {
      const finish = await showEmptySpeciesCheck();
      if (!finish) return true;
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

    appModel.attrs['draftId:standard'] = '';

    navigate(`/home/surveys`, 'root');
  };

  const onShare = () => {
    const occurrences = sample.occurrences.map(occ => {
      const abundance = getCover(occ);
      const name = occ.getPrettyName();
      return `${name} - ${abundance}`;
    });

    const species = occurrences.length
      ? occurrences.join(' / ')
      : 'No species found';
    const text = `#PlantPortal: ${species} `;

    share(sample, text);
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

  const navigateBack = async (setIsLeaving: any) => {
    if (isInvalid) {
      goBack();
      return;
    }

    const shouldFinish = await showFinishPrompt();
    if (!shouldFinish) {
      goBack();
      return;
    }
    setIsLeaving(false);
    onFinish();
  };

  return (
    <Page id="standard-home">
      <Header
        title="Survey"
        rightSlot={uploadButton}
        onLeave={navigateBack}
        subheader={trainingModeSubheader}
      />
      <Main sample={sample} onShare={onShare} />
    </Page>
  );
};

export default observer(Controller);
