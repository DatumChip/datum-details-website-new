# Datum Details — Website

Marketing website for **Datum Details**, a Calgary home-stewardship service (part of the Datum group). Deployed to Netlify and served at **datumdetails.com**, with DNS via Cloudflare.

The site is a lean, **static, no-build site** — plain HTML, CSS, and vanilla JavaScript. There is no framework and no build step; the files in this repo root are exactly what ships.

## Structure

```
.
├── index.html                  # Home
├── services.html               # Services & pricing
├── about.html                  # About
├── contact.html                # Contact + booking form
├── 404.html                    # Branded not-found page
├── guides/                     # SEO content hub
│   ├── index.html              # Guides landing
│   └── summer-home-maintenance-calgary.html
├── css/styles.css
├── js/
│   ├── main.js                 # Nav, mobile menu, scroll fade-ins
│   └── contact.js              # Contact form → Cloudflare Worker
├── assets/                     # images, icons, logos, favicon, og-image
├── cloudflare-worker/
│   └── contact-worker.js       # Serverless form handler (deploy separately)
├── robots.txt · sitemap.xml · site.webmanifest
├── _redirects                  # Netlify redirects
├── netlify.toml                # Netlify config (publishes the repo root)
│
├── make_assets.py              # Regenerates the favicon set + OG image (Pillow)
└── *_BRIEF.md, CLAUDE.md       # Project briefs / build notes (not served on the live site)
```

## Local preview

No build needed. Serve the repo root over HTTP:

```bash
python -m http.server 8000
# → http://localhost:8000
```

(Use a server rather than opening files directly so the `guides/` subfolder and
relative paths resolve correctly.)

## Deployment (Netlify)

- Connect this repo to Netlify. **No build command, no base directory.** The
  root `netlify.toml` sets `publish = "."`, so the site root is served directly.
- Point `datumdetails.com` DNS at Netlify (via Cloudflare).

Reference/dev files (`CLAUDE.md`, the `*_BRIEF.md` files, `make_assets.py`, and
`cloudflare-worker/`) stay in the repo but are 404'd on the live site via
`_redirects`.

## Configuration TODOs (search the codebase for each)

| Placeholder | File | What it needs |
|---|---|---|
| `REPLACE_WITH_CLOUDFLARE_WORKER_URL` | `js/contact.js` | URL of the deployed contact Worker |
| `REPLACE_WITH_CLOUDFLARE_ANALYTICS_TOKEN` | all HTML pages | Cloudflare Web Analytics beacon token |

The contact Worker (`cloudflare-worker/contact-worker.js`) also needs a **Resend
API key** and a bound **KV namespace** when deployed — see `BACKEND_BRIEF.md`.

## Regenerating assets

The favicon set and the Open Graph share image are generated from the logo and a
hero photo:

```bash
python make_assets.py    # requires: pip install pillow pillow-heif
```
