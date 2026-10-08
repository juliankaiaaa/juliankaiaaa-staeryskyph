# Security checklist

The site is a static React build served by GitHub Pages. Data is stored in Supabase, protected by Row Level Security. There is no custom server.

Last reviewed against the code on `main`, 2026-10-09.

## Secrets and configuration

| # | Check | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` files are git-ignored | Yes | `.gitignore` ignores `.env` and `.env.*`, and allows `.env.example`. |
| 2 | `.env.example` contains placeholders only | Yes | `client/.env.example` has `<value>` placeholders. |
| 3 | No keys or passwords are hardcoded in source | Yes | Supabase values are read from `import.meta.env` in `client/src/api/supabaseClient.js`. |
| 4 | The anon key was never committed | Yes | A search of the git history for the anon key found no matches. |
| 5 | The database password and `service_role` key are not used in the browser | Yes | Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are used. |

## Database

| # | Check | Status | Evidence |
| --- | --- | --- | --- |
| 6 | Row Level Security is enabled on every table | Yes | `supabase/schema.sql` enables RLS on `admins`, `inquiries`, `guestbook`, `services` and `portfolio_items`. |
| 7 | Visitors can only send inquiries and read visible services | Yes | Policies "Anyone can send an inquiry" and "Anyone reads visible services". |
| 8 | Only admins can read or change inquiries | Yes | Policy "Admins manage inquiries", based on the `admins` table. |
| 9 | Input length and values are limited in the database | Yes | `CHECK` constraints on `inquiries` (name, email, message, status, notes, service, details). |

## Frontend

| # | Check | Status | Evidence |
| --- | --- | --- | --- |
| 10 | User text is rendered without raw HTML | Yes | No `dangerouslySetInnerHTML` in `client/src`. |
| 11 | Error messages do not expose database internals | Yes | Visitors see a message from `createInquiry`. Full errors are logged to the console only. |
| 12 | Admin sign-in uses Supabase Auth | Yes | `client/src/api/adminApi.js` and `client/src/components/AdminLogin.jsx`. |

## Deployment

| # | Check | Status | Evidence |
| --- | --- | --- | --- |
| 13 | Third-party actions are pinned to commit SHAs | Yes | `.github/workflows/deploy-pages.yml`. |
| 14 | The workflow contains no secret values | Yes | Values come from repository variables (`vars.*`). |
| 15 | The uploaded artifact is `client/dist` only | Yes | The `upload-pages-artifact` step uses `client/dist`. |
| 16 | GitHub secret scanning and push protection are on | To confirm | Check **Settings > Code security**. This cannot be verified from the repository. |

## Privacy

| # | Check | Status | Evidence |
| --- | --- | --- | --- |
| 17 | Seed data contains no personal information | Yes | `supabase/seed.sql` and `client/src/api/seed.json` contain service descriptions only. |
| 18 | Images and fonts are from known sources | Partly | Logo and decorations are project artwork. Service photos must be licensed for use. Fonts come from Google Fonts. |
| 19 | Repository visibility is intentional | To confirm | GitHub Pages needs a public repository on a free account. |
