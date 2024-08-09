#!/bin/bash
echo "stop and remove containers"
docker rm -f $(docker ps -aq)

echo "run containers"
docker-compose build
docker-compose up -d