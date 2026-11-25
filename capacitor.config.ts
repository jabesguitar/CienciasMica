/// <reference types="@capacitor/splash-screen" />
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.cienciasmica.app',
  appName: 'CiênciasMica',
  webDir: 'dist',
  backgroundColor: '#241622',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1100,
      launchAutoHide: true,
      launchFadeOutDuration: 220,
      backgroundColor: '#241622',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_INSIDE',
      showSpinner: false,
      splashFullScreen: true
    }
  },
  android: {
    allowMixedContent: false,
    captureInput: true
  }
};

export default config;
