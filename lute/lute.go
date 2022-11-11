package lute

import (
	"C"
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/88250/lute"
	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/util"
)
import "context"

func buildConn(path string) db.Store {
	config, err := util.LoadConfig("../")
	if err != nil {
		log.Fatal("cannot load config:", err)
	}
	conn, err := sql.Open(config.DBDriver, config.DBSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store := db.NewStore(conn)
	return store
}
func ChangeFile(input_path string, output_path string, mdtype int) {
	store := buildConn("../")
	data, err := ioutil.ReadFile(input_path)
	// if our program was unable to read the file
	// print out the reason why it can't
	if err != nil {
		fmt.Println(err)
	}
	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	html := luteEngine.MarkdownStr("demo", string(data))

	mydata := []byte(html)
	if mdtype == 0 {
		// create
		arg := db.CreateMarkdownParams{
			Mdhref: input_path,
			UserID: 1,
			RepoID: 1,
			Mdtext: html,
		}
		Markdown, err := store.CreateMarkdown(context.Background(), arg)
		_ = Markdown
		if err != nil {
			fmt.Println(err)
		}
	} else if mdtype == 1 {
		//edit
		arg := db.UpdateMarkdownParams{
			Mdhref: input_path,
			Mdtext: html,
		}
		Markdown, err := store.UpdateMarkdown(context.Background(), arg)
		_ = Markdown
		if err != nil {
			fmt.Println(err)
		}
	} else if mdtype == 2 {
		//delete
		err := store.DeleteMarkdown(context.Background(), input_path)
		if err != nil {
			fmt.Println(err)
		}
	}

	// the WriteFile method returns an error if unsuccessful
	err = ioutil.WriteFile(output_path, mydata, 0777)
	// handle this error
	if err != nil {
		// print it out
		fmt.Println(err)
	}
}

// //export cFunc
// func cFunc(src_path *C.char, dest *C.char) {
// 	input_path := C.GoString(src_path)
// 	output_path := C.GoString(dest)
// 	changeFile(input_path, output_path)
// }

// func main() {
// 	changeFile("../wiki/test.md", "../.ziwiki/test.md")
// }
