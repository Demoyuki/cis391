export interface BibleBook {
  book_id: number;
  book_name: string;
  testament: 'OT' | 'NT';
  chapter_count: number;
}
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
  created_at: Date;
  updated_at: Date;
}
export interface CreateNoteBody { note_text: string; }
export interface UpdateNoteBody { note_text: string; }
