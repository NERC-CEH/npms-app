import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NavContext } from '@ionic/react';
import samples from 'models/collections/samples';
import Sample from 'models/sample';
import userModel from 'models/user';
import { Level, Survey } from '../config';

type Params = { level?: Level; firstSurvey?: string };
async function getNewSample(survey: Survey, params?: Params) {
  const sample = await survey.create!({
    Sample,
    level: params?.level,
    firstSurvey: params?.firstSurvey,
  });
  await sample.save();

  samples.push(sample);

  return sample;
}

type Props = {
  survey: Survey;
};

function StartNewSurvey({ survey }: Props): null {
  const context = useContext(NavContext);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const params = {
    level: searchParams.get('level') as any,
    firstSurvey: searchParams.get('firstSurvey') as any,
  };

  const baseURL = `/survey/${survey.name}`;

  const createSampleWrap = () => {
    const pickDraftOrCreateSample = async () => {
      if (!userModel.isLoggedIn()) {
        context.navigate(`/user/register`, 'forward', 'replace');
        return;
      }

      const sample = await getNewSample(survey, params);

      // const path = sample.isDetailsComplete() ? '' : '/details';
      const path = '';

      context.navigate(`${baseURL}/${sample.cid}${path}`, 'forward', 'replace');
    };

    pickDraftOrCreateSample();
  };
  useEffect(createSampleWrap, []);

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
