# Datum Details — Site Brief

This document is the primary reference for building the new Datum Details website. Read this first, then read `CLAUDE.md` for instructions on how to proceed.

---

## Project overview

Datum Details is a home stewardship and maintenance service in Calgary, Alberta, operated by Datum Homes (a custom home builder). The new site lives at `datumdetails.com`, hosted on Netlify, DNS through Cloudflare. It is fully independent from datumhomes.com.

The site is a static site — no framework required, though the old V1 used React/Vite/TypeScript. We may keep that stack or simplify to plain HTML/CSS/JS. See `CLAUDE.md` for the decision on stack.

---

## Brand

### Voice and tone

- Direct, confident, no fluff
- Built-world credibility — these are builders, not marketers
- The positioning is: we are construction professionals applying that expertise to home maintenance. Not handymen. Not a concierge app. A serious, systemized service.
- Copy tone: short sentences. Declarative. Occasional italics for emphasis. Never salesy.

### Typography

**Font: Figtree (Google Fonts) — used for everything.**

```css
@import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
```

- Display/hero headlines: Figtree 300 (light weight), large, tight tracking
- Italic emphasis in headlines: Figtree 300 italic
- Section headlines: Figtree 400 or 500
- Body copy: Figtree 400, comfortable line-height (~1.7)
- Buttons/labels: Figtree 500, all caps, wide letter-spacing (0.12em)
- Cards/captions: Figtree 400, smaller size

### Color palette

```css
--color-black:    #1a1a1a;   /* near-black, primary dark bg */
--color-charcoal: #3a3a38;   /* dark charcoal, secondary dark bg */
--color-forest:   #4a5548;   /* dark muted green, accent bg */
--color-sage:     #8fa882;   /* sage green, accent/highlight color */
--color-cream:    #f4f3ef;   /* off-white, light bg and primary text on dark */
--color-white:    #ffffff;   /* pure white, form backgrounds */
```

Usage pattern:
- Most sections: `--color-black` or `--color-charcoal` background, `--color-cream` text
- Light sections: `--color-cream` background, `--color-black` text
- Accent: `--color-sage` for highlights, hover states, italic callouts, icon tints
- Buttons: ghost style — transparent bg, 1px solid border, all-caps text. On dark bg: white border + white text. On light bg: dark border + dark text.

### Buttons

```css
/* Ghost button — dark background context */
.btn {
  display: inline-block;
  padding: 12px 28px;
  border: 1px solid var(--color-cream);
  color: var(--color-cream);
  font-family: 'Figtree', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  transition: background 0.2s, color 0.2s;
}
.btn:hover {
  background: var(--color-cream);
  color: var(--color-black);
}

/* Ghost button — light background context */
.btn-dark {
  border-color: var(--color-black);
  color: var(--color-black);
}
.btn-dark:hover {
  background: var(--color-black);
  color: var(--color-cream);
}
```

---

## Navigation

Simplified nav — no Datum Homes links. Pages are standalone.

```
HOME  |  SERVICES  |  ABOUT  |  CONTACT
```

- Logo: left-aligned (use `DetailsSimpleLogoOffWhite (1) (1).png` on dark backgrounds, `DetailsSimpleLogoDarkGrey (1).png` on light)
- Nav links: right-aligned, all caps, Figtree 400, small size, widely spaced
- Mobile: hamburger menu
- Contact info in nav (desktop only): `(587) 843-6101` | `admin@datumdetails.com`

---

## Pages

### 1. Home (`index.html`)

#### Section 1 — Hero (dark bg: `--color-black`)
- Headline: `Home Maintenance`
- Italic second line: `as it should be.`
- Subhead: `Founded by builders. Built for homeowners.`
- Body: `We handle the repairs, the projects, and the regular upkeep.`
- Secondary body: `One Call, One Cost.`
- Supporting: `We apply construction expertise to your daily home life. No guessing contractors. No guessing at costs. Just results.`
- CTA: `CALL US TODAY` (links to `/contact`)

#### Section 2 — Problem (dark bg, image + text, 50/50 split)
- Left: photography (see image list — interior/living space shot)
- Right:
  - Headline: `The gamble of home repair.`
  - Body: `Something breaks. A noise in the furnace. A leak in the roof. Where do you turn? Google ads? Random apps? A stranger from a Facebook group?`
  - `You have no way to verify quality. You hope they show up. You pray the price is fair. It's not management.`
  - `It's a roll of the dice.`

#### Section 3 — Value props (dark bg: `--color-charcoal`)
- Headline: `Stop guessing. Start knowing.`
- Subhead: `We replace the gamble with certainty.`
- 2x2 card grid, each card has a small icon from `/Assets/Icons/`:
  - **We know the trades.** — We don't search for help. We bring the same vetted partners we've built with for a decade. (icon: `Hands.png`)
  - **We know the cost.** — We audit every quote to ensure the scope is necessary and the price is real. (icon: `Money Sign.png`)
  - **We show the receipts.** — Open-book billing. You see the vendor invoices. You see our rate. No secrets. (icon: `Reciept.png`)
  - **We own the result.** — One contact. Built on trust. The same people, the same standards, every time. (icon: `Build.png`)
