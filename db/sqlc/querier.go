// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.14.0

package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CreateMarkdown(ctx context.Context, arg CreateMarkdownParams) (Markdown, error)
	CreateRepo(ctx context.Context, arg CreateRepoParams) (Repo, error)
	CreateSession(ctx context.Context, arg CreateSessionParams) (Session, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (User, error)
	DeleteMarkdown(ctx context.Context, mdhref string) error
	DeleteRepo(ctx context.Context, id int32) error
	DeleteUser(ctx context.Context, id int32) error
	GetMarkdown(ctx context.Context, mdhref string) (Markdown, error)
	GetMarkdownForUpdate(ctx context.Context, mdhref string) (Markdown, error)
	GetRepo(ctx context.Context, id int32) (Repo, error)
	GetRepoForUpdate(ctx context.Context, id int32) (Repo, error)
	GetSession(ctx context.Context, id uuid.UUID) (Session, error)
	GetUser(ctx context.Context, username string) (User, error)
	GetUserForUpdate(ctx context.Context, id int32) (User, error)
	UpdateMarkdown(ctx context.Context, arg UpdateMarkdownParams) (Markdown, error)
	UpdateRepo(ctx context.Context, arg UpdateRepoParams) (Repo, error)
	UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error)
}

var _ Querier = (*Queries)(nil)
