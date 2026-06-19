# Kibosho Marathon — Website Build Blueprint

> **For:** Claude Code (autonomous build)
> **Author:** Angatech
> **Goal:** Port the approved static HTML prototype (`kibosho-marathon-v2.html`) into a production-grade, statically-exported **Next.js + TypeScript + Tailwind** marketing site, then deploy free for client preview.
> **Visual source of truth:** `kibosho-marathon-v2.html` (the prototype). Match its layout, palette, copy, and interactions exactly unless this document overrides it.

---

## 1. Understanding the problem

The Kibosho Marathon is a (new) road-running event on the green southern slopes of Mount Kilimanjaro, Tanzania. The site is a **single-page marketing & registration funnel** modelled on the Great Wall Marathon site (great-wall-marathon.com): a countdown-driven hero, an event pitch, a live countdown, runner reviews, **travel/tour packages** (international + local entry), a photo gallery, sponsors, and a newsletter capture.

Two audiences:
1. **International runners / running tourists** — buy a package (stay + transfers + entry + Kilimanjaro sightseeing).
2. **Local Tanzanian runners** — buy an entry-only place (mobile-money checkout).

**This phase ships a static demo** (no real backend). Forms are stubs the client will wire up later. The build must be clean enough to extend into a real registration/payment system afterwards.

---

## 2. Recommended stack & why

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** with `output: 'export'` | Matches Angatech's stack; static export hosts free anywhere (Cloudflare Pages / GitHub Pages) with no server cost. |
| Language | **TypeScript** | Type-safe content config and component props; fewer regressions. |
| Styling | **Tailwind CSS** + CSS variables for the brand palette | Fast, consistent, mobile-first; tokens centralise the green identity. |
| Fonts | **Anton** (display), **Inter** (body), **Space Mono** (data/labels) via `next/font/google` | Self-hosted at build time → no layout shift, no external font request. |
| Motion | **CSS + IntersectionObserver** (Framer Motion optional, only if needed) | Keep the bundle tiny; the prototype's reveals are simple. |
| Icons | Inline SVG (already in prototype) | Zero dependency, themeable via `currentColor`. |
| Hosting | **Cloudflare Pages** (free, commercial use OK, unlimited bandwidth) | See §11. |

> **Do not** add a database, auth, or API in this phase. Keep it static. Stubs only.

---

## 3. Design system (authoritative tokens)

Define these once and derive everything from them. Put the palette in `globals.css` as CSS variables **and** mirror in `tailwind.config.ts`.

### Colour — "green nature · Kilimanjaro · healthy"
```css
--ink:    #08231A;  /* deepest background            */
--forest: #0E3A2A;  /* dark section background       */
--moss:   #16533B;  /* mid-green panels / gradients   */
--vital:  #6FBF44;  /* healthy green accent / CTA     */
--lime:   #9BD96A;  /* soft lime for gradients        */
--snow:   #F2F7EF;  /* text + Kilimanjaro snow        */
--sky:    #CBE4DD;  /* misty mountain accent (sparing) */
--mist:   #94AC9E;  /* muted text / captions          */
--line:   rgba(148,172,158,.20); /* hairline borders  */
```

### Typography
- **Display:** Anton — uppercase, line-height ~0.94, used for H1/H2 and big numbers.
- **Body:** Inter — 400/500/600/700.
- **Data/labels:** Space Mono — 400/700, uppercase, letter-spacing 0.12–0.22em for eyebrows, stats, prices, countdown labels.

### Type scale (clamp, responsive)
- H1 hero: `clamp(44px, 8.6vw, 128px)`
- H2 section: `clamp(30px, 5vw, 60px)`
- Lead paragraph: `clamp(16px, 2vw, 19px)`
- Eyebrow: 12px / 0.22em / uppercase / `--vital`

### Signature elements
- **Layered SVG Kilimanjaro hero** (snow-capped peak + green slopes + radial glow). No raster hero needed.
- **Spinning finisher-medal SVG** with a circular `textPath` ring ("KIBOSHO MARATHON · KILIMANJARO · 2026"). Disable spin under `prefers-reduced-motion`.
- **Live countdown** to race day.

### Quality floor (non-negotiable)
Responsive to 360px · visible keyboard focus rings · `prefers-reduced-motion` respected (no spin, no transitions, instant reveals) · semantic landmarks · alt text · colour contrast AA on text.

---

## 4. Folder structure

