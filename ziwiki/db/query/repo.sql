-- name: CreateRepo :one
INSERT INTO repos (
  user_id,
  repo_name,
  repo_git,
  repo_user_name,
  repo_access_token
) VALUES ($1,$2,$3,$4,$5) 
RETURNING *;

-- name: GetRepo :one
SELECT * FROM repos
WHERE id = $1 LIMIT 1;


-- name: GetRepoForUpdate :one
SELECT * FROM repos
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;

-- name: UpdateRepo :one
UPDATE repos
SET repo_name=$2
WHERE id = $1
RETURNING *;

-- name: DeleteRepo :exec
DELETE FROM repos
WHERE id = $1;