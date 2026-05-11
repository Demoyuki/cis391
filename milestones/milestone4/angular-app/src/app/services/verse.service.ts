import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BibleVerse, BibleBook, VerseNote, CreateVerseDto, UpdateVerseDto, CreateNoteDto } from '../models/verse.model';

@Injectable({ providedIn: 'root' })
export class VerseService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── Books ─────────────────────────────────────────────────────
  getBooks(): Observable<BibleBook[]> {
    return this.http.get<BibleBook[]>(`${this.api}/books`);
  }

  // ── Verses ────────────────────────────────────────────────────
  searchVerses(q?: string, testament?: string): Observable<BibleVerse[]> {
    let params = new HttpParams();
    if (q)          params = params.set('q', q);
    if (testament && testament !== 'ALL') params = params.set('testament', testament);
    return this.http.get<BibleVerse[]>(`${this.api}/verses`, { params });
  }

  getVersesByReference(bookId: number, chapter: number): Observable<BibleVerse[]> {
    const params = new HttpParams().set('book', bookId).set('chapter', chapter);
    return this.http.get<BibleVerse[]>(`${this.api}/verses`, { params });
  }

  getVerseById(id: number): Observable<BibleVerse> {
    return this.http.get<BibleVerse>(`${this.api}/verses/${id}`);
  }

  createVerse(dto: CreateVerseDto): Observable<BibleVerse> {
    return this.http.post<BibleVerse>(`${this.api}/verses`, dto);
  }

  updateVerse(id: number, dto: UpdateVerseDto): Observable<BibleVerse> {
    return this.http.put<BibleVerse>(`${this.api}/verses/${id}`, dto);
  }

  deleteVerse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/verses/${id}`);
  }

  // ── Notes ─────────────────────────────────────────────────────
  getNotes(verseId: number): Observable<VerseNote[]> {
    return this.http.get<VerseNote[]>(`${this.api}/verses/${verseId}/notes`);
  }

  createNote(verseId: number, dto: CreateNoteDto): Observable<VerseNote> {
    return this.http.post<VerseNote>(`${this.api}/verses/${verseId}/notes`, dto);
  }

  updateNote(verseId: number, noteId: number, dto: CreateNoteDto): Observable<VerseNote> {
    return this.http.put<VerseNote>(`${this.api}/verses/${verseId}/notes/${noteId}`, dto);
  }

  deleteNote(verseId: number, noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/verses/${verseId}/notes/${noteId}`);
  }
}
