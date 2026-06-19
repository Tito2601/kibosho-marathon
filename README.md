# Kibosho Marathon

Static marketing & registration funnel for the **Kibosho Marathon** — a road race on the green southern slopes of Mount Kilimanjaro, Tanzania.

Built by **Angatech** as a statically-exported **Next.js 15 + TypeScript + Tailwind CSS** site, ported faithfully from the approved prototype (`.claude/kibosho-marathon-v2.html`).

> **This phase ships a static demo.** Forms (newsletter, register, view package) are stubs the client will wire to real endpoints later. No database, auth, or API yet.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) with `output: 'export'` |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variables for the brand palette |
| Fonts | Anton / Inter / Space Mono, self-hosted via `next/font/google` |
| Motion | CSS + IntersectionObserver (reduced-motion safe) |
| Icons / art | Inline SVG (zero dependencies) |
| Hosting | Cloudflare Pages (free, commercial-use OK) |

---

## Local setup

Prerequisites: **Node 18.18+ (or 20+)** and npm.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
npm run preview    # serve the exported ./out locally (npx serve)
npm run lint       # eslint
npm run og         # regenerate the placeholder OG image
```

`npm run build` runs `prebuild` first, which regenerates `public/og.png`.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx      # fonts, metadata, JSON-LD SportsEvent, <html>/<body>
│  ├─ page.tsx        # assembles all sections in order
│  ├─ globals.css     # design tokens + ported component styles
│  └─ icon.svg        # favicon (Kilimanjaro peak mark)
├─ components/
│  ├─ layout/         # AnnouncementBar, Navbar, Footer
│  ├─ sections/       # Hero, QuickFacts, RaceIntro, Countdown,
│  │                  #   Stories, Packages, Gallery, Sponsors, Newsletter
│  └─ ui/             # Button, Section, Eyebrow, Reveal, Medal,
│                     #   KilimanjaroScene, PeakLogo
├─ data/              # site, facts, packages, reviews  ← edit content here
├─ hooks/             # useCountdown, useReveal
└─ lib/               # format helpers
public/
├─ images/            # client drops real photos here
└─ og.png             # generated social card placeholder
scripts/
└─ generate-og.mjs    # builds public/og.png
```

**Edit content in `src/data/*`, not in JSX.** Server Components by default; only `Navbar`, `Countdown`, `Stories`, `Packages`, `Newsletter`, and `Reveal` are `'use client'`.

---

## Placeholders the client must supply

These are stubbed and clearly marked (`PLACEHOLDER`) in `src/data/site.ts` and elsewhere:

- **Race date** — currently `2026-08-01T06:00:00+03:00` (`site.raceDateISO`).
- **Package** prices / dates / inclusions (`src/data/packages.ts`).
- **Photos** — hero, gallery tiles, review panels (drop into `public/images/`, then swap the placeholder tiles for `<Image>`).
- **Sponsor logos** — 4 dashed slots in the Sponsors section.
- **Testimonials** — replace the placeholder quotes in `src/data/reviews.ts`.
- **Contact** — email, phone, Instagram + social URLs (`src/data/site.ts`).
- **Registration / mobile-money endpoint** — the stubbed CTAs (`Packages`, `Newsletter`) just `alert()`; wire them to real endpoints. Handlers are isolated so this is a one-file change each.
- **OG image** — `public/og.png` is a generated gradient placeholder; replace with a real photo-based 1200×630 card.

---

## Deploy (free) — Cloudflare Pages

The site is a static export (`./out`), so it hosts free anywhere. Cloudflare Pages is recommended (commercial use allowed, unlimited bandwidth).

**Option A — Git (auto-deploy on push):**
1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: **Next.js (Static HTML Export)**. Build command `npx next build`, output dir `out`.
4. Deploy → share the `https://kibosho-marathon.pages.dev` URL with the client.

**Option B — Direct upload (no GitHub):**
```bash
npm run build
npm i -g wrangler
wrangler pages deploy out --project-name kibosho-marathon
```

To gate the preview, put the site behind **Cloudflare Access** (Zero Trust, free) with an email-OTP policy.

> **Avoid Vercel's free Hobby tier for this** — its terms count paid consultant/client work as commercial (requires Pro). GitHub Pages and Netlify free tiers also work for a static demo.

When the client buys, point a custom domain (e.g. `kiboshomarathon.co.tz`) at Cloudflare Pages for free SSL.

---

## Quality notes

- Responsive 360px → desktop; sticky nav with mobile hamburger.
- Live, hydration-safe countdown (`--` placeholders on the server, ticks on the client).
- Auto-advancing, keyboard-accessible reviews carousel.
- `prefers-reduced-motion` disables the medal spin and reveals.
- Visible focus rings; semantic landmarks; JSON-LD `SportsEvent`; OpenGraph + Twitter metadata.
- `next build` produces `./out` with zero type/lint errors.

---

## Future phase (post-sale)

Registration + payments (Next API routes or NestJS + PostgreSQL), TRA/mobile-money integration, EN/SW i18n, a CMS for packages & gallery, results portal, and an admin dashboard. The typed `src/data` layer keeps these additive, not rewrites.

— Built on the slopes of Kilimanjaro by **Angatech**.
