import { configure as mobxConfig } from 'mobx';
import i18n from 'i18next';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { SystemBars, SystemBarsStyle } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style as StatusBarStyle } from '@capacitor/status-bar';
import { sentryOptions } from '@flumens';
import { setupIonicReact, isPlatform } from '@ionic/react';
import SentryBrowser from '@sentry/browser';
import config from 'common/config';
import { db } from 'common/models/store';
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
  await db.init();
  await userModel.fetch();
  await appModel.fetch();
  await samples.fetch();
  await locations.fetch();

  appModel.data.sendAnalytics &&
    SentryBrowser.init({
      ...sentryOptions,
      dsn: config.sentryDSN,
      environment: config.environment,
      release: config.version,
      dist: config.build,
      enabled: config.environment === 'production',
      initialScope: {
        user: { id: userModel.id },
        tags: { session: appModel.data.appSession },
      },
    });

  appModel.data.appSession += 1;

  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);

  if (isPlatform('hybrid')) {
    await SystemBars.setStyle({ style: SystemBarsStyle.Light });
    await StatusBar.setStyle({ style: StatusBarStyle.Dark });

    SplashScreen.hide();
  }
})();
