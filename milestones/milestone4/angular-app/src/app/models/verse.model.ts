export interface BibleVerse {
  id: number;
  book_id: number;
  chapter: number;
  verse_num: number;
  text: string;
  book_name?: string;
  testament?: string;
}
export interface VerseNote {
  note_id: number;
  verse_id: number;
  note_text: string;
  created_at: string;
  updated_at: string;
}
export interface BibleBook {
  book_id: number;
  book_name: string;
  testament: 'OT' | 'NT';
  chapter_count: number;
}
export interface CreateVerseDto { book_id: number; chapter: number; verse_num: number; text: string; }
export interface UpdateVerseDto { book_id?: number; chapter?: number; verse_num?: number; text?: string; }
export interface CreateNoteDto { note_text: string; }
