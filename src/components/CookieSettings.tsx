import { useState } from 'react';
import { X, Shield, BarChart3, Target, Info } from 'lucide-react';
import { useCookieConsent, CookiePreferences } from '../hooks/useCookieConsent';

interface CookieSettingsProps {
  onClose: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({ onClose }) => {
  const { preferences, updatePreferences } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    
    setLocalPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    onClose();
  };

  const cookieCategories = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function and cannot be disabled.',
      icon: Shield,
      required: true,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with the site by collecting information anonymously.',
      icon: BarChart3,
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant and engaging advertisements.',
      icon: Target,
      required: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cookie Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Info className="w-5 h-5 text-[#0A84FF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  You can choose which categories of cookies to accept. Necessary cookies are always active 
                  to ensure the proper functioning of the site.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              const isEnabled = localPreferences[category.key];
              
              return (
                <div key={category.key} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-5 h-5 text-[#0A84FF] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {category.description}
                        </p>
                        {category.required && (
                          <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900 rounded-full">
                            Always Active
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <button
                        onClick={() => handleToggle(category.key)}
                        disabled={category.required}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:ring-offset-2 ${
                          isEnabled 
                            ? 'bg-[#0A84FF]' 
                            : 'bg-gray-200 dark:bg-gray-600'
                        } ${
                          category.required 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'cursor-pointer'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <a 
            href="/privacy.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm text-[#0A84FF] hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            Privacy Policy
          </a>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium text-white bg-[#0A84FF] hover:bg-blue-600 rounded-lg transition-colors duration-200"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;