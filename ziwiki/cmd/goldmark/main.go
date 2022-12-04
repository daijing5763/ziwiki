package main

import (
	"bytes"
	"fmt"
	"os"

	toc "github.com/abhinav/goldmark-toc"
	mathjax "github.com/zdlpsina/ziwiki/mathjax"

	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/text"
	"github.com/yuin/goldmark/util"
	html "github.com/zdlpsina/ziwiki/chromahtml"
	highlighting "github.com/zdlpsina/ziwiki/highlight"
	"github.com/zdlpsina/ziwiki/mdextensions"
)

func main() {
	input_path := "./case4.md"
	data, err := os.ReadFile(input_path)
	if err != nil {
		fmt.Println("err:", err)
	}
	// // 自定义解析器
	// markdown := goldmark.New(
	// 	goldmark.WithRenderer(renderer.NewRenderer(renderer.WithNodeRenderers(util.Prioritized(mdextensions.NewRenderer(), 1000)))),
	// 	// 支持 GFM
	// 	// goldmark.WithExtensions(extension.GFM),
	// 	goldmark.WithExtensions(extension.NewCJK(extension.WithEastAsianLineBreaks(), extension.WithEscapedSpace())),
	// 	goldmark.WithExtensions(
	// 		mdextensions.NewFootnote(
	// 			mdextensions.WithFootnoteIDPrefix([]byte("footnote-")),
	// 			mdextensions.WithFootnoteLinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4")),
	// 			mdextensions.WithFootnoteBacklinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2")),
	// 			mdextensions.WithFootnoteLinkTitle([]byte("跳转至脚注^^")),
	// 			mdextensions.WithFootnoteBacklinkTitle([]byte("跳转引用内容")),
	// 			mdextensions.WithFootnoteBacklinkHTML([]byte("^"))),
	// 	),
	// 	goldmark.WithExtensions(mdextensions.NewTable()),
	// 	// 语法高亮
	// 	goldmark.WithExtensions(
	// 		highlighting.NewHighlighting(
	// 			highlighting.WithStyle("murphy"),
	// 			// highlighting.WithGuessLanguage(true),
	// 			highlighting.WithFormatOptions(
	// 				html.WithLineNumbers(true),
	// 				html.WithClasses(true),
	// 			),
	// 		),
	// 	),
	// 	goldmark.WithExtensions(mathjax.MathJax),
	// )
	// markdown.Parser().AddOptions(parser.WithAutoHeadingID())
	// // markdown.Parser().AddOptions(
	// // 	parser.WithAutoHeadingID(),
	// // 	parser.WithASTTransformers(
	// // 		util.Prioritized(&toc.Transformer{
	// // 			Title: "Contents",
	// // 		}, 100),
	// // 	),
	// // )

	// doc := markdown.Parser().Parse(text.NewReader(data))
	// tree, err := toc.Inspect(doc, data)
	// if err != nil {
	// 	panic(err)
	// }
	// // Render the tree as-is into a Markdown list.
	// treeList := toc.RenderList(tree)

	// // Table content
	// var t bytes.Buffer
	// // // Render the Markdown list into HTML.
	// // markdown.Renderer().Render(os.Stdout, data, treeList)

	// // Render the Markdown list into HTML.
	// markdown.Renderer().Render(&t, data, treeList)
	// fmt.Println(t.String())
	// f, err := os.Create("guide0.html")
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println()
	// err = markdown.Convert(data, f)
	// if err != nil {
	// 	panic(err)
	// }

	// data, err := os.ReadFile(input_path)
	// index := strings.Split(input_path, "/")
	// if len(index) <= 4 {
	// 	return
	// }
	// trim_path := strings.Join(index[5:], "/")
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
	markdown.Parser().AddOptions(parser.WithAutoHeadingID())
	// markdown.Parser().AddOptions(
	// 	parser.WithAutoHeadingID(),
	// 	parser.WithASTTransformers(
	// 		util.Prioritized(&toc.Transformer{
	// 			Title: "Contents",
	// 		}, 100),
	// 	),
	// )

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
	// html := b.String()
	html_list := t.String()
	fmt.Println(html_list)
}
