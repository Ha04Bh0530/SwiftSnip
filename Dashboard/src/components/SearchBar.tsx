import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search snippets..."
        className="w-full bg-ctp-l-mantle dark:bg-ctp-d-mantle text-ctp-l-text dark:text-ctp-d-text 
                   border border-ctp-l-surface0 dark:border-ctp-d-surface0 py-2 px-4 pl-10
                   focus:outline-none focus:border-ctp-l-blue dark:focus:border-ctp-d-blue transition-all duration-300
                   focus:shadow-[0_0_0_1px_theme(colors.ctp-l-blue)] dark:focus:shadow-[0_0_0_1px_theme(colors.ctp-d-blue)]"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ctp-l-subtext0 dark:text-ctp-d-subtext0 w-4 h-4
                        transition-transform duration-300 group-focus-within:scale-110
                        group-focus-within:text-ctp-l-blue dark:group-focus-within:text-ctp-d-blue" />
    </div>
  );
}