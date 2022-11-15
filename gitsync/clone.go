package gitsync

import (
	"fmt"
	"os"

	git "github.com/go-git/go-git/v5" // with go modules enabled (GO111MODULE=on or outside GOPATH)
	"github.com/go-git/go-git/v5/plumbing/transport/http"
) // with go modules disabled

func Clone(UserID string, RepoID string, RepoGit string, RepoUserName string, RepoAccessToken string) error {
	url := RepoGit
	username := RepoUserName
	password := RepoAccessToken
	directory := "/tmp/wiki/" + UserID + "/" + RepoID + "/"

	_, err := git.PlainClone(directory, false, &git.CloneOptions{
		Auth: &http.BasicAuth{
			Username: username,
			Password: password,
		},
		URL:      url,
		Progress: os.Stdout,
	})
	if err != nil {
		fmt.Printf("error: %s", err)
	}
	return err
}
