import axios from 'axios';
import { BibleVerse, BibleBook, VerseNote, CreateVerseDto, UpdateVerseDto } from '../models/types';

const API = 'http://localhost:3000/api';

// Books
export const getBooks = () => axios.get<BibleBook[]>(`${API}/books`).then(r => r.data);

// Verses
export const searchVerses = (q?: string, testament?: string) => {
  const params: Record<string, string> = {};
  if (q) params.q = q;
  if (testament && testament !== 'ALL') params.testament = testament;
  return axios.get<BibleVerse[]>(`${API}/verses`, { params }).then(r => r.data);
};
export const getVerseById  = (id: number) => axios.get<BibleVerse>(`${API}/verses/${id}`).then(r => r.data);
export const createVerse   = (dto: CreateVerseDto) => axios.post<BibleVerse>(`${API}/verses`, dto).then(r => r.data);
export const updateVerse   = (id: number, dto: UpdateVerseDto) => axios.put<BibleVerse>(`${API}/verses/${id}`, dto).then(r => r.data);
export const deleteVerse   = (id: number) => axios.delete(`${API}/verses/${id}`);

// Notes
export const getNotes      = (verseId: number) => axios.get<VerseNote[]>(`${API}/verses/${verseId}/notes`).then(r => r.data);
export const createNote    = (verseId: number, note_text: string) => axios.post<VerseNote>(`${API}/verses/${verseId}/notes`, { note_text }).then(r => r.data);
export const updateNote    = (verseId: number, noteId: number, note_text: string) => axios.put<VerseNote>(`${API}/verses/${verseId}/notes/${noteId}`, { note_text }).then(r => r.data);
export const deleteNote    = (verseId: number, noteId: number) => axios.delete(`${API}/verses/${verseId}/notes/${noteId}`);
