import React, { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { Code2, Copy, Save, FileCode, Hash, Globe2, Lock, Sparkles, Zap, Menu, Trash2, Search, Clock, Filter, LogIn, LogOut, Rocket, BookCopy as BookCode, Shield } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import hotkeys from 'hotkeys-js';
import { CodeEditor } from './components/CodeEditor';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelect } from './components/LanguageSelect';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { supabase } from './lib/supabase';
import type { Language, Snippet, SortOption } from './types';
import ReactMarkdown from 'react-markdown';

const Logo = memo(() => (
  <div className="flex items-center space-x-3 group">
    <div className="relative flex items-center">
      <div className="relative">
        <Code2 className="w-7 h-7 text-latte-blue dark:text-mocha-blue transition-transform group-hover:scale-110 duration-300" />
        <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-latte-peach dark:text-mocha-peach opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
    <div className="hidden sm:block">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-br from-latte-blue to-latte-lavender dark:from-mocha-blue dark:to-mocha-lavender bg-clip-text text-transparent">
          SwiftSnip
        </h1>
        <div className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-latte-surface0/70 dark:bg-mocha-surface0/70 text-latte-blue dark:text-mocha-blue border border-latte-blue/20 dark:border-mocha-blue/20">
          Beta
        </div>
      </div>
      <p className="text-xs text-latte-subtext0 dark:text-mocha-subtext0 font-medium">
        Share Code Snippets In A Flash
      </p>
    </div>
  </div>
));

Logo.displayName = 'Logo';

const WelcomePage = memo(() => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-latte-blue to-latte-lavender dark:from-mocha-blue dark:to-mocha-lavender bg-clip-text text-transparent">
        Welcome to SwiftSnip
      </h1>
      <p className="text-lg text-latte-subtext0 dark:text-mocha-subtext0">
        Your go-to platform for sharing and managing code snippets
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="p-6 border-2 border-latte-surface1 dark:border-mocha-surface1 bg-latte-base dark:bg-mocha-base">
        <Rocket className="w-8 h-8 mb-4 text-latte-blue dark:text-mocha-blue" />
        <h2 className="text-xl font-semibold mb-2">Quick & Easy</h2>
        <p className="text-latte-subtext0 dark:text-mocha-subtext0">
          Create and share code snippets in seconds with our intuitive interface
        </p>
      </div>

      <div className="p-6 border-2 border-latte-surface1 dark:border-mocha-surface1 bg-latte-base dark:bg-mocha-base">
        <BookCode className="w-8 h-8 mb-4 text-latte-mauve dark:text-mocha-mauve" />
        <h2 className="text-xl font-semibold mb-2">Multiple Languages</h2>
        <p className="text-latte-subtext0 dark:text-mocha-subtext0">
          Support for various programming languages with syntax highlighting
        </p>
      </div>

      <div className="p-6 border-2 border-latte-surface1 dark:border-mocha-surface1 bg-latte-base dark:bg-mocha-base">
        <Shield className="w-8 h-8 mb-4 text-latte-green dark:text-mocha-green" />
        <h2 className="text-xl font-semibold mb-2">Secure Sharing</h2>
        <p className="text-latte-subtext0 dark:text-mocha-subtext0">
          Choose between public and private snippets for controlled sharing
        </p>
      </div>
    </div>

    <div className="text-center">
      <button
        onClick={() => document.querySelector<HTMLButtonElement>('[data-signin-button]')?.click()}
        className="inline-flex items-center px-6 py-3 bg-latte-blue dark:bg-mocha-blue text-white hover:opacity-90 transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px] gap-2"
      >
        <LogIn className="w-5 h-5" />
        <span className="font-medium">Sign In to Get Started</span>
      </button>
    </div>
  </div>
));

WelcomePage.displayName = 'WelcomePage';

