import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard/Dashboard.tsx';
import { Theme } from './types/index.ts';
import { Sun, Moon } from 'lucide-react';
import './App.css'

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
  const saved = localStorage.getItem('app_theme');
  return (saved as Theme) || 'light';
});

useEffect(() => {
  const.root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
  localStorage.setItems('app_theme', theme);
}, [theme]);

return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div className="fixed top-6 right-6 z-50">
      <button
      onClick{() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-3 bg-white dark:bg-gray-800 shadow-lg rounded-full border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform active:scale-95 text-gray-800 dark:text-yellow-400"
        aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <Moon size={20} fill="currentColor" />
          ) : (
            <Sun size={20} fill="currentColor" />
          )}
        </button>
    </div>

    <Dashboard />
  </div>
);
};
   
export default App
