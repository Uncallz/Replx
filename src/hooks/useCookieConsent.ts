import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  hasConsented: boolean;
  preferences: CookiePreferences;
  showBanner: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
};

export const useCookieConsent = () => {
  const [consentState, setConsentState] = useState<CookieConsentState>({
    hasConsented: false,
    preferences: defaultPreferences,
    showBanner: true,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);

    if (savedConsent === 'true') {
      const preferences = savedPreferences 
        ? JSON.parse(savedPreferences) 
        : defaultPreferences;
      
      setConsentState({
        hasConsented: true,
        preferences: { ...defaultPreferences, ...preferences },
        showBanner: false,
      });
    }
  }, []);

  const acceptAll = () => {
    const allAcceptedPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAcceptedPreferences));
    
    setConsentState({
      hasConsented: true,
      preferences: allAcceptedPreferences,
      showBanner: false,
    });
  };

  const rejectAll = () => {
    const rejectedPreferences: CookiePreferences = {
      necessary: true, // Cannot be disabled
      analytics: false,
      marketing: false,
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(rejectedPreferences));
    
    setConsentState({
      hasConsented: true,
      preferences: rejectedPreferences,
      showBanner: false,
    });
  };

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences = {
      ...consentState.preferences,
      ...newPreferences,
      necessary: true, // Always true
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
    
    setConsentState(prev => ({
      ...prev,
      hasConsented: true,
      preferences: updatedPreferences,
      showBanner: false,
    }));
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    
    setConsentState({
      hasConsented: false,
      preferences: defaultPreferences,
      showBanner: true,
    });
  };

  const showSettings = () => {
    setConsentState(prev => ({
      ...prev,
      showBanner: true,
    }));
  };

  return {
    ...consentState,
    acceptAll,
    rejectAll,
    updatePreferences,
    resetConsent,
    showSettings,
  };
};