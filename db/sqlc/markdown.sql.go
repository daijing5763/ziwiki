// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.14.0
// source: markdown.sql

package db

import (
	"context"
)

const createMarkdown = `-- name: CreateMarkdown :one
INSERT INTO markdowns (
  mdhref,
  user_id,
  mdrepo,
  mdtext
) VALUES ($1, $2, $3, $4 ) 
RETURNING id, mdhref, user_id, mdrepo, mdtext, created_at
`

type CreateMarkdownParams struct {
	Mdhref string `json:"mdhref"`
	UserID int32  `json:"user_id"`
	Mdrepo string `json:"mdrepo"`
	Mdtext string `json:"mdtext"`
}

func (q *Queries) CreateMarkdown(ctx context.Context, arg CreateMarkdownParams) (Markdown, error) {
	row := q.db.QueryRowContext(ctx, createMarkdown,
		arg.Mdhref,
		arg.UserID,
		arg.Mdrepo,
		arg.Mdtext,
	)
	var i Markdown
	err := row.Scan(
		&i.ID,
		&i.Mdhref,
		&i.UserID,
		&i.Mdrepo,
		&i.Mdtext,
		&i.CreatedAt,
	)
	return i, err
}

const deleteMarkdown = `-- name: DeleteMarkdown :exec
DELETE FROM markdowns
WHERE mdhref = $1
`

func (q *Queries) DeleteMarkdown(ctx context.Context, mdhref string) error {
	_, err := q.db.ExecContext(ctx, deleteMarkdown, mdhref)
	return err
}

const getMarkdown = `-- name: GetMarkdown :one
SELECT id, mdhref, user_id, mdrepo, mdtext, created_at FROM markdowns
WHERE mdhref = $1 LIMIT 1
`

func (q *Queries) GetMarkdown(ctx context.Context, mdhref string) (Markdown, error) {
	row := q.db.QueryRowContext(ctx, getMarkdown, mdhref)
	var i Markdown
	err := row.Scan(
		&i.ID,
		&i.Mdhref,
		&i.UserID,
		&i.Mdrepo,
		&i.Mdtext,
		&i.CreatedAt,
	)
	return i, err
}

const getMarkdownForUpdate = `-- name: GetMarkdownForUpdate :one
SELECT id, mdhref, user_id, mdrepo, mdtext, created_at FROM markdowns
WHERE mdhref = $1 LIMIT 1
FOR NO KEY UPDATE
`

func (q *Queries) GetMarkdownForUpdate(ctx context.Context, mdhref string) (Markdown, error) {
	row := q.db.QueryRowContext(ctx, getMarkdownForUpdate, mdhref)
	var i Markdown
	err := row.Scan(
		&i.ID,
		&i.Mdhref,
		&i.UserID,
		&i.Mdrepo,
		&i.Mdtext,
		&i.CreatedAt,
	)
	return i, err
}

const updateMarkdown = `-- name: UpdateMarkdown :one
UPDATE markdowns
SET mdtext=$2
WHERE mdhref = $1
RETURNING id, mdhref, user_id, mdrepo, mdtext, created_at
`

type UpdateMarkdownParams struct {
	Mdhref string `json:"mdhref"`
	Mdtext string `json:"mdtext"`
}

func (q *Queries) UpdateMarkdown(ctx context.Context, arg UpdateMarkdownParams) (Markdown, error) {
	row := q.db.QueryRowContext(ctx, updateMarkdown, arg.Mdhref, arg.Mdtext)
	var i Markdown
	err := row.Scan(
		&i.ID,
		&i.Mdhref,
		&i.UserID,
		&i.Mdrepo,
		&i.Mdtext,
		&i.CreatedAt,
	)
	return i, err
}
