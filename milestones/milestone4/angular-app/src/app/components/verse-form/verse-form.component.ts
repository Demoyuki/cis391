import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VerseService } from '../../services/verse.service';
import { BibleBook, BibleVerse } from '../../models/verse.model';

@Component({
  selector: 'app-verse-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">{{ isEdit ? '✏️ Edit Verse' : '➕ Add New Verse' }}</h4>
            </div>
            <div class="card-body p-4">

              <div class="mb-3">
                <label class="form-label fw-semibold">Book *</label>
                <select class="form-select" [(ngModel)]="form.book_id" name="book_id">
                  <option [value]="0" disabled>Select a book...</option>
                  <option *ngFor="let book of books" [value]="book.book_id">
                    {{ book.book_name }} ({{ book.testament }})
                  </option>
                </select>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-6">
                  <label class="form-label fw-semibold">Chapter *</label>
                  <input type="number" class="form-control" [(ngModel)]="form.chapter" min="1" placeholder="e.g. 3">
                </div>
                <div class="col-6">
                  <label class="form-label fw-semibold">Verse Number *</label>
                  <input type="number" class="form-control" [(ngModel)]="form.verse_num" min="1" placeholder="e.g. 16">
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Verse Text *</label>
                <textarea class="form-control" rows="5" [(ngModel)]="form.text"
                  placeholder="Enter the full verse text..."></textarea>
              </div>

              <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
              <div *ngIf="success" class="alert alert-success">{{ success }}</div>

              <div class="d-flex gap-3">
                <button class="btn btn-primary px-4" (click)="submit()" [disabled]="submitting || !isValid()">
                  <span *ngIf="submitting" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEdit ? 'Save Changes' : 'Add Verse' }}
                </button>
                <a routerLink="/verses" class="btn btn-outline-secondary">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class VerseFormComponent implements OnInit {
  books: BibleBook[] = [];
  form = { book_id: 0, chapter: 1, verse_num: 1, text: '' };
  isEdit = false;
  verseId?: number;
  submitting = false;
  error = '';
  success = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private verseService: VerseService
  ) {}

  ngOnInit(): void {
    this.verseService.getBooks().subscribe(b => this.books = b);
    this.verseId = Number(this.route.snapshot.paramMap.get('id')) || undefined;
    this.isEdit = !!this.verseId;
    if (this.isEdit && this.verseId) {
      this.verseService.getVerseById(this.verseId).subscribe((v: BibleVerse) => {
        this.form = { book_id: v.book_id, chapter: v.chapter, verse_num: v.verse_num, text: v.text };
      });
    }
  }

  isValid(): boolean {
    return this.form.book_id > 0 && this.form.chapter > 0 && this.form.verse_num > 0 && this.form.text.trim().length > 0;
  }

  submit(): void {
    if (!this.isValid()) return;
    this.submitting = true; this.error = '';
    const obs = this.isEdit && this.verseId
      ? this.verseService.updateVerse(this.verseId, this.form)
      : this.verseService.createVerse(this.form);
    obs.subscribe({
      next: v => { this.router.navigate(['/verses', v.id]); },
      error: e => { this.error = 'Failed to save. Please check all fields.'; this.submitting = false; }
    });
  }
}
