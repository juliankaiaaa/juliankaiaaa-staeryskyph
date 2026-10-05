# Staery Sky PH Portfolio Website

> A portfolio and business website for Staery Sky PH, created to showcase its services and information for K-POP fans.

**Live site:** https://juliankiaaaa.github.io/juliankaiaaa-staeryskyph/

## What it does

* Showcases Staery Sky PH and its services
* Lists featured services in a horizontal carousel, loaded from the database
* Provides a request form for each service, with fields specific to that service
* Saves each inquiry to the database, with validation and success and error messages
* Provides an admin page where the owner signs in to review and manage inquiries
* Provides information about the shop, its team, and Korea, Japan, and Thailand pasabuy services
* Uses a scrapbook-inspired design with custom visual assets

## Screenshot

![Staery Sky PH Week 2 Progress](docs/week2-progress.png)

## Built with

* **Frontend:** React and Vite, deployed to GitHub Pages
* **Backend:** Supabase (PostgreSQL database, with Row Level Security and its auto-generated API)

The website talks to Supabase directly, so there is no separate server to run or host. Visitors can read the services list and submit requests. The security rules in `supabase/schema.sql` limit them to those two actions.

## Demo mode

The site can run without Supabase, using a browser-only stand-in for the database. This is useful for developing the design and for a deployment before the database is set up.

| `VITE_USE_MOCK_API`       | What happens                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| unset, or `true`          | Demo mode. Services come from `client/src/api/seed.json`, and requests are saved in the browser only. |
| `false`                   | Live mode. The site reads and writes through Supabase, using the variables below.             |

## Running it yourself

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The development site will normally be available at:

```text
http://localhost:5173
```

To use the live database, set `VITE_USE_MOCK_API=false` and the two Supabase values in `client/.env` (see below). Restart `npm run dev` after changing `.env`.

## Database setup (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy the **Project URL** and the **anon public** key from **Project Settings > API**.

The schema creates five tables: `inquiries`, `guestbook`, `services`, `portfolio_items`, and `admins`. Row Level Security is on for all of them. Visitors can send inquiries and read visible services. Only admins can read or change inquiries.

`schema.sql` is safe to run more than once. `seed.sql` clears the services table before inserting, so it can be re-run to reset the starter data.

### Making yourself an admin

1. In Supabase, open **Authentication > Users > Add user > Create new user**, enter your email and a password, and tick **Auto Confirm User**.
2. Copy the new user's **UID** from the list.
3. In the **SQL Editor**, run `insert into admins (user_id) values ('the-uid-here');`.
4. Sign in at `/#/admin` on your site. The admin page is not linked from the site, so bookmark it.

## Environment variables

Copy `client/.env.example` to `client/.env` and fill in the values.

| Name                     | What it is                                                                     |
| ------------------------ | ------------------------------------------------------------------------------ |
| `VITE_USE_MOCK_API`      | `false` for live mode. Anything else, including unset, is demo mode.           |
| `VITE_SUPABASE_URL`      | Your Supabase Project URL.                                                     |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon public key.                                                 |

Every `VITE_` value is compiled into the built JavaScript and is **public**. The anon key is designed to be public, because the Row Level Security rules are what protect the data. Never put the database password or the `service_role` key in a `VITE_` variable.

## Deploying

**Client, to GitHub Pages.** The workflow in `.github/workflows/deploy-pages.yml` builds the client and publishes it on every push to `main`.

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.**
2. **Settings > Secrets and variables > Actions**, then add the values the build needs for live mode.

## Project structure

```text
client/          React front end, built by Vite
  src/
    api/          Supabase client, demo stand-in and seed data
    assets/       website images and decorations
    components/   reusable components (Navbar, Hero, ServiceCard, ...)
    data/         services shown while the API loads
    hooks/        shared hooks
    pages/        About, Services, Request
    App.jsx       Home page
    main.jsx      React entry point and routes
    styles.css    website styling

supabase/
  schema.sql     tables and Row Level Security rules
  seed.sql       starter services

.github/
  workflows/
    deploy-pages.yml    GitHub Pages deployment workflow

docs/             planning documents, weekly reports, and screenshots
```

## Architecture

```text
React / Vite front end  --->  Supabase (PostgreSQL + Auth + API, protected by Row Level Security)
        |
        +--- GitHub Pages hosts the built files
```

The site talks to Supabase directly, so there is no separate server to run or host. Visitors use the public anon key, and the security rules in `supabase/schema.sql` decide what that key can do.

## Author

**Rebusa, Amber Kaia J.** — CS-402

## AI use

AI assistance was used during development for coding support, debugging, documentation, and improving the website implementation.

The AI tools used during development were:
- **ChatGPT**
- **Claude**

See [AI-USAGE.md](AI-USAGE.md) for the full documentation of AI usage.

## Licence

MIT, see [LICENSE](LICENSE).
