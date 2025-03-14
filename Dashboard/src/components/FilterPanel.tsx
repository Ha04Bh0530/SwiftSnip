import React from 'react';
import { X } from 'lucide-react';
import type { SortOption, FilterOption } from '../types';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedLanguages: string[];
  onLanguagesChange: (languages: string[]) => void;
  availableTags: string[];
  availableLanguages: string[];
}

export function FilterPanel({
  isOpen,
  onClose,
  sortBy,
  onSortChange,
  activeFilter,
  onFilterChange,
  selectedTags,
  onTagsChange,
  selectedLanguages,
  onLanguagesChange,
  availableTags,
  availableLanguages,
}: FilterPanelProps) {
  if (!isOpen) return null;

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleLanguageToggle = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguagesChange(selectedLanguages.filter(l => l !== language));
    } else {
      onLanguagesChange([...selectedLanguages, language]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="absolute right-0 top-0 h-full w-full md:w-96 bg-ctp-l-base dark:bg-ctp-d-base 
                    shadow-lg transform transition-transform duration-300 ease-out animate-slideIn">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Filter & Sort</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 
                       text-ctp-l-subtext0 dark:text-ctp-d-subtext0 
                       hover:text-ctp-l-text dark:hover:text-ctp-d-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Sort By</h3>
              <div className="flex gap-2">
                {(['date', 'title', 'language'] as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => onSortChange(option)}
                    className={`px-3 py-1 capitalize transition-colors ${
                      sortBy === option
                        ? 'bg-ctp-l-mauve dark:bg-ctp-d-mauve text-white'
                        : 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">View</h3>
              <div className="flex gap-2">
                {(['all', 'favorites', 'recent'] as FilterOption[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => onFilterChange(filter)}
                    className={`px-3 py-1 capitalize transition-colors ${
                      activeFilter === filter
                        ? 'bg-ctp-l-mauve dark:bg-ctp-d-mauve text-white'
                        : 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-ctp-l-blue dark:bg-ctp-d-blue text-white'
                        : 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-medium mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => handleLanguageToggle(language)}
                    className={`px-3 py-1 text-sm transition-colors ${
                      selectedLanguages.includes(language)
                        ? 'bg-ctp-l-blue dark:bg-ctp-d-blue text-white'
                        : 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}