import { useContext } from 'react';
import { observer } from 'mobx-react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Page, Header, useToast, useLoader } from '@flumens';
import { isPlatform, NavContext } from '@ionic/react';
import appModel from 'models/app';
import userModel from 'models/user';
import Main from './Main';

const useDeleteUser = () => {
  const toast = useToast();
  const loader = useLoader();
  const { goBack } = useContext(NavContext);

  const deleteUser = async () => {
    console.log('Settings:Menu:Controller: deleting the user!');

    await loader.show('Please wait...');

    try {
      await userModel.delete();
      goBack();
      toast.success('Done');
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  };

  return deleteUser;
};

function onToggle(setting: string, checked: boolean) {
  (appModel.attrs as any)[setting] = checked; // eslint-disable-line
  appModel.save();

  isPlatform('hybrid') && Haptics.impact({ style: ImpactStyle.Light });
}

const MenuController = () => {
  const deleteUser = useDeleteUser();

  const { sendAnalytics, useTraining } = appModel.attrs;

  const onToggleWrap = (settings: string, checked: boolean) => {
    return onToggle(settings, checked);
  };

  return (
    <Page id="settings">
      <Header title="Settings" />
      <Main
        isPlantPortal={userModel.isPlantPortal()}
        deleteUser={deleteUser}
        sendAnalytics={sendAnalytics}
        onToggle={onToggleWrap}
        useTraining={useTraining}
      />
    </Page>
  );
};

export default observer(MenuController);
