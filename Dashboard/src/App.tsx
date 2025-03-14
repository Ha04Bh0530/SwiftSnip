import React, { useState, useEffect, useMemo } from 'react';
import { LayoutGrid, List, SlidersHorizontal, Code2, Sun, Moon, X } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { QuickAccess } from './components/QuickAccess';
import { SnippetList } from './components/SnippetList';
import { FilterPanel } from './components/FilterPanel';
import type { Snippet, SortOption, ViewMode, FilterOption } from './types';

const mockSnippets: Snippet[] = [
  {
    id: '1',
    title: 'React Custom Hook',
    language: 'TypeScript',
    content: 'export function useCustomHook() {...}',
    tags: ['react', 'hooks'],
    lastModified: '2024-03-10',
    created: '2024-03-10',
    description: 'A reusable custom hook for handling form state',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'API Endpoint',
    language: 'JavaScript',
    content: 'app.get("/api/v1/users", ...)',
    tags: ['api', 'express'],
    lastModified: '2024-03-09',
    created: '2024-03-09',
    description: 'REST API endpoint for user management',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'CSS Grid Layout',
    language: 'CSS',
    content: '.grid-container { display: grid; }',
    tags: ['css', 'layout'],
    lastModified: '2024-03-08',
    created: '2024-03-08',
    description: 'Responsive grid layout template',
    isFavorite: true,
  },
];

function App() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY <= lastScrollY || currentScrollY <= 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleTheme = () => setIsDark(!isDark);

  const filteredSnippets = useMemo(() => {
    return mockSnippets
      .filter(snippet => {
        const matchesSearch = search.toLowerCase() === '' ||
          snippet.title.toLowerCase().includes(search.toLowerCase()) ||
          snippet.description?.toLowerCase().includes(search.toLowerCase()) ||
          snippet.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

        const matchesTags = selectedTags.length === 0 ||
          selectedTags.every(tag => snippet.tags.includes(tag));

        const matchesLanguages = selectedLanguages.length === 0 ||
          selectedLanguages.includes(snippet.language);

        const matchesFilter = activeFilter === 'all' ||
          (activeFilter === 'favorites' && snippet.isFavorite) ||
          (activeFilter === 'recent' && new Date(snippet.created) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

        return matchesSearch && matchesTags && matchesLanguages && matchesFilter;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'language':
            return a.language.localeCompare(b.language);
          case 'date':
          default:
            return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
        }
      });
  }, [search, selectedTags, selectedLanguages, activeFilter, sortBy, mockSnippets]);

  return (
    <div className="min-h-screen bg-ctp-l-base dark:bg-ctp-d-base text-ctp-l-text dark:text-ctp-d-text">
      {/* Header */}
      <header 
        className={`fixed w-full top-0 z-50 bg-ctp-l-mantle dark:bg-ctp-d-mantle border-b border-ctp-l-surface0 
                   dark:border-ctp-d-surface0 transition-transform duration-300 ease-in-out
                   ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 group cursor-pointer relative">
              <div className="relative">
                <Code2 className="w-8 h-8 text-ctp-l-mauve dark:text-ctp-d-mauve transform transition-transform 
                                group-hover:rotate-12 group-hover:scale-110 duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-ctp-l-peach dark:bg-ctp-d-peach rounded-full 
                              animate-ping" />
              </div>
              <div className="relative">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                             from-ctp-l-mauve to-ctp-l-pink dark:from-ctp-d-mauve dark:to-ctp-d-pink
                             transition-colors duration-300 group-hover:from-ctp-l-pink group-hover:to-ctp-l-mauve
                             dark:group-hover:from-ctp-d-pink dark:group-hover:to-ctp-d-mauve">
                  SwiftSnip
                </h1>
                <span className="absolute -right-12 top-0 px-2 py-0.5 text-xs font-medium bg-gradient-to-r 
                               from-ctp-l-peach to-ctp-l-red dark:from-ctp-d-peach dark:to-ctp-d-red
                               text-white transform -rotate-12 animate-pulse">
                  BETA
                </span>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 transition-all duration-200
                       hover:scale-110 active:scale-95"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-ctp-d-yellow" />
              ) : (
                <Moon className="w-5 h-5 text-ctp-l-mauve" />
              )}
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <SearchBar value={search} onChange={setSearch} />
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex border border-ctp-l-surface0 dark:border-ctp-d-surface0 group">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 text-ctp-l-mauve dark:text-ctp-d-mauve' 
                      : 'hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 hover:text-ctp-l-mauve dark:hover:text-ctp-d-mauve'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5 transform transition-transform group-hover:scale-105" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-all duration-200 ${
                    viewMode === 'list' 
                      ? 'bg-ctp-l-surface0 dark:bg-ctp-d-surface0 text-ctp-l-mauve dark:text-ctp-d-mauve' 
                      : 'hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 hover:text-ctp-l-mauve dark:hover:text-ctp-d-mauve'
                  }`}
                >
                  <List className="w-5 h-5 transform transition-transform group-hover:scale-105" />
                </button>
              </div>
              
              <button 
                onClick={() => setFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-ctp-l-surface0 dark:bg-ctp-d-surface0 
                          hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1
                          transition-all duration-200 hover:translate-x-1 group w-full md:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                <span className="transition-colors duration-200 group-hover:text-ctp-l-mauve dark:group-hover:text-ctp-d-mauve">
                  Filter
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Panel */}
      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        selectedLanguages={selectedLanguages}
        onLanguagesChange={setSelectedLanguages}
        availableTags={Array.from(new Set(mockSnippets.flatMap(s => s.tags)))}
        availableLanguages={Array.from(new Set(mockSnippets.map(s => s.language)))}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 mt-40 md:mt-32">
        <section className="mb-8 animate-fadeIn">
          <QuickAccess onFilterChange={setActiveFilter} activeFilter={activeFilter} />
        </section>

        <section className="animate-fadeIn animation-delay-150">
          <SnippetList snippets={filteredSnippets} viewMode={viewMode} />
        </section>
      </main>
    </div>
  );
}

export default App;