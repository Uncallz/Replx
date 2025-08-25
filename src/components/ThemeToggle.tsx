import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes: { value: Theme; icon: React.ComponentType<{ className?: string }>; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors duration-200">
        {themes.map(({ value, icon: Icon, label }) => {
          const isActive = theme === value;
          
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`
                relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
                ${isActive 
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }
              `}
              title={label}
              aria-label={`Switch to ${label.toLowerCase()} theme`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
      
      {/* Current theme indicator */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {resolvedTheme === 'light' ? '☀️' : '🌙'} {theme === 'system' ? 'Auto' : theme}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggle;