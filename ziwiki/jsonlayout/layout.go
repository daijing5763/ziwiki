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

	prefix := len(path) + 1
	GenLayout(prefix, path, &layout)
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
func GenLayout(prefix int, path string, layout *Layout) {
	files, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}
	left_path := ""
	if prefix < len(path) {
		left_path = path[prefix:] + "/"
	}

	for _, f := range files {
		if f.Type().IsRegular() && strings.HasSuffix(f.Name(), ".md") {
			current_layout := Layout{
				Title: f.Name(),
				Isdir: false,
				Href:  left_path + f.Name(),
			}
			layout.Sublayouts = append(layout.Sublayouts, current_layout)
		}
		if f.IsDir() {
			current_layout := Layout{
				Title: f.Name(),
				Isdir: true,
			}
			GenLayout(prefix, path+"/"+f.Name(), &current_layout)
			if OwnMd(&current_layout) {
				layout.Sublayouts = append(layout.Sublayouts, current_layout)
				lens := len(layout.Sublayouts)
				if current_layout.Isdir { //[l,r]
					left := 0
					right := len(layout.Sublayouts) - 1

					for left < right {
						mid := (left + right) / 2
						mid_v := layout.Sublayouts[mid].Isdir
						if mid_v {
							left = mid + 1
						} else {
							right = mid
						}
					}
					if left < lens-1 {
						layout.Sublayouts[left], layout.Sublayouts[lens-1] = layout.Sublayouts[lens-1], layout.Sublayouts[left]
					}

				}
			}
		}
	}
}
