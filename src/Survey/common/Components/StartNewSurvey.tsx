import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useAlert } from '@flumens';
import { NavContext } from '@ionic/react';
import appModel, { SurveyDraftKeys } from 'models/app';
import savedSamples from 'models/collections/samples';
import Sample from 'models/sample';
import userModel from 'models/user';
import { Level, Survey } from '../config';

async function showDraftAlert(alert: any) {
  const showDraftDialog = (resolve: any) => {
    alert({
      header: 'Draft',
      message: 'Previous survey draft exists, would you like to continue it?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Discard',
          handler: () => {
            resolve(false);
          },
        },
        {
          text: 'Continue',
          cssClass: 'primary',
          handler: () => {
            resolve(true);
          },
        },
      ],
    });
  };
  return new Promise(showDraftDialog);
}

async function getDraft(draftIdKey: keyof SurveyDraftKeys, alert: any) {
  const draftID = appModel.attrs[draftIdKey];
  if (draftID) {
    const draftById = ({ cid }: Sample) => cid === draftID;
    const draftSample = savedSamples.find(draftById);
    if (draftSample && !draftSample.isDisabled()) {
      const continueDraftRecord = await showDraftAlert(alert);
      if (continueDraftRecord) {
        return draftSample;
      }

      draftSample.destroy();
    }
  }

  return null;
}

type Params = { level?: Level };
async function getNewSample(
  survey: Survey,
  draftIdKey: keyof SurveyDraftKeys,
  params?: Params
) {
  const recorder = userModel.getPrettyName();

  const sample = await survey.create!({
    Sample,
    recorder,
    level: params?.level,
  });
  await sample.save();

  savedSamples.push(sample);

  appModel.attrs[draftIdKey] = sample.cid;

  return sample;
}

type Props = {
  survey: Survey;
};

function StartNewSurvey({ survey }: Props): null {
  const context = useContext(NavContext);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const params = { level: searchParams.get('level') as any };

  const alert = useAlert();

  const baseURL = `/survey/${survey.name}`;
  const draftIdKey: any = `draftId:${survey.name}`;

  const pickDraftOrCreateSampleWrap = () => {
    const pickDraftOrCreateSample = async () => {
      if (!userModel.isLoggedIn()) {
        context.navigate(`/user/register`, 'forward', 'replace');
        return;
      }

      let sample = await getDraft(draftIdKey, alert);

      if (!sample) {
        sample = await getNewSample(survey, draftIdKey, params);
      }

      // const path = sample.isDetailsComplete() ? '' : '/details';
      const path = '';

      context.navigate(`${baseURL}/${sample.cid}${path}`, 'forward', 'replace');
    };

    pickDraftOrCreateSample();
  };
  useEffect(pickDraftOrCreateSampleWrap, []);

  return null;
}

// eslint-disable-next-line @getify/proper-arrows/name
StartNewSurvey.with = (survey: Survey) => {
  const StartNewSurveyWithRouter = (params: any) => (
    <StartNewSurvey survey={survey} {...params} />
  );
  return StartNewSurveyWithRouter;
};

export default StartNewSurvey;
