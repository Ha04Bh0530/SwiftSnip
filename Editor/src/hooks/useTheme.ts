import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';
const THEME_CHANGE_EVENT = 'themeChange';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    return (savedTheme as Theme) || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);

    // Dispatch a custom event when theme changes
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: theme }));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}

// Export constants for external use
export { THEME_CHANGE_EVENT };