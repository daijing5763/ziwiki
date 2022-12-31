package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/zdlpsina/ziwiki/util"
)

func createRandomRepo(t *testing.T) Repo {
	user := createRandomUser(t)
	arg := CreateRepoParams{
		UserID:          user.ID,
		RepoName:        util.RandomString(20),
		RepoGit:         util.RandomString(20),
		RepoUserName:    util.RandomString(20),
		RepoAccessToken: util.RandomString(20),
		RepoFrom:        util.RandomString(20),
		RepoDescribe:    util.RandomString(20),
	}

	Repo, err := testQueries.CreateRepo(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, Repo)
	require.Equal(t, arg.UserID, Repo.UserID)
	require.Equal(t, arg.RepoName, Repo.RepoName)
	require.Equal(t, arg.RepoGit, Repo.RepoGit)
	require.Equal(t, arg.RepoUserName, Repo.RepoUserName)
	require.Equal(t, arg.RepoAccessToken, Repo.RepoAccessToken)
	require.Equal(t, arg.RepoFrom, Repo.RepoFrom)
	require.Equal(t, arg.RepoDescribe, Repo.RepoDescribe)
	require.NotZero(t, Repo.CreatedAt)
	return Repo
}

func TestCreateRepo(t *testing.T) {
	createRandomRepo(t)
}

func TestGetRepo(t *testing.T) {
	repo1 := createRandomRepo(t)
	repo2, err := testQueries.GetRepo(context.Background(), repo1.ID)
	require.NoError(t, err)
	require.NotEmpty(t, repo2)

	require.Equal(t, repo1.UserID, repo2.UserID)
	require.Equal(t, repo1.RepoName, repo2.RepoName)
	require.Equal(t, repo1.ID, repo2.ID)
	require.WithinDuration(t, repo1.CreatedAt, repo2.CreatedAt, time.Second)
}
func TestGetRepoForUpdate(t *testing.T) {
	repo1 := createRandomRepo(t)
	repo2, err := testQueries.GetRepo(context.Background(), repo1.ID)
	require.NoError(t, err)
	require.NotEmpty(t, repo2)

	require.Equal(t, repo1.UserID, repo2.UserID)
	require.Equal(t, repo1.RepoName, repo2.RepoName)
	require.Equal(t, repo1.ID, repo2.ID)
	require.WithinDuration(t, repo1.CreatedAt, repo2.CreatedAt, time.Second)
}

func TestDeleteRepo(t *testing.T) {
	repo1 := createRandomRepo(t)

	err := testQueries.DeleteRepo(context.Background(), repo1.ID)
	require.NoError(t, err)
	repo2, err := testQueries.GetRepo(context.Background(), repo1.ID)
	require.Empty(t, repo2)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
}

func TestUpdateRepo(t *testing.T) {
	repo1 := createRandomRepo(t)

	arg := UpdateRepoParams{
		ID:       repo1.ID,
		RepoName: util.RandomString(20),
	}
	repo2, err := testQueries.UpdateRepo(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, repo2)
	require.Equal(t, repo2.ID, arg.ID)
	require.Equal(t, repo2.RepoName, arg.RepoName)
}

func TestListRepos(t *testing.T) {
	var lastRepo Repo
	for i := 0; i < 10; i++ {
		lastRepo = createRandomRepo(t)
	}

	arg := ListReposParams{
		UserID: lastRepo.UserID,
		Limit:  5,
		Offset: 0,
	}

	repos, err := testQueries.ListRepos(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, repos)

	for _, repo := range repos {
		require.NotEmpty(t, repo)
		require.Equal(t, lastRepo.UserID, repo.UserID)
	}
}
