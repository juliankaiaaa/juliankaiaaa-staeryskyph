# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

Claude (via Claude Code) was the main tool used for building and editing the
project, and is what the commit history and entries below reflect.

**Note on the timeline:** some AI-assisted changes were not committed and
pushed right away. I sometimes made changes and forgot to commit them
until later. Because of this, the git history doesn't perfectly line up
with when each change actually happened. The commit history is still a
real record of the work, just not always on the same day the work was
done.

## 1. How I used AI

### 2026-09-23 - GitHub Pages deployment setup

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help setting up the GitHub Actions deployment workflow correctly, including the action versions.
- **What it gave back:** A fix for the pinned SHA in `deploy-pages.yml` that was causing the workflow to fail.
- **What I kept, what I changed, and why:** I kept the fix because it solved the deployment problem.
- **Commit:** [6a4b5d8](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/6a4b5d8)

### 2026-10-05 - Frontend components and page structure

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help creating shared React components such as the Navbar, Hero, ServiceCard, and footer, instead of repeating the same code on every page.
- **What it gave back:** The shared components in `client/src/components/` and common color and spacing values.
- **What I kept, what I changed, and why:** I kept the component structure but changed some layouts and content as the design developed.
- **Commit:** [294c0e3](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/294c0e3)

### 2026-10-05 - Supabase backend setup

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help creating a backend for the request form and an admin page for managing submissions without having to run my own server.
- **What it gave back:** The Supabase schema in `supabase/schema.sql`, Row Level Security policies, and the admin sign-in and inquiry management page.
- **What I kept, what I changed, and why:** I kept Supabase because it could handle the backend without needing my own server. I also removed the earlier Express server because it was no longer needed.
- **Commit:** [4f5cfb8](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/4f5cfb8)

### 2026-10-05 - Service inquiry forms

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help creating a request form where the fields change depending on the selected service, with validation and a progress indicator.
- **What it gave back:** `InquiryForm.jsx` and the field definitions in `data/inquiryForms.js`.
- **What I kept, what I changed, and why:** I kept the basic structure but changed the wording, service list, order, and styling several times to match what I wanted.
- **Commit:** [bb7ecf7](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/bb7ecf7)

### 2026-10-05 - Service card design and ordering

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help with the size, spacing, and order of the service cards.
- **What it gave back:** Different versions of the card sizes and spacing, as well as the sorting using `sort_order`.
- **What I kept, what I changed, and why:** I rejected several versions before choosing the current card layout. I kept the final spacing and order because they matched the design I wanted.
- **Commit:** [63273a9](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/63273a9)

### 2026-10-05 - Animations and interaction

- **Tool:** Claude (Claude Code)
- **What I asked for:** Help adding a hero entrance animation, moving and blinking stars, and scroll animations for the content sections.
- **What it gave back:** The star animations and `hooks/useScrollReveal.js`.
- **What I kept, what I changed, and why:** I asked for several changes, such as adding more stars, making them move slower, and making them fully disappear when off-screen.
- **Commit:** [b6bb42a](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/b6bb42a)

## 2. Where the AI got it wrong

### Case 1 - Design ideas that did not work

- **What it gave me:** Several design attempts, including CSS-made hero symbols, creative decorations, and different spacing for the expanded service card.
- **What was wrong with it:** The designs did not match what I wanted after I saw them on the actual website. Some spacing changes also came back after I had already reverted them.
- **What I did instead:** I reverted the changes and asked for a different design.
- **Commit:** [e358b6f](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/e358b6f)

### Case 2 - CSS animation was not working

- **What it gave me:** Star animations that looked correct in the code but did not move in the browser.
- **What was wrong with it:** A later stylesheet, `motion.css`, had an `animation: none` rule that stopped the animations.
- **What I did instead:** I found and removed the conflicting rules, then checked the animations in the browser to make sure they worked.
- **Commit:** [bb6a10a](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/bb6a10a)

### Case 3 - Service card design needed revisions

- **What it gave me:** Different versions of the service card spacing and layout.
- **What was wrong with it:** Some versions did not match the look and spacing I wanted.
- **What I did instead:** I reviewed the versions, rejected the ones I did not like, and asked for changes until I was satisfied with the final layout.
- **Commit:** [46a715f](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/46a715f)

## 3. Who wrote what

Note: I handled the main ideas, the content, the design decisions, the
revisions, and the review and testing. AI assisted with implementation:
writing the actual code, troubleshooting bugs, and turning some of my
design ideas into working CSS and React. I also directly changed and
adjusted parts of the code based on what I saw while testing the website.

### What I handled

- **File:** Website content, overall design direction, service list and
  order, CSS adjustments, animation fixes, and every design revision
- **Commit:** Multiple commits throughout the project, including
  [bb6a10a](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/bb6a10a),
  [63273a9](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/63273a9),
  and [bb7ecf7](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/bb7ecf7)
- **What it does and why it is built this way:** I decided the website
  content, the services offered, the overall visual style, colors,
  layouts, and how each section should look. I also directly worked on
  changes to the CSS and service content, reviewed every AI-assisted
  implementation, tested the website in the browser, and decided what to
  keep, change, or reject.

### What AI helped implement

- **File:** `client/src/components/`, `supabase/schema.sql`,
  `data/inquiryForms.js`, and animation-related files
- **Commit:** [294c0e3](https://github.com/juliankaiaaa/juliankaiaaa-staeryskyph/commit/294c0e3)
- **What it does and why we kept it:** These parts organize the website into
  reusable components, handle the inquiry form, connect the project to
  Supabase, and add the website interactions and animations. I kept and changed the
  implementations based on how they worked in the actual website and
  whether they matched my design.
