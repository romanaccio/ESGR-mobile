import { NativeModules } from 'react-native';

function getSystemLocale(): string {
  let locale: string = 'en-GB';
  // iOS
  if (
    NativeModules.SettingsManager &&
    NativeModules.SettingsManager.settings &&
    NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier;
  }

  if (typeof locale === 'undefined') {
    console.log('Couldnt get locale');
    return 'en';
  }

  return locale;
}
export default getSystemLocale;
