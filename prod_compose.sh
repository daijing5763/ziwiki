docker-compose --env-file prod.env -f prod-docker-compose.yaml down --volumes
docker-compose --env-file prod.env -f prod-docker-compose.yaml build
docker-compose --env-file prod.env -f prod-docker-compose.yaml up 
