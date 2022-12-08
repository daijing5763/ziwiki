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



-- name: QueryMarkdownUser :many
select i.id,i.mdhref,i.user_id,i.repo_id,COALESCE(ts_headline(i.mdtext,plainto_tsquery($1),'MaxFragments=10, MaxWords=7, MinWords=3'),'')
from (
  select id,mdhref,user_id,repo_id,mdtext
  from markdowns 
  where user_id = $2  and fts @@ plainto_tsquery($1)
  LIMIT 10
) as i;



-- name: QueryMarkdownRepo :many
select i.id,i.mdhref,i.user_id,i.repo_id,COALESCE(ts_headline(i.mdtext,plainto_tsquery($1),'MaxFragments=10, MaxWords=7, MinWords=3'),'')
from (
  select id,mdhref,user_id,repo_id,mdtext
  from markdowns 
  where user_id = $2 and repo_id=$3  and fts @@ plainto_tsquery($1)
  LIMIT 10
) as i;