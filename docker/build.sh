#!/bin/bash

set -e

echo "Building Docker images..."

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

mkdir -p ../target/docker-images

docker-compose build

echo "Saving images to target/docker-images/..."

docker save mf-shell:latest -o ../target/docker-images/mf-shell.tar
docker save mf-remote1:latest -o ../target/docker-images/mf-remote1.tar
docker save mf-remote2:latest -o ../target/docker-images/mf-remote2.tar

echo "Copying compose files..."

cp docker-compose.yml ../target/
cp -r ../docker ../target/ 2>/dev/null || true
cp .env.example ../target/.env 2>/dev/null || true