package layout

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestGenLayout(t *testing.T) {
	layout := Layout{
		Title: "wiki",
		Isdir: true,
	}

	path := "/tmp/wiki/18/18"
	GenLayout(path, &layout)
	fmt.Println(layout)
	b, err := json.Marshal(layout)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}
	fmt.Println(string(b))
}
