docker-compose --env-file dev.env -f dev-docker-compose.yaml build
docker-compose --env-file dev.env -f dev-docker-compose.yaml down --volumes
docker-compose --env-file dev.env -f dev-docker-compose.yaml up 