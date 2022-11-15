package gitsync

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestClone(t *testing.T) {
	UserID := "1"
	RepoID := "wiki"
	RepoGit := "https://gitee.com/zizdlp/wiki.git"
	RepoUserName := "zizdlp"
	RepoAccessToken := "zzz123"
	err := Clone(UserID, RepoID, RepoGit, RepoUserName, RepoAccessToken)
	require.NoError(t, err)
}
