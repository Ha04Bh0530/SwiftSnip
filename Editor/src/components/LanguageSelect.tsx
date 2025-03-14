import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { Language } from '../types';

const languages: { value: Language; label: string; }[] = [
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
];

interface LanguageSelectProps {
  value: Language;
  onChange: (value: Language) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLanguage = languages.find(lang => lang.value === value);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-[200px] h-10 px-4 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 hover:border-latte-surface2 dark:hover:border-mocha-surface2 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue transition-colors flex items-center justify-between"
      >
        <span className="font-medium">{selectedLanguage?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full sm:w-[200px] mt-1 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 shadow-lg">
          {languages.map(language => (
            <button
              key={language.value}
              onClick={() => {
                onChange(language.value);
                setIsOpen(false);
              }}
              className="w-full h-10 px-4 flex items-center justify-between hover:bg-latte-surface0/70 dark:hover:bg-mocha-surface0/70 transition-colors"
            >
              <span className="font-medium">{language.label}</span>
              {value === language.value && (
                <Check className="w-4 h-4 text-latte-blue dark:text-mocha-blue" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}