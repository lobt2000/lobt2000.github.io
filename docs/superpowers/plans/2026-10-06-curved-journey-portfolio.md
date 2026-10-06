# Curved Journey Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing React + Vite portfolio into a dark indigo/sky scroll journey: sticky curved-road strip, all work and pet quests as separate stretches, side drawer, no fake cover bars.

**Architecture:** Keep typed `src/data/*`. Split `projects` into `workQuests` and `petQuests` section ids. `computeJourney` returns `pathProgress` in `0..1`; `JourneyRail` places the marker with SVG `getPointAtLength`. `App` is `Nav` + sticky rail strip + `main` chapters. Quest cards open `QuestDrawer`. No GSAP, no full-screen road wallpaper.

**Tech Stack:** React 19, Vite 6, TypeScript, CSS modules + CSS variables, Vitest + Testing Library, GitHub Pages (`base: '/'`)

## Global Constraints

- Headline title must be exactly: `Front-End / Full-Stack Developer`
- Site language: English only (no i18n toggle)
- No heavy UI kit; no Framer Motion / GSAP in v1
- Palette: dark `#0b0f16` canvas, indigo `#6366f1`, sky `#38bdf8`
- Fonts: keep `Fraunces` (display) + `Manrope` (body); never Inter/Roboto/Arial as primary
- Road: curved dashed SVG in a sticky strip ~140–180px wide; never full-bleed wallpaper
- Forbidden: fake gradient cover bars, stock photos, invented screenshots, LVL badges, “Loadout” / “Training” / “Party invite” headings
- Motion only: marker along path, active node/chapter highlight, drawer open/close
- Honor `prefers-reduced-motion: reduce` (instant marker + instant drawer)
- Every project in `projects.ts` is visible; partition by `source`
- Spec: `docs/superpowers/specs/2026-10-06-portfolio-design.md`

---

## File structure

Modify in place (no new app scaffold):

```
src/
  data/types.ts                 SectionId split, Project.domain, optional urls
  data/projects.ts              getWorkProjects / getPetProjects + domain
  hooks/useScrollJourney.ts     pathProgress 0..1 instead of px rail
  styles/global.css             dark indigo/sky tokens
  App.tsx / App.module.css      7 chapters + drawer state
  components/JourneyRail.*      SVG curve (replace straight line + stick figure)
  components/PlayerAvatar.tsx   geometric marker (or delete if inlined)
  components/ChapterFrame.*     kicker + title + you-are-here
  components/QuestCard.*        no cover bar
  components/QuestDrawer.*      hide missing links; dark panel
  components/SkillGroupCard.*   chip group
  components/RoleCard.*         campaign card + <details>
  components/ContactTile.*      one contact method
  components/Nav.*              labels Profile/Skills/Work/Pets/Campaign/Education/Contact
  sections/WorkQuestsSection.*  replace mixed ProjectsSection listing
  sections/PetQuestsSection.*
  sections/*                    restyle remaining chapters
```

Remove from the live page (do not use in v2 chrome): `SectionReveal` entrance fades (would be a 4th motion). `PlayerAvatar` stick figure.

---

### Task 1: Section ids + project partitions

**Files:**
- Modify: `src/data/types.ts`
- Modify: `src/data/projects.ts`
- Test: `src/__tests__/projects.test.ts`

**Interfaces:**
- Consumes: existing `Project` / `projects` array
- Produces: `SectionId` includes `workQuests` | `petQuests` (no `projects`); `SECTIONS` labels; `getWorkProjects()` / `getPetProjects()`; `Project.domain: string`; optional `demoUrl?` / `sourceUrl?`

- [ ] **Step 1: Write the failing partition tests**

Replace `src/__tests__/projects.test.ts` with:

