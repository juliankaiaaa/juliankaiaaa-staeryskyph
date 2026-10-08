# Database setup

How this project's Supabase backend is set up — kept here for reference and
for grading, not as an invitation to connect a separate copy, since this is
a personal portfolio project, not a template meant to be redeployed by
others.

1. Created a project at [supabase.com](https://supabase.com).
2. In the SQL Editor, ran `supabase/schema.sql`, then `supabase/seed.sql`.
3. Copied the URL and the anon key into `client/.env` (`VITE_SUPABASE_URL`,
   `VITE_SUPABASE_ANON_KEY`).

## Tables

| Table | Used by the site | Notes |
| --- | --- | --- |
| `services` | Yes | Services shown on the site, ordered by `sort_order`. |
| `inquiries` | Yes | Requests from the form. Readable and editable by admins only. |
| `admins` | Yes | User IDs allowed to manage inquiries. |
| `guestbook` | No | Defined in the schema. No page uses it yet. |
| `portfolio_items` | No | Defined in the schema. No page uses it yet. |

`schema.sql` can be run more than once. `seed.sql` clears and re-inserts the
services, so it can be re-run to reset them.

## Creating an admin

How to add an admin account, if a new one is ever needed:

1. In Supabase, open **Authentication > Users > Add user**, enter an email
   and password, and tick **Auto Confirm User**.
2. Copy the user's UID.
3. In the SQL Editor, run:

   ```sql
   insert into admins (user_id) values ('the-uid-here');
   ```

4. Sign in at `/#/admin`. The page is not linked from the site.
