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
		UserID:   user.ID,
		RepoName: util.RandomString(20),
	}

	Repo, err := testQueries.CreateRepo(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, Repo)
	require.Equal(t, arg.UserID, Repo.UserID)
	require.Equal(t, arg.RepoName, Repo.RepoName)
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
