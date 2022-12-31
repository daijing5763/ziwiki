package monitor

import (
	"database/sql"
	"log"
	"os"
	"testing"

	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/util"
)

var store db.Store // global test
func TestMain(m *testing.M) {
	config, err := util.LoadConfig("../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store = db.NewStore(conn)

	os.Exit(m.Run())
}
