-- Run once in the Supabase SQL Editor. Safe to run again.

-- Tables

CREATE TABLE IF NOT EXISTS admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inquiries (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email      TEXT        NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  message    TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  status     TEXT        NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Replied', 'Closed')),
  notes      TEXT        NOT NULL DEFAULT '' CHECK (char_length(notes) <= 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS guestbook (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  message    TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000),
  approved   BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id          SERIAL PRIMARY KEY,
  number      TEXT    NOT NULL DEFAULT '',
  title       TEXT    NOT NULL CHECK (char_length(title) BETWEEN 1 AND 160),
  summary     TEXT    NOT NULL DEFAULT '' CHECK (char_length(summary) <= 300),
  description TEXT    NOT NULL DEFAULT '' CHECK (char_length(description) <= 2000),
  price       TEXT    NOT NULL DEFAULT '',
  is_visible  BOOLEAN NOT NULL DEFAULT true,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id          SERIAL PRIMARY KEY,
  title       TEXT        NOT NULL CHECK (char_length(title) BETWEEN 1 AND 160),
  description TEXT        NOT NULL DEFAULT '' CHECK (char_length(description) <= 2000),
  image_url   TEXT        NOT NULL DEFAULT '',
  is_visible  BOOLEAN     NOT NULL DEFAULT true,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin check

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid());
$$;

-- Row Level Security

ALTER TABLE admins          ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries       ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook       ENABLE ROW LEVEL SECURITY;
ALTER TABLE services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- Admins can see the admin list only from their own row, which lets the app
-- check its own status without exposing everyone else's.
DROP POLICY IF EXISTS "Admins read their own row" ON admins;
CREATE POLICY "Admins read their own row"
  ON admins FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Inquiries: anyone may send one, nobody but admins may read it.
DROP POLICY IF EXISTS "Anyone can send an inquiry" ON inquiries;
CREATE POLICY "Anyone can send an inquiry"
  ON inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (status = 'New' AND notes = '');

DROP POLICY IF EXISTS "Admins manage inquiries" ON inquiries;
CREATE POLICY "Admins manage inquiries"
  ON inquiries FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Guestbook: anyone may sign, but only unapproved entries are accepted so
-- visitors cannot approve their own messages. Public reads show approved only.
DROP POLICY IF EXISTS "Anyone can sign the guestbook" ON guestbook;
CREATE POLICY "Anyone can sign the guestbook"
  ON guestbook FOR INSERT TO anon, authenticated
  WITH CHECK (approved = false);

DROP POLICY IF EXISTS "Anyone reads approved guestbook entries" ON guestbook;
CREATE POLICY "Anyone reads approved guestbook entries"
  ON guestbook FOR SELECT TO anon, authenticated
  USING (approved = true);

DROP POLICY IF EXISTS "Admins manage the guestbook" ON guestbook;
CREATE POLICY "Admins manage the guestbook"
  ON guestbook FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Services and portfolio: public reads visible rows, admins manage everything.
DROP POLICY IF EXISTS "Anyone reads visible services" ON services;
CREATE POLICY "Anyone reads visible services"
  ON services FOR SELECT TO anon, authenticated
  USING (is_visible = true);

DROP POLICY IF EXISTS "Admins manage services" ON services;
CREATE POLICY "Admins manage services"
  ON services FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Anyone reads visible portfolio items" ON portfolio_items;
CREATE POLICY "Anyone reads visible portfolio items"
  ON portfolio_items FOR SELECT TO anon, authenticated
  USING (is_visible = true);

DROP POLICY IF EXISTS "Admins manage portfolio items" ON portfolio_items;
CREATE POLICY "Admins manage portfolio items"
  ON portfolio_items FOR ALL TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
