# Design system

This describes the design system as actually built. The real tokens are in
`client/src/styles/base.css` and `system.css`. The original submitted
proposal (m8a1) is kept at the bottom, under "As originally proposed," since
the built site moved in a different direction from that plan.

## 1. Color palette

| Color | Token | Hex | Purpose |
| --- | --- | --- | --- |
| Brown | `--brown` | `#3e2723` | Text, dark sections (`.band--brown`), the default button background |
| Pink | `--pink` | `#f4c9d6` | Hero panel, About and footer surfaces |
| Cream | `--cream` | `#f4f1e2` | Paper surfaces, cards, button text on brown |
| Sage | `--sage` | `#d7d4b1` | Service card and tag accent |
| Sky | `--sky` | `#d8ebf9` | Service card and tag accent |
| Mustard | `--mustard` | `#fce6b7` | Service card and tag accent |
| Sage soft | `--sage-soft` | `#d6e0bf` | Service card and tag accent |
| Lavender | `--lavender` | `#e3dcf1` | Service card and tag accent |
| Peach | `--peach` | `#fbd9c3` | Service card and tag accent |
| Dusty blue | `--dusty-blue` | `#c3d5e6` | Service card and tag accent |
| Butter | `--butter` | `#fbeaa8` | Service card and tag accent |
| Red | `--red` | `#b5443a` | Error and validation text |

The request form and admin dashboard use a second, paper-themed palette
defined in `system.css` (`--paper-ink`, `--paper-cream`, `--paper-pink`,
`--paper-blue`, `--paper-sage`, etc.) instead of the core tokens above, to
read like a printed form rather than a website panel.

## 2. Typography

| Token | Size | Use |
| --- | --- | --- |
| `--fs-display` | `clamp(36px, 8vw, 112px)` | The hero's "Staery Sky PH" title |
| `--fs-page-title` | `clamp(32px, 6vw, 72px)` | Page-level headings on inner pages |
| `--fs-h2` | `clamp(24px, 3vw, 42px)` (overridden to `clamp(26px, 3.2vw, 44px)` in `system.css`) | Section headings (`main h2`) |
| `--fs-h3` | `clamp(17px, 1.5vw, 22px)` | Card and sub-section headings |
| `--fs-subtitle` | `clamp(13px, 1.9vw, 26px)` | Hero subtitle line |
| `--fs-body` | `clamp(15px, 1.05vw, 16px)` | Paragraph text |
| `--fs-nav` | `clamp(12px, 1vw, 15px)` | Navbar links |
| `--fs-label`, `--fs-small`, `--fs-eyebrow` | 12–16px range | Form labels, fine print, section kickers |

Every size is fluid (`clamp()`), not fixed, so text scales with the
viewport instead of jumping between fixed breakpoints.

**Fonts:** Poppins (weights 400–700) for all interface text, and Caveat
(weights 500–600), a handwritten-style font, for a small number of
decorative accents. Both are loaded from Google Fonts in `base.css`.
Neither font is a serif. There's no Playfair Display or Inter anywhere in
the project.

## 3. Buttons

| Button | Background | Text | Shape | Used for |
| --- | --- | --- | --- | --- |
| `.btn` (the one shared button) | Brown (`--brown`), darkens on hover | Cream (`--cream`) | Pill (`--radius-pill`) | Every primary action site-wide, like "Learn more," "View services," and nav CTAs |
| `.inquiry-send` (request form) | Paper pink (`--paper-pink`) | Paper ink (`--paper-ink`) | Rounded rectangle | Submitting the request form |
| `.inquiry-cancel` (request form) | Paper cream (`--paper-cream`) | Paper ink (`--paper-ink`) | Rounded rectangle | Cancelling the request form |
| `.receipt-btn` | Paper cream | Paper ink | Pill | Links on the post-submission receipt |

There's one shared site-wide button style, not separate primary / secondary
/ outline / text-link variants. The request form is the one place with a
distinct two-button (send / cancel) pattern, styled to match its paper
theme rather than the main `.btn`.

## 4. Components (as built)

