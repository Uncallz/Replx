import { useState } from 'react';
import { Settings, Cookie } from 'lucide-react';
import { useCookieConsent } from '../hooks/useCookieConsent';
import CookieSettings from './CookieSettings';

const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);

  if (!showBanner) return null;

  if (showSettings) {
    return <CookieSettings onClose={() => setShowSettings(false)} />;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              <Cookie className="w-6 h-6 text-[#0A84FF]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">We use cookies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                We use cookies to improve your browsing experience, 
                analyze site traffic and personalize content. 
                You can choose which cookies to accept.
              </p>
              <div className="mt-2">
                <a 
                  href="/privacy.html" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#0A84FF] hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Read our Privacy Policy
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              Manage Preferences
            </button>
            
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Reject All
            </button>
            
            <button
              onClick={acceptAll}
              className="px-6 py-2 text-sm font-medium text-white bg-[#0A84FF] hover:bg-blue-600 rounded-lg transition-colors duration-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;