import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { TypeOf } from 'zod';
import { useToast, useLoader, Page, Header, device } from '@flumens';
import { NavContext } from '@ionic/react';
import userModel, { Portal, UserModel } from 'models/user';
import Main from './Main';

type Details = TypeOf<typeof UserModel.loginSchema>;

const LoginController = () => {
  const match = useRouteMatch<{ portal: Portal }>();
  const { portal } = match.params;
  const isPlantPortal = portal === 'pp';

  useEffect(() => {
    document.documentElement.dataset.theme = portal;
  }, [portal]);

  const { navigate } = useContext(NavContext);
  const toast = useToast();
  const loader = useLoader();
  const { t } = useTranslation();

  const onSuccessReturn = () => {
    const { email } = userModel.attrs;

    toast.success(t('Successfully logged in as: {{email}}', { email }), {
      skipTranslation: true,
    });

    navigate('/home/landing', 'root');
  };

  async function onLogin({ email, password }: Details) {
    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }

    await loader.show('Please wait...');

    try {
      await userModel.logIn(email.trim(), password, isPlantPortal);

      onSuccessReturn();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
      console.error(err);
    }

    loader.hide();
  }
  const portalLabel = portal === 'npms' ? 'NPMS' : 'Plant Portal';

  return (
    <Page id="user-login">
      <Header className="ion-no-border" title={`${portalLabel} login`} />
      <Main onSubmit={onLogin} portal={portal} />
    </Page>
  );
};

export default LoginController;
