package main

import (
	"fmt"

	genlayout "github.com/zdlpsina/ziwiki/jsonlayout"
)

func main() {
	path := "/tmp/wiki/18/18"
	string_layout, err := genlayout.LayoutToString(path)

	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}
	fmt.Println(string_layout)
}
