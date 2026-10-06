# Bohdan Kolodii Portfolio — Design Spec

**Date:** 2026-10-05  
**Status:** Approved for planning  
**Deploy target:** https://lobt2000.github.io/  
**Inspiration:** https://yura935.github.io/ (RPG-flavored portfolio) — extend with a scroll-linked avatar journey

## Goal

A memorable English-language personal portfolio that merges all CV variants and LinkedIn experience into one coherent profile. Recruiters can skim normally; curious visitors get a light “player journey” as they scroll.

## Positioning

- **Headline:** Front-End / Full-Stack Developer  
- **Name:** Bohdan Kolodii  
- **Location:** Lviv, Ukraine  
- **Language of site:** English only (no bilingual toggle in v1)

## Product concept

**Scroll journey with illustrated avatar (not a mini-game).**

- Clean modern light UI + simple illustrated avatar on a vertical path/rail  
- Avatar advances with scroll progress between section stops  
- Sticky nav + clickable path stops for direct jumps  
- Always-available “Skip to contact” / normal section links  
- `prefers-reduced-motion`: no walk animation; instant section highlighting

This is intentionally more interactive than a theme-only RPG copy site, but not a controllable game.

## Page structure (single page)

1. **Intro / Player profile**  
   Name, title, short bio, primary CTAs: View quests · Contact · Download CV (optional PDF link)

2. **Skill tree / Build loadout**  
   Grouped skills (union of all CVs)

3. **Active quests (Projects)**  
   Personal + professional projects as quest cards; click opens a detail panel/drawer

4. **Campaign log (Experience)**  
   Binariks + SwytApp/Botsi with responsibilities and highlighted products

5. **Education & languages**  
   Compact section

6. **Party invite (Contact)**  
   Email, phone, LinkedIn, GitHub

## Visual direction

- Light, modern composition (reference-adjacent), not pixel-art or heavy 3D  
- Palette: deep slate neutrals + cool teal accent (avoid purple-glow / cream-terracotta clichés)  
- Expressive font pairing (display + body); avoid Inter/Roboto/Arial/system-default stacks  
- Soft gradient or subtle atmospheric background — not flat single-color only  
- Brand/name is hero-level in the first viewport  
- First viewport budget: name, title, one short supporting line, CTA group, avatar/path presence — no dense stats grids  
- Cards only where they support interaction (quest cards / detail surfaces)

### Motion (intentional, 2–3)

1. Avatar eases along the path between stops  
2. Section content fades/slides in on enter (Intersection Observer)  
3. Quest detail panel opens/closes smoothly  

## Interaction model

| Input | Behavior |
|---|---|
| Scroll | Avatar position = progress between section anchors |
| Click nav / path stop | Smooth scroll to section |
| Click quest card | Open detail panel (description, tech, responsibilities) |
| Reduced motion | Disable avatar tween; update active stop only |
| Mobile | Collapse rail to thin progress indicator or top progress; keep sticky nav |

## Content model

Typed data modules (TypeScript), not hard-coded prose inside JSX:

- `profile.ts` — identity, bio, contacts, links  
- `skills.ts` — grouped skill lists  
- `projects.ts` — quests (id, title, period, summary, tech[], highlights[], source: work|personal)  
- `experience.ts` — roles, periods, responsibilities, related project ids  
- `education.ts` — degrees + languages  

### Profile (source of truth for v1)

- Email: bkolodiy20013@gmail.com  
- Phone: +38 097 130 2656  
- LinkedIn: https://ua.linkedin.com/in/bohdan-kolodiy-2907011b4  
- GitHub Pages host: lobt2000 (confirm GitHub username during implementation)  

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

### Projects (quests) — include all major items

**Personal / PDP**

- PC-checkers (Nov–Dec 2024) — remote PC monitor/control; Angular, Ionic, Node/Fastify, Python WS client  
- Money / The Money (Jun–Oct 2024) — e-wallets, P2P, deposits/withdrawals, chat; Angular, Fastify, PostgreSQL, Docker, JWT  
- TalentTrace (Jun–Nov 2023) — HR candidates/employees platform  
- Kindergarten (Jun–Nov 2022) — kindergarten discovery & parent communication  

**Professional**

- Botsi — paywall builder / monetization SaaS  
- GHOUSE — construction configuration; React, Next.js, Prisma, Medusa, Supabase  
- Maltzah / CloudCollector — carpet manufacturing OPS; Angular, Laravel, Redis, AWS, etc.  
- EatStreat — restaurant↔delivery iPad app; AngularJS→Angular, Ionic, NgRx  
- WIZDI — interactive learning; Angular + .NET/Mongo stack integrations  
- Aleph — artillery process / trajectory tooling; Angular Material  
- Medvisit — healthcare booking / patient flows; Angular forms & Material  
- Administration Tool — time reporting / leave / workforce allocation; Angular + .NET  

Project order on the page: featured personal + recent work first (Botsi, GHOUSE, Money, PC-checkers), then remaining quests.

### Education & languages

- MSc Computer Engineering — Lviv Polytechnic National University (Sep 2022 – Dec 2023)  
- BSc Computer Engineering — Lviv Polytechnic National University (Sep 2018 – Jun 2022)  
- Ukrainian: Native · English: Upper-Intermediate  

## Technical approach

**Chosen stack:** React + Vite + TypeScript + CSS variables / CSS modules (no heavy UI kit).

**Why not alternatives**

- Theme-only RPG copy: too similar to the inspiration site  
- GSAP/Framer-heavy scroll: optional later; v1 uses Intersection Observer + CSS transitions  
- Canvas/game engine: out of scope — hurts skim UX  

**Architecture**

- `App` shells layout: `Nav`, `JourneyRail` (avatar + stops), `main` sections  
- `useScrollJourney` hook: reads section refs, maps scrollY → active stop + avatar offset  
- Presentational section components consume data modules only  
- Quest detail: lightweight drawer/modal component  

**Deploy**

- Build `dist/`  
- GitHub Actions (or `gh-pages`) publishes to `lobt2000.github.io`  
- Base path configured for GitHub Pages root user/org site  

## Out of scope (v1)

- Ukrainian/English toggle  
- Keyboard-controlled / playable character  
- Backend, CMS, analytics dashboards  
- Live demo hosting (unless existing public URLs are provided later)  
- Blog / case-study longform  

## Success criteria

- First viewport clearly brands Bohdan + Front-End / Full-Stack role  
- All merged CV/LinkedIn highlights appear somewhere without contradiction  
- Avatar journey works on desktop; mobile remains usable without the rail  
- Reduced-motion users get a normal accessible single-page CV  
- Deployed build loads on https://lobt2000.github.io/  

## Open items for implementation

- Confirm GitHub account/repo name for Pages (`lobt2000`)  
- Optional: photo or stick to illustrated avatar only  
- Optional: PDF CV download asset in `/public`  
- Final project sort / which quests are “featured” vs collapsed “more quests”
