import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VerseService } from '../../services/verse.service';
import { BibleVerse, VerseNote } from '../../models/verse.model';

@Component({
  selector: 'app-verse-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container py-4">
      <!-- Back -->
      <a routerLink="/verses" class="btn btn-outline-secondary btn-sm mb-4">← Back to Verses</a>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
      </div>

      <ng-container *ngIf="verse">
        <!-- Verse Header Card -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0 fw-bold">
              ✝ {{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse_num }}
            </h4>
            <div class="d-flex gap-2">
              <a [routerLink]="['/verses', verse.id, 'edit']" class="btn btn-light btn-sm">✏️ Edit</a>
              <button class="btn btn-danger btn-sm" (click)="deleteVerse()">🗑 Delete</button>
            </div>
          </div>
          <div class="card-body">
            <blockquote class="blockquote mb-2">
              <p class="fst-italic fs-5">"{{ verse.text }}"</p>
              <footer class="blockquote-footer mt-1">
                {{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse_num }}
                <span class="badge ms-2" [ngClass]="verse.testament === 'OT' ? 'bg-warning text-dark' : 'bg-success'">
                  {{ verse.testament }}
                </span>
              </footer>
            </blockquote>
          </div>
        </div>

        <!-- Notes Section -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-light">
            <h5 class="mb-0">📝 Personal Notes ({{ notes.length }})</h5>
          </div>
          <div class="card-body">

            <!-- Existing Notes -->
            <div *ngIf="notes.length === 0" class="text-muted fst-italic mb-3">No notes yet. Add one below.</div>
            <div class="list-group mb-4">
              <div class="list-group-item" *ngFor="let note of notes">
                <div *ngIf="editingNoteId !== note.note_id">
                  <div class="d-flex justify-content-between">
                    <p class="mb-1">{{ note.note_text }}</p>
                    <div class="d-flex gap-2 flex-shrink-0 ms-2">
                      <button class="btn btn-sm btn-outline-secondary" (click)="startEditNote(note)">Edit</button>
                      <button class="btn btn-sm btn-outline-danger" (click)="deleteNote(note)">Delete</button>
                    </div>
                  </div>
                  <small class="text-muted">{{ note.created_at | date:'medium' }}</small>
                </div>
                <!-- Inline Edit -->
                <div *ngIf="editingNoteId === note.note_id">
                  <textarea class="form-control mb-2" rows="2" [(ngModel)]="editNoteText"></textarea>
                  <div class="d-flex gap-2">
                    <button class="btn btn-sm btn-primary" (click)="saveEditNote(note)">Save</button>
                    <button class="btn btn-sm btn-outline-secondary" (click)="cancelEdit()">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Note Form -->
            <h6 class="fw-semibold">Add a Note</h6>
            <textarea class="form-control mb-2" rows="3" [(ngModel)]="newNoteText"
              placeholder="Write your personal reflection or study note..."></textarea>
            <button class="btn btn-primary" (click)="addNote()" [disabled]="!newNoteText.trim()">
              💾 Save Note
            </button>
          </div>
        </div>
      </ng-container>
    </div>
  `
})
export class VerseDetailComponent implements OnInit {
  verse?: BibleVerse;
  notes: VerseNote[] = [];
  loading = false;
  newNoteText = '';
  editingNoteId: number | null = null;
  editNoteText = '';

  constructor(private route: ActivatedRoute, private verseService: VerseService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.verseService.getVerseById(id).subscribe(v => { this.verse = v; this.loading = false; });
    this.verseService.getNotes(id).subscribe(n => this.notes = n);
  }

  deleteVerse(): void {
    if (!this.verse || !confirm('Delete this verse and all its notes?')) return;
    this.verseService.deleteVerse(this.verse.id).subscribe(() => history.back());
  }

  addNote(): void {
    if (!this.verse || !this.newNoteText.trim()) return;
    this.verseService.createNote(this.verse.id, { note_text: this.newNoteText.trim() }).subscribe(n => {
      this.notes.push(n); this.newNoteText = '';
    });
  }

  startEditNote(note: VerseNote): void { this.editingNoteId = note.note_id; this.editNoteText = note.note_text; }
  cancelEdit(): void { this.editingNoteId = null; this.editNoteText = ''; }

  saveEditNote(note: VerseNote): void {
    if (!this.verse) return;
    this.verseService.updateNote(this.verse.id, note.note_id, { note_text: this.editNoteText }).subscribe(updated => {
      const i = this.notes.findIndex(n => n.note_id === note.note_id);
      if (i !== -1) this.notes[i] = updated;
      this.cancelEdit();
    });
  }

  deleteNote(note: VerseNote): void {
    if (!this.verse || !confirm('Delete this note?')) return;
    this.verseService.deleteNote(this.verse.id, note.note_id).subscribe(() => {
      this.notes = this.notes.filter(n => n.note_id !== note.note_id);
    });
  }
}
