package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/zdlpsina/ziwiki/util"
)

func createRandomMarkdown(t *testing.T) Markdown {
	user := createRandomUser(t)
	arg_repo := CreateRepoParams{
		UserID:   user.ID,
		RepoName: util.RandomString(20),
	}
	repo, err := testQueries.CreateRepo(context.Background(), arg_repo)
	require.NoError(t, err)

	arg := CreateMarkdownParams{
		Mdhref: util.RandomString(32),
		UserID: user.ID,
		RepoID: repo.ID,
		Mdtext: util.RandomString(3200),
	}

	Markdown, err := testQueries.CreateMarkdown(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, Markdown)
	require.Equal(t, arg.Mdhref, Markdown.Mdhref)
	require.Equal(t, arg.UserID, Markdown.UserID)
	require.Equal(t, arg.RepoID, Markdown.RepoID)
	require.Equal(t, arg.Mdtext, Markdown.Mdtext)
	require.NotZero(t, Markdown.CreatedAt)
	return Markdown
}

func TestCreateMarkdown(t *testing.T) {
	createRandomMarkdown(t)
}

func TestGetMarkdown(t *testing.T) {
	md1 := createRandomMarkdown(t)
	md2, err := testQueries.GetMarkdown(context.Background(), md1.Mdhref)
	require.NoError(t, err)
	require.NotEmpty(t, md2)

	require.Equal(t, md1.UserID, md2.UserID)
	require.Equal(t, md1.Mdhref, md2.Mdhref)
	require.Equal(t, md1.RepoID, md2.RepoID)
	require.Equal(t, md1.Mdtext, md2.Mdtext)
	require.WithinDuration(t, md1.CreatedAt, md2.CreatedAt, time.Second)
}
func TestGetMarkdownForUpdate(t *testing.T) {
	md1 := createRandomMarkdown(t)
	md2, err := testQueries.GetMarkdown(context.Background(), md1.Mdhref)
	require.NoError(t, err)
	require.NotEmpty(t, md2)

	require.Equal(t, md1.UserID, md2.UserID)
	require.Equal(t, md1.Mdhref, md2.Mdhref)
	require.Equal(t, md1.RepoID, md2.RepoID)
	require.Equal(t, md1.Mdtext, md2.Mdtext)
	require.WithinDuration(t, md1.CreatedAt, md2.CreatedAt, time.Second)
}

func TestDeleteMarkdown(t *testing.T) {
	md1 := createRandomMarkdown(t)

	err := testQueries.DeleteMarkdown(context.Background(), md1.Mdhref)
	require.NoError(t, err)
	md2, err := testQueries.GetMarkdown(context.Background(), md1.Mdhref)
	require.Empty(t, md2)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
}

func TestUpdateMarkdown(t *testing.T) {
	md1 := createRandomMarkdown(t)

	arg := UpdateMarkdownParams{
		Mdhref: md1.Mdhref,
		Mdtext: util.RandomString(3200),
	}
	md2, err := testQueries.UpdateMarkdown(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, md2)
	require.Equal(t, md2.ID, md1.ID)
	require.Equal(t, md2.Mdhref, arg.Mdhref)
	require.Equal(t, md2.Mdtext, arg.Mdtext)
}
