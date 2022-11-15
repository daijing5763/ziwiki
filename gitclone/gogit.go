package gitclone

import (
	"fmt"
	"os"

	git "github.com/go-git/go-git/v5" // with go modules enabled (GO111MODULE=on or outside GOPATH)
) // with go modules disabled

func gogitit() {

	_, err := git.PlainClone("/tmp/foo", false, &git.CloneOptions{
		// URL:      "https://github.com/go-git/go-git",
		URL:      "https://gitee.com/zizdlp/wiki.git",
		Progress: os.Stdout,
	})
	if err != nil {
		fmt.Printf("error: %s", err)
	}
}
