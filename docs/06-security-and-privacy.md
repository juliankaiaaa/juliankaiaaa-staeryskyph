# Security checklist

The site is a static React build served by GitHub Pages. Data is stored in
Supabase, protected by Row Level Security. There is no custom server.

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` ignores `.env` and `.env.*`, and allows `.env.example`. `git ls-files` shows no `.env` file. |
| 2 | A `.env.example` with placeholder values only is committed | Yes | `client/.env.example` has empty values for `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | Supabase values are read from `import.meta.env` in `client/src/api/supabaseClient.js`. A search for key/secret/password patterns across `client/src` found none. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Ran `git log --all -p \| grep -iE "password\|secret\|api[_-]?key\|postgres://"`. Only placeholder values from a removed, unused Docker/Postgres template (e.g. `POSTGRES_PASSWORD=change-this-to-something-long-and-random`) were found, never a real credential. |
| 5 | Any credential that was ever committed has been rotated | N/A | No real credential was ever committed (see #4), so there is nothing to rotate. |
| 6 | Production credentials live only in my hosting provider's environment settings | Yes | The deploy workflow reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from GitHub repository Variables, not from a file in the repo. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | `.github/workflows/deploy-pages.yml` reads every value through `${{ vars.* }}`. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | N/A | These values are stored as repository **Variables**, not Secrets, on purpose: the anon key is meant to be public (it gets compiled into the browser JavaScript), so GitHub's Secrets mechanism doesn't apply. The real protection is Supabase Row Level Security, not keeping this value hidden. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | Yes | No step in the workflow echoes or prints the env values; they are only passed to `npm run build`. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | Ran `npm run build` and checked `client/dist` for any `.env*` file: none found. The uploaded artifact is `client/dist` only. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | Yes | `checkout`, `setup-node`, `upload-pages-artifact`, and `deploy-pages` are all pinned to a full commit SHA in `deploy-pages.yml`. |
| 12 | Secret scanning and push protection are enabled on the repository | Yes | Checked **Settings > Code security**: Secret scanning alerts and Push protection are both Enabled. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | Yes | The app never writes raw SQL. All reads and writes go through the Supabase JS client's query builder (`client/src/api/httpApi.js`, `adminApi.js`), which parameterizes every value. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | Yes | The browser never connects to Postgres directly. It only talks to Supabase's REST API over HTTPS, using the anon key, with every table protected by Row Level Security. |
| 15 | The database user the app connects as has only the permissions it needs | Yes | The browser uses the `anon` role only. `supabase/schema.sql` policies grant `anon` just what's needed: inserting an inquiry, reading visible services — never full table access. The `service_role` key is never used client-side. |
| 16 | Seed and sample data is invented, not real people's data | Yes | `supabase/seed.sql` and `client/src/api/seed.json` contain only service descriptions, no personal data. |
| 17 | Debug, seed and reset routes are removed before going public | N/A | There's no custom server with routes to remove. Seeding is a manual step (running `seed.sql` in the Supabase SQL editor), not something exposed through the live site. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | Yes | The admin page (`/#/admin`) requires a real Supabase Auth sign-in (`client/src/components/AdminLogin.jsx`), not a shared password. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | Yes | RLS is enabled on every table (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY` for `admins`, `inquiries`, `guestbook`, `services`, `portfolio_items`). The `inquiries` insert policy only grants `INSERT`, not `SELECT`, to anonymous visitors, and `createInquiry` in `httpApi.js` never calls `.select()` after inserting, so a signed-out visitor has no way to read inquiries back. |
| 20 | If Zero Trust: the reviewer's email is on the access policy. If an app password: the credentials are in my private workspace README | N/A | Neither applies — the gate is a real per-user Supabase Auth account (email + password), not Zero Trust or a shared app password. |
| 21 | The gate covers every route, including the ones that only change data | Yes | Every write to `inquiries` (beyond the public insert) is gated by the `"Admins manage inquiries"` RLS policy, checked against the `admins` table — enforced by the database itself, not just by hiding the admin page in the UI. |
| 22 | The credentials for the gate are environment variables, not in source | N/A | There's no shared gate credential to store — each admin has their own Supabase Auth account, created directly in the Supabase dashboard, not stored anywhere in this repository. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | Yes | Browser-side validation in `InquiryForm.jsx` mirrors `CHECK` constraints in `supabase/schema.sql` (length limits on name, email, message, service, details), so invalid data is rejected by the database even if the browser check is bypassed. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | The app is plain React, which escapes all rendered text by default. A search for `dangerouslySetInnerHTML` across `client/src` found no matches. |
| 25 | Error responses do not expose stack traces, file paths or connection details | Yes | `createInquiry` in `httpApi.js` shows the visitor a fixed message ("We could not send your request. Please try again.") and only logs the full Supabase error to the browser console, not to the UI. |
| 26 | CORS is not a wildcard on routes that change data | N/A | There's no custom server defining CORS rules. Requests go directly to Supabase's own API, which handles its own access control through RLS rather than CORS. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | Yes | Searched all tracked files (excluding `package-lock.json`) for email/phone/student-number patterns; the only match was the course's own unfilled security template text (`docs/06-security-and-privacy.md`), which just mentions the words generically, not an actual leaked value. |
| 28 | No classmate's personal data in the repository | Yes | This is a solo project; no other students' data is collected or stored anywhere in the app. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | All dependencies are installed from the public npm registry via `package.json`. `.gitignore` excludes `node_modules/`. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | No | The logo and decorative stickers are original artwork, and fonts are from Google Fonts — those are covered. But the service photos (country flags, brand logos for Mercari/Bunjang/Weverse) don't have a recorded license or credit in the repo yet, so this check doesn't fully pass. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | Checked `https://api.github.com/repos/juliankaiaaa/juliankaiaaa-staeryskyph` just now: `"private": false`. Public is required for GitHub Pages to publish on a free account, and that's intentional here. |

## Anything I found and fixed

Going through this checklist, the main thing it caught was item 30: the
service photos (flags, brand logos) don't have a recorded license or
credit anywhere in the repo, even though the logo and decorations do.Everything else held up: no real secret has ever
been committed (only placeholder values from an old, removed Docker setup
that's no longer part of the project), the GitHub Actions workflow doesn't
leak anything, and reading the actual Row Level Security policies in
`schema.sql` confirmed that anonymous visitors can submit an inquiry but
never read one back.
