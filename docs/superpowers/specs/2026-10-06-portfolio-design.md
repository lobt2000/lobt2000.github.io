# Bohdan Kolodii Portfolio — Design Spec (v2)

**Date:** 2026-10-06  
**Status:** Approved for planning (revised: curved journey strip)  
**Supersedes:** `docs/superpowers/specs/2026-10-05-portfolio-design.md`  
**Deploy target:** https://lobt2000.github.io/  
**Inspiration (structure/UX only):** https://yura935.github.io/ — dark quest cards, player framing, tech pills, primary + outline CTAs. Do **not** copy gold/olive skin, LVL badge, photo-card, stacked single quest list, or copy.

## Goal

An English personal portfolio that merges all CV variants and LinkedIn experience into one profile. Recruiters can skim; visitors get a **scroll-linked curved road** in a bounded map strip — not a full-screen wallpaper and not a straight CV rail. The current light plain-text UI is rejected — v2 is a visual rewrite on the existing React + Vite scaffold and typed data modules.

## Positioning

- **Headline:** Front-End / Full-Stack Developer  
- **Name:** Bohdan Kolodii  
- **Location:** Lviv, Ukraine  
- **Language:** English only (no bilingual toggle in v1)

## Product concept

**Approach A — Sticky curved journey strip + content chapters.**

- Dark atmospheric page; **indigo / sky** palette  
- Desktop: a **narrow sticky map column** (not full-bleed) holds an SVG **curved, dashed road**. A marker eases along that curve as the page scrolls.  
- Main column: chapter content (profile, skills, **all** work quests, **all** pet quests, campaign, education, contact)  
- Road nodes are clickable and jump to the matching chapter/quest  
- Work quests and pet quests are **two separate stretches** of the same road  
- Sticky top nav remains  
- The road must never be used as a full-screen background behind the whole page  
- `prefers-reduced-motion`: no marker tween; instant node highlight only  

This is a scroll journey, not a playable map and not a cloned RPG résumé.

## Page structure (single page)

Stops, in order:

| Stop | Recruiter label | RPG flavor (mixed) |
|---|---|---|
| 1 | Profile | Player profile |
| 2 | Skills | Skills (not “Loadout”) |
| 3 | Work projects | Work quests |
| 4 | Pet projects | Pet quests |
| 5 | Experience | Campaign log |
| 6 | Education | Education (not “Training”) |
| 7 | Contact | Invite (label “Contact” in nav; “Invite” allowed as a small kicker only) |

Dropped RPG words: Loadout, Party invite, LVL, Training as a heading.

Hero CTAs: **View quests** (scroll to Work quests) · **Campaign log**. Optional CV download later if a PDF is added under `public/`.

## Visual direction

- Dark charcoal/navy canvas (`#0b0f16` range) with **indigo (`#6366f1`) + sky (`#38bdf8`)** accents  
- Soft radial glows on the background — not a flat fill, not pixel-art, not heavy 3D  
- Expressive font pairing (display + body); do not use Inter / Roboto / Arial / system-ui as the brand stack  
- First viewport: name, title, one supporting line, CTA pair, path presence — no dense stats grid, no LVL badge  
- The **curved road strip** is the journey UI; content is a portfolio of stops, not a styled CV  
- Skills: compact **chips** in the skills chapter (roadside waypoint), not two-column lists  
- Campaign: **job cards** (company, dates, one-line summary, related product chips). Full responsibility bullets sit in a native `<details>` on the same card  
- Contact: **contact tiles** (email, phone, LinkedIn, GitHub)  
- Work vs pet stretches differ by kicker/accent on the road  

Quest card anatomy: kicker (Quest 0N · domain) · title · one-line summary · tech pills · click opens drawer.  
**Forbidden:** fake gradient “cover” bars, stock photos, or invented screenshots. Real covers only if the user later provides images. Every work and pet project is a visible stop — do not hide the list behind “featured only.”

## Motion (exactly 3)

