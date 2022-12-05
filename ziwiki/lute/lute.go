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
	// list_buffer := RenderList(store, input_path, mdtype, UserID, RepoID)
	// if list_buffer != nil {
	// 	html_list := list_buffer.String()
	// 	RenderType(store, trim_path+".list", mdtype, html_list, UserID, RepoID)
	// }

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
	markdown.Parser().AddOptions(parser.WithAutoHeadingID())

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

	// markdown.Parser().AddOptions(
	// 	parser.WithAutoHeadingID(),
	// 	parser.WithASTTransformers(
	// 		util.Prioritized(&toc.Transformer{
	// 			Title: "Contents",
	// 		}, 100),
	// 	),
	// )

	var b bytes.Buffer
	err = markdown.Convert(data, &b)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	html := b.String()
	RenderType(store, trim_path, mdtype, html, UserID, RepoID)
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
