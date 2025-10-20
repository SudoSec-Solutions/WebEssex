#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Bootstrap environment files for WebEssex.

Usage:
  ./scripts/bootstrap-env.sh --frontend-host <frontend-domain> --backend-host <backend-domain> --email <letsencrypt-email> [--force]

Options:
  --frontend-host   Public domain where the SPA will be served (e.g. webessex.uk)
  --backend-host    Public domain for the API (e.g. api.webessex.uk)
  --email           Email address used for Let's Encrypt notifications and security contact
  --force           Overwrite existing .env and backend/.env.docker files
  -h, --help        Show this help message
EOF
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: '$1' is required but not found in PATH." >&2
    exit 1
  }
}

FRONTEND_HOST=""
BACKEND_HOST=""
LE_EMAIL=""
FORCE="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --frontend-host)
      FRONTEND_HOST="${2:-}"
      shift 2
      ;;
    --backend-host)
      BACKEND_HOST="${2:-}"
      shift 2
      ;;
    --email)
      LE_EMAIL="${2:-}"
      shift 2
      ;;
    --force)
      FORCE="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

if [[ -z "$FRONTEND_HOST" || -z "$BACKEND_HOST" || -z "$LE_EMAIL" ]]; then
  echo "Error: --frontend-host, --backend-host, and --email are required." >&2
  usage
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
BACKEND_ENV_FILE="$ROOT_DIR/backend/.env.docker"

if [[ -f "$ENV_FILE" && "$FORCE" != "true" ]]; then
  echo "Error: $ENV_FILE already exists. Re-run with --force to overwrite." >&2
  exit 1
fi

if [[ -f "$BACKEND_ENV_FILE" && "$FORCE" != "true" ]]; then
  echo "Error: $BACKEND_ENV_FILE already exists. Re-run with --force to overwrite." >&2
  exit 1
fi

require_cmd openssl

POSTGRES_PASSWORD="$(openssl rand -hex 24)"
DJANGO_SECRET_KEY="$(openssl rand -hex 32)"

cat > "$ENV_FILE" <<EOF
LETSENCRYPT_EMAIL=$LE_EMAIL
FRONTEND_HOST=$FRONTEND_HOST
BACKEND_HOST=$BACKEND_HOST
POSTGRES_DB=webessex
POSTGRES_USER=webessex
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
EOF

cat > "$BACKEND_ENV_FILE" <<EOF
DJANGO_SECRET_KEY=$DJANGO_SECRET_KEY
DJANGO_ALLOWED_HOSTS=backend,localhost,127.0.0.1,$BACKEND_HOST
CORS_ALLOWED_ORIGINS=https://$FRONTEND_HOST
CSRF_TRUSTED_ORIGINS=https://$FRONTEND_HOST
DATABASE_URL=postgresql://webessex:$POSTGRES_PASSWORD@postgres:5432/webessex
STATIC_URL=/static/
EOF

cat <<EOF
Generated:
  $ENV_FILE
  $BACKEND_ENV_FILE

Postgres credentials and Django secret key were created automatically.
You can now proceed with 'docker compose up --build -d'.
EOF
