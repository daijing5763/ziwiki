-- name: CreateMarkdown :one
INSERT INTO markdowns (
  mdhref,
  user_id,
  repo_id,
  mdtext
) VALUES ($1, $2, $3, $4 ) 
RETURNING *;

-- name: GetMarkdown :one
SELECT * FROM markdowns
WHERE mdhref = $1 and user_id = $2 and repo_id = $3 LIMIT 1;


-- name: GetMarkdownForUpdate :one
SELECT * FROM markdowns
WHERE mdhref = $1 and user_id = $2 and repo_id = $3 LIMIT 1
FOR NO KEY UPDATE;

-- name: UpdateMarkdown :one
UPDATE markdowns
SET mdtext=$4
WHERE mdhref = $1 and user_id = $2 and repo_id = $3
RETURNING *;

-- name: DeleteMarkdown :exec
DELETE FROM markdowns
WHERE mdhref = $1 and user_id = $2 and repo_id = $3;