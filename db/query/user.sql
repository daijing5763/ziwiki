-- name: CreateUser :one
INSERT INTO users (
  username,
  email,
  hashed_password
) VALUES (
  $1, $2, $3
) RETURNING *;

-- name: GetUser :one
SELECT * FROM users
WHERE username = $1 LIMIT 1;

-- name: GetUserForUpdate :one
SELECT * FROM users
WHERE id = $1 LIMIT 1
FOR NO KEY UPDATE;


-- name: UpdateUser :one
UPDATE users
SET username=$2,
email=$3,
hashed_password=$4
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;