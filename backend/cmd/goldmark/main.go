package main

import (
	"bytes"
	"fmt"
	"os"

	toc "github.com/abhinav/goldmark-toc"
	mathjax "github.com/zdlpsina/ziwiki/markdown/mathjax"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/text"
	"github.com/yuin/goldmark/util"
	html "github.com/zdlpsina/ziwiki/markdown/chromahtml"
	highlighting "github.com/zdlpsina/ziwiki/markdown/highlight"
	"github.com/zdlpsina/ziwiki/markdown/mdextensions"
)

func main() {
	input_path := "./case8.md"
	data, err := os.ReadFile(input_path)
	if err != nil {
		fmt.Println("err:", err)
		return
	}

	if err != nil {
		fmt.Println(err)
		return
	}

	markdown := goldmark.New(
		goldmark.WithRenderer(renderer.NewRenderer(renderer.WithNodeRenderers(util.Prioritized(mdextensions.NewRenderer(), 1000)))),
		// 支持 GFM
		// goldmark.WithExtensions(extension.GFM),
		goldmark.WithExtensions(mdextensions.TaskList),
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
	if err != nil {
		fmt.Println("mydebug:", err)
		return
	}
	// // Render the tree as-is into a Markdown list.
	treeList := toc.RenderList(tree)
	// Table content
	var t bytes.Buffer
	// Render the Markdown list into HTML.
	if treeList == nil {
		return
	}
	err = markdown.Renderer().Render(&t, data, treeList)
	if err != nil {
		return
	}
	var b bytes.Buffer
	err = markdown.Convert(data, &b)
	if err != nil {
		return
	}

	f, err := os.Create("guide8.html")
	if err != nil {
		panic(err)
	}
	fmt.Println()
	err = markdown.Convert(data, f)
	if err != nil {
		panic(err)
	}

	// html_list := t.String()
	// fmt.Println(html_list)
	// fmt.Println(b.String())
}