| Component | File | Used on |
| --- | --- | --- |
| Navbar | `components/Navbar.jsx` | Every page |
| Hero | `components/Hero.jsx` | Home (full) and every inner page (smaller `variant="page"`) |
| AboutImage / AboutSection | `components/AboutImage.jsx`, `AboutSection.jsx` | Home and About |
| ServiceCard / ServiceCarousel | `components/ServiceCard.jsx`, `ServiceCarousel.jsx` | Home (carousel) and Services (grid) |
| InquiryForm | `components/InquiryForm.jsx` | Request |
| Receipt | inline in `pages/Request.jsx` | Request, after a successful submission |
| AdminLogin / AdminInquiries | `components/AdminLogin.jsx`, `AdminInquiries.jsx` | Admin (`/#/admin`) |
| IdlePopup | `components/IdlePopup.jsx` | Shown site-wide after 10 minutes idle |
| Decor | `components/Decor.jsx` | Hero and request-page stars |
| SiteFooter | `components/SiteFooter.jsx` | Every page |

This is a larger set than originally planned. The receipt, admin
dashboard, idle popup, and decorative stars weren't part of the original
proposal.

## 5. Form fields

| Field | Style |
| --- | --- |
| Text / email / textarea | `--paper-cream-light` background, 1.5px `--paper-border`, `--r-field` (10px) corners, `--paper-ink` text |
| Focus | Border turns `--paper-ink`, background turns white, a soft pink glow (`box-shadow: 0 0 0 3px rgba(236, 184, 198, 0.6)`) |
| Label | Small, 500–600 weight, `--paper-ink` |
| Error | Red text (`--red`), shown under the field, only after it's been touched |

## 6. Component states (as built)

| State | Appearance |
| --- | --- |
| Default | Resting shadow (`--shadow-soft`) |
| Hover (cards) | Lifts and scales slightly (`translateY(-6px) scale(1.02)`), shadow deepens to `--shadow-lift`, photo zooms to 1.06x |
| Hover (buttons) | Background darkens, slight upward shift |
| Active (buttons) | Shadow flattens, shifts back down |
| Focus (fields) | Pink glow outline, described above. Never removed without a replacement |
| Disabled (submit button) | Dims to 60% opacity and the cursor changes to default, while the form is submitting or already sent |
| Reduced motion | Every hover/scroll/star animation above is turned off when the visitor's system requests reduced motion |

## 7. Design application by page

| Page | Main components |
| --- | --- |
| Home | Navbar, Hero, AboutImage/AboutSection, ServiceCarousel, SiteFooter |
| About | Navbar, Hero (page variant), AboutImage/AboutSection, mission/vision cards, "Why choose us" cards, envelope call to action, SiteFooter |
| Services | Navbar, Hero (page variant), ServiceCard grid, "How it works" steps, envelope call to action, SiteFooter |
| Request | Navbar, Hero (page variant), InquiryForm, receipt (after submit), SiteFooter |
| Admin (`/#/admin`, not linked from the nav) | AdminLogin, AdminInquiries (filter, search, notes, CSV export) |

## 8. Responsive design

- Breakpoints are set in `styles/responsive.css`: 1100px, 1000px, 900px,
  700px, and 600px.
- Layouts are grids that collapse to one column on smaller screens.
- The service grid is four columns on desktop, two on tablet, one on
  mobile.
- No horizontal overflow on any page from 320px to 1440px wide.

## 9. Animation

- **Scroll reveal:** elements fade in as they enter the viewport and reset
  when they leave, so scrolling back replays them (`useScrollReveal.js`).
- **Hero stars:** drift and blink; three vanish and reappear as they move.
- **Hover:** cards lift and their photos zoom slightly; buttons and nav
  items shift color or position.
- **Reduced motion:** all of the above turn off when the visitor's system
  requests reduced motion.

## As originally proposed

The original m8a1 submission specified a different palette and type scale,
reproduced here for the record:

| Color | Hex code | Purpose |
| --- | --- | --- |
| Espresso Brown | `#3B2824` | Primary color |
| Peony Pink | `#F3C5D4` | Accent color |
| Taupe | `#C9AFAE` | Muted color |
| Cream | `#FAF6F0` | Main background |
| Warm White | `#FFFFFF` | Surface color |
| Dark Ink | `#241712` | Main text |
| Soft Brown Gray | `#6B5C55` | Secondary text |

| Text style | Font | Font size |
| --- | --- | --- |
| H1 | Playfair Display | 128px |
| H2 | Playfair Display | 80–96px |
| H3 | Inter Bold | 64px |
| Body text | Inter Regular | 20–32px |
| Small text | Inter Regular | 14–20px |
| Button text | Inter Semi-Bold | 24–32px |

It also specified four button types (primary, secondary, outline, text
link) and a "Contact Us" nav label, where the build settled on one shared
button style and renamed that link to "Connect." The full original
proposal, including the component and page-application tables, is
preserved in this file's git history (the version before this rewrite).
