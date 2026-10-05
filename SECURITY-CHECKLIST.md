# Security checklist

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` includes `.env` and `.env.*`, while `.env.example` files are allowed to be committed. |
| 2 | `.env.example` files contain placeholder values only | Yes | `client/.env.example` contains placeholder values only. The real `client/.env` is git-ignored. |
| 3 | No real password, API key, token, or database credential is hardcoded in the source code | Yes | Project files were checked for passwords, secrets, API keys, and database connection strings. Only placeholder/example values were found. |
| 4 | Git history was checked for exposed credentials | Yes | Git history was searched for passwords, secrets, API keys, and database connection strings. No real credentials were found. |
| 5 | Any credential that was ever committed has been rotated | N/A | No real production credential was found in the repository or Git history. |
| 6 | Production credentials are stored only in environment settings | N/A | The backend is still under development and does not have production credentials yet. |

## GitHub Actions

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written directly in the workflow file | Yes | `.github/workflows/deploy-pages.yml` does not contain passwords, API keys, or database credentials. |
| 8 | Secrets are stored using GitHub Actions secrets when needed | N/A | The current workflow only builds and deploys the frontend. No private backend secrets are required by the workflow. |
| 9 | Workflow logs do not intentionally print secrets | Yes | The workflow does not echo passwords, API keys, or other private credentials. |
| 10 | Uploaded build artifacts do not contain `.env` or private key files | Yes | The workflow uploads `client/dist`, which contains the built frontend files. |
| 11 | Third-party GitHub Actions are pinned to commit SHAs | Yes | `actions/checkout`, `actions/setup-node`, `actions/upload-pages-artifact`, and `actions/deploy-pages` are pinned to specific commit SHAs instead of version tags. |
| 12 | GitHub secret scanning and push protection are enabled | Yes | Secret scanning and push protection are enabled in the repository's GitHub security settings. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Database queries use parameters instead of string concatenation | Yes | All reads and writes go through the Supabase client, which sends values as parameters. |
| 14 | The database is not publicly exposed to the internet | Yes | The database is hosted by Supabase and reached only through its API, with Row Level Security enabled on every table (`supabase/schema.sql`). |
| 15 | The application uses only the permissions it needs | Yes | The browser uses the public anon key. Row Level Security limits visitors to sending inquiries and reading visible services and approved guestbook entries. |
| 16 | Sample data does not contain real people's personal information | Yes | The seed data contains only the service descriptions in `supabase/seed.sql`. |
| 17 | Debug, seed, or reset routes are not publicly exposed | Yes | There are no custom server routes. Schema and seed scripts run only in the Supabase SQL Editor. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The application has an appropriate access layer when required | Yes | The backend includes Basic Authentication for API routes while the API is being developed. |
| 19 | Supabase or Firebase security rules are enabled when applicable | N/A | The current project does not use Supabase or Firebase for its backend. |
| 20 | Admin sign-in uses a managed authentication service | Yes | Admins sign in with Supabase Auth email and password. Only accounts listed in the `admins` table can read or change inquiries. |
| 21 | Protected API routes use the authentication layer | Yes | The `/api` routes are placed behind the Basic Authentication middleware. |
| 22 | Keys and credentials are not hardcoded in source files | Yes | Supabase keys are read from `client/.env`, which is git-ignored. The anon key is public by design, and Row Level Security protects the data. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | User input is validated on the server | Yes | The database enforces length and value limits with CHECK constraints in `supabase/schema.sql`, and the forms validate the same rules before sending. |
| 24 | User-supplied text is safely rendered | Yes | The React frontend uses normal JSX rendering and does not use `dangerouslySetInnerHTML`. |
| 25 | Error responses do not expose sensitive server information | Yes | Visitors see plain messages. Detailed database errors are logged to the browser console only. |
| 26 | CORS is restricted to allowed origins | Yes | The backend uses the `CORS_ORIGINS` environment variable instead of allowing every origin by default. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number, or home address is stored in project files | Yes | Project files were checked for personal information and no such information is intentionally included in the website source. |
| 28 | No customer or other person's personal data is stored in the repository | Yes | No customer records, addresses, phone numbers, or private customer information are included in the repository. |
| 29 | Dependencies are installed through npm and `node_modules` is ignored | Yes | The project uses `npm install` for dependencies, and `node_modules/` is included in `.gitignore`. |
| 30 | Images, fonts, and other assets are properly owned, licensed, or used appropriately | Yes | The website uses project design assets such as the brown polka-dot background and pink curved design asset. Fonts and other external assets should continue to be checked before final deployment. |
| 31 | Repository visibility is intentional | Yes | The repository is public because the project uses GitHub Pages for the frontend deployment. |

## Anything I found and fixed

During the security review, I checked the project for exposed credentials, environment files, Git history issues, and GitHub Actions configuration.

I also updated the project so that:

- `.env` files are ignored by Git.
- Example environment files contain placeholder values only.
- API authentication uses environment variables.
- The backend uses a separate application database user.
- GitHub Actions are pinned to commit SHAs.
- The frontend build does not include private environment files or credentials.
- GitHub secret scanning and push protection are enabled.

Re-check the database and access rules after any change to `supabase/schema.sql`.