```ts
import { describe, expect, it } from 'vitest'
import {
  getPetProjects,
  getWorkProjects,
  projects,
} from '@/data/projects'
import { SECTIONS } from '@/data/types'

describe('sections', () => {
  it('uses work and pet quest stops, not a mixed projects stop', () => {
    expect(SECTIONS.map((s) => s.id)).toEqual([
      'intro',
      'skills',
      'workQuests',
      'petQuests',
      'experience',
      'education',
      'contact',
    ])
    expect(SECTIONS.map((s) => s.label)).toEqual([
      'Profile',
      'Skills',
      'Work',
      'Pets',
      'Campaign',
      'Education',
      'Contact',
    ])
  })
})

describe('projects data', () => {
  it('includes every required quest id', () => {
    const ids = projects.map((p) => p.id)
    expect(ids).toEqual(
      expect.arrayContaining([
        'botsi',
        'ghouse',
        'money',
        'pc-checkers',
        'talenttrace',
        'kindergarten',
        'maltzah',
        'eatstreat',
        'wizdi',
        'aleph',
        'medvisit',
        'admin-tool',
      ]),
    )
  })

  it('partitions every project into exactly one of work or pet', () => {
    const work = getWorkProjects()
    const pet = getPetProjects()
    expect(work.every((p) => p.source === 'work')).toBe(true)
    expect(pet.every((p) => p.source === 'personal')).toBe(true)
    expect([...work, ...pet]).toHaveLength(projects.length)
    expect(new Set([...work, ...pet].map((p) => p.id)).size).toBe(
      projects.length,
    )
  })

  it('orders work Botsi, GHOUSE first and pet Money, PC-checkers first', () => {
    expect(getWorkProjects().slice(0, 2).map((p) => p.id)).toEqual([
      'botsi',
      'ghouse',
    ])
    expect(getPetProjects().slice(0, 2).map((p) => p.id)).toEqual([
      'money',
      'pc-checkers',
    ])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: FAIL — `getWorkProjects` is not exported and `SECTIONS` still has `projects` / Loadout / Quests / Training / Invite.

- [ ] **Step 3: Minimal types + helpers**

In `src/data/types.ts` set:

```ts
export type SectionId =
  | 'intro'
  | 'skills'
  | 'workQuests'
  | 'petQuests'
  | 'experience'
  | 'education'
  | 'contact'