```
kibosho-marathon/
├─ public/
│  ├─ images/            # client drops real photos here later
│  └─ og.png             # social share image (1200×630)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx      # fonts, metadata, <html>/<body>
│  │  ├─ page.tsx        # assembles all sections in order
│  │  └─ globals.css     # tokens, base, utilities
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ AnnouncementBar.tsx
│  │  │  ├─ Navbar.tsx           # 'use client' (scroll state, mobile menu)
│  │  │  └─ Footer.tsx
│  │  ├─ sections/
│  │  │  ├─ Hero.tsx
│  │  │  ├─ QuickFacts.tsx
│  │  │  ├─ RaceIntro.tsx
│  │  │  ├─ Countdown.tsx        # 'use client'
│  │  │  ├─ Stories.tsx          # 'use client' (carousel)
│  │  │  ├─ Packages.tsx
│  │  │  ├─ Gallery.tsx
│  │  │  ├─ Sponsors.tsx
│  │  │  └─ Newsletter.tsx       # 'use client' (stub submit)
│  │  └─ ui/
│  │     ├─ Button.tsx           # variants: vital | ghost
│  │     ├─ Section.tsx          # padding + max-width wrapper
│  │     ├─ Eyebrow.tsx
│  │     ├─ Reveal.tsx           # 'use client' IntersectionObserver wrapper
│  │     ├─ Medal.tsx            # the SVG badge
│  │     └─ KilimanjaroScene.tsx # hero SVG layers
│  ├─ data/
│  │  ├─ site.ts          # event config (single source of truth)
│  │  ├─ packages.ts
│  │  ├─ facts.ts
│  │  └─ reviews.ts
│  ├─ hooks/
│  │  ├─ useCountdown.ts
│  │  └─ useReveal.ts
│  └─ lib/
│     └─ format.ts        # pad(), date helpers
├─ next.config.ts         # output: 'export', images.unoptimized: true
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md              # setup + deploy (see §10/§11)
```

Server Components by default; only the four interactive pieces are `'use client'` (Navbar, Countdown, Stories, Newsletter, plus the Reveal wrapper).

---

## 5. Content config (typed — edit here, not in JSX)

`src/data/site.ts`
```ts
export const site = {
  name: "Kibosho Marathon",
  tagline: "Run the green slopes of Kilimanjaro",
  // ⚠️ PLACEHOLDER — confirm real date with client
  raceDateISO: "2026-08-01T06:00:00+03:00", // EAT (UTC+3)
  raceDateLabel: "Sat 1 August 2026",
  location: "Kibosho, Kilimanjaro, Tanzania",
  altitude: "1,420 – 2,180 m",
  surface: "Tarmac & gravel",
  email: "hello@kiboshomarathon.co.tz",   // PLACEHOLDER
  phone: "+255 000 000 000",               // PLACEHOLDER
  instagram: "#",
  builtBy: "Angatech",
} as const;
```

`src/data/facts.ts` — the quick-facts strip
```ts
export const facts = [
  { k: "Distances", v: "42K · 21K · 10K · 5K" },
  { k: "Location",  v: "Kibosho, Kilimanjaro" },
  { k: "Surface",   v: "Tarmac & gravel" },
  { k: "Altitude",  v: "1,420 – 2,180 m" },
];
```

`src/data/packages.ts`
```ts
export type Pkg = {
  id: string;
  tag: string;            // price badge on image
  when: string;
  title: string;
  perks: string[];
  price: { currency: string; amount: string };
  cta: "Register" | "View package";
  highlighted?: boolean;  // local-entry card uses vital CTA
};

export const packages: Pkg[] = [
  {
    id: "kilimanjaro", tag: "USD 690", when: "31 Jul – 3 Aug · 4 days",
    title: "Kilimanjaro Runner Package",
    perks: ["3 nights' lodge near Moshi","Airport transfers (JRO)","Race entry + medal + tee","Kilimanjaro foothills day tour"],
    price: { currency: "USD", amount: "690" }, cta: "View package",
  },
  {
    id: "weekend", tag: "USD 290", when: "31 Jul – 2 Aug · 2 days",
    title: "Weekend Race Package",
    perks: ["1 night near the start line","Race-morning shuttle","Race entry + medal + tee","Post-race celebration"],
    price: { currency: "USD", amount: "290" }, cta: "View package",
  },
  {
    id: "local", tag: "FROM TZS 10K", when: "Race day only · 1 Aug",
    title: "Local Runner Entry",
    perks: ["Entry to any distance","Chip timing & live results","Finisher medal + race tee","Mobile-money checkout"],
    price: { currency: "TZS", amount: "10K+" }, cta: "Register", highlighted: true,
  },
];
```

`src/data/reviews.ts`
```ts
export const reviews = [
  { quote: "The most beautiful race I've ever run. Hard on the legs, but every view was worth it.", who: "Marathon runner, 2025" },
  { quote: "I came for the mountain and stayed for the village welcome. An unforgettable morning.", who: "Half marathon runner, 2025" },
  { quote: "My first ever 10K, and I'll be back next year. The finish-line coffee alone is worth it.", who: "10K runner, 2025" },
]; // PLACEHOLDER quotes — replace with real testimonials
```

---

