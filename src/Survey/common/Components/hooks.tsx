import { useEffect } from 'react';
import { Share } from '@capacitor/share';
import config from 'common/config';
import { Media, useAlert } from 'common/flumens';
import Sample from 'common/models/sample';

// eslint-disable-next-line import/prefer-default-export
export const useEmptySpeciesCheck = () => {
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

export const share = async (sample: Sample, text: string) => {
  if (!(await Share.canShare()).value) return;

  const { date } = sample.attrs;

  const getFilePath = (img: Media) => {
    const { data: name } = img.attrs;

    return `${config.dataPath}/${name}`;
  };

  const surveyName = sample.getSurvey().label;
  const options = {
    text,
    title: `My ${surveyName} survey on ${date}`,
    files: sample.media.map(getFilePath),
  };

  Share.share(options);
};

export const useFinishPrompt = () => {
  const alert = useAlert();

  const showFinishPrompt = () =>
    new Promise((resolve: any) => {
      alert({
        header: 'Finish survey',
        message: 'Would you like to finish the survey?',
        buttons: [
          {
            text: 'Leave',
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

  return showFinishPrompt;
};

export const useTrainingAlert = (isTraining?: boolean) => {
  const alert = useAlert();

  const showTrainingSurveyAlert = () => {
    if (isTraining)
      alert({
        header: 'Training survey',
        message:
          'This is a training survey and will be excluded from all reports. To disable this for new surveys, visit the Settings page.',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
          },
        ],
      });
  };
  useEffect(showTrainingSurveyAlert, []);
};
