# Bible Verse Searcher — REST API
**CST-391 Milestone 3 | Victor Manuel Marrujo Verdugo | Grand Canyon University** 

Server: http://localhost:3000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/books | All 66 books |
| GET | /api/books/:id | Single book |
| GET | /api/books/:id/chapters | Chapter count |
| GET | /api/verses?q=keyword&testament=OT\|NT | Search |
| GET | /api/verses?book=:id&chapter=:n | Reference browse |
| GET | /api/verses/:id | Single verse |
| POST | /api/verses | Create verse |
| PUT | /api/verses/:id | Update verse |
| DELETE | /api/verses/:id | Delete verse |
| GET | /api/verses/:id/notes | Notes for a verse |
| GET | /api/verses/:id/notes/:nid | Single note |
| POST | /api/verses/:id/notes | Create note |
| PUT | /api/verses/:id/notes/:nid | Update note |
| DELETE | /api/verses/:id/notes/:nid | Delete note |


