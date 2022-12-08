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
		UserID:          user.ID,
		RepoName:        util.RandomString(20),
		RepoGit:         util.RandomString(20),
		RepoUserName:    util.RandomUsername(),
		RepoAccessToken: util.RandomString(20),
	}
	repo, err := testQueries.CreateRepo(context.Background(), arg_repo)
	require.NoError(t, err)

	arg := CreateMarkdownParams{
		Mdhref: util.RandomString(32),
		UserID: user.ID,
		RepoID: repo.ID,
		Mdtext: "I love you, do you love the dog",
		// Mdtext: util.RandomString(3200),
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
	arg := GetMarkdownParams{
		Mdhref: md1.Mdhref,
		UserID: md1.UserID,
		RepoID: md1.RepoID,
	}
	md2, err := testQueries.GetMarkdown(context.Background(), arg)
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
	arg := GetMarkdownParams{
		Mdhref: md1.Mdhref,
		UserID: md1.UserID,
		RepoID: md1.RepoID,
	}
	md2, err := testQueries.GetMarkdown(context.Background(), arg)
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
	arg1 := DeleteMarkdownParams{
		Mdhref: md1.Mdhref,
		UserID: md1.UserID,
		RepoID: md1.RepoID,
	}
	arg2 := GetMarkdownParams{
		Mdhref: md1.Mdhref,
		UserID: md1.UserID,
		RepoID: md1.RepoID,
	}
	err := testQueries.DeleteMarkdown(context.Background(), arg1)
	require.NoError(t, err)
	md2, err := testQueries.GetMarkdown(context.Background(), arg2)
	require.Empty(t, md2)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
}

func TestUpdateMarkdown(t *testing.T) {
	md1 := createRandomMarkdown(t)

	arg := UpdateMarkdownParams{
		Mdhref: md1.Mdhref,
		Mdtext: util.RandomString(3200),
		RepoID: md1.RepoID,
		UserID: md1.UserID,
	}
	md2, err := testQueries.UpdateMarkdown(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, md2)
	require.Equal(t, md2.ID, md1.ID)
	require.Equal(t, md2.Mdhref, arg.Mdhref)
	require.Equal(t, md2.Mdtext, arg.Mdtext)
}

func TestQueryMarkdownUser(t *testing.T) {
	md1 := createRandomMarkdown(t)

	arg := QueryMarkdownUserParams{
		PlaintoTsquery: "dog",
		UserID:         md1.UserID,
	}

	md2, err := testQueries.QueryMarkdownUser(context.Background(), arg)
	t.Log(md2)
	require.NoError(t, err)
	require.NotEmpty(t, md2)
}

func TestQueryMarkdownRepo(t *testing.T) {
	md1 := createRandomMarkdown(t)
	arg := QueryMarkdownRepoParams{
		PlaintoTsquery: "dog",
		RepoID:         md1.RepoID,
		UserID:         md1.UserID,
	}
	md2, err := testQueries.QueryMarkdownRepo(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, md2)
}