1. Marker eases along the **curved road** (SVG path length ↔ scroll progress)  
2. Active road node + matching content chapter highlight  
3. Quest drawer opens/closes smoothly  

Do not add extra entrance choreography in v1. Heavier motion (GSAP, etc.) is explicitly later.

## Interaction model

| Input | Behavior |
|---|---|
| Scroll | Marker `offset` along the SVG path from section anchors; active node + chapter update |
| Click nav / road node | Smooth scroll to that chapter or quest card |
| Click quest card | Open **side drawer**: summary, period, tech, highlights/responsibilities, demo/source links if present |
| Close drawer | Overlay click, Escape, or close control; restore focus to the card |
| Reduced motion | No marker tween; instant active stop + instant drawer |
| Mobile | Journey strip becomes a compact sticky curved progress (left edge or top); not a full-screen map; drawer becomes a full-width sheet |

## Architecture

Keep the Vite React TypeScript app. Rewrite presentation; keep data-driven sections.

**Layout**

- `App` shells: sticky `Nav`, `JourneyRail` (SVG curved road in a sticky strip ~140–180px wide), `main` of chapter sections  
- `useScrollJourney` maps `scrollY` + section/quest refs → `activeId` + **path length fraction** for the marker (`getTotalLength` / `getPointAtLength`)  
- Presentational sections read typed modules only — no résumé prose hardcoded in JSX  

**Components (one job each)**

- `Nav` — logo/name, GitHub, section links  
- `JourneyRail` — bounded curved SVG road, nodes, marker (never full-viewport wallpaper)  
- `ChapterFrame` — kicker, title, “you are here” state  
- `QuestCard` — compact map card  
- `QuestDrawer` — detail panel (focus trap, Escape, labelled close)  
- `SkillGroupCard` — titled card of chips  
- `RoleCard` — campaign job card  
- `ContactTile` — one contact method  

**Data flow**

- Static TypeScript modules → section props → UI  
- Drawer state: selected `projectId` in `App` (or a tiny quests controller); lookup via `getProjectById`  
- Filter helpers: `getWorkProjects()`, `getPetProjects()` (replace a single mixed featured list as the page source of truth)

**Error / empty handling**

- Missing demo/source URL: hide that button; do not render a dead link  
- Missing cover image: **no placeholder bar** — card is typography + pills only  
- Unknown `relatedProjectIds`: skip silently  
- Drawer with invalid id: close  

**Testing (v1)**

- `useScrollJourney`: active section from mock scroll/geometry  
- `getWorkProjects` / `getPetProjects`: every project appears in exactly one list  
- `QuestDrawer`: opens for a project, closes on Escape, does not render missing links  
- No visual-regression suite in v1  

**Deploy**

- `vite build` → `dist/`  
- GitHub Actions publishes to user Pages root (`lobt2000.github.io`)  
- Vite `base: '/'` for a user/org site  

## Content model

Typed modules (evolve existing files):

- `profile.ts` — identity, bio, contacts  
- `skills.ts` — grouped chips (union of all CVs)  
- `projects.ts` — quests with `source: 'work' | 'personal'`  
- `experience.ts` — roles + `relatedProjectIds`  
- `education.ts` — degrees + languages  
- `types.ts` — `SectionId` must include `workQuests` and `petQuests` (retire a single `projects` stop)

### Profile

- Email: bkolodiy20013@gmail.com  
- Phone: +38 097 130 2656  
- LinkedIn: https://ua.linkedin.com/in/bohdan-kolodiy-2907011b4  
- GitHub: https://github.com/lobt2000  

### Skills (union)

- Frameworks: Angular, React, Next.js, Ionic, Node.js, Fastify, Express  
- UI: HTML5, CSS3, SCSS/SASS/LESS, Bootstrap, Angular Material, MUI  
- State/reactive: RxJS, NgRx, Redux/RTK  
- Languages: TypeScript, JavaScript, Python (basic), C# (basic)  
- Data: MongoDB, PostgreSQL, MySQL, Supabase, Prisma  
- Delivery: Docker, GitHub Actions, Azure DevOps, AWS, Git  
- Other: WebSockets, Web Workers, Chart.js, AmCharts, Firebase, JWT, Medusa  

