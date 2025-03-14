import React, { useState, useCallback, memo } from 'react';
import { Toaster, toast } from 'sonner';
import { Code2, Copy, Save, FileCode, Hash, Globe2, Lock, Sparkles, Zap, Menu } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelect } from './components/LanguageSelect';
import type { Language, Snippet } from './types';
import ReactMarkdown from 'react-markdown';

// Memoize the header logo to prevent unnecessary re-renders
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

// Memoize the mobile menu to prevent unnecessary re-renders
const MobileMenu = memo(({ isOpen }: { isOpen: boolean }) => (
  isOpen && (
    <div className="md:hidden border-t border-latte-surface1 dark:border-mocha-surface1">
      <div className="p-4 space-y-3">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1">
          <Zap className="w-4 h-4 text-latte-yellow dark:text-mocha-yellow" />
          <span className="text-sm font-medium">New Snippet</span>
        </button>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
));

MobileMenu.displayName = 'MobileMenu';

function App() {
  const [snippet, setSnippet] = useState<Snippet>({
    title: '',
    description: '',
    code: '',
    language: 'javascript',
    isPublic: true
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      toast.success('Code Copied To Clipboard.');
    } catch (error) {
      toast.error('Failed to copy code.');
    }
  }, [snippet.code]);

  const handleSave = useCallback(() => {
    if (!snippet.title.trim()) {
      toast.error('Please Enter A Title.');
      return;
    }
    if (!snippet.code.trim()) {
      toast.error('Please Enter Some Code.');
      return;
    }
    toast.success('Snippet Saved Successfully!');
  }, [snippet.title, snippet.code]);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSnippet(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSnippet(prev => ({ ...prev, description: e.target.value }));
  }, []);

  const handleLanguageChange = useCallback((language: Language) => {
    setSnippet(prev => ({ ...prev, language }));
  }, []);

  const handleCodeChange = useCallback((code: string) => {
    setSnippet(prev => ({ ...prev, code }));
  }, []);

  const handlePublicToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSnippet(prev => ({ ...prev, isPublic: e.target.checked }));
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-latte-base dark:bg-mocha-base text-latte-text dark:text-mocha-text selection:bg-latte-blue/20 dark:selection:bg-mocha-blue/20">
      <header className="sticky top-0 z-50 border-b border-latte-surface1 dark:border-mocha-surface1 bg-gradient-to-b from-latte-base via-latte-base to-latte-base/95 dark:from-mocha-base dark:via-mocha-base dark:to-mocha-base/95 backdrop-blur supports-[backdrop-filter]:bg-latte-base/80 dark:supports-[backdrop-filter]:bg-mocha-base/80">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
          <Logo />

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-latte-surface0/70 dark:bg-mocha-surface0/70 hover:bg-latte-surface1 dark:hover:bg-mocha-surface1 transition-colors border border-latte-surface1 dark:border-mocha-surface1">
              <Zap className="w-4 h-4 text-latte-yellow dark:text-mocha-yellow" />
              <span className="text-sm font-medium">New Snippet</span>
            </button>
            <div className="h-6 w-[1px] bg-latte-surface1 dark:bg-mocha-surface1" />
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-latte-surface0/70 dark:hover:bg-mocha-surface0/70 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <MobileMenu isOpen={isMenuOpen} />
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Title section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-latte-overlay0 dark:text-mocha-overlay0" />
              <label htmlFor="title" className="font-medium">Title</label>
            </div>
            <input
              id="title"
              type="text"
              placeholder="Enter A Descriptive Title For Your Snippet..."
              value={snippet.title}
              onChange={handleTitleChange}
              className="w-full px-4 py-3 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue transition-all duration-200 placeholder:text-latte-overlay0/70 dark:placeholder:text-mocha-overlay0/70"
            />
          </div>

          {/* Description section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-latte-overlay0 dark:text-mocha-overlay0" />
              <label htmlFor="description" className="font-medium">Description</label>
            </div>
            <textarea
              id="description"
              placeholder="Add A Description (Markdown Supported)..."
              value={snippet.description}
              onChange={handleDescriptionChange}
              className="w-full h-32 px-4 py-3 bg-latte-base dark:bg-mocha-base border-2 border-latte-surface1 dark:border-mocha-surface1 focus:outline-none focus:border-latte-blue dark:focus:border-mocha-blue resize-none transition-all duration-200 placeholder:text-latte-overlay0/70 dark:placeholder:text-mocha-overlay0/70"
            />
            {snippet.description && (
              <div className="p-6 bg-latte-surface0/50 dark:bg-mocha-surface0/50 prose dark:prose-invert max-w-none border border-latte-surface1 dark:border-mocha-surface1">
                <ReactMarkdown>{snippet.description}</ReactMarkdown>
              </div>
            )}
          </div>

          {/* Code editor section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <LanguageSelect
                value={snippet.language}
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
              code={snippet.code}
              language={snippet.language}
              onChange={handleCodeChange}
            />
          </div>

          {/* Footer section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 mt-6 border-t border-latte-surface1 dark:border-mocha-surface1">
            <label className="flex items-center space-x-3 group cursor-pointer">
              <input
                type="checkbox"
                checked={snippet.isPublic}
                onChange={handlePublicToggle}
                className="sr-only"
              />
              <div className="w-14 h-7 bg-latte-surface1 dark:bg-mocha-surface1 relative transition-colors group-hover:bg-latte-surface2 dark:group-hover:bg-mocha-surface2">
                <div 
                  className={`absolute inset-y-0 ${snippet.isPublic ? 'right-0' : 'left-0'} w-7 h-7 bg-latte-blue dark:bg-mocha-blue transition-all duration-300 flex items-center justify-center text-white`}
                >
                  {snippet.isPublic ? <Globe2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
              </div>
              <span className="font-medium">
                {snippet.isPublic ? 'Public' : 'Private'} Snippet
              </span>
            </label>

            <button
              onClick={handleSave}
              className="flex items-center justify-center space-x-2 px-8 py-3 bg-latte-blue dark:bg-mocha-blue text-white hover:opacity-90 transition-all duration-200 hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              <Save className="w-4 h-4" />
              <span className="font-medium">Save Snippet</span>
            </button>
          </div>
        </div>
      </main>

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