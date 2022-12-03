package main

import (
	"fmt"
	"os"

	toc "github.com/abhinav/goldmark-toc"
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

func main() {
	input_path := "./case0.md"
	data, err := os.ReadFile(input_path)
	if err != nil {
		fmt.Println("err:", err)
	}
	// 自定义解析器
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

	markdown.Parser().AddOptions(
		parser.WithAutoHeadingID(),
		parser.WithASTTransformers(
			util.Prioritized(&toc.Transformer{
				Title: "Contents",
			}, 100),
		),
	)

	f, err := os.Create("guide3.html")
	if err != nil {
		panic(err)
	}
	fmt.Println()
	err = markdown.Convert(data, f)
	if err != nil {
		panic(err)
	}

}
