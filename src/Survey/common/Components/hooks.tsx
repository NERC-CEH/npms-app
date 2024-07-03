import { useAlert } from 'common/flumens';

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
