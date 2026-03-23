#!/bin/sh

echo "Starting shell..."

# Устанавливаем значения по умолчанию
REMOTE1_URL=${REMOTE1_URL:-http://remote1:80}
REMOTE2_URL=${REMOTE2_URL:-http://remote2:80}

echo "REMOTE1_URL: $REMOTE1_URL"
echo "REMOTE2_URL: $REMOTE2_URL"

TEMPLATE_PATH="/usr/share/nginx/html/assets/mf-registry.json.template"
OUTPUT_PATH="/usr/share/nginx/html/assets/mf-registry.json"

# Генерируем mf-registry.json
if [ -f "$TEMPLATE_PATH" ]; then
    echo "Generating mf-registry.json from template..."
    envsubst < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
    echo "Generated mf-registry.json:"
    cat "$OUTPUT_PATH"
    rm -f "$TEMPLATE_PATH"
elif [ ! -f "$OUTPUT_PATH" ]; then
    echo "Creating default mf-registry.json"
    echo "{\"remote1\":\"$REMOTE1_URL\",\"remote2\":\"$REMOTE2_URL\"}" > "$OUTPUT_PATH"
fi

echo "Starting nginx..."
exec nginx -g "daemon off;"