### Experience

1. **Software Engineer — SwytApp / Botsi** (Feb 2025 – Jan 2026, full-time)  
   Angular SaaS monetization (paywalls, A/B, RBAC); PR review; performance; Angular Material + RxJS + WebSockets + AWS  

2. **Software Engineer — Binariks** (Feb 2021 – Jan 2025 full-time FE; Jan 2025 – present contractor, full-stack lean)  
   Feature delivery, AngularJS→Angular migrations, admin/booking tools, React/Next on selected products, tests (Jasmine/Protractor), cross-team integration  

### Work quests

- Botsi — paywall builder / monetization SaaS  
- GHOUSE — construction configuration; React, Next.js, Prisma, Medusa, Supabase  
- Maltzah / CloudCollector — carpet manufacturing OPS  
- EatStreat — restaurant↔delivery iPad app; AngularJS→Angular  
- WIZDI — interactive learning  
- Aleph — artillery process / trajectory tooling  
- Medvisit — healthcare booking / patient flows  
- Administration Tool — time reporting / leave / allocation  

Order: Botsi, GHOUSE, then remaining work quests.

### Pet quests

- The Money (Jun–Oct 2024) — e-wallets, P2P, chat; Angular, Fastify, PostgreSQL, Docker, JWT  
- PC-checkers (Nov–Dec 2024) — remote PC monitor/control; Angular, Ionic, Node/Fastify, Python WS  
- TalentTrace (Jun–Nov 2023) — HR candidates/employees  
- Kindergarten (Jun–Nov 2022) — kindergarten discovery & communication  

Order: The Money, PC-checkers, then remaining pet quests.

The Money is a personal/PDP quest even though it appears on a Binariks-oriented CV variant.

### Education & languages

- MSc Computer Engineering — Lviv Polytechnic National University (Sep 2022 – Dec 2023)  
- BSc Computer Engineering — Lviv Polytechnic National University (Sep 2018 – Jun 2022)  
- Ukrainian: Native · English: Upper-Intermediate  

## Why not alternatives

- Light teal résumé + stick-figure rail (current build): rejected as plain text, not a portfolio  
- Full-screen curved road as page wallpaper: user liked the curve but wanted it as the **scroll journey strip**, not a backdrop  
- Straight vertical line of dots: rejected; road must be curved  
- Fake gradient cover bars on quest cards: rejected (looked like a UI CV)  
- Cinematic gold clone of the inspiration site: too similar; user asked not to copy  
- Map-chapter ember palette: user chose indigo/sky instead  
- Road snaking through the full content column: user chose sticky strip + content instead  
- Expand-in-place or separate quest routes: drawer keeps map context without extra routing  
- Skill XP bars / illustrated job banners: deferred  

## Out of scope (v1)

- Ukrainian/English toggle  
- Keyboard-controlled / playable character  
- GSAP, canvas, or game engine  
- Backend, CMS, analytics  
- Live demo hosting unless a real URL is supplied later  
- Blog / longform case studies  
- Fake product screenshots and fake cover bars  
- Full-bleed / full-screen road background  

## Success criteria

- First viewport brands Bohdan + Front-End / Full-Stack  
- Journey is a **bounded curved road strip**; marker tracks scroll  
- All work quests and all pet quests appear as separate stretches (no featured-only truncation)  
- No fake cover bars  
- Reduced-motion users get an accessible single-page CV  
- Site is not a skin-copy of https://yura935.github.io/  
- Deployed build loads on https://lobt2000.github.io/  

## Open items (non-blocking)

- Optional illustrated avatar art vs geometric marker  
- Optional PDF CV in `public/`  
- Real project covers only if the user provides images  
