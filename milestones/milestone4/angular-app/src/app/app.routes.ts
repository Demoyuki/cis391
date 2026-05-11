import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'verses', pathMatch: 'full' },
  {
    path: 'verses',
    loadComponent: () => import('./components/verse-list/verse-list.component').then(m => m.VerseListComponent)
  },
  {
    path: 'verses/new',
    loadComponent: () => import('./components/verse-form/verse-form.component').then(m => m.VerseFormComponent)
  },
  {
    path: 'verses/:id',
    loadComponent: () => import('./components/verse-detail/verse-detail.component').then(m => m.VerseDetailComponent)
  },
  {
    path: 'verses/:id/edit',
    loadComponent: () => import('./components/verse-form/verse-form.component').then(m => m.VerseFormComponent)
  },
  { path: '**', redirectTo: 'verses' }
];
