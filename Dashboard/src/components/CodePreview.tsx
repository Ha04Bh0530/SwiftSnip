import React from 'react';
import { X, Copy, Check, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import type { Snippet } from '../types';

interface CodePreviewProps {
  snippet: Snippet | null;
  onClose: () => void;
}

export function CodePreview({ snippet, onClose }: CodePreviewProps) {
  const [copied, setCopied] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(14);

  if (!snippet) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 10));

  const previewClass = isFullscreen 
    ? 'fixed inset-0 w-full' 
    : 'fixed right-0 top-0 h-full w-full md:w-[600px]';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className={`${previewClass} bg-ctp-l-base dark:bg-ctp-d-base 
                    shadow-lg transform transition-all duration-300 ease-out animate-slideIn
                    flex flex-col`}>
        {/* Header */}
        <div className="flex-none p-6 border-b border-ctp-l-surface0 dark:border-ctp-d-surface0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">{snippet.title}</h2>
              <div className="flex items-center gap-4">
                <span className="px-2 py-1 bg-ctp-l-surface0 dark:bg-ctp-d-surface0 
                              text-ctp-l-blue dark:text-ctp-d-blue text-sm">
                  {snippet.language}
                </span>
                <span className="text-sm text-ctp-l-subtext0 dark:text-ctp-d-subtext0">
                  Last modified: {new Date(snippet.lastModified).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 
                         text-ctp-l-subtext0 dark:text-ctp-d-subtext0 
                         hover:text-ctp-l-text dark:hover:text-ctp-d-text transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" />
                ) : (
                  <Maximize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-ctp-l-surface0 dark:hover:bg-ctp-d-surface0 
                         text-ctp-l-subtext0 dark:text-ctp-d-subtext0 
                         hover:text-ctp-l-text dark:hover:text-ctp-d-text transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          {snippet.description && (
            <p className="mt-4 text-sm text-ctp-l-subtext1 dark:text-ctp-d-subtext1">
              {snippet.description}
            </p>
          )}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-hidden p-6">
          <div className="relative h-full group">
            <div className="absolute right-2 top-2 flex items-center gap-2 z-10 opacity-0 
                          group-hover:opacity-100 transition-opacity">
              <div className="flex items-center bg-ctp-l-surface0 dark:bg-ctp-d-surface0 
                            divide-x divide-ctp-l-surface1 dark:divide-ctp-d-surface1">
                <button
                  onClick={decreaseFontSize}
                  className="p-2 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1 
                           transition-colors text-sm font-medium"
                >
                  A-
                </button>
                <button
                  onClick={increaseFontSize}
                  className="p-2 hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1 
                           transition-colors text-sm font-medium"
                >
                  A+
                </button>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 bg-ctp-l-surface0 dark:bg-ctp-d-surface0 
                         hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1
                         transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-ctp-l-green dark:text-ctp-d-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="bg-ctp-l-mantle dark:bg-ctp-d-mantle h-full overflow-auto">
              <pre className="p-4 h-full">
                <code 
                  className="font-mono whitespace-pre-wrap break-words transition-all duration-200"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {snippet.content}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Tags */}
        {snippet.tags.length > 0 && (
          <div className="flex-none p-6 border-t border-ctp-l-surface0 dark:border-ctp-d-surface0">
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-ctp-l-surface0 dark:bg-ctp-d-surface0 
                           text-ctp-l-subtext0 dark:text-ctp-d-subtext0"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}