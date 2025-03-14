import React from 'react';
import { PlusSquare, Star, FolderOpen, Clock } from 'lucide-react';
import type { FilterOption } from '../types';

interface QuickAccessProps {
  onFilterChange: (filter: FilterOption) => void;
  activeFilter: FilterOption;
}

const QuickAccessButton = ({ 
  icon: Icon, 
  label, 
  onClick,
  isActive
}: { 
  icon: React.ElementType; 
  label: string;
  onClick: () => void;
  isActive: boolean;
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 
                ${isActive 
                  ? 'bg-ctp-l-surface1 dark:bg-ctp-d-surface1' 
                  : 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1'} 
                transition-colors group w-full`}
  >
    <Icon className={`w-6 h-6 ${
      isActive 
        ? 'text-ctp-l-mauve dark:text-ctp-d-mauve' 
        : 'text-ctp-l-blue dark:text-ctp-d-blue group-hover:text-ctp-l-mauve dark:group-hover:text-ctp-d-mauve'
    } transition-colors`} />
    <span className={`mt-2 text-sm ${
      isActive
        ? 'text-ctp-l-text dark:text-ctp-d-text'
        : 'text-ctp-l-subtext1 dark:text-ctp-d-subtext1 group-hover:text-ctp-l-text dark:group-hover:text-ctp-d-text'
    } transition-colors`}>
      {label}
    </span>
  </button>
);

export function QuickAccess({ onFilterChange, activeFilter }: QuickAccessProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      <QuickAccessButton 
        icon={PlusSquare} 
        label="New Snippet" 
        onClick={() => {}} 
        isActive={false}
      />
      <QuickAccessButton 
        icon={Star} 
        label="Favorites" 
        onClick={() => onFilterChange('favorites')}
        isActive={activeFilter === 'favorites'}
      />
      <QuickAccessButton 
        icon={FolderOpen} 
        label="All Snippets" 
        onClick={() => onFilterChange('all')}
        isActive={activeFilter === 'all'}
      />
      <QuickAccessButton 
        icon={Clock} 
        label="Recent" 
        onClick={() => onFilterChange('recent')}
        isActive={activeFilter === 'recent'}
      />
    </div>
  );
}