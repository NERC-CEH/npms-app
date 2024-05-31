import { initStoredSamples } from '@flumens';
import Sample from 'models/sample';
import { modelStore } from '../store';

console.log('SavedSamples: initializing');
const savedSamples = initStoredSamples(modelStore, Sample);

// eslint-disable-next-line
savedSamples.uploadAll = async () => {
  console.log('SavedSamples: uploading all.');

  const getUploadPromise = (sample: Sample) => sample.upload();
  await Promise.all(savedSamples.map(getUploadPromise));

  console.log('SavedSamples: all records were uploaded!');
};

export function getPending() {
  const byUploadStatus = (sample: Sample) =>
    !sample.metadata.syncedOn && sample.metadata.saved;

  return savedSamples.filter(byUploadStatus);
}

export default savedSamples;