## 6. Section spec (order = `page.tsx` composition)

All sizing, colours, copy, and SVG paths come from `kibosho-marathon-v2.html`. Reproduce faithfully; this is the contract.

1. **AnnouncementBar** — moss bar: "Entries for 2026 opening soon — join the list" linking to `#news`.
2. **Navbar** (`sticky`) — brand lockup (peak SVG + wordmark), links: The race / Packages / Reviews / Gallery, plus a `vital` **Register** button. Adds `.scrolled` background after 30px. Mobile: hamburger that scrolls to `#packages`.
3. **Hero** — `KilimanjaroScene` background (bg gradient + glow + two SVG ridge layers, snow cap). Centered: eyebrow (`name · raceDateLabel`), H1 ("Run the green slopes of **Kilimanjaro**"), lead, two CTAs (Register → `#packages`, Discover → `#intro`).
4. **QuickFacts** — forest strip, 4 cells from `facts.ts` (mono key + Anton value), collapses to stacked on mobile.
5. **RaceIntro** (`#intro`) — 2-col: copy (eyebrow + H2 + 2 paragraphs + CTA) | `Medal` SVG (spinning, reduced-motion safe).
6. **Countdown** (`#countdown`) — moss gradient band, 4 units (Days/Hours/Mins/Secs) from `useCountdown(site.raceDateISO)`.
7. **Stories** (`#stories`) — review carousel from `reviews.ts`: photo panel (SVG mountain placeholder, labelled "Race photo") + quote panel; auto-advance 5.5s, clickable dots, pause logic optional. Each photo panel is a swap point for a real `<Image>` later.
8. **Packages** (`#packages`) — intro (eyebrow + H2 + blurb) then 3 `PackageCard`s mapped from `packages.ts`. `highlighted` card gets the `vital` CTA.
9. **Gallery** (`#gallery`) — responsive grid; first tile spans 2×2 ("Add hero photo"), rest labelled "Photo". Each tile is a future `<Image>` slot.
10. **Sponsors** (`#sponsors`) — centered heading + 4 dashed "Sponsor logo" placeholder slots.
11. **Newsletter** (`#news`) — 2-col: copy | email input + Subscribe (stub: validate non-empty, show toast/alert "connect to mailing list").
12. **Footer** — brand + address (Kibosho, Moshi Rural, Kilimanjaro, TZ), Event / Visit / Contact link columns, bottom row with copyright + "Built on the slopes of Kilimanjaro by **Angatech**".

---

## 7. Interactions

`hooks/useCountdown.ts`
```ts
import { useEffect, useState } from "react";
export function useCountdown(targetISO: string) {
  const target = new Date(targetISO).getTime();
  const calc = () => Math.max(0, target - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => { const id = setInterval(() => setMs(calc()), 1000); return () => clearInterval(id); }, []);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}
```
> Render `--` placeholders on the server and hydrate on the client to avoid a hydration mismatch (the value differs each render). Gate the live numbers behind a `mounted` flag.

`hooks/useReveal.ts` — IntersectionObserver adds `.in` when 12% visible, unobserves after. The `Reveal` UI component wraps children, applies the rise transition, and **no-ops under reduced motion**.

**Stories carousel** — index state, `setInterval` 5500ms, dot click resets the timer, `aria-label` per dot, fade via opacity.

**Newsletter / Register / View package** — all stubs in this phase: validate, then `alert()` or a small toast noting "connect to your mailing list / form / mobile-money checkout." Keep handlers isolated so wiring real endpoints later is a one-file change.

---

## 8. Accessibility, SEO, performance

**A11y:** one `<h1>`; sections use `<section aria-labelledby>`; nav is `<nav>`; focus-visible rings in `--vital`; carousel dots are real `<button>`s; SVGs decorative → `aria-hidden`, meaningful → `role="img"` + label; respect `prefers-reduced-motion` everywhere.

**SEO / metadata** (`app/layout.tsx` `metadata` + per-page):
- title, description, canonical
- OpenGraph + Twitter card (`/og.png`)
- `lang="en"`, `theme-color: #08231A`
- JSON-LD `SportsEvent` (name, startDate from `site.raceDateISO`, location Kibosho/Kilimanjaro, organizer) — good for an events site.

**Performance:** self-hosted fonts via `next/font`; inline SVG (no image requests in demo); `images.unoptimized: true` is required for static export — when real photos arrive, use `<Image>` with explicit width/height to avoid CLS, and serve WebP. Target **Lighthouse ≥ 95** across the board for the static demo.

---

## 9. Build phases (incremental — verify each before moving on)

