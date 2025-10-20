#!/bin/sh
set -eu

TEMPLATE_PATH="/etc/nginx/templates/default.conf.template"
TARGET_PATH="/etc/nginx/conf.d/default.conf"

DEFAULT_API="https://api.webessex.uk"
API_BASE_URL="${API_BASE_URL:-$DEFAULT_API}"

mkdir -p "$(dirname "$TARGET_PATH")"

envsubst '${API_BASE_URL}' < "$TEMPLATE_PATH" > "$TARGET_PATH"

exec nginx -g 'daemon off;'
