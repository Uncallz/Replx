import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import it from './locales/it.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en
  },
  it: {
    translation: it
  },
  fr: {
    translation: fr
  },
  de: {
    translation: de
  },
  es: {
    translation: es
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language is English
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    },
    
    // Disable automatic language detection
    detection: {
      order: [], // Empty array means no automatic detection
    }
  });

export default i18n;