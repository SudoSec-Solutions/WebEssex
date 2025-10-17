# WebEssex Frontend

Vue 3 + Vite SPA that powers the WebEssex marketing site.

## Getting started

```bash
npm install
cp .env.example .env.local  # adjust API endpoint if needed
npm run dev
```

Build for production with `npm run build`.

## Environment variables

| Variable | Purpose |
| -------- | ------- |
| `VITE_API_BASE_URL` | Base URL for the backend API (defaults to `http://127.0.0.1:8000` in dev). |

When deploying with Docker, the build-time `API_BASE_URL` argument inside `docker-compose.yml` controls the value used during the static build.

## Contact form

The contact form posts to the backend endpoints:

- `POST /api/contact-submissions/`
- `POST /api/subscriptions/`

Ensure the backend is running and CORS allows the frontend origin.
