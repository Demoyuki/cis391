import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VerseService } from '../../services/verse.service';
import { BibleVerse } from '../../models/verse.model';

@Component({
  selector: 'app-verse-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0 fw-bold text-primary">📖 Bible Verses</h2>
        <a routerLink="/verses/new" class="btn btn-primary">
          ➕ Add New Verse
        </a>
      </div>

      <!-- Search Bar -->
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Search</label>
              <input type="text" class="form-control" [(ngModel)]="searchTerm"
                placeholder="e.g. grace, love, shepherd..." (keyup.enter)="search()">
            </div>
            <div class="col-md-3">
              <label class="form-label fw-semibold">Testament</label>
              <select class="form-select" [(ngModel)]="testament">
                <option value="ALL">All</option>
                <option value="OT">Old Testament</option>
                <option value="NT">New Testament</option>
              </select>
            </div>
            <div class="col-md-3 d-flex gap-2">
              <button class="btn btn-primary w-100" (click)="search()">🔍 Search</button>
              <button class="btn btn-outline-secondary" (click)="reset()">✕</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary"></div>
        <p class="mt-2 text-muted">Loading verses...</p>
      </div>

      <!-- Error -->
      <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

      <!-- Empty -->
      <div *ngIf="!loading && !error && verses.length === 0" class="text-center py-5 text-muted">
        <p class="fs-4">No verses found.</p>
        <a routerLink="/verses/new" class="btn btn-outline-primary mt-2">Add the first verse</a>
      </div>

      <!-- Results count -->
      <p *ngIf="!loading && verses.length > 0" class="text-muted small mb-3">
        Showing {{ verses.length }} verse{{ verses.length !== 1 ? 's' : '' }}
      </p>

      <!-- Verse Cards -->
      <div class="row g-3">
        <div class="col-12" *ngFor="let verse of verses">
          <div class="card shadow-sm border-0 hover-card">
            <div class="card-body d-flex justify-content-between align-items-start">
              <div class="flex-grow-1">
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="badge bg-primary">{{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse_num }}</span>
                  <span class="badge" [ngClass]="verse.testament === 'OT' ? 'bg-warning text-dark' : 'bg-success'">
                    {{ verse.testament }}
                  </span>
                </div>
                <p class="mb-0 text-muted fst-italic">"{{ verse.text | slice:0:120 }}{{ verse.text.length > 120 ? '...' : '' }}"</p>
              </div>
              <div class="d-flex gap-2 ms-3 flex-shrink-0">
                <a [routerLink]="['/verses', verse.id]" class="btn btn-sm btn-outline-primary">View</a>
                <a [routerLink]="['/verses', verse.id, 'edit']" class="btn btn-sm btn-outline-secondary">Edit</a>
                <button class="btn btn-sm btn-outline-danger" (click)="deleteVerse(verse)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.hover-card:hover { border-left: 4px solid #0d6efd !important; transition: all 0.15s ease; }`]
})
export class VerseListComponent implements OnInit {
  verses: BibleVerse[] = [];
  searchTerm = '';
  testament = 'ALL';
  loading = false;
  error = '';

  constructor(private verseService: VerseService) {}

  ngOnInit(): void { this.search(); }

  search(): void {
    this.loading = true;
    this.error = '';
    this.verseService.searchVerses(this.searchTerm || undefined, this.testament).subscribe({
      next: v => { this.verses = v; this.loading = false; },
      error: e => { this.error = 'Failed to load verses. Is the API server running?'; this.loading = false; }
    });
  }

  reset(): void { this.searchTerm = ''; this.testament = 'ALL'; this.search(); }

  deleteVerse(verse: BibleVerse): void {
    if (!confirm(`Delete "${verse.book_name} ${verse.chapter}:${verse.verse_num}"? This cannot be undone.`)) return;
    this.verseService.deleteVerse(verse.id).subscribe({
      next: () => this.verses = this.verses.filter(v => v.id !== verse.id),
      error: () => alert('Failed to delete verse.')
    });
  }
}