export interface Project {
  id: string
  title: string
  period: string
  domain: string
  summary: string
  tech: string[]
  highlights: string[]
  source: 'work' | 'personal'
  featured?: boolean
  demoUrl?: string
  sourceUrl?: string
}

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'intro', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'workQuests', label: 'Work' },
  { id: 'petQuests', label: 'Pets' },
  { id: 'experience', label: 'Campaign' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
```

Keep other interfaces. In `src/data/projects.ts` add `domain` on every project (examples: Botsi `SaaS`, GHOUSE `Config`, Maltzah `Ops`, EatStreat `Delivery`, WIZDI `Learning`, Aleph `Tooling`, Medvisit `Health`, Admin Tool `Internal`, Money `Fintech`, PC-checkers `Realtime`, TalentTrace `HR`, Kindergarten `Civic`). Add:

```ts
const WORK_ORDER = [
  'botsi',
  'ghouse',
  'maltzah',
  'eatstreat',
  'wizdi',
  'aleph',
  'medvisit',
  'admin-tool',
]
const PET_ORDER = ['money', 'pc-checkers', 'talenttrace', 'kindergarten']

function ordered(ids: string[]) {
  return ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
}

export function getWorkProjects(): Project[] {
  return ordered(WORK_ORDER)
}

export function getPetProjects(): Project[] {
  return ordered(PET_ORDER)
}
```

Remove `getFeaturedProjects` or leave unused (tests must not require it). Fix any TypeScript errors in sections that imported `SectionId` `'projects'`.

- [ ] **Step 4: Run tests**

Run: `npm test`

Expected: PASS for `projects.test.ts`. Other files may fail until later tasks; if `App.tsx` / `ProjectsSection` type-check fail, add temporary aliases in those files (`id="projects"` → compile only) or complete the id rename in the same commit so `tsc` is green.

Prefer finishing the id rename in this task: `ProjectsSection` becomes two sections in Task 5; for this task, change `ProjectsSection` wrapper `id` to `workQuests` and add an empty `PetQuestsSection` stub so the app still compiles:

```tsx
export function PetQuestsSection() {
  return <section id="petQuests" />
}
```

Wire it in `App.tsx` after work.

- [ ] **Step 5: Commit**

```bash
git add src/data/types.ts src/data/projects.ts src/__tests__/projects.test.ts src/App.tsx src/sections/ProjectsSection.tsx src/sections/PetQuestsSection.tsx
git commit -m "feat: split work and pet quest sections in content model"
```

---

### Task 2: Scroll journey emits pathProgress 0..1

**Files:**
- Modify: `src/hooks/useScrollJourney.ts`
- Test: `src/__tests__/useScrollJourney.test.ts`

**Interfaces:**
- Consumes: section top offsets, `scrollY`, viewport, reduced-motion flag
- Produces: `computeJourney(...): { activeIndex: number; progress: number; pathProgress: number }` where `pathProgress` is `0..1` along the whole road. Reduced motion snaps `pathProgress` to `activeIndex / (n-1)`. Hook returns `{ activeId, progress, pathProgress }`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest'
import { computeJourney } from '@/hooks/useScrollJourney'

describe('computeJourney', () => {
  const tops = [0, 800, 1600, 2400]

  it('selects the nearest section and maps progress 0..1', () => {
    const result = computeJourney(900, 800, tops, false)
    expect(result.activeIndex).toBe(1)
    expect(result.progress).toBeGreaterThan(0)
    expect(result.progress).toBeLessThan(1)
    expect(result.pathProgress).toBeGreaterThan(0)
    expect(result.pathProgress).toBeLessThan(1)
  })

  it('snaps pathProgress when reduced motion is on', () => {
    const reduced = computeJourney(900, 800, tops, true)
    expect(reduced.pathProgress).toBeCloseTo(
      reduced.activeIndex / (tops.length - 1),
    )
  })
})
```

- [ ] **Step 2: Run test — expect FAIL** on missing `pathProgress`.

Run: `npx vitest run src/__tests__/useScrollJourney.test.ts`

- [ ] **Step 3: Implement**

Replace `RAIL_TRAVEL_PX` / `avatarOffsetPx` with:

```ts
export function computeJourney(
  scrollY: number,
  viewportH: number,
  tops: number[],
  reducedMotion: boolean,
): { activeIndex: number; progress: number; pathProgress: number } {
  if (tops.length === 0) {
    return { activeIndex: 0, progress: 0, pathProgress: 0 }
  }
  const focusY = scrollY + viewportH * 0.3
  let activeIndex = 0
  for (let i = 0; i < tops.length; i += 1) {
    if (focusY >= tops[i]) activeIndex = i
  }
  const start = tops[activeIndex]
  const end = tops[Math.min(activeIndex + 1, tops.length - 1)]
  const span = Math.max(end - start, 1)
  const local = Math.min(Math.max((focusY - start) / span, 0), 1)
  const progress =
    tops.length === 1 ? 0 : (activeIndex + local) / (tops.length - 1)
  const pathProgress = reducedMotion
    ? activeIndex / Math.max(tops.length - 1, 1)
    : progress
  return { activeIndex, progress, pathProgress }
}
```

Hook state uses `pathProgress`. Update `JourneyRail` props temporarily to accept `pathProgress` (ignore visually until Task 3) so TypeScript builds.

- [ ] **Step 4: Run** `npx vitest run src/__tests__/useScrollJourney.test.ts` — PASS

- [ ] **Step 5: Commit** `feat: map scroll position to curved-road path progress`

---

### Task 3: Dark tokens + curved JourneyRail

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/components/JourneyRail.tsx`
- Modify: `src/components/JourneyRail.module.css`
- Modify: `src/App.module.css`
- Delete usage of stick-figure `PlayerAvatar` (file may remain unused)

**Interfaces:**
- Consumes: `activeId: SectionId`, `pathProgress: number`, `reducedMotion: boolean`
- Produces: sticky aside ~160px; SVG path `id="journey-road"`; marker at `path.getPointAtLength(pathProgress * path.getTotalLength())`

**Path `d` (viewBox `0 0 140 640`):**

```
M70 16 C 108 70, 32 120, 78 180 S 28 280, 70 340 S 112 420, 70 500 S 40 580, 70 624
```

- [ ] **Step 1: Tokens**

`:root` in `global.css`:

```css
--bg: #0b0f16;
--bg-elevated: #121826;
--ink: #e8eefc;
--ink-muted: #94a3b8;
--accent: #38bdf8;
--accent-2: #6366f1;
--line: rgba(148, 163, 184, 0.18);
--font-display: 'Fraunces', Georgia, serif;
--font-body: 'Manrope', system-ui, sans-serif;
--rail-width: 160px;
--nav-height: 64px;
```

Body background: radial indigo/sky glows on `#0b0f16`.

- [ ] **Step 2: JourneyRail implementation**

```tsx
import { useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS, type SectionId } from '@/data/types'
import styles from './JourneyRail.module.css'

const PATH_D =
  'M70 16 C 108 70, 32 120, 78 180 S 28 280, 70 340 S 112 420, 70 500 S 40 580, 70 624'

interface JourneyRailProps {
  activeId: SectionId
  pathProgress: number
  reducedMotion: boolean
}

export function JourneyRail({
  activeId,
  pathProgress,
  reducedMotion,
}: JourneyRailProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [marker, setMarker] = useState({ x: 70, y: 16 })

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const pt = path.getPointAtLength(
      Math.min(Math.max(pathProgress, 0), 1) * len,
    )
    setMarker({ x: pt.x, y: pt.y })
  }, [pathProgress])

  return (
    <aside className={styles.rail} aria-label="Journey path">
      <svg viewBox="0 0 140 640" className={styles.svg} role="img">
        <path d={PATH_D} className={styles.roadGlow} fill="none" />
        <path
          ref={pathRef}
          id="journey-road"
          d={PATH_D}
          className={styles.road}
          fill="none"
        />
        {SECTIONS.map((section, index) => {
          const t = index / Math.max(SECTIONS.length - 1, 1)
          const path = pathRef.current
          const p = path
            ? path.getPointAtLength(t * path.getTotalLength())
            : { x: 70, y: 16 + t * 600 }
          return (
            <a key={section.id} href={`#${section.id}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={activeId === section.id ? 6 : 4}
                className={
                  activeId === section.id ? styles.nodeActive : styles.node
                }
              />
            </a>
          )
        })}
        <circle
          cx={marker.x}
          cy={marker.y}
          r={7}
          className={styles.marker}
          style={{ transition: reducedMotion ? 'none' : 'cx 180ms, cy 180ms' }}
        />
      </svg>
      <ol className={styles.legend}>
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={
                activeId === section.id ? styles.legendActive : undefined
              }
            >
              {section.label}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
