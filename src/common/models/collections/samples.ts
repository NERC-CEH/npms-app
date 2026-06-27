import { SampleCollection } from '@flumens';
import config from 'common/config';
import Sample from 'models/sample';
import Occurrence from '../occurrence';
import { samplesStore } from '../store';
import userModel, { Portal } from '../user';

console.log('SavedSamples: initializing');

const samples: SampleCollection<Sample> = new SampleCollection({
  store: samplesStore,
  Model: Sample,
  Occurrence,
  url: config.backend.indicia.url,
  getAccessToken: () => userModel.getAccessToken(),
}) as any;

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
