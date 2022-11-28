package main

import (
	"fmt"
	"os"

	"github.com/88250/lute"
	render "github.com/zdlpsina/ziwiki/postrender"
)

func main() {
	input_path := "./case3.md"
	data, err := os.ReadFile(input_path)
	if err != nil {
		fmt.Println("err:", err)
	}
	luteEngine := lute.New() // 默认已经启用 GFM 支持以及中文语境优化
	luteEngine.SetCodeSyntaxHighlightInlineStyle(false)
	luteEngine.SetCodeSyntaxHighlightDetectLang(true)
	luteEngine.SetCodeSyntaxHighlightLineNum(true)
	// luteEngine.SetCodeSyntaxHighlightStyleName("xcode")
	html := luteEngine.MarkdownStr("demo", string(data))

	html = render.Render(html)
	d1 := []byte(html)
	err = os.WriteFile("./res.txt", d1, 0644)
	if err != nil {
		fmt.Println("mydebug:write error:", err)
	}
}
