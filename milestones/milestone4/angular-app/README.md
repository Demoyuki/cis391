# Bible Verse Searcher — Angular Front-End
**CST-391 Milestone 4 | Victor Manuel Marrujo Verdugo | Grand Canyon University**

## Stack
Angular 17 (Standalone Components) · Bootstrap 5.3 · TypeScript 5

## Prerequisites
- Node.js 20+
- The Milestone 3 REST API running on http://localhost:3000

## Quick Start
```bash
npm install
ng serve          # starts on http://localhost:4200
```
Open your browser to http://localhost:4200

## Features (Full CRUD)
| Feature | Route | Description |
|---------|-------|-------------|
| List Verses | /verses | Search, filter by testament, browse all |
| View Verse | /verses/:id | Full text, notes, timestamps |
| Add Verse | /verses/new | Form with book dropdown, chapter, verse, text |
| Edit Verse | /verses/:id/edit | Pre-populated form |
| Delete Verse | /verses (list) or /verses/:id | Confirm dialog |
| Add Note | /verses/:id | Inline form below verse |
| Edit Note | /verses/:id | Inline textarea edit |
| Delete Note | /verses/:id | Confirm dialog |

## Architecture
- Standalone components (Angular 17 pattern — no NgModule needed)
- Lazy-loaded routes
- Single VerseService consuming the Express REST API via HttpClient
- Bootstrap NavBar with RouterLinkActive for active state
- CORS handled by the API server (cors middleware)

## Project Structure
```
src/app/
├── app.component.ts       # Root component (navbar + router-outlet)
├── app.config.ts          # provideRouter + provideHttpClient
├── app.routes.ts          # Lazy-loaded route definitions
├── models/
│   └── verse.model.ts     # TypeScript interfaces
├── services/
│   └── verse.service.ts   # All HTTP calls to the REST API
└── components/
    ├── navbar/            # Bootstrap NavBar
    ├── verse-list/        # List + Search + Delete
    ├── verse-detail/      # Read + Notes CRUD
    └── verse-form/        # Create + Edit (shared component)
```
