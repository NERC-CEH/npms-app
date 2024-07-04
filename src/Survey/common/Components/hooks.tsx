import { Share } from '@capacitor/share';
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

  const getFilePath = (img: Media) => img.getURL();

  const surveyName = sample.getSurvey().label;
  const options = {
    text,
    title: `My ${surveyName} survey on ${date}`,
    files: sample.media.map(getFilePath),
  };

  Share.share(options);
};
