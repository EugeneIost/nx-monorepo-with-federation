#!/bin/bash
set -e

echo "Loading Docker images..."

IMAGES_DIR="../target/docker-images"

if [ -d "$IMAGES_DIR" ] && [ -n "$(ls -A $IMAGES_DIR/*.tar 2>/dev/null)" ]; then  
    for tar_file in $IMAGES_DIR/*.tar; do
        echo "Loading $(basename "$tar_file")..."
        docker load -i "$tar_file"
    done
    
    echo "All images loaded successfully"
    
else
    echo "No .tar files found in $IMAGES_DIR/"
    echo "Run ./build.sh first"
    exit 1
fi