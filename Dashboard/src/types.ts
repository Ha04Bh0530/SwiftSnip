export interface Snippet {
  id: string;
  title: string;
  language: string;
  content: string;
  tags: string[];
  lastModified: string;
  isFavorite: boolean;
  description?: string;
  created: string;
}

export type SortOption = 'date' | 'title' | 'language';
export type ViewMode = 'grid' | 'list';
export type FilterOption = 'all' | 'favorites' | 'recent' | string;