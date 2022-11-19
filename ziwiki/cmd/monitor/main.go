package main

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	monitor "github.com/zdlpsina/ziwiki/monitor"
	"github.com/zdlpsina/ziwiki/util"
)

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
	monitor.MonitorFS(store, config.WIKIPath)

}
