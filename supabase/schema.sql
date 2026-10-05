-- Run this once in the Supabase SQL Editor. Safe to run again.
--
-- Row Level Security decides what the public key may do:
--   visitors can read services and submit requests, nothing else.
--   Only signed-in admins can read the list of requests.

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
  name       TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  contact    TEXT        NOT NULL CHECK (char_length(contact) BETWEEN 1 AND 120),
  service    TEXT        NOT NULL CHECK (char_length(service) BETWEEN 1 AND 120),
  link       TEXT        NOT NULL DEFAULT '' CHECK (char_length(link) <= 500),
  details    TEXT        NOT NULL CHECK (char_length(details) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read services" ON services;
CREATE POLICY "Anyone can read services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Anyone can submit a request" ON requests;
CREATE POLICY "Anyone can submit a request"
  ON requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can read requests" ON requests;
CREATE POLICY "Admins can read requests"
  ON requests FOR SELECT
  TO authenticated
  USING (true);
