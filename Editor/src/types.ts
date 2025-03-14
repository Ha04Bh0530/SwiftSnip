export type Language = 
  | 'c'
  | 'cpp'
  | 'java'
  | 'javascript'
  | 'python'
  | 'rust'
  | 'typescript';

export interface Snippet {
  id?: string;
  title: string;
  description: string;
  code: string;
  language: Language;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}