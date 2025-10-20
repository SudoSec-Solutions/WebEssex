# WebEssex Frontend

Vue 3 + Vite SPA that powers the WebEssex marketing site.

## Getting started

```bash
npm install
cp .env.example .env.local  # adjust API endpoint if needed
npm run dev
```

Build the static site for production (SSR prerender + client bundle) with:

```bash
npm run build:ssg
```

## Environment variables

| Variable | Purpose |
| -------- | ------- |
| `VITE_API_BASE_URL` | Base URL for the backend API (defaults to `http://127.0.0.1:8000` in dev). |
| `VITE_SITE_URL` | Absolute origin used to generate canonical URLs and social tags (e.g. `https://www.webessex.uk`). |

When deploying with Docker, the build-time `API_BASE_URL` and `SITE_URL` arguments inside `docker-compose.yml` control the values baked into the static build.

## Contact form

The contact form posts to the backend endpoints:

- `POST /api/contact-submissions/`
- `POST /api/subscriptions/`

Ensure the backend is running and CORS allows the frontend origin.