const MobileMenu = memo(({ isOpen, onNewSnippet, user, onSignIn, onSignOut }: { 
  isOpen: boolean; 
  onNewSnippet: () => void;
  user: any;
  onSignIn: () => void;
  onSignOut: () => void;
}) => (
  isOpen && (
    <div className="md:hidden border-t border-latte-surface1 dark:border-mocha-surface1">
      <div className="p-4 space-y-3">
        {user ? (
          <>
            <button 
              onClick={onNewSnippet}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
            >
              <Zap className="w-4 h-4 text-latte-yellow dark:text-mocha-yellow" />
              <span className="text-sm font-medium">New Snippet</span>
            </button>
            <button
              onClick={onSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </>
        ) : (
          <button
            onClick={onSignIn}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
            data-signin-button
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Sign In</span>
          </button>
        )}
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
));

MobileMenu.displayName = 'MobileMenu';

const sortOptions: { value: SortOption; label: string; icon: React.ElementType }[] = [
  { value: 'updated', label: 'Last Updated', icon: Clock },
  { value: 'title', label: 'Title', icon: Filter },
];

const createEmptySnippet = (): Snippet => ({
  id: undefined,
  title: '',
  description: '',
  code: '',
  language: 'javascript',
  isPublic: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

function App() {
  const { user, signOut } = useAuth();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>(createEmptySnippet);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('updated');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    async function fetchSnippets() {
      try {
        const { data, error } = await supabase
          .from('snippets')
          .select('*')
          .or(`user_id.eq.${user?.id},is_public.eq.true`);

        if (error) throw error;

        setSnippets(data.map(snippet => ({
          ...snippet,
          createdAt: new Date(snippet.created_at),
          updatedAt: new Date(snippet.updated_at)
        })));
      } catch (error) {
        console.error('Error fetching snippets:', error);
        toast.error('Failed to load snippets');
      }
    }

    if (user) {
      fetchSnippets();
    } else {
      setSnippets([]);
      setCurrentSnippet(createEmptySnippet());
    }
  }, [user]);

  useEffect(() => {
    hotkeys('ctrl+s, command+s', (event) => {
      event.preventDefault();
      handleSave();
    });
    hotkeys('ctrl+n, command+n', (event) => {
      event.preventDefault();
      createNewSnippet();
    });
    return () => {
      hotkeys.unbind('ctrl+s, command+s');
      hotkeys.unbind('ctrl+n, command+n');
    };
  }, []);

  const filteredAndSortedSnippets = useMemo(() => {
    return snippets
      .filter(snippet => {
        const query = searchQuery.toLowerCase();
        return (
          snippet.title.toLowerCase().includes(query) ||
          snippet.description?.toLowerCase().includes(query) ||
          snippet.language.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'updated') {
          return b.updatedAt!.getTime() - a.updatedAt!.getTime();
        }
        return a.title.localeCompare(b.title);
      });
  }, [snippets, searchQuery, sortBy]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentSnippet.code);
      toast.success('Code Copied To Clipboard.');
    } catch (error) {
      toast.error('Failed to copy code.');
    }
  }, [currentSnippet.code]);

  const createNewSnippet = useCallback(() => {
    if (!user) {
      toast.error('Please sign in to create snippets');
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentSnippet(createEmptySnippet());
    setIsMenuOpen(false);
  }, [user]);

  const handleSave = useCallback(async () => {
    if (!user) {
      toast.error('Please sign in to save snippets');
      setIsAuthModalOpen(true);
      return;
    }

    if (!currentSnippet.title.trim()) {
      toast.error('Please Enter A Title.');
      return;
    }
    if (!currentSnippet.code.trim()) {
      toast.error('Please Enter Some Code.');
      return;
    }

    try {
      const snippetData = {
        title: currentSnippet.title,
        description: currentSnippet.description,
        code: currentSnippet.code,
        language: currentSnippet.language,
        is_public: currentSnippet.isPublic,
        user_id: user.id,
      };

      let result;
      if (currentSnippet.id) {
        // First check if the snippet exists and belongs to the user
        const { data: existingSnippet, error: checkError } = await supabase
          .from('snippets')
          .select('id')
          .eq('id', currentSnippet.id)
          .eq('user_id', user.id)
          .single();

        if (checkError || !existingSnippet) {
          throw new Error('Snippet not found or you do not have permission to edit it');
        }

        // Update existing snippet
        const { data, error } = await supabase
          .from('snippets')
          .update(snippetData)
          .eq('id', currentSnippet.id)
          .select()
          .single();

        if (error) throw error;
        result = { data };
      } else {
        // Insert new snippet
        const { data, error } = await supabase
          .from('snippets')
          .insert(snippetData)
          .select()
          .single();

        if (error) throw error;
        result = { data };
      }

      const savedSnippet = {
        ...result.data,
        createdAt: new Date(result.data.created_at),
        updatedAt: new Date(result.data.updated_at),
        id: result.data.id,
        isPublic: result.data.is_public,
      };

      setSnippets(prev => {
        const index = prev.findIndex(s => s.id === savedSnippet.id);
        if (index === -1) {
          return [...prev, savedSnippet];
        }
        const updated = [...prev];
        updated[index] = savedSnippet;
        return updated;
      });

      setCurrentSnippet(savedSnippet);
      toast.success('Snippet Saved Successfully!');
    } catch (error) {
      console.error('Error saving snippet:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save snippet');
    }
  }, [currentSnippet, user]);

  const handleDelete = useCallback(async (id: string) => {
    if (!user) {
      toast.error('Please sign in to delete snippets');
      return;
    }

    if (window.confirm('Are you sure you want to delete this snippet?')) {
      try {
        const { error } = await supabase
          .from('snippets')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        setSnippets(prev => prev.filter(s => s.id !== id));
        if (currentSnippet.id === id) {
          createNewSnippet();
        }
        toast.success('Snippet Deleted Successfully!');
      } catch (error) {
        console.error('Error deleting snippet:', error);
        toast.error('Failed to delete snippet');
      }
    }
  }, [currentSnippet.id, createNewSnippet, user]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSnippet(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentSnippet(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handleLanguageChange = useCallback((language: Language) => {
    setCurrentSnippet(prev => ({ ...prev, language }));
  }, []);

  const handleCodeChange = useCallback((code: string) => {
    setCurrentSnippet(prev => ({ ...prev, code }));
  }, []);

  const handlePublicToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSnippet(prev => ({ ...prev, isPublic: e.target.checked }));
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const loadSnippet = useCallback((snippet: Snippet) => {
    setCurrentSnippet(snippet);
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-latte-base dark:bg-mocha-base text-latte-text dark:text-mocha-text selection:bg-latte-blue/20 dark:selection:bg-mocha-blue/20">
      <header className="sticky top-0 z-50 border-b border-latte-surface1 dark:border-mocha-surface1 bg-gradient-to-b from-latte-base via-latte-base to-latte-base/95 dark:from-mocha-base dark:via-mocha-base dark:to-mocha-base/95 backdrop-blur supports-[backdrop-filter]:bg-latte-base/80 dark:supports-[backdrop-filter]:bg-mocha-base/80">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
          <Logo />

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button 
                  onClick={createNewSnippet}
                  className="flex items-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
                  title="New Snippet (Ctrl/⌘ + N)"
                >
                  <Zap className="w-4 h-4 text-latte-yellow dark:text-mocha-yellow" />
                  <span className="text-sm font-medium">New Snippet</span>
                </button>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1"
                data-signin-button
              >
                <LogIn className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
            <div className="h-6 w-[1px] bg-latte-surface1 dark:bg-mocha-surface1" />
            <ThemeToggle />
          </div>

          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-latte-surface0/70 dark:hover:bg-mocha-surface0/70 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen} 
          onNewSnippet={createNewSnippet}
          user={user}
          onSignIn={() => setIsAuthModalOpen(true)}
          onSignOut={signOut}
        />
      </header>

      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <WelcomePage />
        ) : (
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[350px,1fr] gap-8">
            {snippets.length > 0 && (
              <div className="space-y-3 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24">
                <div className="flex flex-col gap-4">
                  <h2 className="font-medium">Saved Snippets</h2>
                  <div className="flex flex-col gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-latte-overlay0 dark:text-mocha-overlay0" />
                      <input
                        type="text"
                        placeholder="Search snippets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-latte-base dark:bg-mocha-base border border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue transition-colors"
                      />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 bg-latte-base dark:bg-mocha-base border border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue transition-colors"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="lg:overflow-y-auto lg:h-[calc(100%-7rem)] space-y-2 pr-2">
                  {filteredAndSortedSnippets.map(snippet => (
                    <div
                      key={snippet.id}
                      className="flex flex-col p-4 border-2 border-latte-surface1 dark:border-mocha-surface1 hover:border-latte-blue dark:hover:border-mocha-blue transition-colors group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <button
                          onClick={() => loadSnippet(snippet)}
                          className="flex-1 text-left min-w-0"
                        >
                          <h3 className="font-medium truncate pr-2 group-hover:text-latte-blue dark:group-hover:text-mocha-blue transition-colors">
                            {snippet.title}
                          </h3>
                        </button>
                        {user?.id === snippet.user_id && (
                          <button
                            onClick={() => handleDelete(snippet.id!)}
                            className="text-latte-surface2 dark:text-mocha-surface2 hover:text-latte-red dark:hover:text-mocha-red transition-colors flex-shrink-0 p-1"
                            aria-label="Delete snippet"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-latte-subtext0 dark:text-mocha-subtext0 line-clamp-2 mb-3 flex-grow">
                        {snippet.description || 'No description'}
                      </p>
                      <div className="pt-3 border-t border-latte-surface1 dark:border-mocha-surface1 flex items-center justify-between text-xs">
                        <span className="text-latte-subtext0 dark:text-mocha-subtext0" title={snippet.updatedAt!.toLocaleString()}>
                          {formatDistanceToNow(snippet.updatedAt!, { addSuffix: true })}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-latte-surface0/70 dark:bg-mocha-surface0/70 text-latte-subtext1 dark:text-mocha-subtext1">
                            {snippet.language}
                          </span>
                          {snippet.isPublic ? (
                            <Globe2 className="w-4 h-4 text-latte-blue dark:text-mocha-blue" />
                          ) : (
                            <Lock className="w-4 h-4 text-latte-mauve dark:text-mocha-mauve" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Hash className="w-5 h-5 text-latte-overlay0 dark:text-mocha-overlay0" />
                  <label htmlFor="title" className="font-medium">Title</label>
                </div>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter A Descriptive Title For Your Snippet..."
                  value={currentSnippet.title}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue transition-all duration-200 placeholder:text-latte-overlay0/70 dark:placeholder:text-mocha-overlay0/70"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileCode className="w-5 h-5 text-latte-overlay0 dark:text-mocha-overlay0" />
                  <label htmlFor="description" className="font-medium">Description</label>
                </div>
                <textarea
                  id="description"
                  placeholder="Add A Description (Markdown Supported)..."
                  value={currentSnippet.description}
                  onChange={handleDescriptionChange}
                  className="w-full h-32 px-4 py-3 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue resize-none transition-all duration-200 placeholder:text-latte-overlay0/70 dark:placeholder:text-mocha-overlay0/70"
                />
                {currentSnippet.description && (
                  <div className="p-6 bg-latte-surface0/50 dark:bg-mocha-surface0/50 prose dark:prose-invert max-w-none border border-latte-surface1 dark:border-mocha-surface1">
                    <ReactMarkdown>{currentSnippet.description}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <LanguageSelect
                    value={currentSnippet.language}
                    onChange={handleLanguageChange}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors group border border-latte-surface1 dark:border-mocha-surface1"
                  >
                    <Copy className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Copy Code</span>
                  </button>
                </div>

                <CodeEditor
                  code={currentSnippet.code}
                  language={currentSnippet.language}
                  onChange={handleCodeChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 mt-6 border-t border-latte-surface1 dark:border-mocha-surface1">
                <label className="flex items-center space-x-3 group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentSnippet.isPublic}
                    onChange={handlePublicToggle}
                    className="sr-only"
                  />
                  <div className="w-14 h-7 bg-latte-surface1 dark:bg-mocha-surface1 relative transition-colors group-hover:bg-latte-surface2 dark:group-hover:bg-mocha-surface2">
                    <div 
                      className={`absolute inset-y-0 ${currentSnippet.isPublic ? 'right-0' : 'left-0'} w-7 h-7 bg-latte-blue dark:bg-mocha-blue transition-all duration-300 flex items-center justify-center text-white`}
                    >
                      {currentSnippet.isPublic ? <Globe2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                  </div>
                  <span className="font-medium">
                    {currentSnippet.isPublic ? 'Public' : 'Private'} Snippet
                  </span>
                </label>

                <button
                  onClick={handleSave}
                  className="flex items-center justify-center space-x-2 px-8 py-3 bg-latte-blue dark:bg-mocha-blue text-white hover:opacity-90 transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
                  title="Save Snippet (Ctrl/⌘ + S)"
                >
                  <Save className="w-4 h-4" />
                  <span className="font-medium">Save Snippet</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-latte-base !text-latte-text dark:!bg-mocha-base dark:!text-mocha-text !border !border-latte-surface1 dark:!border-mocha-surface1 !rounded-none',
        }}
      />
    </div>
  );
}

export default App;