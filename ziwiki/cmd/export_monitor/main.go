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
	"github.com/zdlpsina/ziwiki/monitor"
)

//export ExportRenderLogic
func ExportRenderLogic(config_path *C.char, src_path *C.char, mdtype int) bool {
	db_path := C.GoString(config_path)
	file_path := C.GoString(src_path)

	config, err := util.LoadConfig(db_path)
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store := db.NewStore(conn)
	return monitor.RenderLogic(file_path, uint32(mdtype), store)
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

	err = server.Start(config.HTTPServerAddress, config.UseHTTPS)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}

}
