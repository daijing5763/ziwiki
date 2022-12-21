docker-compose -f dev-docker-compose.yaml build
docker-compose -f dev-docker-compose.yaml down --volumes
docker-compose -f dev-docker-compose.yaml up 