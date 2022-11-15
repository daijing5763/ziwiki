package gitsync

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/zdlpsina/ziwiki/util"
)

func TestClone(t *testing.T) {
	UserID := string(rune(util.RandomInt(1, 1000)))
	RepoID := "wiki"
	RepoGit := "https://gitee.com/zizdlp/wiki.git"
	RepoUserName := "zizdlp"
	RepoAccessToken := "zzz123"
	err := Clone(UserID, RepoID, RepoGit, RepoUserName, RepoAccessToken)
	require.NoError(t, err)
}
