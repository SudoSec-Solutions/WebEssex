# syntax=docker/dockerfile:1.7

FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

WORKDIR /app/src

ENV DJANGO_SETTINGS_MODULE=backend_project.settings

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "backend_project.wsgi:application", "--bind", "0.0.0.0:8000"]
