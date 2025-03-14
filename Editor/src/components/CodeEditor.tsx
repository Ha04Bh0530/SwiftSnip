import React from 'react';
import Editor from '@monaco-editor/react';
import { useTheme, THEME_CHANGE_EVENT } from '../hooks/useTheme';
import type { Language } from '../types';

// Catppuccin Latte theme
const latteTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6c6f85', fontStyle: 'italic' },
    { token: 'keyword', foreground: '8839ef', fontStyle: 'bold' },
    { token: 'string', foreground: '40a02b' },
    { token: 'number', foreground: 'fe640b' },
    { token: 'type', foreground: '1e66f5' },
    { token: 'function', foreground: '1e66f5' },
    { token: 'variable', foreground: '4c4f69' },
    { token: 'operator', foreground: '179299' },
    { token: 'delimiter', foreground: '8c8fa1' },
    { token: 'delimiter.bracket', foreground: '8839ef' },
    { token: 'constant', foreground: 'fe640b' },
    { token: 'regexp', foreground: '40a02b' },
    { token: 'annotation', foreground: 'dd7878' },
    { token: 'namespace', foreground: '1e66f5', fontStyle: 'italic' },
    { token: 'parameter', foreground: 'e64553' },
    { token: 'typeParameter', foreground: 'df8e1d' },
    { token: 'definition', foreground: '1e66f5', fontStyle: 'bold' },
    { token: 'macro', foreground: '8839ef', fontStyle: 'italic' },
  ],
  colors: {
    'editor.background': '#eff1f5',
    'editor.foreground': '#4c4f69',
    'editor.lineHighlightBackground': '#ccd0da50',
    'editor.lineHighlightBorder': '#ccd0da00',
    'editor.selectionBackground': '#acb0be50',
    'editor.inactiveSelectionBackground': '#acb0be30',
    'editor.selectionHighlightBackground': '#acb0be30',
    'editor.wordHighlightBackground': '#acb0be30',
    'editor.findMatchBackground': '#40a02b40',
    'editor.findMatchHighlightBackground': '#40a02b20',
    'editor.findRangeHighlightBackground': '#40a02b10',
    'editorCursor.foreground': '#1e66f5',
    'editorWhitespace.foreground': '#9ca0b0',
    'editorLineNumber.foreground': '#8c8fa1',
    'editorLineNumber.activeForeground': '#4c4f69',
    'editorIndentGuide.background': '#ccd0da',
    'editorIndentGuide.activeBackground': '#bcc0cc',
    'editorBracketMatch.background': '#8839ef20',
    'editorBracketMatch.border': '#8839ef40',
    'editorOverviewRuler.border': '#ccd0da',
    'editorOverviewRuler.findMatchForeground': '#40a02b40',
    'editorOverviewRuler.bracketMatchForeground': '#8839ef40',
    'editorHoverWidget.background': '#eff1f5',
    'editorHoverWidget.border': '#ccd0da',
    'editorSuggestWidget.background': '#eff1f5',
    'editorSuggestWidget.border': '#ccd0da',
    'editorSuggestWidget.selectedBackground': '#ccd0da50',
    'editorSuggestWidget.highlightForeground': '#1e66f5',
  },
};

