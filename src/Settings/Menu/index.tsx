import { observer } from 'mobx-react';
import writeBlob from 'capacitor-blob-writer';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Share } from '@capacitor/share';
import { Page, Header } from '@flumens';
import { isPlatform } from '@ionic/react';
import CONFIG from 'common/config';
import { db } from 'common/models/store';
import appModel from 'models/app';
import userModel from 'models/user';
import Main from './Main';

const exportDatabase = async () => {
  const blob = await db.export();

  if (!isPlatform('hybrid')) {
    window.open(window.URL.createObjectURL(blob), '_blank');
    return;
  }

  const path = `export-app-${CONFIG.build}-${Date.now()}.db`;
  const directory = Directory.External;

  await writeBlob({ path, directory, blob });
  const { uri: url } = await Filesystem.getUri({ directory, path });
  await Share.share({ title: 'App database', files: [url] });
  await Filesystem.deleteFile({ directory, path });
};

// For dev purposes only
const importDatabase = async () => {
  const blob = await new Promise<Blob>(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', () => {
      const fileReader = new FileReader();
      fileReader.onloadend = async (e: any) =>
        resolve(
          new Blob([e.target.result], { type: 'application/vnd.sqlite3' })
        );
      fileReader.readAsArrayBuffer(input.files![0]);
    });
    input.click();
  });

  await db.sqliteConnection.closeAllConnections();
  await db.import(blob);
  window.location.reload();
};

function onToggle(setting: string, checked: boolean) {
  (appModel.data as any)[setting] = checked; // eslint-disable-line
  appModel.save();

  isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
}

const MenuController = () => {
  const { sendAnalytics, useTraining } = appModel.data;

  const onToggleWrap = (settings: string, checked: boolean) =>
    onToggle(settings, checked);

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        sendAnalytics={sendAnalytics}
        onToggle={onToggleWrap}
        useTraining={useTraining}
        exportDatabase={exportDatabase}
        importDatabase={importDatabase}
        isPlantPortal={userModel.isPlantPortal()}
        userId={userModel.id}
      />
    </Page>
  );
};

export default observer(MenuController);
