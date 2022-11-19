package monitor

import (
	"context"
	"strconv"
	"testing"

	"github.com/stretchr/testify/require"
	db "github.com/zdlpsina/ziwiki/db/sqlc"
	"github.com/zdlpsina/ziwiki/gitsync"
	"github.com/zdlpsina/ziwiki/util"
)

func TestMonitor(t *testing.T) {

	arg_user := db.CreateUserParams{
		Username:       util.RandomString(20),
		Email:          util.RandomEmail(),
		HashedPassword: util.RandomString(20),
	}
	user, err := store.CreateUser(context.Background(), arg_user)

	require.NoError(t, err)

	arg_repo := db.CreateRepoParams{
		UserID:          user.ID,
		RepoName:        util.RandomString(20),
		RepoGit:         "https://gitee.com/zizdlp/wiki.git",
		RepoUserName:    "zizdlp",
		RepoAccessToken: "zzz123"}
	repo, err := store.CreateRepo(context.Background(), arg_repo)
	require.NoError(t, err)
	err = gitsync.Clone("/tmp/wiki/", strconv.FormatInt(repo.UserID, 10), strconv.FormatInt(repo.ID, 10), repo.RepoGit, repo.RepoUserName, repo.RepoAccessToken)
	require.NoError(t, err)
	path := "/tmp/wiki/" + strconv.FormatInt(user.ID, 10) + "/" + strconv.FormatInt(repo.ID, 10) + "/" + "README.md"
	t.Log("render test path:", path)
	succ := RenderLogic(path, 1, store)
	require.True(t, succ)
}
