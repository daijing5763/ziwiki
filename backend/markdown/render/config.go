package render

import (
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/util"
	html "github.com/zdlpsina/ziwiki/markdown/chromahtml"
	highlighting "github.com/zdlpsina/ziwiki/markdown/highlight"
	mathjax "github.com/zdlpsina/ziwiki/markdown/mathjax"
	"github.com/zdlpsina/ziwiki/markdown/mdextensions"
)

func GetMarkdownConfig() goldmark.Markdown {
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
	return markdown
}