```

Note: SVG `<a>` + `circle` node positions that depend on `pathRef.current` on first paint may be 0. Prefer computing node `t` positions in the same `useLayoutEffect` into `nodePts: {id,x,y}[]` state.

CSS: `.rail` `position: sticky; top: var(--nav-height); width: var(--rail-width); align-self: start; max-height: calc(100vh - var(--nav-height));` Never `position: fixed; inset: 0`. `.road` `stroke: #38bdf8; stroke-width: 2.5; stroke-dasharray: 6 8`. `.roadGlow` wider translucent stroke. `.marker` fill `#38bdf8`.

`App.module.css` `.shell` is `display: grid; grid-template-columns: var(--rail-width) 1fr;` with nav spanning full width. Mobile: rail width ~56px, hide legend text, keep curve.

- [ ] **Step 3: Manual check** — `npm run dev`, confirm the road is a **column**, not a page background.

- [ ] **Step 4: Commit** `feat: add dark theme and sticky curved journey strip`

---

### Task 4: Quest cards, drawer, work + pet chapters

**Files:**
- Modify: `src/components/QuestCard.tsx` + css
- Modify: `src/components/QuestDrawer.tsx` + css
- Modify: `src/__tests__/QuestDrawer.test.tsx`
- Create: `src/sections/WorkQuestsSection.tsx` (+ css)
- Create: `src/sections/PetQuestsSection.tsx` (+ css)
- Delete or stop using: `src/sections/ProjectsSection.tsx`

**Interfaces:**
- `QuestCard({ project, index, onOpen })` — kicker `Quest {n} · {domain}`, title, one-line summary, up to 5 tech pills, **no image/bar**
- `QuestDrawer({ project, onClose })` — if `!project` return null; render `demoUrl`/`sourceUrl` buttons only when strings are non-empty
- Work section `id="workQuests"` maps `getWorkProjects()`
- Pet section `id="petQuests"` maps `getPetProjects()`
- App holds `selectedId: string | null` and `getProjectById`

- [ ] **Step 1: Drawer test for missing links**

```tsx
it('does not render demo or source when urls are absent', () => {
  const project = getProjectById('botsi')
  render(<QuestDrawer project={project ?? null} onClose={() => {}} />)
  expect(screen.queryByRole('link', { name: /open demo/i })).toBeNull()
  expect(screen.queryByRole('link', { name: /source/i })).toBeNull()
})
```

Keep existing close-on-button test. Add Escape:

```tsx
it('closes on Escape', async () => {
  const user = userEvent.setup()
  const onClose = vi.fn()
  render(
    <QuestDrawer project={getProjectById('money') ?? null} onClose={onClose} />,
  )
  await user.keyboard('{Escape}')
  expect(onClose).toHaveBeenCalled()
})
```

