package main

import (
	"C"

	"database/sql"
	"log"

	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/util"
)
import (
	"github.com/zdlpsina/ziwiki/api"
	"github.com/zdlpsina/ziwiki/lute"
)

//export renderMd
func renderMd(src_path *C.char, mdtype int) {
	input_path := C.GoString(src_path)
	lute.RenderMd(input_path, mdtype)
}

//export goMul
func goMul(left int, right int) int {
	return left + right
}
func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store := db.NewStore(conn)
	server, err := api.NewServer(config, store)
	if err != nil {
		log.Fatal("cannot create server:", err)
	}

	err = server.Start(config.HTTPServerAddress)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
