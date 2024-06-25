import { configure as mobxConfig } from 'mobx';
import i18n from 'i18next';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { App as AppPlugin } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { sentryOptions } from '@flumens';
import { setupIonicReact, isPlatform } from '@ionic/react';
import * as SentryBrowser from '@sentry/browser';
import * as Sentry from '@sentry/capacitor';
import config from 'common/config';
import appModel from 'models/app';
import locations from 'models/collections/locations';
import samples from 'models/collections/samples';
import userModel from 'models/user';
import App from './App';

i18n.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

console.log('🚩 App starting.');

setupIonicReact();

mobxConfig({ enforceActions: 'never' });

(async function () {
  await userModel.ready;
  await appModel.ready;
  await samples.ready;
  await locations.ready;

  appModel.attrs.sendAnalytics &&
    Sentry.init(
      {
        ...sentryOptions,
        dsn: config.sentryDNS,
        environment: config.environment,
        release: config.version,
        dist: config.build,
        initialScope: {
          user: { id: userModel.id },
          tags: { session: appModel.attrs.appSession },
        },
      },
      SentryBrowser.init
    );

  appModel.attrs.appSession += 1;

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);

  if (isPlatform('hybrid')) {
    StatusBar.setStyle({
      style: StatusBarStyle.Light,
    });

    SplashScreen.hide();

    AppPlugin.addListener('backButton', () => {
      /* disable android app exit using back button */
    });
  }
})();
