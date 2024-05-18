#!/bin/bash
script_path=$(readlink -f "${BASH_SOURCE[0]}")
script_dir=$(dirname "$script_path")
cd "$script_dir/../docker"

docker-compose up -d;
docker-compose exec server bash;
