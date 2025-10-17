# WebEssex Monorepo

This repository contains the Vue frontend and Django REST backend for WebEssex.

## Local development

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
cd src
python manage.py migrate
python manage.py runserver  # http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # optional override for VITE_API_BASE_URL
npm run dev  # http://127.0.0.1:5173
```

Ensure `VITE_API_BASE_URL` points to the Django server (`http://127.0.0.1:8000` by default).

## Docker

You can run both services via Docker Compose:

```bash
cp .env.example .env                            # set domains + email for TLS
cp backend/.env.example backend/.env.docker     # configure Django secrets/hosts
touch traefik/acme.json
sudo chmod 600 traefik/acme.json                # required for Traefik ACME storage
docker compose up --build -d
```

- HTTPS entrypoint → https://your-frontend-host (served by Traefik + nginx)
- Backend API     → https://your-backend-host (`/api` traffic proxied to Django)

`backend/.env.docker` controls the Django environment (secret key, hosts, CORS, database). The root `.env` file supplies Traefik with the frontend/backend hostnames, Let’s Encrypt email, and Postgres credentials. The frontend build receives the API endpoint via the `API_BASE_URL` build argument (defaults to `https://${BACKEND_HOST}`).

### Deploying to a VPS

1. Copy `.env.example` to `.env` and specify `FRONTEND_HOST`, `BACKEND_HOST`, `LETSENCRYPT_EMAIL`, `POSTGRES_DB`, `POSTGRES_USER`, and `POSTGRES_PASSWORD`.
2. Copy `backend/.env.example` to `backend/.env.docker` and provide production-ready values (strong `DJANGO_SECRET_KEY`, allowed hosts, CORS, and a secure `DATABASE_URL` that matches the Postgres credentials).
   Make sure the username/password in `DATABASE_URL` align with `POSTGRES_USER` / `POSTGRES_PASSWORD` defined in `.env`.
3. Optionally point `DATABASE_URL` to an external PostgreSQL instance; otherwise data persists in the named Docker volume `postgres_data` managed by the compose stack.
4. On the server run `sudo chmod 600 traefik/acme.json` so Traefik can store certificates securely.
5. Deploy the repo to the server and run `docker compose up --build -d`.
6. Update DNS to point `FRONTEND_HOST` and `BACKEND_HOST` to the VPS (or add temporary `/etc/hosts` entries while testing). Traefik issues/renews Let’s Encrypt certificates automatically via TLS-ALPN.

Static files are collected automatically during container start and served via WhiteNoise.

## Tests

- Backend: `cd backend/src && ../.venv/bin/python manage.py test`
- Frontend: `cd frontend && npm run build`
