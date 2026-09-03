# Task 3 - Backend Task: Notes CRUD API

## Task Description
Technical Assessment for Backend Engineer
Time: 30 mins

Demo Project: https://bitbucket.org/workspace860819/real_estate_platform_mvp_v1

## Requirements

### Endpoints Implemented
- `POST   /notes`      — Create a new note
- `GET    /notes`      — Retrieve all notes
- `GET    /notes/:id`  — Retrieve a specific note by ID
- `PUT    /notes/:id`  — Update a note
- `DELETE /notes/:id`  — Delete a note

### Storage
In-memory array (no database required)

### Output
Console logs on every request + JSON responses

## Implementation

### Files Added
- `server/controllers/notesController.js` — CRUD logic with in-memory array
- `server/routes/notesRoute.js` — Express router for all 5 endpoints
- `server/app.js` — Registered notes routes under `/api`
- `notes-server.js` — Standalone server (port 4001) for isolated testing

### Run
```
node notes-server.js
```
Server starts on `http://localhost:4001`

## Deliverables
- [ ] Record video of how it works (Loom / Google Drive)
