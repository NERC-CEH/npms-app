import { SampleCollection } from '@flumens';
import Sample from 'models/sample';
import { samplesStore } from '../store';
import userModel, { Portal } from '../user';

console.log('SavedSamples: initializing');
const samples = new SampleCollection({
  store: samplesStore,
  Model: Sample,
});

export const byPortal = (portal: Portal) => (sample: Sample) => {
  const isNPMS = sample.metadata.survey === 'npms';
  return portal === 'npms' ? isNPMS : !isNPMS;
};

export async function uploadAll() {
  console.log('SavedSamples: uploading all.');

  const getUploadPromise = (sample: Sample) => sample.upload();
  await Promise.all(
    samples
      .filter(byPortal(userModel.isPlantPortal() ? 'pp' : 'npms'))
      .map(getUploadPromise)
  );

  console.log('SavedSamples: all records were uploaded!');
}

export function getPending() {
  const byUploadStatus = (sample: Sample) =>
    !sample.syncedAt && sample.metadata.saved;

  return samples
    .filter(byPortal(userModel.isPlantPortal() ? 'pp' : 'npms'))
    .filter(byUploadStatus);
}

export default samples;
