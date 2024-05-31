import { useContext } from 'react';
import { Trans as T } from 'react-i18next';
import { useRouteMatch } from 'react-router';
import { TypeOf } from 'zod';
import { Page, Header, device, useToast, useAlert, useLoader } from '@flumens';
import { NavContext } from '@ionic/react';
import userModel, { Portal, UserModel } from 'models/user';
import Main from './Main';

type Details = TypeOf<typeof UserModel.registerSchema>;

const RegisterContainer = () => {
  const match = useRouteMatch<{ portal: Portal }>();
  const { portal } = match.params;
  const isPlantPortal = portal === 'pp';

  const context = useContext(NavContext);
  const alert = useAlert();
  const toast = useToast();
  const loader = useLoader();

  const onSuccess = () => {
    context.navigate('/home/landing', 'root');
  };

  async function onRegister(details: Details) {
    const email = details.email.trim();
    const { password, firstName, lastName } = details;

    const otherDetails = {
      field_first_name: [{ value: firstName?.trim() }],
      field_last_name: [{ value: lastName?.trim() }],
    };

    if (!device.isOnline) {
      toast.warn("Sorry, looks like you're offline.");
      return;
    }
    await loader.show('Please wait...');

    try {
      await userModel.register(email, password, otherDetails, isPlantPortal);

      userModel.attrs.firstName = firstName; // eslint-disable-line
      userModel.attrs.lastName = lastName; // eslint-disable-line
      userModel.save();

      alert({
        header: 'Welcome aboard',
        message: (
          <T>
            Before starting any surveys please check your email and click on the
            verification link.
          </T>
        ),
        buttons: [
          {
            text: 'OK, got it',
            role: 'cancel',
            handler: onSuccess,
          },
        ],
      });
    } catch (err: any) {
      toast.error(err);
    }

    loader.hide();
  }

  return (
    <Page id="user-register">
      <Header className="ion-no-border" title="Register" />
      <Main onSubmit={onRegister} isPlantPortal={portal === 'pp'} />
    </Page>
  );
};

export default RegisterContainer;
