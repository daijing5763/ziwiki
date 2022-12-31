package render

import (
	"C"
	"context"
	"fmt"
	"os"

	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"

	"github.com/yuin/goldmark"

	"github.com/yuin/goldmark/parser"
)
import (
	"bytes"
	"strings"

	toc "github.com/abhinav/goldmark-toc"
	"github.com/yuin/goldmark/text"
)

func RenderMd(store db.Store, input_path string, mdtype int, UserID int64, RepoID int64) {
	go func() {

		data, err := os.ReadFile(input_path)
		index := strings.Split(input_path, "/")
		if len(index) <= 4 {
			return
		}
		trim_path := strings.Join(index[5:], "/")
		// if our program was unable to read the file
		// print out the reason why it can't
		if err != nil {
			fmt.Println(err)
		}
		markdown := GetMarkdownConfig()
		doc := markdown.Parser().Parse(text.NewReader(data))
		tree, err := toc.Inspect(doc, data)
		if err == nil {
			treeList := toc.RenderList(tree)
			if treeList != nil {
				var list_buffer bytes.Buffer
				// Render the Markdown list into HTML.
				err = markdown.Renderer().Render(&list_buffer, data, treeList)
				if err == nil {
					html_list := list_buffer.String()
					RenderType(store, trim_path+".list", mdtype, html_list, UserID, RepoID)
				}
			}
		}
		var b bytes.Buffer
		err = markdown.Convert(data, &b)
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		html := b.String()
		RenderType(store, trim_path, mdtype, html, UserID, RepoID)
	}()
}

func RenderType(store db.Store, trim_path string, mdtype int, html string, UserID int64, RepoID int64) {
	if mdtype == 0 {
		// create
		arg := db.CreateMarkdownParams{
			Mdhref: trim_path,
			UserID: UserID,
			RepoID: RepoID,
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
			Mdhref: trim_path,
			Mdtext: html,
			UserID: UserID,
			RepoID: RepoID,
		}
		Markdown, err := store.UpdateMarkdown(context.Background(), arg)
		_ = Markdown
		if err != nil {
			fmt.Println(err)
		}

	} else if mdtype == 2 {
		//delete
		arg := db.DeleteMarkdownParams{
			Mdhref: trim_path,
			UserID: UserID,
			RepoID: RepoID,
		}
		err := store.DeleteMarkdown(context.Background(), arg)
		if err != nil {
			fmt.Println(err)
		}
	}
}

func RenderList(store db.Store, input_path string, mdtype int, UserID int64, RepoID int64) *bytes.Buffer {
	data, err := os.ReadFile(input_path)
	if err != nil {
		return nil
	}
	markdown := goldmark.New()
	markdown.Parser().AddOptions(parser.WithAutoHeadingID())
	doc := markdown.Parser().Parse(text.NewReader(data))
	tree, err := toc.Inspect(doc, data)
	if err != nil {
		return nil
	}
	// Render the tree as-is into a Markdown list.
	treeList := toc.RenderList(tree)
	if treeList == nil {
		return nil
	}
	// Table content
	var t bytes.Buffer
	// Render the Markdown list into HTML.
	err = markdown.Renderer().Render(&t, data, treeList)
	if err != nil {
		panic(err)
	}
	return &t
}
