import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Choice, Header, Page, useToast } from '@flumens';
import { NavContext } from '@ionic/react';
import Sample, { useValidateCheck } from 'models/sample';
import { useUserStatusCheck } from 'models/user';
import HeaderButton from 'Survey/common/Components/HeaderButton';
import {
  share,
  useEmptySpeciesCheck,
  useFinishPrompt,
} from 'Survey/common/Components/hooks';
import { coverAttr } from 'Survey/common/config';
import { broadHabitatAttr, noSpeciesAttr } from '../config';
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

      sample.data[noSpeciesAttr.id] = true;
    } else {
      sample.data[noSpeciesAttr.id] = false;
    }

    return false;
  };

  const onUpload = async () => {
    const isUserOK = await checkUserStatus();
    if (!isUserOK) return;

    if (await checkAndSetEmptySpecies()) return;

    sample.upload().catch(toast.error);
    navigate('/home/surveys', 'root');
  };

  const onFinish = async () => {
    const isValid = checkSampleStatus();
    if (!isValid) return;

    if (await checkAndSetEmptySpecies()) return;

    sample.metadata.saved = true;
    sample.save();

    navigate('/home/surveys', 'root');
  };

  const { level } = sample.metadata;

  const addSecondSurvey = () => {
    console.log('Creating a linked survey', level, sample.id);

    navigate(
      `/survey/npms?level=${level}&firstSurvey=${sample.id}`,
      'none',
      'replace'
    );
  };

  const onShare = () => {
    const byId = (id?: string) => (c: Choice) => c.dataName === id;
    const habitatId = sample.data[broadHabitatAttr.id];
    const habitat = broadHabitatAttr.choices.find(byId(habitatId))?.title;
    const occurrences = sample.occurrences.map(occ => {
      const abundanceId = occ.data[coverAttr.id];
      const abundance = coverAttr.choices.find(byId(abundanceId))?.title;
      const name = occ.getPrettyName();
      return `${name} - ${abundance}`;
    });

    const species = occurrences.length
      ? occurrences.join(' / ')
      : 'No species found';
    const text = `#NPMS ${habitat}: ${species} `;

    share(sample, text);
  };

  const isDisabled = sample.isUploaded;

  const isInvalid = sample.validateRemote();
  const uploadButton =
    isDisabled || sample.isSynchronising ? null : (
      <HeaderButton
        onPress={sample.metadata.saved ? onUpload : onFinish}
        isInvalid={isInvalid}
      >
        {sample.metadata.saved ? 'Upload' : 'Finish'}
      </HeaderButton>
    );

  const isTraining = !!sample.data.training;
  const trainingModeSubheader = isTraining && (
    <div className="bg-black p-1 text-center text-sm text-white">
      Training Mode
    </div>
  );

  const navigateBack = async (setIsLeaving: any) => {
    if (isDisabled || isInvalid) {
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
    <Page id="npms-home">
      <Header
        title={`${level} Survey`}
        rightSlot={uploadButton}
        onLeave={navigateBack}
        className="capitalize"
        subheader={trainingModeSubheader}
      />
      <Main
        sample={sample}
        onAddSecondSurvey={addSecondSurvey}
        onShare={onShare}
      />
    </Page>
  );
};

export default observer(Controller);
