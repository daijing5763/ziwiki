package lute

import (
	"C"
	"context"
	"fmt"
	"os"

	_ "github.com/lib/pq"
	db "github.com/zdlpsina/ziwiki/db/sqlc"

	mathjax "github.com/zdlpsina/ziwiki/mathjax"

	"github.com/yuin/goldmark"
	html "github.com/zdlpsina/ziwiki/chromahtml"

	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
	highlighting "github.com/zdlpsina/ziwiki/highlight"
	"github.com/zdlpsina/ziwiki/mdextensions"
)
import (
	"bytes"
	"log"
	"strings"

	toc "github.com/abhinav/goldmark-toc"
	"github.com/yuin/goldmark/text"
)

func RenderMd(store db.Store, input_path string, mdtype int, UserID int64, RepoID int64) {
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
	// luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	// luteEngine.SetCodeSyntaxHighlightInlineStyle(false)
	// luteEngine.SetCodeSyntaxHighlightDetectLang(true)
	// luteEngine.SetCodeSyntaxHighlightLineNum(true)
	// html := luteEngine.MarkdownStr("demo", string(data))
	// html = render.Render(html)

	markdown := goldmark.New(
		goldmark.WithRenderer(renderer.NewRenderer(renderer.WithNodeRenderers(util.Prioritized(mdextensions.NewRenderer(), 1000)))),
		// 支持 GFM
		// goldmark.WithExtensions(extension.GFM),
		goldmark.WithExtensions(extension.NewCJK(extension.WithEastAsianLineBreaks(), extension.WithEscapedSpace())),
		goldmark.WithExtensions(
			mdextensions.NewFootnote(
				mdextensions.WithFootnoteIDPrefix([]byte("footnote-")),
				mdextensions.WithFootnoteLinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4")),
				mdextensions.WithFootnoteBacklinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2")),
				mdextensions.WithFootnoteLinkTitle([]byte("跳转至脚注^^")),
				mdextensions.WithFootnoteBacklinkTitle([]byte("跳转引用内容")),
				mdextensions.WithFootnoteBacklinkHTML([]byte("^"))),
		),
		goldmark.WithExtensions(mdextensions.NewTable()),
		// 语法高亮
		goldmark.WithExtensions(
			highlighting.NewHighlighting(
				highlighting.WithStyle("murphy"),
				// highlighting.WithGuessLanguage(true),
				highlighting.WithFormatOptions(
					html.WithLineNumbers(true),
					html.WithClasses(true),
				),
			),
		),
		goldmark.WithExtensions(mathjax.MathJax),
	)
	// markdown.Parser().AddOptions(parser.WithAutoHeadingID())
	markdown.Parser().AddOptions(
		parser.WithAutoHeadingID(),
		parser.WithASTTransformers(
			util.Prioritized(&toc.Transformer{
				Title: "Contents",
			}, 100),
		),
	)

	doc := markdown.Parser().Parse(text.NewReader(data))
	tree, err := toc.Inspect(doc, data)
	if err != nil {
		panic(err)
	}
	// Render the tree as-is into a Markdown list.
	treeList := toc.RenderList(tree)

	// Table content
	var t bytes.Buffer
	// Render the Markdown list into HTML.
	markdown.Renderer().Render(&t, data, treeList)
	fmt.Println("mydebug===================:t", t.String())
	var b bytes.Buffer
	err = markdown.Convert(data, &b)
	if err != nil {
		panic(err)
	}
	html := b.String()
	html_list := t.String()
	if mdtype == 0 {
		// create
		arg := db.CreateMarkdownParams{
			Mdhref: trim_path,
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

		// list
		arg_list := db.CreateMarkdownParams{
			Mdhref: trim_path + ".list",
			UserID: UserID,
			RepoID: RepoID,
			Mdtext: html_list,
		}
		log.Printf("mydebug: create list:%s", input_path)
		Markdown_list, err := store.CreateMarkdown(context.Background(), arg_list)
		_ = Markdown_list
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
		log.Printf("mydebug: update:%s", input_path)
		Markdown, err := store.UpdateMarkdown(context.Background(), arg)
		_ = Markdown
		if err != nil {
			fmt.Println(err)
		}

		arg_list := db.UpdateMarkdownParams{
			Mdhref: trim_path + ".list",
			Mdtext: html_list,
			UserID: UserID,
			RepoID: RepoID,
		}
		log.Printf("mydebug: update:%s", input_path)
		Markdown_list, err := store.UpdateMarkdown(context.Background(), arg_list)
		_ = Markdown_list
		if err != nil {
			fmt.Println(err)
		}
	} else if mdtype == 2 {
		//delete
		log.Printf("mydebug: delete:%s", input_path)
		arg := db.DeleteMarkdownParams{
			Mdhref: trim_path,
			UserID: UserID,
			RepoID: RepoID,
		}
		err := store.DeleteMarkdown(context.Background(), arg)
		if err != nil {
			fmt.Println(err)
		}

		arg_list := db.DeleteMarkdownParams{
			Mdhref: trim_path + ".list",
			UserID: UserID,
			RepoID: RepoID,
		}
		err = store.DeleteMarkdown(context.Background(), arg_list)
		if err != nil {
			fmt.Println(err)
		}
	}
}
