# WebEssex Backend

Django REST Framework backend that powers the contact and newsletter flows for WebEssex.

## Getting started

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # update values for your environment
cd src
python manage.py migrate
python manage.py runserver
```

> Update `backend_project/settings.py` → `CORS_ALLOWED_ORIGINS` with the origins that
> your frontend runs on (defaults cover `http://localhost:5173`).

### Environment variables

The backend reads configuration from environment variables. See `.env.example` for the complete list:

- `DJANGO_SECRET_KEY` (required in production)
- `DJANGO_DEBUG` (`True`/`False`)
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `CSRF_TRUSTED_ORIGINS`
- `DATABASE_URL` (`postgresql://user:password@host:port/dbname`)

### API endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `POST` | `/api/contact-submissions/` | Submit a contact enquiry. |
| `POST` | `/api/subscriptions/` | Subscribe to launch updates. Idempotent on email. |

Both endpoints accept JSON payloads and respond with created resources. Example contact payload:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "company": "Acme Inc.",
  "message": "I'd like to discuss a redesign.",
  "subscribe_to_updates": true
}
```

### Running tests

```bash
cd src
../.venv/bin/python manage.py test
```

## Frontend integration

- Submit contact form data to `/api/contact-submissions/`.
- Subscription form can post to `/api/subscriptions/`; repeated submissions update name/source without raising errors.
- Add `https://your-frontend-host` to `ALLOWED_HOSTS` and configure CORS/CSRF as needed before deploying.
