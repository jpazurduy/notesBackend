# AGENTS.md - notesBackend

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start with nodemon (auto-restart on changes) |
| `npm start` | Start production server |
| `npm run build:ui` | Build frontend from `notes-frontend/` and copy to `dist-frontend/` |
| `npm run deploy` | `fly deploy` |
| `npm run deploy:full` | `build:ui && deploy` |
| `npm run logs:prod` | `fly logs` |
| No test framework — `npm test` is a placeholder. |

## Architecture

- **Express 5** (note: Express 5 has breaking API changes from v4).
- **CommonJS** modules (`require`/`module.exports`).
- All routes defined inline in `index.js`. The `controller/` and `utils/` directories are empty.
- MongoDB connection lives in `models/note.js` (not in a separate `mongo.js`).
- ESLint: flat config at `eslint.config.mjs` — run via `npx eslint .`
- Frontend is a separate Vite + React app in `notes-frontend/`. Built output is copied to `dist-frontend/` for production serving.

## API Endpoints

`GET /` — Hello World  
`GET /api/notes` — List all notes  
`GET /api/notes/:id` — Get one note  
`POST /api/notes` — Create note (`{ content, important }`)  
`PUT /api/notes/:id` — Update note (`{ content, important }`)  
`DELETE /api/notes/:id` — Delete note

## Model

`Note` has fields: `content` (String), `important` (Boolean). `_id` is transformed to `id` in JSON output via schema `toJSON` transform.

## Deployment

- Fly.io app `notesbackend22`, internal port 3001.
- GitHub Actions: deploy to Fly.io on push to `main`. Requires `FLY_API_TOKEN` secret.
- Build uses Docker with Node 22.21.1 slim image.

## Frontend Dev

```sh
cd notes-frontend
npm run dev        # Vite dev server (proxies /api -> localhost:3001)
npm run build      # Build for production
npm run server     # json-server on db.json (port 3001)
```

## REST Client Tests

Requests in `request/*.rest` can be sent via VS Code REST Client extension.

## .gitignore

Only `.env`. Do not commit secrets.
