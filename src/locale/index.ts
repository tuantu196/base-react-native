import { LANGUAGE_DEFAULT } from 'utils/constants';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './en.json';
import vi from './vi.json';

i18n.use(initReactI18next).init({
  defaultNS: 'translation',
  fallbackLng: LANGUAGE_DEFAULT,
  debug: false,
  resources: {
    en: en,
    vi: vi,
  },
  lng: LANGUAGE_DEFAULT,
});

export default i18n;
