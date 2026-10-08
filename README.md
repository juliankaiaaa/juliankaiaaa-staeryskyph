# Staery Sky PH

Staery Sky PH is a fan-owned shop, established in 2019, that helps Filipino
fans get merchandise and finds from overseas that would otherwise be hard to
reach. What started as fanmade merchandise and collectibles has grown into
purchase assistance across Japan, Korea, and Thailand — along with
international shipping and package consolidation, so multiple orders can
arrive as one shipment.

This repository is the shop's website: a place for people to learn about
Staery Sky PH, browse what it offers, and send a request for something
they're looking for.

**Live site:** https://juliankaiaaa.github.io/juliankaiaaa-staeryskyph/

## What's on the site

- **Home** — a quick introduction to the shop and a look at a few featured
  services.
- **About** — the story behind Staery Sky PH, its mission and vision, and
  why people choose to shop through it.
- **Services** — every service offered, laid out as cards. Opening a card
  shows the full details for that service.
- **Request** — the actual way to reach out. Pick a service, fill in what
  you're looking for, and submit it. A successful request shows a receipt
  with a reference code to keep.
- **Admin** (private, not linked from the site) — where the shop owner signs
  in to review incoming requests, search and filter them, leave notes, and
  export them to a spreadsheet.

The whole site follows a scrapbook-style look — paper textures, washi tape,
hand-drawn stars — to match the shop's own brand.

### A look at it

Full-page mockups of each page are in [docs/mockup/](docs/mockup/), with
notes in [docs/02-mockup.md](docs/02-mockup.md).

## How it works, briefly

The site is a single-page React app. Service information and submitted
requests are stored in Supabase (a hosted Postgres database with built-in
auth), which the browser talks to directly — there's no separate backend
server to run.

It also has a built-in **demo mode**, which runs the entire site in the
browser with sample data and no database connection at all. This is what
the live site and local development use by default, so you can explore
everything — including submitting a request — without any setup.

---

## Running this project

The rest of this README is for anyone who wants to run the site locally,
connect it to a real Supabase project, or contribute to it.

### Prerequisites

- Node.js 20 or later
- npm
- Git

### Install and run

```bash
git clone https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph.git
cd juliankaiaaa-staeryskyph/client
npm install
npm run dev
```