- [ ] **Step 2: Run** `npx vitest run src/__tests__/QuestDrawer.test.tsx` — missing-link test should PASS already if buttons do not exist; add buttons only when urls present so it stays PASS.

- [ ] **Step 3: QuestCard (no cover)**

```tsx
<button type="button" className={styles.card} onClick={() => onOpen(project.id)}>
  <span className={styles.kicker}>
    Quest {String(index + 1).padStart(2, '0')} · {project.domain}
  </span>
  <h3>{project.title}</h3>
  <p>{project.summary}</p>
  <ul>{project.tech.slice(0, 5).map((t) => <li key={t}>{t}</li>)}</ul>
</button>
```

Zero `height:` colored bars in CSS.

Work/pet sections:

```tsx
<section id="workQuests">
  <p>Work quests</p>
  <h2>Shipped in production</h2>
  {getWorkProjects().map((project, index) => (
    <QuestCard key={project.id} project={project} index={index} onOpen={onOpen} />
  ))}
</section>
```

Pet kicker “Pet quests” / heading “Built end-to-end”. Pass `onOpen` from `App`.

Drawer header Close button remains `name: /close/i`. Overlay click closes. Dark panel styles using `--bg-elevated`.

- [ ] **Step 4: Tests PASS** `npx vitest run src/__tests__/QuestDrawer.test.tsx src/__tests__/projects.test.ts`

- [ ] **Step 5: Commit** `feat: render all work and pet quests without fake covers`

---

### Task 5: Remaining chapters + chrome

**Files:**
- Create: `src/components/ChapterFrame.tsx` (+ css) — kicker, title, `active` boolean for “YOU ARE HERE”
- Create: `src/components/SkillGroupCard.tsx`
- Create: `src/components/RoleCard.tsx` — related project chips via `getProjectById`; skip unknown ids; responsibilities in `<details>`
- Create: `src/components/ContactTile.tsx`
- Modify: Intro, Skills, Experience, Education, Contact sections + Nav
- Modify: `src/App.tsx` — remove `SectionReveal` if used; wire drawer

Copy rules:
- Intro kicker: `Player profile · Online`
- Intro CTAs: `#workQuests` “View quests”, `#experience` “Campaign log”
- Skills heading: `Skills` (not Loadout)
- Experience heading: `Campaign log` / `Experience`
- Education heading: `Education` (not Training)
- Contact heading: `Let’s talk` with optional small kicker `Invite` only
- Nav labels from `SECTIONS`

RoleCard related chips: `role.relatedProjectIds.map(getProjectById).filter(Boolean)`.

Contact tiles: mailto, tel, LinkedIn, GitHub from `profile`.

- [ ] **Step 1: Restyle sections with ChapterFrame `active={activeId === id}`**

- [ ] **Step 2: `npm test` PASS** (drawer + projects + journey)

- [ ] **Step 3: `npm run build` PASS**

- [ ] **Step 4: Commit** `feat: restyle chapters for the curved-road portfolio`

---

### Task 6: Visual QA against spec (no extra features)

**Files:** CSS only if a spec violation is found.

Checklist (fix then re-run `npm test` && `npm run build`):

- [ ] Road is a sticky column, not full-screen
- [ ] Curve is visible (not a straight line)
- [ ] Marker moves on scroll; reduced-motion snaps
- [ ] All 8 work + 4 pet cards visible
- [ ] No gradient bars on cards
- [ ] Drawer Escape / overlay / Close
- [ ] Missing demo/source not rendered
- [ ] Title exactly `Front-End / Full-Stack Developer`
- [ ] No Loadout / Training / Party invite / LVL
- [ ] Mobile: compact rail, drawer sheet

- [ ] **Commit** only if CSS fixes: `fix: align journey chrome with design spec`

---

## Spec coverage (self-review)

| Spec item | Task |
|---|---|
| Sticky curved strip, not wallpaper | 3, 6 |
| pathProgress + reduced motion | 2 |
| 7 stops / labels | 1 |
| All work + pet quests | 1, 4 |
| No fake covers | 4, 6 |
| Side drawer + a11y | 4 |
| Chip skills, RoleCard details, contact tiles | 5 |
| Indigo/sky + Fraunces/Manrope | 3 |
| Three motions only | 3–5 (no SectionReveal) |
| Pages `base: '/'` | already in `vite.config.ts` |
| English, exact headline | 5, 6 |

No TBD. `demoUrl`/`sourceUrl` optional; UI hides when absent.
