# CLAUDE.md — Instructions for Claude Code

This file tells you what to do, in what order, and how to make decisions. Read `SITE_BRIEF.md` and `BACKEND_BRIEF.md` for the full content and backend spec.

---

## Your job

Build the new Datum Details website from scratch inside this project directory. The site will be deployed to Netlify and served at `datumdetails.com`.

---

## Step 1 — Assess the old V1 code

Read everything in `old-v1/`:
- `App.tsx` — overall page structure
- All files in `old-v1/components/` — understand what each component does
- `old-v1/package.json` — understand the stack (Vite + React + TypeScript)
- `old-v1/types.ts` — any shared types

Then give me a summary of:
- What the V1 site covered
- What's worth keeping or adapting
- What needs to be rebuilt from scratch

Do not start writing the new site until I've confirmed the stack decision below.

---

## Step 2 — Stack decision

Propose one of these two options and explain the tradeoff briefly:

**Option A: Keep the Vite + React + TypeScript stack from V1**
- Pros: component reuse, easier animation, familiar tooling
- Cons: slightly more complexity for a mostly-static site

**Option B: Plain HTML + CSS + vanilla JS (one file per page)**
- Pros: dead simple, zero build step, easiest for anyone to edit later
- Cons: less reuse, no component abstraction

Given that this is a small brochure site with 4 pages, I lean toward Option B unless the V1 components are so good they justify keeping the stack. Present your recommendation.

Wait for my decision before proceeding.

---

## Step 3 — Asset prep

Check the following and flag any issues:

1. **HEIC files** — These won't work in browsers: `Copy of IMG_1963.HEIC`, `Copy of IMG_5648.HEIC`, `Copy of IMG_9814.HEIC`. Convert them to JPG or WebP using a bash command (ImageMagick or `ffmpeg` if available). If neither is available, flag it so I can convert manually.

2. **Icons** — The `Screen Shot 2025-12-03 at...` files in `/Assets/Icons/` have unclear names. List them and make your best guess at what each one is based on visual inspection if possible, or flag them for me to review.

3. **Logos** — Confirm which logo files exist and note which variant to use in which context (per `SITE_BRIEF.md`).

---

## Step 4 — Project scaffold

Create the new site folder structure inside the project root (alongside `old-v1/`, not inside it):

```
datum-details/
├── index.html
├── services.html
├── contact.html
├── about.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── contact.js
├── assets/
│   ├── images/        (copy/reference HQ photos here)
│   ├── icons/         (copy icons here)
│   └── logos/         (copy logos here)
├── _redirects         (Netlify redirect rules)
└── netlify.toml       (Netlify config)
```

If we go with Option A (React/Vite), the structure will be different — propose it.

---

## Step 5 — Build the site

Build all four pages per the spec in `SITE_BRIEF.md`. Work page by page, starting with shared elements (nav, footer, CSS variables) before page-specific sections.

### Design guidance

- Dark-first. Most sections have `--color-black` or `--color-charcoal` backgrounds.
- Figtree font throughout. Import from Google Fonts.
- Ghost/outline buttons only. See button spec in `SITE_BRIEF.md`.
- Section padding: generous. Min 80px top/bottom on sections, 120px on hero sections.
- Max content width: 1200px, centered.
- Mobile responsive. Nav collapses to hamburger on mobile. Grids stack vertically.
- Smooth scroll between sections.
- Subtle fade-in animations on scroll (IntersectionObserver) — nothing flashy.

### Photography

Use the HQ photos from `/Assets/hq images/`. Make judgment calls about which photo fits which section based on content. If a section calls for a trades/work photo and you have one, use it. Prefer JPG/PNG over HEIC (see Step 3).

For full-bleed background images, apply a dark overlay:
```css
background-image: linear-gradient(rgba(26,26,26,0.65), rgba(26,26,26,0.65)), url('...');
background-size: cover;
background-position: center;
```

### The cost chart (Home page, Section 6)

Build this as an inline SVG or a small Canvas/Chart.js chart. Do not use an external charting library unless Chart.js is already in the project. Two areas:
- "Reactive (no plan)" — muted coral/red area, starts low and curves sharply upward
- "Stewardship" — sage green area, smooth steady low line
- X axis label: Time
- Y axis label: Cumulative Cost
- Minimal styling, consistent with dark brand aesthetic

---

## Step 6 — Contact form and backend

1. Build the contact form in `contact.html` per the spec in `SITE_BRIEF.md`
2. Wire it up with the JavaScript in `js/contact.js` per the spec in `BACKEND_BRIEF.md`
3. Leave a clear `TODO` comment in `contact.js` where the Worker URL needs to be inserted once deployed:
   ```javascript
   const WORKER_URL = 'REPLACE_WITH_CLOUDFLARE_WORKER_URL';
   ```
4. Generate the Cloudflare Worker script as a separate file: `cloudflare-worker/contact-worker.js`

The Worker script is already fully written in `BACKEND_BRIEF.md` — just write it to that file.

---

## Step 7 — Netlify config

Create `netlify.toml` at the root of the `datum-details/` folder:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}
```

And `_redirects`:
```
/datum-details  /  301
```

This handles the redirect from the old `datumhomes.com/datum-details` path.

---

## Decisions to make interactively

Do not make these decisions alone — ask me:

1. **Stack choice** (Step 2 above) — wait for my answer
2. **Any photo you're unsure about** — describe it and ask which section it should go in
3. **Social media links** — the site shows Instagram and Facebook icons in the footer; I don't have the URLs yet. Leave them as `href="#"` with a `TODO` comment.
4. **About page content** — the About page has no existing content from the Wix site. Build a placeholder and flag it for me to fill in.
5. **"How can we help you?" dropdown options** — the Wix form had a generic "Choose one" with no visible options. I've suggested some in `SITE_BRIEF.md`; confirm before using them or ask if you want to change them.

---

## Things to avoid

- Do not reference datumhomes.com anywhere in the new site (except possibly a subtle "Part of the Datum group" in the footer if it feels right — ask me)
- Do not use the old Wix nav structure (HOME | DATUM DETAILS | ABOUT | GALLERY | SERVICES | DESIGN | CONTACT | TESTIMONIALS)
- Do not use any font other than Figtree
- Do not add unnecessary dependencies — keep this lean
- Do not invent content — if something is unclear, flag it and use a placeholder

---

## When you're done

Tell me:
- What's complete
- What placeholders exist and where
- What still needs my input (social links, About content, Worker URL, etc.)
- What the local dev command is to preview the site
