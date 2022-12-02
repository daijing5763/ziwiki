CREATE TABLE "repos" (
  "id" bigserial PRIMARY KEY,
  "user_id" bigint NOT NULL,
  "repo_name" varchar NOT NULL,
  "repo_git" varchar NOT NULL,
  "repo_user_name" varchar NOT NULL,
  "repo_access_token" varchar NOT NULL,
  "repo_from" varchar NOT NULL,
  "repo_describe" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

CREATE TABLE "markdowns" (
  "id" bigserial UNIQUE NOT NULL,
  "mdhref" varchar NOT NULL,
  "user_id" bigint NOT NULL,
  "repo_id" bigint NOT NULL,
  "mdtext" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()',
  PRIMARY KEY ("mdhref", "user_id","repo_id")
);

ALTER TABLE "repos" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "markdowns" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "markdowns" ADD FOREIGN KEY ("repo_id") REFERENCES "repos" ("id");

CREATE UNIQUE INDEX ON "markdowns" ("repo_id", "user_id", "mdhref");
