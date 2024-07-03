import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Header, Page, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel from 'models/app';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import { useEmptySpeciesCheck } from 'Survey/common/Components/hooks';
import { noSpeciesAttr } from '../config';
import Main from './Main';

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
      sample.attrs[noSpeciesAttr.id] = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      sample.attrs[noSpeciesAttr.id] = false;
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

  const addSecondSurvey = () => {
    console.log('Creating a linked survey', sample.metadata.level, sample.id);

    navigate(
      `/survey/npms?level=${sample.metadata.level}&firstSurvey=${sample.id}`,
      'none',
      'replace'
    );
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
      <Main sample={sample} onAddSecondSurvey={addSecondSurvey} />
    </Page>
  );
};

export default observer(Controller);
