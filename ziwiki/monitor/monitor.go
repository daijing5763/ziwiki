package monitor

import (
	"context"
	"fmt"
	"log"
	"strconv"
	"strings"

	"github.com/dietsche/rfsnotify"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	genlayout "github.com/zdlpsina/ziwiki/jsonlayout"
	render "github.com/zdlpsina/ziwiki/lute"
)

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

	arg := db.CreateMarkdownParams{
		Mdhref: "/tmp/wiki/" + UserID + "/" + RepoID + "/layout.json",
		UserID: user_id,
		RepoID: repo_id,
		Mdtext: string_layout,
	}
	Markdown, err := store.CreateMarkdown(context.Background(), arg)
	_ = Markdown
	if err != nil {
		fmt.Println(err) //create fail may exist
		arg_update := db.UpdateMarkdownParams{
			Mdhref: "/tmp/wiki/" + UserID + "/" + RepoID + "/layout.json",
			Mdtext: string_layout,
		}
		Markdown, err := store.UpdateMarkdown(context.Background(), arg_update)
		_ = Markdown
		if err != nil {
			fmt.Println(err) //create fail may exist
			return false
		}
		return true
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
				log.Printf("mydebug: created: %s %d\n", path, op)
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
func MonitorFS(store db.Store, wiki_path string) {
	// watcher, err := fsnotify.NewWatcher()
	watcher, err := rfsnotify.NewWatcher()
	if err != nil {
		log.Fatal("NewWatcher failed: ", err)
	}
	defer watcher.Close()

	done := make(chan bool)
	go func() {
		defer close(done)
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}

				RenderLogic(event.Name, uint32(event.Op), store)
				log.Printf("%s %s\n", event.Name, event.Op)
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
