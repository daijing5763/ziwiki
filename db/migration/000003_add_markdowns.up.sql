CREATE TABLE "repos" (
  "id" bigserial PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "repo_name" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "markdowns" (
  "id" bigserial PRIMARY KEY,
  "mdhref" varchar UNIQUE NOT NULL,
  "user_id" bigint NOT NULL,
  "repo_id" bigint NOT NULL,
  "mdtext" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE "repos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "markdowns" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "markdowns" ADD FOREIGN KEY ("repo_id") REFERENCES "repos" ("id");
