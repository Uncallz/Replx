import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // Load saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
    setCurrentLanguage(savedLanguage);
  }, [i18n]);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setCurrentLanguage(language);
  };

  const availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  return {
    t,
    currentLanguage,
    changeLanguage,
    availableLanguages
  };
};