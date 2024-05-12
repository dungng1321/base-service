#!/bin/bash
set -a # automatically export all variables
source .env
set +a

git pull origin develop

# Stop the currently running container
docker compose down

# Pull the latest Docker image
docker compose pull

bash scripts/compose-dev.script.sh