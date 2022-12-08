package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"path"
	"path/filepath"
	"runtime"
	"time"

	"github.com/Jeffail/tunny"

	toc "github.com/abhinav/goldmark-toc"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer"
	"github.com/yuin/goldmark/text"
	"github.com/yuin/goldmark/util"
	html "github.com/zdlpsina/ziwiki/chromahtml"
	highlighting "github.com/zdlpsina/ziwiki/highlight"
	"github.com/zdlpsina/ziwiki/mathjax"
	"github.com/zdlpsina/ziwiki/mdextensions"
)

// func main() {
// 	start := time.Now()
// 	input_path := "./demo3.md"
// 	data, err := os.ReadFile(input_path)
// 	if err != nil {
// 		fmt.Println("err:", err)
// 		return
// 	}

// 	if err != nil {
// 		fmt.Println(err)
// 		return
// 	}

// 	markdown := goldmark.New(
// 		goldmark.WithRenderer(renderer.NewRenderer(renderer.WithNodeRenderers(util.Prioritized(mdextensions.NewRenderer(), 1000)))),
// 		goldmark.WithExtensions(extension.NewCJK(extension.WithEastAsianLineBreaks(), extension.WithEscapedSpace())),
// 		goldmark.WithExtensions(
// 			mdextensions.NewFootnote(
// 				mdextensions.WithFootnoteIDPrefix([]byte("footnote-")),
// 				mdextensions.WithFootnoteLinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4")),
// 				mdextensions.WithFootnoteBacklinkClass([]byte("text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2")),
// 				mdextensions.WithFootnoteLinkTitle([]byte("跳转至脚注^^")),
// 				mdextensions.WithFootnoteBacklinkTitle([]byte("跳转引用内容")),
// 				mdextensions.WithFootnoteBacklinkHTML([]byte("^"))),
// 		),
// 		goldmark.WithExtensions(mdextensions.NewTable()),
// 		// 语法高亮
// 		goldmark.WithExtensions(
// 			highlighting.NewHighlighting(
// 				highlighting.WithStyle("murphy"),
// 				// highlighting.WithGuessLanguage(true),
// 				highlighting.WithFormatOptions(
// 					html.WithLineNumbers(true),
// 					html.WithClasses(true),
// 				),
// 			),
// 		),
// 		goldmark.WithExtensions(mathjax.MathJax),
// 	)
// 	markdown.Parser().AddOptions(parser.WithAutoHeadingID())

// 	doc := markdown.Parser().Parse(text.NewReader(data))

// 	tree, err := toc.Inspect(doc, data)
// 	if err != nil {
// 		fmt.Println("mydebug:", err)
// 		return
// 	}
// 	// // Render the tree as-is into a Markdown list.
// 	treeList := toc.RenderList(tree)
// 	// Table content
// 	var t bytes.Buffer
// 	// Render the Markdown list into HTML.
// 	if treeList == nil {
// 		return
// 	}
// 	err = markdown.Renderer().Render(&t, data, treeList)
// 	if err != nil {
// 		return
// 	}
// 	var b bytes.Buffer
// 	err = markdown.Convert(data, &b)
// 	if err != nil {
// 		return
// 	}
// 	// html_list := t.String()
// 	// fmt.Println(html_list)
// 	// fmt.Println(b.String())
// 	elapsed := time.Since(start)
// 	log.Printf("Binomial took %s", elapsed)

// 	var files []string
// 	root := "/Users/wangxili/github/gitee/ziwiki"
// 	err = filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
// 		files = append(files, path)
// 		return nil
// 	})
// 	if err != nil {
// 		panic(err)
// 	}
// 	for _, file := range files {
// 		fmt.Println(file)
// 	}

// }

const (
	layout = "2006-01-02 15:04:05"
)

func VisitFile(fp string, fi os.FileInfo, err error) error {
	if err != nil {
		fmt.Println(err) // can't walk here,
		return nil       // but continue walking elsewhere
	}
	if fi.IsDir() {
		return nil // not a file.  ignore.
	}
	// 过滤输出内容
	matched, err := filepath.Match("*.md", fi.Name())
	if err != nil {
		fmt.Println(err) // malformed pattern
		return err       // this is fatal.
	}
	if matched {
		markdown := getMarkdown()
		go func() {
			processsMd(markdown, fp)
		}()

	}
	return nil
}
func processsMd(markdown goldmark.Markdown, path string) bool {
	data, err := os.ReadFile(path)
	if err != nil {
		return false
	}
	doc := markdown.Parser().Parse(text.NewReader(data))
	tree, err := toc.Inspect(doc, data)
	if err != nil {
		return false
	}
	// // Render the tree as-is into a Markdown list.
	treeList := toc.RenderList(tree)
	// Table content
	var t bytes.Buffer
	// Render the Markdown list into HTML.
	if treeList == nil {
		return false
	}
	err = markdown.Renderer().Render(&t, data, treeList)
	if err != nil {
		return false
	}
	var b bytes.Buffer
	err = markdown.Convert(data, &b)
	return err == nil
}
func getMarkdown() goldmark.Markdown {
	markdown := goldmark.New(
		goldmark.WithRenderer(renderer.NewRenderer(renderer.WithNodeRenderers(util.Prioritized(mdextensions.NewRenderer(), 1000)))),
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
	return markdown
}
func countGoFiles(folder string, markdown goldmark.Markdown, pool *tunny.Pool) {
	files, err := os.ReadDir(folder)
	if err != nil {
		return
	}
	for _, f := range files {
		if f.IsDir() {
			countGoFiles(folder+"/"+f.Name(), markdown, pool)
		}
		if path.Ext(f.Name()) == ".md" {
			pool.Process(folder + "/" + f.Name())
		}
	}
}

func main() {

	numCPUs := runtime.NumCPU()

	pool := tunny.NewFunc(numCPUs, func(path interface{}) interface{} {
		markdown := getMarkdown()
		go func() {
			processsMd(markdown, path.(string))
		}()
		return true
	})

	defer pool.Close()

	root := "/Users/wangxili/github/gitee/ziwiki"
	start := time.Now()
	filepath.Walk(root, VisitFile)
	elapsed := time.Since(start)
	log.Printf("Binomial took %s", elapsed)
	markdown := getMarkdown()
	start = time.Now()
	countGoFiles(root, markdown, pool)
	elapsed = time.Since(start)
	log.Printf("Binomial took %s", elapsed)

	//
	//
	//

}
