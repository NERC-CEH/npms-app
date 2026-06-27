import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route, Redirect } from 'react-router-dom';
import {
  SamplesContext,
  TailwindContext,
  TailwindBlockContext,
  TailwindContextValue,
  defaultContext,
} from '@flumens';
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import samples from 'common/models/collections/samples';
import userModel from 'common/models/user';
import 'common/theme.css';
import Onboarding from 'Components/Onboarding';
import Home from './Home';
import Info from './Info/router';
import Settings from './Settings/router';
import Survey from './Survey/router';
import User from './User/router';

const platform = isPlatform('ios') ? 'ios' : 'android';
const tailwindContext: TailwindContextValue = { platform };
const tailwindBlockContext = {
  ...defaultContext,
  ...tailwindContext,
  basePath: '',
};

const samplesContext = { samples };

const AuthHomeRedirect = () =>
  !userModel.isLoggedIn() ? (
    <Redirect to="/user/portal" />
  ) : (
    <Redirect to="/home/landing" />
  );

const App = () => {
  const isPP = userModel.isPlantPortal();
  useEffect(() => {
    document.documentElement.dataset.theme = isPP ? 'pp' : 'npms';
  }, [isPP]);

  return (
    <IonApp>
      <TailwindContext.Provider value={tailwindContext}>
        <TailwindBlockContext.Provider value={tailwindBlockContext}>
          <SamplesContext.Provider value={samplesContext}>
            <Onboarding>
              <IonReactRouter>
                <IonRouterOutlet id="main">
                  <Route exact path="/" render={AuthHomeRedirect} />
                  <Route path="/home" component={Home} />
                  {User}
                  {Info}
                  {Survey}
                  {Settings}
                </IonRouterOutlet>
              </IonReactRouter>
            </Onboarding>
          </SamplesContext.Provider>
        </TailwindBlockContext.Provider>
      </TailwindContext.Provider>
    </IonApp>
  );
};

export default observer(App);
