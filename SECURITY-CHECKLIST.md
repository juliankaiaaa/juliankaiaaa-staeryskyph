# Security checklist

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | **Yes** | `.gitignore` ignores `.env` files, and `git ls-files` showed only `.env.example` files and no actual `.env` file. |
| 2 | A `.env.example` with placeholder values only is committed | **Yes** | Checked `.env.example`, `client/.env.example`, and `server/.env.example`; they contain placeholder/demo values only. |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | **Yes** | Searched `client` and `server`; no actual credentials were found. Connection strings and password examples are only in environment example files. The database application password is supplied through `POSTGRES_APP_PASSWORD` rather than being hardcoded in the database setup script. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | **Yes** | Ran `git log -p | grep -i -E "password|secret|api[\_-]?key|postgres\://"`; only course template/demo credentials and placeholders were found. |
| 5 | Any credential that was ever committed has been rotated | **N/A** | No real credential was found in the repository or Git history, so there was nothing to rotate. |
| 6 | Production credentials live only in my hosting provider's environment settings | **N/A** | The project is currently using the mock API and has no production credentials configured yet. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | **Yes** | Checked `.github/workflows/deploy-pages.yml`; it contains no actual passwords, API keys, tokens, or database credentials. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | **N/A** | The current workflow does not require secret values; the `VITE_*` values are public build-time variables. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | **Yes** | Checked the Build job logs; only normal npm/Vite build output was shown and no secret values were printed. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | **Yes** | The production `dist` build contained no `.env`, `.pem`, or `.key` files, and searching the built files found no PostgreSQL connection strings or obvious passwords/API keys. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | **Yes** | Updated the workflow actions from version tags to full commit SHAs and verified the SHAs against the official GitHub repositories. |
| 12 | Secret scanning and push protection are enabled on the repository | **Yes** | GitHub Settings → Advanced Security showed Secret Protection and Push Protection as enabled. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | **Yes** | Checked `server/sightingsRepo.js`; queries use `$1`, `$2`, `$3`, and `$4` placeholders with values passed separately. |
| 14 | The database is not open to the whole internet, or is reachable only by the app | **Yes** | `compose.yml` does not expose a PostgreSQL port. The API is bound to `127.0.0.1:3000`. |
| 15 | The database user the app connects as has only the permissions it needs | **Yes** | `compose.yml` now connects using the `staery_app` application user instead of the PostgreSQL `postgres` superuser. `server/db/02-user.sh` grants `staery_app` only CONNECT, schema usage, CRUD access to the `sightings` table, and usage/select access to its sequence. |
| 16 | Seed and sample data is invented, not real people's data | **Yes** | Checked `server/db/seed.sql`; it contains fictional sample sightings and no real people's data. |
| 17 | Debug, seed and reset routes are removed before going public | **Yes** | Checked `server/server.js`; there are no debug, seed, or reset API routes. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | **Yes** | Added Basic Auth middleware in `server/server.js` to protect the `/api` routes. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | **N/A** | The project uses direct PostgreSQL through the Express server, not Supabase or Firebase. |
| 20 | If Zero Trust: `tjakoen.s@gmail.com` is on the access policy. If an app password: the credentials are in my private workspace `project/README.md` | **No** | The project uses Basic Auth rather than Cloudflare Zero Trust. The Basic Auth credentials still need to be documented in the private workspace `project/README.md`. |
| 21 | The gate covers every route, including the ones that only change data | **Yes** | `app.use('/api', basicAuth)` is registered before the API routes, covering GET, POST, PUT, and DELETE routes. |
| 22 | The credentials for the gate are environment variables, not in source | **Yes** | Basic Auth reads `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD` from environment variables. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | **Yes** | `server/server.js` has a `validate()` function checking place, description length, and spookiness range before database writes. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | **Yes** | The React client uses normal JSX text rendering and does not use `dangerouslySetInnerHTML`. |
| 25 | Error responses do not expose stack traces, file paths or connection details | **Yes** | The Express error handler logs details on the server but returns only `Something went wrong on the server` to the client. |
| 26 | CORS is not a wildcard on routes that change data | **Yes** | `server/server.js` uses the `CORS_ORIGINS` environment variable with `cors({ origin: allowedOrigins })` instead of `*`. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | **Yes** | Searched the repository with `git grep`; the only matches were security documentation instructions, not actual personal information. |
| 28 | No classmate's personal data in the repository | **Yes** | Searched for classmate/student information; the only matches were security checklist instructions and no actual personal data was found. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | **Yes** | `node_modules/` is in `.gitignore`, and `git ls-files` showed no tracked `node_modules` files. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | **N/A** | The repository currently contains no image assets requiring licensing or attribution. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | **Yes** | GitHub Settings → General → Danger Zone confirms that the repository is currently public. |

## Anything I found and fixed

The checklist identified that the API had no access layer even though it contained routes that could create, update, and delete database records. I added Basic Auth middleware using environment variables and tested that unauthenticated requests return `401 Unauthorized`.

The checklist also identified that the API was initially configured to connect to PostgreSQL using the default `postgres` account. I changed the Compose configuration to use a separate `staery_app` application user with limited database permissions. The application user's password is supplied through the `POSTGRES_APP_PASSWORD` environment variable rather than being hardcoded in the repository.

The project uses Basic Auth instead of Cloudflare Zero Trust, so the professor's `tjakoen.s@gmail.com` access-policy requirement does not apply to the current access-control option. The remaining access-control task is to document the Basic Auth credentials in the private workspace `project/README.md` without placing them in the public GitHub repository.