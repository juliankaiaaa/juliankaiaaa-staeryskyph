# Staery Sky PH Portfolio Website

> A portfolio and business website for Staery Sky PH, created to showcase its services and information for K-POP fans.

**Live site:**
**API:** 
**Demo video:** 

> **This deployment is currently running in demo mode.** The interface is real; the backend API is still under development, so the website currently uses a mock API in the browser.

## What it does

* Showcases Staery Sky PH and its services
* Provides information about the shop
* Displays featured services
* Provides information about Korea, Japan, and Thailand pasabuy services
* Provides navigation between website sections
* Includes a Connect/Footer section
* Uses a Figma-based design with custom visual assets

## Screenshot

![Staery Sky PH Week 2 Progress](docs/week2-progress.png)

## Built with

React and Vite are used on the front end. An Express and PostgreSQL back end is currently being developed but is not yet connected to the website.

The frontend is intended to be deployed on GitHub Pages, while the API and database will be hosted separately once the backend is completed.

## Demo mode

This repository currently runs using a mock API while the actual API is still being developed.

| `VITE_USE_MOCK_API` | What happens                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| unset, or `true`    | The client uses the mock API for development. No working backend or database is required.        |
| `false`             | The client is intended to call the Express API at `VITE_API_BASE_URL` once the API is available. |

Demo mode allows the website interface to be developed and tested before the actual API is completed.

GitHub Pages can serve the frontend files, but it cannot run the Express server. The API and PostgreSQL database will therefore be hosted separately once they are ready.

| Piece        | Current status                                  |
| ------------ | ----------------------------------------------- |
| **Frontend** | React/Vite, being deployed through GitHub Pages |
| **API**      | Not yet available; currently under development  |
| **Database** | PostgreSQL structure is being developed         |

## Running it yourself

**The client only, in demo mode.** No working API or database is needed.

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

**The backend.** The backend is currently under development and is not yet connected to the frontend.

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The planned local API address is:

```text
http://localhost:3000
```

## Environment variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name                  | Where                 | What it is                                      |
| --------------------- | --------------------- | ----------------------------------------------- |
| `DATABASE_URL`        | server                | PostgreSQL connection string                    |
| `CORS_ORIGINS`        | server                | Comma-separated origins allowed to call the API |
| `NODE_ENV`            | server                | Server environment                              |
| `BASIC_AUTH_USER`     | server                | Username for API authentication                 |
| `BASIC_AUTH_PASSWORD` | server                | Password for API authentication                 |
| `VITE_USE_MOCK_API`   | client, at build time | Controls whether demo mode is used              |
| `VITE_API_BASE_URL`   | client, at build time | URL of the future API                           |

Every `VITE_` value is compiled into the built JavaScript and is **public**. Never put a key, password, or database connection string in one.

## Deploying

**Client, to GitHub Pages.** The project is already wired up in `.github/workflows/deploy-pages.yml`.

One setup step is required:

1. **Settings > Pages > Build and deployment > Source: GitHub Actions.**

The frontend can currently be deployed using demo mode because the mock API does not require a working server.

When the API is completed and hosted:

1. Set `VITE_USE_MOCK_API` to `false`.
2. Set `VITE_API_BASE_URL` to the public API URL.
3. Re-run the GitHub Actions workflow.

**API and database.** The API and PostgreSQL database are not yet deployed. They will be hosted separately from GitHub Pages once backend development is completed.

## Project structure

```text
client/          React front end, built by Vite
  src/
    api/          mock API and future HTTP API
    assets/       website images and visual assets
    components/   reusable React components
    App.jsx       main website component
    main.jsx      React entry point
    styles.css    website styling

server/          Express backend, currently under development
  db/            PostgreSQL database files
  server.js      Express server

.github/
  workflows/
    deploy-pages.yml    GitHub Pages deployment workflow

docs/             planning documents, weekly reports, and screenshots
compose.yml       local database and backend configuration
```

## Architecture

The project is planned as three connected parts:

```text
React / Vite Frontend
        ↓
    Express API
        ↓
    PostgreSQL
```

The React/Vite frontend provides the website interface and is deployed through GitHub Pages. The Express API and PostgreSQL database will be hosted separately once they are completed.

For now, the frontend uses a mock API while the actual API is still being developed.

## What I would do next

* Complete the remaining website pages and refine the current design to match the Figma mockup.
* Develop and connect the Express API and PostgreSQL database.
* Complete responsive testing, functionality testing, and final deployment.

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
