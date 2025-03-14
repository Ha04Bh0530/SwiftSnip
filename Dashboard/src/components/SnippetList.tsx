import React, { useState } from 'react';
import { Star, Clock, Hash, Code } from 'lucide-react';
import { CodePreview } from './CodePreview';
import type { Snippet } from '../types';

interface SnippetListProps {
  snippets: Snippet[];
  viewMode: 'grid' | 'list';
}

export function SnippetList({ snippets, viewMode }: SnippetListProps) {
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null);

  const containerClass = viewMode === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
    : 'flex flex-col gap-4';

  return (
    <>
      {snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Code className="w-12 h-12 text-ctp-l-overlay0 dark:text-ctp-d-overlay0 mb-4" />
          <h3 className="text-lg font-medium mb-2">No snippets found</h3>
          <p className="text-ctp-l-subtext0 dark:text-ctp-d-subtext0">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className={containerClass}>
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              onClick={() => setSelectedSnippet(snippet)}
              className="bg-ctp-l-surface0 dark:bg-ctp-d-surface0 p-4
                       hover:bg-ctp-l-surface1 dark:hover:bg-ctp-d-surface1 
                       transition-all duration-200 cursor-pointer group
                       hover:shadow-lg hover:-translate-y-1 border border-transparent
                       hover:border-ctp-l-surface1 dark:hover:border-ctp-d-surface1"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-ctp-l-text dark:text-ctp-d-text font-medium group-hover:text-ctp-l-mauve dark:group-hover:text-ctp-d-mauve transition-colors">
                  {snippet.title}
                </h3>
                <Star 
                  className={`w-5 h-5 ${
                    snippet.isFavorite 
                      ? 'text-ctp-l-yellow dark:text-ctp-d-yellow' 
                      : 'text-ctp-l-overlay0 dark:text-ctp-d-overlay0'
                  } group-hover:text-ctp-l-yellow dark:group-hover:text-ctp-d-yellow 
                  transition-all duration-200 group-hover:scale-110`}
                />
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="px-2 py-1 bg-ctp-l-surface1 dark:bg-ctp-d-surface1
                             text-ctp-l-blue dark:text-ctp-d-blue">
                  {snippet.language}
                </span>
                <div className="flex items-center text-ctp-l-subtext0 dark:text-ctp-d-subtext0">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(snippet.lastModified).toLocaleDateString()}
                </div>
              </div>
              
              {snippet.description && (
                <p className="mt-3 text-sm text-ctp-l-subtext1 dark:text-ctp-d-subtext1 line-clamp-2">
                  {snippet.description}
                </p>
              )}
              
              {snippet.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <div key={tag} className="flex items-center text-xs text-ctp-l-subtext1 dark:text-ctp-d-subtext1
                                          bg-ctp-l-surface1 dark:bg-ctp-d-surface1 px-2 py-1">
                      <Hash className="w-3 h-3 mr-1" />
                      {tag}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <CodePreview
        snippet={selectedSnippet}
        onClose={() => setSelectedSnippet(null)}
      />
    </>
  );
}