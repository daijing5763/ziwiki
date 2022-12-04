package gitsync

import (
	"os"

	git "github.com/go-git/go-git/v5" // with go modules enabled (GO111MODULE=on or outside GOPATH)
	"github.com/go-git/go-git/v5/plumbing/transport/http"
) // with go modules disabled

func Clone(RootPath string, UserID string, RepoID string, RepoGit string, RepoUserName string, RepoAccessToken string) error {
	url := RepoGit
	username := RepoUserName
	password := RepoAccessToken
	directory := RootPath + UserID + "/" + RepoID + "/"

	_, err := git.PlainClone(directory, false, &git.CloneOptions{
		Auth: &http.BasicAuth{
			Username: username,
			Password: password,
		},
		URL:      url,
		Progress: os.Stdout,
	})
	return err
}

func Pull(RootPath string, UserID string, RepoID string, RepoGit string, RepoUserName string, RepoAccessToken string) error {
	directory := RootPath + UserID + "/" + RepoID + "/"
	username := RepoUserName
	password := RepoAccessToken
	// We instantiate a new repository targeting the given path (the .git folder)
	r, err := git.PlainOpen(directory)
	if err != nil {
		return err
	}
	// Get the working directory for the repository
	w, err := r.Worktree()
	if err != nil {
		return err
	}
	// Pull the latest changes from the origin remote and merge into the current branch
	err = w.Pull(&git.PullOptions{RemoteName: "origin", Auth: &http.BasicAuth{
		Username: username,
		Password: password,
	}})
	if err != nil {
		return err
	}
	return err
}