- CTA: `CONTACT US TODAY`

#### Section 4 — Process (light bg: `--color-cream`)
- Headline: `How we take control.`
- 3 horizontal cards:
  - **1. The Baseline.** — We catalogue the entire home inside and out. From small appliances to real risks, we document everything and establish a clear starting point.
  - **2. The Fix.** — We prioritize what matters most. You approve the plan. We fix what's necessary; we start immediately.
  - **3. The Support.** — Essential visits to keep systems running. Direct access for anything that breaks. We are the first and last call you need to make.
- Callout paragraph (centered, below cards): `Stop managing. Start living. Your home needs a steward. Your schedule needs a break. One assessment changes everything.`
- CTA: `CALL US TODAY`

#### Section 5 — Differentiator (light bg, text left + image right)
- Headline: `Construction science, applied to maintenance.`
- Body: `Others patch symptoms. We solve root causes. We treat the home as a system, not a series of one-off problems.`
- Bold callout: `Handymen guess. We diagnose.`
- Closing: `We don't just repair what broke. We fix what caused it, so it doesn't happen again.`
- Image: trades/construction photo from HQ images

#### Section 6 — Cost of inaction (dark bg)
- Headline: `The Cost of Doing Nothing.`
- Body: `Doing nothing doesn't mean spending nothing. It means paying later, under pressure, at emergency rates.`
- Chart: render this as a simple SVG or Canvas area chart inline — two areas, one labeled "Reactive (no plan)" in a muted red/coral, one "Stewardship" in sage green. X axis = time, Y axis = cumulative cost. Reactive curve starts low and spikes sharply; Stewardship is a smooth, lower line.
- Italic callout: `You can manage the chaos. Or you can eliminate it.`

#### Section 7 — Vision (dark bg, image left + text right)
- Image: well-lit interior/living room from HQ photos
- Headline: `A home that takes care of you.`
- Body: `Imagine a home that simply works. No nagging to-do list. No unanswered calls. No silence of systems running perfectly. We handle the noise. You enjoy the sanctuary.`

#### Section 8 — Testimonials (light bg)
- Headline: `Unhappy homeowners move on.`
- Italic line: `Satisfied ones stay.`
- Subhead: `We don't ask for trust. We earn it through transparency, speed, and results.`
- 3 testimonial cards:
  - "I didn't realize how much comfort level I was carrying around until Datum took it. Just them, and it's handled." — James & Sarah T., Altadore Area
  - "The transparency is something I wasn't used to. It was refreshing. No 'having a partner', not just accountable." — Michael K., Prescon Fellow
  - "Finally, someone who understands that my time is valuable. I stopped spending Saturday solving things I shouldn't." — Diana K., University Park

#### Section 9 — Final CTA (dark bg, full-bleed image background)
- Image: atmospheric HQ photo as bg with dark overlay
- Headline: `Ready for effortless homeownership?`
- Body: `Stop waiting on hold. You have access to a team that treats your home with the reverence it deserves.`
- CTA: `CONTACT US TODAY`

---

### 2. Services (`services.html`)

#### Section 1 — Hero (dark bg)
- Headline: `Open Books. Flat Rates.`
- Subhead: `Maintenance without the markup games.`
- Body: `Most contractors hide their profit in the material costs or trip charges. We don't. We charge a flat monthly retainer for stewardship. We charge a simple hourly rate for repairs. You see the receipts.`
- Callout: `Simple. Honest. Fair.`
- CTA: `CALL US TODAY`

#### Section 2 — How we bill (dark bg: `--color-charcoal`)
- Headline: `How we bill.`
- Subhead: `We believe in low barriers and high transparency. You join as a member; you pay for what you use.`
- 3 cards (horizontal):
  - **1. The Retainer** — Guaranteed Stewardship / Includes your 4 quarterly health checks (labor included) / Priority "Direct Dial" access / No minimum trip charges.
  - **2. The Member Rate** — On-Demand Service / For repairs, honey-do lists, and tasks outside the quarterly checklist / Exclusive rate for members only.
  - **3. The Materials. Cost + Management** — Zero Secrets / You see the receipt. We add a transparent fee to cover sourcing, vetting, and warranty / No hidden padding.

#### Section 3 — Quarterly Stewardship (dark bg: `--color-black`)
- Headline: `Quarterly Stewardship.`
- Subhead: `Maintenance without the markup games.`
- Intro: `Included in your retainer. Every season, we dedicate 3 hours to the "Big 4": Air, Water, Safety, and Envelope. We catch the small issues before they become expensive disasters.`
- 4 seasonal columns (use icons from `/Assets/Icons/` — `Air.png`, `Water.png`, `Safety.png`, `Envelope.png`):
  - **Spring: Thaw & Flow** — Test sump pumps and de-winterize hose bibs / Inspect roof, gutters, and grading for winter damage
  - **Summer: Cool & Dry** — Check A/C condensers and change filters / Clear dryer vents and lubricate windows/doors
  - **Fall: Freeze Prep** — Winterize hose bibs to prevent burst pipes / Test fire the furnace and check attic seals
  - **Winter: Interior Health** — Test smoke/CO detectors and scan electrical panels / Manage humidity to prevent window condensation
