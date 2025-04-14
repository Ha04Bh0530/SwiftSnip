import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2.5 border border-latte-surface1 dark:border-mocha-surface1 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-all duration-200"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <span className={`absolute inset-0 transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
          <Sun className="w-6 h-6 text-mocha-yellow" />
        </span>
        <span className={`absolute inset-0 transition-all duration-500 transform ${theme === 'dark' ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}>
          <Moon className="w-6 h-6 text-latte-lavender" />
        </span>
      </div>
      <span className="absolute -inset-px opacity-0 group-hover:opacity-100 bg-gradient-to-r from-latte-blue/20 to-latte-lavender/20 dark:from-mocha-blue/20 dark:to-mocha-lavender/20 transition-opacity duration-500" />
    </button>
  );
}