Open `http://localhost:5173/`. No environment variables are required — the
site starts in demo mode by default, using the sample data in `src/data/`,
until `VITE_USE_MOCK_API` and the Supabase variables are set (see
[Configuration](#configuration)).

### Available scripts

Run these from `client/`:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Creates the production build in `client/dist` and copies `index.html` to `404.html` |
| `npm run preview` | Serves the production build locally for a final check |

### Technology

| Area | Tool | Version |
| --- | --- | --- |
| UI | React | 18.3 |
| Build and dev server | Vite | 6 |
| Routing | react-router-dom (`HashRouter`) | 7 |
| Database, auth and API | Supabase (`@supabase/supabase-js`) | 2 |
| Fonts | Poppins, Caveat (Google Fonts) | |
| Hosting | GitHub Pages, with GitHub Actions | |

Dependencies are listed in `client/package.json`. The site has no custom
server: the browser talks to Supabase directly.

### Project structure

```text
.
├── client/                      Front end (React + Vite)
│   ├── index.html               HTML shell and page metadata
│   ├── vite.config.js           Build configuration
│   ├── .env.example             Environment variable template
│   └── src/
│       ├── main.jsx             Entry point, routes and scroll reveal setup
│       ├── App.jsx              Home page
│       ├── pages/               About, Services, Request and Admin pages
│       ├── components/          Shared UI (Navbar, Hero, ServiceCard, InquiryForm, ...)
│       ├── hooks/               useScrollReveal, useScallopFit, useActiveSection
│       ├── api/                 Data layer: Supabase client, demo stand-in, seed data
│       ├── data/                Services list and inquiry form definitions
│       ├── assets/              Images (see Assets below)
│       └── styles/               Stylesheets, loaded in order from index.css
├── supabase/
│   ├── schema.sql               Tables, Row Level Security policies and constraints
│   └── seed.sql                 Starter services
├── .github/workflows/
│   └── deploy-pages.yml         Builds and publishes the client to GitHub Pages
├── docs/                        Project documents and mockups (see Documentation)
├── AI-USAGE.md                  Record of AI assistance
├── SECURITY-CHECKLIST.md        Security review
└── LICENSE                      MIT
```

### Architecture

```text
Browser (React app, built by Vite)
    │
    ├── Demo mode (VITE_USE_MOCK_API unset or "true")
    │     Services from src/api/seed.json; inquiries kept in localStorage
    │
    └── Live mode (VITE_USE_MOCK_API="false")
          │  anon key, public by design
          ▼
     Supabase
       ├── PostgreSQL tables, protected by Row Level Security
       ├── Auth (admin sign-in)
       └── Auto-generated REST API
```

- `src/api/index.js` is the only file the components import for data. It
  exports the same functions from either `mockApi.js` (demo) or
  `httpApi.js` (live).
- `adminApi.js` handles sign-in and inquiry management for the admin page.
- The static list in `src/data/services.js` appears at once. It is replaced
  by the API response when that arrives.

### Configuration

Copy `client/.env.example` to `client/.env` and fill in the values. Restart
`npm run dev` after any change.

| Variable | Purpose |
| --- | --- |
| `VITE_USE_MOCK_API` | `false` enables live mode. Unset or any other value enables demo mode. |
| `VITE_SUPABASE_URL` | Supabase project URL (Project Settings > API). |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key (Project Settings > API). |
| `VITE_BASE_PATH` | Optional. The path the site is served from. Defaults to `/juliankaiaaa-staeryskyph/`. The deploy workflow sets it to the repository name. |

`VITE_` values are compiled into the public JavaScript. Use only the anon
key. Never add the database password or the `service_role` key.

### Database setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copy the URL and the anon key into `client/.env`.

#### Tables

| Table | Used by the site | Notes |
| --- | --- | --- |
| `services` | Yes | Services shown on the site, ordered by `sort_order`. |
| `inquiries` | Yes | Requests from the form. Readable and editable by admins only. |
| `admins` | Yes | User IDs allowed to manage inquiries. |
| `guestbook` | No | Defined in the schema. No page uses it yet. |
| `portfolio_items` | No | Defined in the schema. No page uses it yet. |

`schema.sql` can be run more than once. `seed.sql` clears and re-inserts the
services, so it can be re-run to reset them.

#### Creating an admin

1. In Supabase, open **Authentication > Users > Add user**, enter an email
   and password, and tick **Auto Confirm User**.
2. Copy the user's UID.
3. In the SQL Editor, run:

   ```sql
   insert into admins (user_id) values ('the-uid-here');
   ```

4. Sign in at `/#/admin`. The page is not linked from the site.

### Services

Each service is defined in two places that must match:

- `client/src/data/services.js` (the static list, and the source of the
  photos)
- `supabase/seed.sql` and `client/src/api/seed.json` (the database and demo
  data)

The current services and their keys:

| Number | Service | Form key |
| --- | --- | --- |
| 01 | Consolidation Services | `consolidation` |
| 02 | Korea Purchase Assistance | `korea` |
| 03 | Japan Site Purchase Assistance | `japan` |
| 04 | Thailand Purchase Assistance | `thailand` |
| 05 | Mercari Japan Purchase Assistance | `mercari` |
| 06 | Bunjang Korea Purchase Assistance | `bunjang` |
| 07 | Weverse Purchase Assistance | `weverse` |
| 08 | Address Rental / Forwarding | `address` |

The display order is set by `sort_order` in the database. For live mode,
the order must also be updated in the database — changing the seed files
alone does not reorder the live site.

To add or change a service: edit the entry in `client/src/data/services.js`,
`client/src/api/seed.json` and `supabase/seed.sql`, keeping the same
`number`. For a new service, add its fields to `client/src/data/inquiryForms.js`
under a new key, and add the mapping in `SLUG_BY_NUMBER`. Then re-run
`seed.sql`, or update `services` directly, in the database.

### Forms and inquiries

- `InquiryForm.jsx` renders the fields defined in `data/inquiryForms.js` for
  the selected service.
- Validation runs in the browser and mirrors the length limits in the
  `CHECK` constraints in `schema.sql`.
- A successful request is saved with a reference code (for example
  `SSPH-4F7K`), which is shown on the receipt and stored with the inquiry.
- Requests from demo mode are stored in the browser only.

### Design system

The shared tokens live in `client/src/styles/base.css` (colours, type scale,
spacing, radii, shadows) and `client/src/styles/system.css` (surfaces,
shadows, card and hero rules, typography overrides and motion).

| Token | Value | Use |
| --- | --- | --- |
| `--brown` | `#3e2723` | Text, dark sections, buttons |
| `--pink` | `#f4c9d6` | Hero, About and footer surfaces |
| `--cream` | `#f4f1e2` | Paper and cards |
| `--sage`, `--lavender`, `--peach`, `--dusty-blue`, `--butter` | Pastel accents | Service cards, tags and stickers |

Conventions:

- Shapes: cards use 18px corners, panels use the hero radius, and fields
  use 10px.
- Shadows: one soft shadow for resting cards and one for hover
  (`--shadow-soft`, `--shadow-lift`).
- Typography: headings, body text, labels and buttons use `clamp()` sizes,
  so they scale smoothly with the viewport.
- Heights: the hero is `100svh` (minimum 560px), and content sections use
  viewport-based minimum heights.

### Responsive design

- Breakpoints are set in `styles/responsive.css`. The main ones are
  1100px, 1000px, 900px, 700px and 600px.
- Layouts are grids that collapse to one column on smaller screens.
- The service grid is four columns on desktop, two on tablet and one on
  mobile.
- Horizontal overflow is prevented on every page at widths from 320px to
  1440px.

### Animation and interaction

- **Scroll reveal:** `hooks/useScrollReveal.js` fades elements in as they
  enter the viewport and resets them when they leave, so scrolling back
  replays them. Nearby elements are staggered.
- **Hero stars:** the stars on the home hero drift and blink. Three of them
  vanish and reappear as they move.
- **Hover:** cards lift and their photos zoom slightly. Buttons and
  navigation items change colour or position.
- **Reduced motion:** all of the above are turned off when the visitor's
  system requests reduced motion.

### Assets

```text
client/src/assets/
├── brand/          Logo, shown inside the About polaroid
├── decorations/    Stars and asterisks used on the hero and sections
└── services/       One photo per service
```

**Naming:** lowercase, with underscores. A service photo is named
`<form-key>_photo.<ext>`, for example `mercari_photo.png` or
`korea_photo.png`, so the matcher in `services.js` can find it.

**Adding a service photo:** place the file in `assets/services/`, named
`<form-key>_photo.<ext>`. The service is matched by the file name, and the
card shows the photo in a 4:3 frame automatically. Use about 960px wide, so
pages load quickly.

**Photo credits:** record the licence and author of any photo you use,
especially Creative Commons images.

### Deployment

The `deploy-pages.yml` workflow builds `client/` and publishes it to
GitHub Pages on every push to `main`.

One-time setup:

1. **Settings > Pages > Build and deployment > Source:** GitHub Actions.
2. **Settings > Secrets and variables > Actions > Variables:** add
   `VITE_USE_MOCK_API`, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. The repository must be **public**. GitHub Pages on a free account
   publishes public repositories only.

The workflow sets `VITE_BASE_PATH` to the repository name, so the site
works under `/<repository>/`.

### Troubleshooting

**localhost shows an old version.** The dev server runs the branch that is
checked out. Check with `git branch --show-current`, switch with
`git checkout <branch>`, then run `npm run dev` again if the page doesn't
update.

**The live site is blank.** Usually the Pages source is not set to GitHub
Actions, or the repository is private. Check the Pages settings, and check
that the workflow run succeeded.

**The page or a link shows a 404.** The site uses hash routes such as
`/#/about`. Links must include the `#`. Direct links to other paths
redirect to the home page.

**Images are missing.** Check the file name and case. Service photos must
be named `<form-key>_photo.<ext>`, and imports must use the exact file
name. Run `npm run build` to see missing imports as errors.

**The site says it needs Supabase.** Live mode is on but the keys are
missing. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in
`client/.env`, and restart the dev server.

**Changes to `.env` have no effect.** Vite reads `.env` at startup. Stop
and restart `npm run dev`.

**"This account is not an admin."** The user is signed in but not in the
`admins` table. Add their UID with the SQL in
[Creating an admin](#creating-an-admin).

**The services list does not update.** Live mode reads `services` from
Supabase. Re-run `supabase/seed.sql`, or update the rows, then reload the
page.

**Build fails with a module or path error.** Run `npm install` in
`client/`, then `npm run build` again.

### Known limitations and planned work

- The `guestbook` and `portfolio_items` tables exist but are not used by
  any page.
- The static service list and the database must be kept in sync by hand.
- Several service photos are large (3–5 MB). Resizing them would speed up
  the pages.

### Documentation

| Document | Purpose |
| --- | --- |
| [docs/](docs/README.md) | Course documents and weekly reports |
| [docs/02-mockup.md](docs/02-mockup.md) | Mockups of the Home, About, Services, and Contact pages |
| [AI-USAGE.md](AI-USAGE.md) | Record of AI assistance |
| [SECURITY-CHECKLIST.md](SECURITY-CHECKLIST.md) | Security review |

## License

Released under the [MIT License](LICENSE).
