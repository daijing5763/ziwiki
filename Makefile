DB_URL=postgresql://root:secret@localhost:5432/ziwiki?sslmode=disable

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:14-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root ziwiki

dropdb:
	docker exec -it postgres dropdb ziwiki
migrateup:
	migrate -path db/migration -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path db/migration -database "$(DB_URL)" -verbose down
sqlc:
	sqlc generate
test:
	go test -v -cover ./...
server:
	go run main.go

mock:
	mockgen -package mockdb -destination db/mock/store.go github.com/zdlpsina/ziwiki/db/sqlc Store

.PHONY: postgres createdb dropdb migrateup migratedown sqlc test server mock
