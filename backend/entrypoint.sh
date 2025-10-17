#!/bin/sh
set -e

mkdir -p /app/db

python - <<'PY'
import time
from django.db import connections
from django.db.utils import OperationalError

retries = 10
while retries > 0:
    try:
        connections['default'].ensure_connection()
        break
    except OperationalError:
        retries -= 1
        time.sleep(2)
else:
    raise SystemExit('Database not ready')
PY

python manage.py migrate --noinput
python manage.py collectstatic --noinput

exec "$@"