- CTA: `CONTACT US TODAY`
- Fine print: `Labor included. Materials billed separately.`

#### Section 4 — Frictionless Payments (dark bg, text left + images right)
- Headline: `Frictionless payments.`
- Subhead: `We don't chase. We work.`
- Body: `You shouldn't have to manage a dozen invoices for a dozen lightbulbs. We streamline the financial side so you can ignore it.`
- Bold: `Consolidated Billing.`
- Continuation: `We work from a pre-paid deposit or a secure card on file. We send you a detailed statement showing exactly what was done and what was spent. You stay in control; we handle the administration.`
- Images: 2 photos from HQ images (trades/materials context)

#### Section 5 — CTA (dark bg, image left)
- Image: tradesperson working — from HQ images
- Headline: `Your home deserves a steward.`
- Subhead: `And you deserve a break.`
- CTA: `CALL US TODAY`

---

### 3. Contact (`contact.html`)

#### Section 1 — Hero (dark bg: `--color-black`)
- Headline: `Contact Us &`
- Line 2: `Book Your Assessment`

#### Section 2 — Phone (dark bg: `--color-charcoal`)
- Headline: `Call Us Today`
- Large display: `(587) 843-6101`

#### Section 3 — Form (light bg: `--color-white`)
- Headline: `Book Your Assessment`
- Form fields:
  - First name * (text input)
  - Last name * (text input)
  - Email * (email input)
  - Phone (tel input)
  - How can we help you? * (select: "Home Assessment", "Repair / Service Call", "Membership Inquiry", "Other")
  - Tell us a bit about why you are reaching out (textarea)
  - Preferred Contact Method * (select: "Phone", "Email", "Either")
  - Submit button: `BOOK MY ASSESSMENT`
- Form submits to Cloudflare Worker endpoint (see `BACKEND_BRIEF.md`)

#### Section 4 — Map
- Embed a Google Maps iframe or a simple static map image centered on Calgary, AB
- Dark/greyscale map style preferred

---

### 4. About (`about.html`)

This page does not exist yet in the Wix version — build a placeholder with:
- Hero: `Built by builders.`
- Short paragraph about Datum Homes' background and how Datum Details came from it
- Placeholder section for team/staff (to be filled in later)
- CTA to contact

---

## Asset reference

### Logos

| File | Use |
|------|-----|
| `DetailsSimpleLogoOffWhite (1) (1).png` | Nav + anywhere on dark bg |
| `DetailsSimpleLogoDarkGrey (1).png` | Anywhere on light bg |
| `DatumDetailsLogo.png` | Full lockup, footer |
| `DetailsSimpleLogoSageTextLogo.png` | Accent use, dark bg variant |
| `DetailsSimpleLogoOliveGreyTextLogo (2).png` | Alternative on dark bg |

### Icons (from `/Assets/Icons/`)

Named icons with clear mapping:
- `Air.png` — seasonal/air category
- `Water.png` — seasonal/water category
- `Safety.png` — seasonal/safety category
- `Envelope.png` — seasonal/envelope (building exterior) category
- `Hands.png` — "We know the trades" value prop
- `Money Sign.png` — "We know the cost" value prop
- `Reciept.png` — "We show the receipts" value prop
- `Build.png` — "We own the result" value prop
- `Fix.png` — repair/service context
- `Manage.png` — stewardship context
- `Construction Hat.png` — general trades context

The `Screen Shot 2025-12-03 at...` files in Icons are likely icon exports from a design tool. Check them visually and use if they match one of the categories above.

### HQ Photos (`/Assets/hq images/`)

16 photos total. Assign contextually — Claude Code should inspect the filenames and use judgment, but suggested assignments:

- Interior/living spaces: hero backgrounds, "A home that takes care of you" section
- Trades/construction/work photos: "Construction science" section, Services CTA
- Materials/products: Frictionless Payments section

HEIC files may need conversion to JPG/WebP for web use. See `CLAUDE.md` for the conversion step.

---

## Contact info

| Field | Value |
|-------|-------|
| Phone | (587) 843-6101 |
| Email (display) | admin@datumdetails.com |
| Email (form submissions go to) | admin@datumdetails.com |
| Location | Calgary, AB |
| Social: Instagram | link TBD |
| Social: Facebook | link TBD |

---

## Footer (all pages)

```
Left:    "Let's Work Together"
         Get in touch so we can start working together.
         [CONTACT] button

Right:   (587) 843-6101  |  admin@datumdetails.com
         Calgary, AB
         Instagram icon  Facebook icon

Bottom:  © 2025 Datum Details
```
