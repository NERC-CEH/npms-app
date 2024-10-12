import { useState } from 'react';
import clsx from 'clsx';
import {
  keyOutline,
  eyeOutline,
  eyeOffOutline,
  mailOutline,
  informationCircleOutline,
} from 'ionicons/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans as T } from 'react-i18next';
import { TypeOf } from 'zod';
import { Main, Button, InfoMessage } from '@flumens';
import { zodResolver } from '@hookform/resolvers/zod';
import { IonIcon, IonItem } from '@ionic/react';
import { Portal, UserModel } from 'models/user';
import ControlledInput from '../common/Components/ControlledInput';

type Details = TypeOf<typeof UserModel.loginSchema>;

type Props = {
  onSubmit: SubmitHandler<Details>;
  portal: Portal;
};

const LoginMain = ({ onSubmit, portal }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const { formState, handleSubmit, control } = useForm<Details>({
    defaultValues: { username: '', password: '' },
    resolver: zodResolver(UserModel.loginSchema),
  });

  return (
    <Main>
      <div className="mx-auto flex max-w-md flex-col gap-8 px-3 pt-3">
        <InfoMessage
          color="tertiary"
          prefix={<IonIcon src={informationCircleOutline} className="size-5" />}
        >
          Please sign in with your account or register.
        </InfoMessage>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Fake onSubmit on Enter */}
          <input type="submit" className="hidden" />

          <div className="rounded-list">
            <ControlledInput
              control={control}
              name="username"
              prefix={<IonIcon icon={mailOutline} className="size-5" />}
              type="text"
              placeholder="Email or username"
            />
            <ControlledInput
              control={control}
              name="password"
              prefix={<IonIcon icon={keyOutline} className="size-5" />}
              suffix={
                <IonIcon
                  icon={showPassword ? eyeOutline : eyeOffOutline}
                  className="size-5 opacity-50"
                  onClick={togglePassword}
                />
              }
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          </div>

          <Button
            className={clsx('mx-auto mt-7', !formState.isValid && 'opacity-50')}
            color="primary"
            onPress={() => handleSubmit(onSubmit)()}
          >
            Sign in
          </Button>
        </form>

        <div className="rounded-list mt-8">
          <IonItem routerLink={`/user/register/${portal}`} detail>
            <T>Register</T>
          </IonItem>
          <IonItem
            routerLink={`/user/reset/${portal}`}
            detail
            className="[--ion-item-border-color:transparent]"
          >
            <T>Forgot password?</T>
          </IonItem>
        </div>
      </div>
    </Main>
  );
};

export default LoginMain;
