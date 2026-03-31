#!/bin/bash

set -e

echo "Building Docker images..."

mkdir -p ../target/docker-images

docker-compose build

echo "Saving images to target/docker-images/..."

docker images --format "{{.Repository}}:{{.Tag}}" | grep "^mf-" | while read image; do
    filename=$(echo "$image" | tr '/:' '--')
    echo "Saving $image to ${filename}.tar..."
    docker save "$image" -o "../target/docker-images/${filename}.tar"
done

echo "Copying compose files..."
cp docker-compose.yml ../target/

echo "✅ Build completed successfully"
echo "Saved images:"
ls -la ../target/docker-images/*.tar