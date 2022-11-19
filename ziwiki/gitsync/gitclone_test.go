package gitsync

import (
	"strconv"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/zdlpsina/ziwiki/util"
)

func TestCloneShouldOK(t *testing.T) {
	RootPath := "/tmp/wiki/"
	UserID := util.RandomInt(1, 10000)
	RepoID := util.RandomInt(1, 10000)
	RepoGit := "https://gitee.com/zizdlp/wiki.git"
	RepoUserName := "zizdlp"
	RepoAccessToken := "zzz123"
	err := Clone(RootPath, strconv.FormatInt(UserID, 10), strconv.FormatInt(RepoID, 10), RepoGit, RepoUserName, RepoAccessToken)
	require.NoError(t, err)
}

func TestCloneShouldError(t *testing.T) {
	RootPath := "/tmp/wiki/"
	UserID := util.RandomInt(1, 10000)
	RepoID := util.RandomInt(1, 10000)
	RepoGit := "abf" // wrong git repo
	RepoUserName := "zizdlp"
	RepoAccessToken := "zzz123"
	err := Clone(RootPath, strconv.FormatInt(UserID, 10), strconv.FormatInt(RepoID, 10), RepoGit, RepoUserName, RepoAccessToken)
	require.Error(t, err)
}
