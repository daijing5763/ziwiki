package main

import (
	"C"
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	lute "github.com/zdlpsina/ziwiki/lute"
	"github.com/zdlpsina/ziwiki/util"
)

//export cFunc
func cFunc(src_path *C.char, dest *C.char, mdtype int) {
	input_path := C.GoString(src_path)
	output_path := C.GoString(dest)
	lute.ChangeFile(input_path, output_path, mdtype)
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
	db.NewStore(conn)

}