// Catppuccin Mocha theme
const mochaTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: 'a6adc8', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'cba6f7', fontStyle: 'bold' },
    { token: 'string', foreground: 'a6e3a1' },
    { token: 'number', foreground: 'fab387' },
    { token: 'type', foreground: '89b4fa' },
    { token: 'function', foreground: '89b4fa' },
    { token: 'variable', foreground: 'cdd6f4' },
    { token: 'operator', foreground: '94e2d5' },
    { token: 'delimiter', foreground: '9399b2' },
    { token: 'delimiter.bracket', foreground: 'cba6f7' },
    { token: 'constant', foreground: 'fab387' },
    { token: 'regexp', foreground: 'a6e3a1' },
    { token: 'annotation', foreground: 'f2cdcd' },
    { token: 'namespace', foreground: '89b4fa', fontStyle: 'italic' },
    { token: 'parameter', foreground: 'eba0ac' },
    { token: 'typeParameter', foreground: 'f9e2af' },
    { token: 'definition', foreground: '89b4fa', fontStyle: 'bold' },
    { token: 'macro', foreground: 'cba6f7', fontStyle: 'italic' },
  ],
  colors: {
    'editor.background': '#1e1e2e',
    'editor.foreground': '#cdd6f4',
    'editor.lineHighlightBackground': '#31324450',
    'editor.lineHighlightBorder': '#31324400',
    'editor.selectionBackground': '#585b7050',
    'editor.inactiveSelectionBackground': '#585b7030',
    'editor.selectionHighlightBackground': '#585b7030',
    'editor.wordHighlightBackground': '#585b7030',
    'editor.findMatchBackground': '#a6e3a140',
    'editor.findMatchHighlightBackground': '#a6e3a120',
    'editor.findRangeHighlightBackground': '#a6e3a110',
    'editorCursor.foreground': '#89b4fa',
    'editorWhitespace.foreground': '#6c7086',
    'editorLineNumber.foreground': '#7f849c',
    'editorLineNumber.activeForeground': '#cdd6f4',
    'editorIndentGuide.background': '#313244',
    'editorIndentGuide.activeBackground': '#45475a',
    'editorBracketMatch.background': '#cba6f720',
    'editorBracketMatch.border': '#cba6f740',
    'editorOverviewRuler.border': '#313244',
    'editorOverviewRuler.findMatchForeground': '#a6e3a140',
    'editorOverviewRuler.bracketMatchForeground': '#cba6f740',
    'editorHoverWidget.background': '#1e1e2e',
    'editorHoverWidget.border': '#313244',
    'editorSuggestWidget.background': '#1e1e2e',
    'editorSuggestWidget.border': '#313244',
    'editorSuggestWidget.selectedBackground': '#31324450',
    'editorSuggestWidget.highlightForeground': '#89b4fa',
  },
};

const languageMap: Record<Language, string> = {
  c: 'c',
  cpp: 'cpp',
  java: 'java',
  javascript: 'javascript',
  python: 'python',
  rust: 'rust',
  typescript: 'typescript'
};

interface CodeEditorProps {
  code: string;
  language: Language;
  onChange: (value: string) => void;
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const { theme } = useTheme();
  const monacoRef = React.useRef<any>(null);

  // Define editor options
  const options = {
    fontSize: 15,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontLigatures: true,
    lineNumbers: 'on',
    renderLineHighlight: 'all',
    renderWhitespace: 'selection',
    tabSize: 2,
    wordWrap: 'on',
    padding: { top: 16, bottom: 16 },
    minimap: {
      enabled: true,
      scale: 2,
      showSlider: 'mouseover',
      renderCharacters: false,
    },
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
      useShadows: false,
    },
    smoothScrolling: true,
    cursorSmoothCaretAnimation: 'on',
    cursorBlinking: 'smooth',
    guides: {
      indentation: true,
      bracketPairs: true,
      highlightActiveIndentation: true,
      bracketPairsHorizontal: true,
    },
    bracketPairColorization: {
      enabled: true,
      independentColorPoolPerBracketType: true,
    },
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoSurround: 'languageDefined',
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
    suggest: {
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
      showFields: true,
      showVariables: true,
      showClasses: true,
      showStructs: true,
      showInterfaces: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showKeywords: true,
      showWords: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showSnippets: true,
    },
  };

  // Handle editor mounting
  const handleEditorDidMount = (editor: any, monaco: any) => {
    monacoRef.current = monaco;

    // Define themes
    monaco.editor.defineTheme('catppuccin-latte', latteTheme);
    monaco.editor.defineTheme('catppuccin-mocha', mochaTheme);

    // Set initial theme
    monaco.editor.setTheme(theme === 'dark' ? 'catppuccin-mocha' : 'catppuccin-latte');
  };

  // Listen for theme changes using a custom event
  React.useEffect(() => {
    const handleThemeChange = (event: CustomEvent<'light' | 'dark'>) => {
      if (monacoRef.current) {
        monacoRef.current.editor.setTheme(
          event.detail === 'dark' ? 'catppuccin-mocha' : 'catppuccin-latte'
        );
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener);
    };
  }, []);

  return (
    <div className="w-full h-[500px] border-2 border-latte-surface1 dark:border-mocha-surface1 transition-colors duration-200 group focus-within:border-latte-blue dark:focus-within:border-mocha-blue">
      <Editor
        height="500px"
        language={languageMap[language]}
        value={code}
        onChange={value => onChange(value || '')}
        options={options}
        onMount={handleEditorDidMount}
        loading={
          <div className="w-full h-full flex items-center justify-center bg-latte-base dark:bg-mocha-base text-latte-text dark:text-mocha-text">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading editor...</span>
            </div>
          </div>
        }
      />
    </div>
  );
}