import { observer } from 'mobx-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Page, Header } from '@flumens';
import { isPlatform } from '@ionic/react';
import appModel from 'models/app';
import userModel from 'models/user';
import Main from './Main';

function onToggle(setting: string, checked: boolean) {
  (appModel.attrs as any)[setting] = checked; // eslint-disable-line
  appModel.save();

  isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
}

const MenuController = () => {
  const { sendAnalytics, useTraining } = appModel.attrs;

  const onToggleWrap = (settings: string, checked: boolean) => {
    return onToggle(settings, checked);
  };

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        sendAnalytics={sendAnalytics}
        onToggle={onToggleWrap}
        useTraining={useTraining}
        isPlantPortal={userModel.isPlantPortal()}
        userId={userModel.id}
      />
    </Page>
  );
};

export default observer(MenuController);