1. **Scaffold** — `create-next-app` (TS, App Router, Tailwind, `src/`). Configure `next.config.ts` (`output: 'export'`, `images.unoptimized: true`). Wire the three Google fonts. Drop tokens into `globals.css` + `tailwind.config.ts`. Commit.
2. **Primitives + chrome** — `Button`, `Section`, `Eyebrow`, `Reveal`; then `AnnouncementBar`, `Navbar` (scroll + mobile), `Footer`. Verify sticky nav + responsive.
3. **Hero + QuickFacts** — `KilimanjaroScene`, hero content, facts strip. Verify hero at 360px / tablet / desktop.
4. **RaceIntro + Medal + Countdown** — port medal SVG; build `useCountdown` with hydration-safe render. Verify countdown ticks and reduced-motion stops the spin.
5. **Stories + Packages** — carousel + typed package cards. Verify auto-advance, dots, keyboard focus.
6. **Gallery + Sponsors + Newsletter** — grids + stub form. Verify stacking + focus states.
7. **Polish** — metadata, JSON-LD, OG image, a11y pass, Lighthouse, cross-checked against the prototype screenshot.
8. **Export + deploy** — `next build` → `out/`; deploy per §11.

---

## 10. Local setup (README content)

```bash
# prerequisites: Node 18.18+ (or 20+), npm
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
npx serve out      # preview the exported static site locally
```

`package.json` scripts: `dev`, `build` (`next build`), `start`, `lint`.
`next.config.ts`:
```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // friendlier for static hosts
};
export default nextConfig;
```

---

## 11. Free hosting for client preview

> **Verified June 2026.** The site is a static export (`./out`), so it can sit on any static host. The catch is **commercial-use terms** — this is consultant work intended for sale, so avoid hosts that ban that on free tiers.

### ✅ Recommended: Cloudflare Pages
Free, **commercial use allowed**, unlimited bandwidth, no credit card, 500 builds/month — ideal for a client demo.

**Option A — Git (auto-deploy on push):**
1. Push the repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Framework preset: **Next.js (Static HTML Export)**. Build command `npx next build`. Output dir `out`.
4. Deploy → you get `https://kibosho-marathon.pages.dev` to share with the client.

**Option B — Direct upload (no GitHub):**
```bash
npm run build
npm i -g wrangler
wrangler pages deploy out --project-name kibosho-marathon
```

**Gate the preview (optional):** put the site behind **Cloudflare Access** (Zero Trust, free tier) with an email-OTP policy so only the client can view it before launch.

### Alternatives
- **GitHub Pages** — free, fine for a static marketing demo. Add a deploy workflow (`actions/deploy-pages`) or push `out/` to a `gh-pages` branch. URL: `username.github.io/kibosho-marathon`.
- **Netlify** — free Starter tier (≈100 GB/mo bandwidth). Drag-and-drop the `out/` folder at app.netlify.com, or connect Git. Good DX; per-deploy preview URLs.

### ⚠️ Avoid for this case: Vercel free (Hobby)
Best Next.js DX, **but Hobby is non-commercial only** and Vercel's terms count client/revenue work — including a paid consultant's deployment — as commercial, requiring **Pro ($20/mo)**. Use it only for throwaway personal testing, or once the client is paying and you move to Pro.

### Custom domain (post-sale)
When the client buys, point a domain (e.g. `kiboshomarathon.co.tz`) at Cloudflare Pages via the dashboard — free SSL, instant.

---

## 12. Acceptance criteria (definition of done)

- [ ] Pixel-faithful to `kibosho-marathon-v2.html` in layout, palette, copy, and section order.
- [ ] All content lives in `src/data/*`; no hard-coded copy in JSX.
- [ ] Countdown is live, hydration-safe, and targets `site.raceDateISO`.
- [ ] Carousel auto-advances, dots work, keyboard-accessible.
- [ ] Fully responsive 360px → desktop; sticky nav + mobile menu work.
- [ ] `prefers-reduced-motion` disables spin, carousel auto-advance pause optional, reveals instant.
- [ ] Keyboard focus visible on every interactive element.
- [ ] Metadata + OG + JSON-LD `SportsEvent` present.
- [ ] `next build` produces `./out` with **zero** type/lint errors.
- [ ] Lighthouse ≥ 95 (Perf / A11y / Best Practices / SEO) on the exported site.
- [ ] Deploys cleanly to Cloudflare Pages with a shareable URL.
- [ ] README documents setup, the placeholder list, and deploy steps.

---

## 13. Placeholders the client must supply

Real race **date**; package **prices / dates / inclusions**; **photos** (hero, gallery, review panels); **sponsor logos**; **testimonials**; **contact** email/phone + social URLs; registration **form / mobile-money** endpoint for the stubbed CTAs.

---

## 14. Future phase (post-sale, not now)

Registration + payments (NestJS or Next API routes + PostgreSQL), TRA/mobile-money integration, multi-language (EN/SW), CMS for packages & gallery, results portal, and an admin dashboard. Keep this phase's data layer typed so those become additive, not rewrites.
