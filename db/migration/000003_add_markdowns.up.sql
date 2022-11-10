CREATE TABLE "markdowns" (
  "id" SERIAL PRIMARY KEY,
  "mdhref" varchar UNIQUE NOT NULL,
  "user_id" int NOT NULL,
  "mdrepo" varchar NOT NULL,
  "mdtext" varchar NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT 'now()'
);

ALTER TABLE "markdowns" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
