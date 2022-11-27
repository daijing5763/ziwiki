package lute

import (
	"C"
	"context"
	"fmt"
	"os"

	"github.com/88250/lute"
	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
)
import "log"

func RenderMd(store db.Store, input_path string, mdtype int, UserID int64, RepoID int64) {
	data, err := os.ReadFile(input_path)
	// if our program was unable to read the file
	// print out the reason why it can't
	if err != nil {
		fmt.Println(err)
	}
	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	html := luteEngine.MarkdownStr("demo", string(data))

	if mdtype == 0 {
		// create
		arg := db.CreateMarkdownParams{
			Mdhref: input_path,
			UserID: UserID,
			RepoID: RepoID,
			Mdtext: html,
		}
		log.Printf("mydebug: create:%s", input_path)
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
		log.Printf("mydebug: update:%s", input_path)
		Markdown, err := store.UpdateMarkdown(context.Background(), arg)
		_ = Markdown
		if err != nil {
			fmt.Println(err)
		}
	} else if mdtype == 2 {
		//delete
		log.Printf("mydebug: delete:%s", input_path)
		err := store.DeleteMarkdown(context.Background(), input_path)
		if err != nil {
			fmt.Println(err)
		}
	}
}
