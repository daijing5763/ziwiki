package layout

import (
	"encoding/json"
	"log"
	"os"
	"strings"
)

// 创建结构体
type Layout struct {
	Title      string   `json:"title"`
	Href       string   `json:"href"`
	Isdir      bool     `json:"isdir"`
	Sublayouts []Layout `json:"sublayouts"`
}

func LayoutToString(path string) (string, error) {
	layout := Layout{
		Title: "wiki",
		Isdir: true,
	}
	GenLayout(path, &layout)
	json_layout, err := json.Marshal(layout)
	if err != nil {
		return "", err
	}
	return string(json_layout), err
}
func OwnMd(Layout *Layout) bool {
	if !Layout.Isdir {
		return true
	}
	for _, sublayout := range Layout.Sublayouts {
		if OwnMd(&sublayout) {
			return true
		}
	}
	return false
}
func GenLayout(path string, layout *Layout) {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	for _, f := range files {
		if f.Type().IsRegular() && strings.HasSuffix(f.Name(), ".md") {
			current_layout := Layout{
				Title: f.Name(),
				Isdir: false,
				Href:  path + "/" + f.Name(),
			}
			layout.Sublayouts = append(layout.Sublayouts, current_layout)
		}
		if f.IsDir() {
			current_layout := Layout{
				Title: f.Name(),
				Isdir: true,
			}
			GenLayout(path+"/"+f.Name(), &current_layout)
			if OwnMd(&current_layout) {
				layout.Sublayouts = append(layout.Sublayouts, current_layout)
			}
		}
	}
}
