#!/bin/sh

echo "Starting shell..."

TEMPLATE_PATH="/usr/share/nginx/html/assets/mf-registry.json.template"
OUTPUT_PATH="/usr/share/nginx/html/assets/mf-registry.json"

echo "Generating mf-registry.json from template..."
envsubst < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
echo "Generated mf-registry.json:"
cat "$OUTPUT_PATH"
rm -f "$TEMPLATE_PATH"

echo "Starting nginx..."
exec nginx -g "daemon off;"