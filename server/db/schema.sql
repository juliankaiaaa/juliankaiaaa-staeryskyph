-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.

CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  number      TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  summary     TEXT    NOT NULL DEFAULT '',
  description TEXT    NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS requests (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  contact    TEXT        NOT NULL,
  service    TEXT        NOT NULL,
  link       TEXT        NOT NULL DEFAULT '',
  details    TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The admin list shows newest requests first.
CREATE INDEX IF NOT EXISTS requests_created_at_idx
  ON requests (created_at DESC);
