package monitor

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"github.com/Jeffail/tunny"
	"github.com/dietsche/rfsnotify"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	genlayout "github.com/zdlpsina/ziwiki/jsonlayout"
	render "github.com/zdlpsina/ziwiki/markdown/render"
)

type RenderPara struct {
	path string
	op   uint32
}

func RenderLayout(UserID string, RepoID string, store db.Store) bool {
	user_id, err := strconv.ParseInt(UserID, 10, 64)
	if err != nil {
		return false
	}
	repo_id, err := strconv.ParseInt(RepoID, 10, 64)
	if err != nil {
		return false
	}

	path := "/tmp/wiki/" + UserID + "/" + RepoID
	string_layout, err := genlayout.LayoutToString(path)

	if err != nil {
		fmt.Printf("Error: %s", err)
		return false
	}

	arg_isexist := db.GetMarkdownParams{
		Mdhref: "layout.json",
		UserID: user_id,
		RepoID: repo_id,
	}
	_, err = store.GetMarkdown(context.Background(), arg_isexist)
	if err != nil {
		//not exist & create
		arg := db.CreateMarkdownParams{
			Mdhref: "layout.json",
			UserID: user_id,
			RepoID: repo_id,
			Mdtext: string_layout,
		}
		_, err = store.CreateMarkdown(context.Background(), arg)
		if err != nil {
			return false
		}
	} else {
		arg_update := db.UpdateMarkdownParams{
			Mdhref: "layout.json",
			Mdtext: string_layout,
			UserID: user_id,
			RepoID: repo_id,
		}
		_, err = store.UpdateMarkdown(context.Background(), arg_update)
		if err != nil {
			return false
		}
	}
	return true
}
func RenderLogic(path string, op uint32, store db.Store) bool {
	if strings.HasSuffix(path, ".md") {
		index := strings.Split(path, "/")
		if len(index) >= 5 {
			user_id, err := strconv.ParseInt(index[3], 10, 64)
			if err != nil {
				return false
			}
			repo_id, err := strconv.ParseInt(index[4], 10, 64)
			if err != nil {
				return false
			}
			repo, err := store.GetRepo(context.Background(), repo_id)
			if err != nil {
				return false
			}
			if repo.UserID != user_id {
				return false
			}
			//logic code
			if op == 1 {
				render.RenderMd(store, path, 0, user_id, repo_id)
				RenderLayout(index[3], index[4], store)
			} else if op == 2 {
				render.RenderMd(store, path, 1, user_id, repo_id)
				RenderLayout(index[3], index[4], store)
			} else if op == 3 {
				render.RenderMd(store, path, 2, user_id, repo_id)
				RenderLayout(index[3], index[4], store)
			} else if op == 4 {
				render.RenderMd(store, path, 2, user_id, repo_id)
				RenderLayout(index[3], index[4], store)
			}
			return true
		}
		return false
	}
	return false
}
func iterFS(p *tunny.Pool, path string, mdtype int, store db.Store) {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		if f.Type().IsRegular() && strings.HasSuffix(f.Name(), ".md") {
			if mdtype == 1 {
				p.Process(RenderPara{path: path + "/" + f.Name(), op: 1})
				//RenderLogic(path+"/"+f.Name(), 1, store)
			} else if mdtype == 3 {
				p.Process(RenderPara{path: path + "/" + f.Name(), op: 3})
				//RenderLogic(path+"/"+f.Name(), 3, store)
			}
		}
		if f.IsDir() {
			iterFS(p, path+"/"+f.Name(), mdtype, store)
		}
	}
}
func MonitorFS(store db.Store, wiki_path string) {
	// watcher, err := fsnotify.NewWatcher()
	watcher, err := rfsnotify.NewWatcher()
	if err != nil {
		log.Fatal("NewWatcher failed: ", err)
	}

	defer watcher.Close()

	numCPUs := 10
	p := tunny.NewFunc(numCPUs, func(payload interface{}) interface{} {
		para := payload.(RenderPara)
		return RenderLogic(para.path, para.op, store)
	})
	defer p.Close()

	done := make(chan bool)
	go func() {
		defer close(done)
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				_, err := os.ReadDir(event.Name)
				if err != nil {
					// log.Printf("mydebug readfail:%s", event.Name)
				} else {
					if event.Op == 1 {
						//create folder
						iterFS(p, event.Name, 1, store)
					} else if event.Op == 3 {
						// delete folder
						iterFS(p, event.Name, 3, store)
					}
				}
				p.Process(RenderPara{path: event.Name, op: uint32(event.Op)})
				//RenderLogic(event.Name, uint32(event.Op), store)
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println("error:", err)
			}
		}

	}()

	err = watcher.Add(wiki_path)
	if err != nil {
		log.Fatal("Add failed:", err)
	}
	<-done
}
