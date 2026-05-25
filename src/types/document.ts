export type DocumentType = 'resume' | 'cover_letter' | 'portfolio' | 'certificate' | 'work_sample' | 'other';
export type FileFormat = 'pdf' | 'docx' | 'pptx' | 'png' | 'jpg';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  format: FileFormat;
  size: number; // in bytes
  uploadDate: string;
  modifiedDate: string;
  tags: string[];
  folderId?: string; // null if unassigned
  favorite: boolean;
  isPrimary?: boolean; // strictly used for 'resume' type
  version?: string; // string or number indicating version like "v1", "v2"
  url?: string; // external or internal path
  description?: string; // short description or pitch for the document
}

export interface Folder {
  id: string;
  name: string;
  count: number; // number of files
  icon?: string;
}

export interface DocumentStatsData {
  totalFiles: number;
  totalStorageUsed: number; // in bytes
  maxStorage: number; // in bytes
  resumes: number;
  coverLetters: number;
  portfolios: number;
}
