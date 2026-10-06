# Bohdan Kolodii Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an English React + Vite portfolio at `lobt2000.github.io` with a scroll-linked illustrated avatar journey and merged CV/LinkedIn content.

**Architecture:** Single-page React app. Typed content lives in `src/data/*`. `useScrollJourney` maps scroll position to section stops and avatar offset. Layout shells `Nav` + `JourneyRail` + section components. Quest cards open a lightweight drawer. Deploy `dist/` via GitHub Actions to GitHub Pages.

**Tech Stack:** React 19, Vite 6, TypeScript, CSS modules + CSS variables, Vitest + React Testing Library, GitHub Pages

## Global Constraints

- Headline title must be exactly: `Front-End / Full-Stack Developer`
- Site language: English only (no i18n toggle)
- No heavy UI kit (no MUI/Chakra/Ant for the portfolio chrome)
- No Framer Motion / GSAP in v1 — CSS transitions + Intersection Observer only
- Palette: deep slate neutrals + cool teal accent; no purple-glow theme; no cream/terracotta theme
- Fonts: expressive pairing via Google Fonts — `Fraunces` (display) + `Manrope` (body); never Inter/Roboto/Arial as primary
- Avatar: simple illustrated SVG figure (not photo, not pixel-art, not 3D)
- Cards only for interactive quest surfaces and the detail drawer
- Honor `prefers-reduced-motion: reduce` (no avatar tween)
- Content must merge all CV variants + LinkedIn projects listed in the design spec
- Spec reference: `docs/superpowers/specs/2026-10-05-portfolio-design.md`

---

## File structure

```
bohdan-portfolio/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── .github/workflows/deploy.yml
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.module.css
│   ├── vite-env.d.ts
│   ├── styles/
│   │   └── global.css
│   ├── data/
│   │   ├── types.ts
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── education.ts
│   ├── hooks/
│   │   ├── usePrefersReducedMotion.ts
│   │   └── useScrollJourney.ts
│   ├── components/
│   │   ├── Nav.tsx
│   │   ├── Nav.module.css
│   │   ├── JourneyRail.tsx
│   │   ├── JourneyRail.module.css
│   │   ├── PlayerAvatar.tsx
│   │   ├── QuestCard.tsx
│   │   ├── QuestCard.module.css
│   │   ├── QuestDrawer.tsx
│   │   ├── QuestDrawer.module.css
│   │   ├── SectionReveal.tsx
│   │   └── SectionReveal.module.css
│   └── sections/
│       ├── IntroSection.tsx
│       ├── IntroSection.module.css
│       ├── SkillsSection.tsx
│       ├── SkillsSection.module.css
│       ├── ProjectsSection.tsx
│       ├── ProjectsSection.module.css
│       ├── ExperienceSection.tsx
│       ├── ExperienceSection.module.css
│       ├── EducationSection.tsx
│       ├── EducationSection.module.css
│       ├── ContactSection.tsx
│       └── ContactSection.module.css
└── src/__tests__/
    ├── projects.test.ts
    ├── useScrollJourney.test.ts
    └── QuestDrawer.test.tsx
```

---

### Task 1: Scaffold Vite React TypeScript app + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/styles/global.css`, `public/favicon.svg`

**Interfaces:**
- Consumes: none
- Produces: runnable Vite app; Vitest configured with `jsdom` and path alias `@` → `src`

- [ ] **Step 1: Scaffold the project in the existing repo root**

Run from `e:\Progects\bohdan-portfolio` (keep existing `docs/` and `.git`):

```bash
npm create vite@latest . -- --template react-ts
```

If the tool refuses a non-empty directory, manually create the Vite files listed above instead of wiping `docs/`.

- [ ] **Step 2: Install dependencies and Vitest**

```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: Configure Vite + Vitest**

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 4: Write minimal global CSS tokens**

`src/styles/global.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --bg: #f4f7f8;
  --bg-elevated: #ffffff;
  --ink: #0f1c24;
  --ink-muted: #4a5d6a;
  --accent: #0f8b8d;
  --accent-soft: #d7f1f1;
  --line: #d5e0e6;
  --shadow: 0 18px 50px rgba(15, 28, 36, 0.08);
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Manrope', system-ui, sans-serif;
  --rail-width: 88px;
  --nav-height: 64px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background:
    radial-gradient(1200px 600px at 10% -10%, #d7f1f1 0%, transparent 55%),
    radial-gradient(900px 500px at 100% 0%, #e7eef3 0%, transparent 50%),
    var(--bg);
  line-height: 1.55;
}

h1,
h2,
h3 {
  font-family: var(--font-display);
  line-height: 1.15;
  margin: 0 0 0.5rem;
}

a {
  color: inherit;
}

button {
  font: inherit;
}

#root {
  min-height: 100vh;
}
```

- [ ] **Step 5: Wire entry files**

`src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Temporary `src/App.tsx`:

```tsx
export default function App() {
  return <main>Bohdan Kolodii — portfolio scaffold</main>
}
```

- [ ] **Step 6: Verify scaffold**

Run: `npm run test`  
Expected: PASS (no tests yet is OK if vitest exits 0) or “No test files found” depending on vitest version — either is fine if the command runs.

Run: `npm run build`  
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html src public
git commit -m "chore: scaffold Vite React TypeScript portfolio app"
```

---

### Task 2: Content data modules

**Files:**
- Create: `src/data/types.ts`, `src/data/profile.ts`, `src/data/skills.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/education.ts`
- Test: `src/__tests__/projects.test.ts`

**Interfaces:**
- Consumes: none
- Produces:
  - `export type SectionId = 'intro' | 'skills' | 'projects' | 'experience' | 'education' | 'contact'`
  - `export const SECTIONS: { id: SectionId; label: string }[]`
  - `export const profile: Profile`
  - `export const skillGroups: SkillGroup[]`
  - `export const projects: Project[]`
  - `export function getFeaturedProjects(): Project[]`
  - `export function getProjectById(id: string): Project | undefined`
  - `export const experience: Role[]`
  - `export const education: EducationData`

- [ ] **Step 1: Write the failing test for featured project order**

`src/__tests__/projects.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { getFeaturedProjects, projects } from '@/data/projects'

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

  it('features Botsi, GHOUSE, Money, PC-checkers first', () => {
    expect(getFeaturedProjects().map((p) => p.id)).toEqual([
      'botsi',
      'ghouse',
      'money',
      'pc-checkers',
    ])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/projects.test.ts`  
Expected: FAIL — cannot find module `@/data/projects`

- [ ] **Step 3: Implement types + data modules**

`src/data/types.ts`:

```ts
export type SectionId =
  | 'intro'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact'

export type ProjectSource = 'work' | 'personal'

export interface Profile {
  name: string
  title: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  bio: string
}

export interface SkillGroup {
  id: string
  title: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  period: string
  summary: string
  tech: string[]
  highlights: string[]
  source: ProjectSource
  featured?: boolean
}

export interface Role {
  id: string
  company: string
  title: string
  location: string
  period: string
  employment: string
  summary: string
  responsibilities: string[]
  relatedProjectIds: string[]
}

export interface Degree {
  id: string
  degree: string
  school: string
  period: string
}

export interface Language {
  name: string
  level: string
}

export interface EducationData {
  degrees: Degree[]
  languages: Language[]
}

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: 'intro', label: 'Profile' },
  { id: 'skills', label: 'Loadout' },
  { id: 'projects', label: 'Quests' },
  { id: 'experience', label: 'Campaign' },
  { id: 'education', label: 'Training' },
  { id: 'contact', label: 'Invite' },
]
```

`src/data/profile.ts`:

```ts
import type { Profile } from './types'

export const profile: Profile = {
  name: 'Bohdan Kolodii',
  title: 'Front-End / Full-Stack Developer',
  location: 'Lviv, Ukraine',
  email: 'bkolodiy20013@gmail.com',
  phone: '+38 097 130 2656',
  linkedin: 'https://ua.linkedin.com/in/bohdan-kolodiy-2907011b4',
  github: 'https://github.com/lobt2000',
  bio: 'I build polished web products across Angular and React, and ship full-stack features with Node.js when the product needs it — from monetization dashboards to configuration platforms and real-time tools.',
}
```

`src/data/skills.ts` — export `skillGroups` covering Frameworks, UI, State & Reactive, Languages, Data, Delivery, Other exactly as listed in the design spec.

`src/data/projects.ts` — export full `projects` array with all 12 quests; set `featured: true` on `botsi`, `ghouse`, `money`, `pc-checkers`. Include helpers:

```ts
export function getFeaturedProjects(): Project[] {
  const order = ['botsi', 'ghouse', 'money', 'pc-checkers']
  return order
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
```

Fill each project with period, summary, tech[], highlights[] from the design spec / CVs (Money and PC-checkers get the richest personal-project copy; Botsi/GHOUSE get work copy).

`src/data/experience.ts` — two roles: `botsi-swytapp` then `binariks` (most recent first), with `relatedProjectIds`.

`src/data/education.ts` — MSc + BSc + Ukrainian/English.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- src/__tests__/projects.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/data src/__tests__/projects.test.ts
git commit -m "feat: add merged CV and LinkedIn content modules"
```

---

### Task 3: Reduced-motion + scroll journey hook

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.ts`, `src/hooks/useScrollJourney.ts`
- Test: `src/__tests__/useScrollJourney.test.ts`

**Interfaces:**
- Consumes: `SectionId` from `@/data/types`
- Produces:
  - `usePrefersReducedMotion(): boolean`
  - `useScrollJourney(sectionIds: SectionId[]): { activeId: SectionId; progress: number; avatarOffsetPx: number }`
  - Pure helper `export function computeJourney(scrollY: number, viewportH: number, tops: number[], reducedMotion: boolean): { activeIndex: number; progress: number; avatarOffsetPx: number }`

- [ ] **Step 1: Write failing tests for `computeJourney`**

`src/__tests__/useScrollJourney.test.ts`:

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
  })

  it('snaps avatar offset when reduced motion is on', () => {
    const animated = computeJourney(900, 800, tops, false)
    const reduced = computeJourney(900, 800, tops, true)
    expect(reduced.avatarOffsetPx % 1).toBe(0)
    expect(reduced.activeIndex).toBe(animated.activeIndex)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/useScrollJourney.test.ts`  
Expected: FAIL — module missing

- [ ] **Step 3: Implement hooks**

`src/hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}
```

`src/hooks/useScrollJourney.ts`:

```ts
import { useEffect, useState } from 'react'
import type { SectionId } from '@/data/types'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const RAIL_TRAVEL_PX = 420

export function computeJourney(
  scrollY: number,
  viewportH: number,
  tops: number[],
  reducedMotion: boolean,
): { activeIndex: number; progress: number; avatarOffsetPx: number } {
  if (tops.length === 0) {
    return { activeIndex: 0, progress: 0, avatarOffsetPx: 0 }
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
  const progress = tops.length === 1 ? 0 : (activeIndex + local) / (tops.length - 1)
  const rawOffset = progress * RAIL_TRAVEL_PX
  const avatarOffsetPx = reducedMotion
    ? (activeIndex / Math.max(tops.length - 1, 1)) * RAIL_TRAVEL_PX
    : rawOffset

  return { activeIndex, progress, avatarOffsetPx }
}

export function useScrollJourney(sectionIds: SectionId[]) {
  const reducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState({
    activeId: sectionIds[0],
    progress: 0,
    avatarOffsetPx: 0,
  })

  useEffect(() => {
    const update = () => {
      const tops = sectionIds.map((id) => {
        const el = document.getElementById(id)
        return el ? el.offsetTop : 0
      })
      const result = computeJourney(
        window.scrollY,
        window.innerHeight,
        tops,
        reducedMotion,
      )
      setState({
        activeId: sectionIds[result.activeIndex] ?? sectionIds[0],
        progress: result.progress,
        avatarOffsetPx: result.avatarOffsetPx,
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [sectionIds, reducedMotion])

  return state
}
```

- [ ] **Step 4: Run tests**

Run: `npm run test -- src/__tests__/useScrollJourney.test.ts`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks src/__tests__/useScrollJourney.test.ts
git commit -m "feat: add scroll journey and reduced-motion hooks"
```

---

### Task 4: Shell layout — Nav, JourneyRail, PlayerAvatar, App wiring

**Files:**
- Create: `src/components/Nav.tsx`, `src/components/Nav.module.css`, `src/components/JourneyRail.tsx`, `src/components/JourneyRail.module.css`, `src/components/PlayerAvatar.tsx`, `src/App.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `SECTIONS`, `profile`, `useScrollJourney`
- Produces: page shell with sticky nav, desktop rail, section placeholders with correct `id`s

- [ ] **Step 1: Implement `PlayerAvatar` SVG**

Simple standing figure (circle head + rounded body), teal fill accents, `aria-hidden`:

```tsx
export function PlayerAvatar() {
  return (
    <svg viewBox="0 0 64 96" width="48" height="72" aria-hidden="true">
      <circle cx="32" cy="18" r="12" fill="#0f8b8d" />
      <rect x="18" y="32" width="28" height="36" rx="14" fill="#0f1c24" />
      <rect x="22" y="68" width="8" height="22" rx="4" fill="#4a5d6a" />
      <rect x="34" y="68" width="8" height="22" rx="4" fill="#4a5d6a" />
    </svg>
  )
}
```

- [ ] **Step 2: Implement `Nav`**

Props: `{ activeId: SectionId }`. Renders brand `Bohdan Kolodii`, links from `SECTIONS`, and a “Skip to contact” link to `#contact`. Sticky top bar using `--nav-height`.

- [ ] **Step 3: Implement `JourneyRail`**

Props:

```ts
{
  activeId: SectionId
  avatarOffsetPx: number
  reducedMotion: boolean
}
```

Desktop-only vertical rail (`position: fixed; left: 0`) with path line, stop buttons for each section, and `PlayerAvatar` absolutely positioned with `transform: translateY(avatarOffsetPx)` and `transition: transform 160ms ease` unless reduced motion.

- [ ] **Step 4: Wire `App.tsx`**

```tsx
import { SECTIONS } from '@/data/types'
import { Nav } from '@/components/Nav'
import { JourneyRail } from '@/components/JourneyRail'
import { useScrollJourney } from '@/hooks/useScrollJourney'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './App.module.css'

const sectionIds = SECTIONS.map((s) => s.id)

export default function App() {
  const journey = useScrollJourney(sectionIds)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className={styles.shell}>
      <Nav activeId={journey.activeId} />
      <JourneyRail
        activeId={journey.activeId}
        avatarOffsetPx={journey.avatarOffsetPx}
        reducedMotion={reducedMotion}
      />
      <main className={styles.main}>
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className={styles.section}>
            <h2>{section.label}</h2>
          </section>
        ))}
      </main>
    </div>
  )
}
```

`App.module.css`: main has left padding for rail on `min-width: 960px`; sections `min-height: 80vh; padding: 6rem 1.5rem 4rem`.

- [ ] **Step 5: Manual check**

Run: `npm run dev`  
Expected: sticky nav; clicking Invite jumps to contact; scrolling moves avatar on desktop.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/App.module.css src/components
git commit -m "feat: add nav and scroll journey rail shell"
```

---

### Task 5: SectionReveal + Intro + Skills + Education + Contact sections

**Files:**
- Create: `src/components/SectionReveal.tsx`, `src/components/SectionReveal.module.css`, all corresponding section files under `src/sections/`
- Modify: `src/App.tsx` to render real sections instead of placeholders

**Interfaces:**
- Consumes: `profile`, `skillGroups`, `education`
- Produces: fully readable Intro/Skills/Education/Contact sections

- [ ] **Step 1: Implement `SectionReveal`**

Wrap children; use Intersection Observer to toggle `.visible` class that fades/translates content in. If `prefers-reduced-motion`, start visible with no transition.

- [ ] **Step 2: Implement `IntroSection`**

Hero: `profile.name` as dominant brand heading, `profile.title`, one-sentence `profile.bio`, CTA group:

- anchor `#projects` — “View quests”
- anchor `#contact` — “Contact”
- optional `mailto:` is fine; no CV PDF required in v1 unless file added later

Keep first viewport sparse (no skill chips / stats).

- [ ] **Step 3: Implement `SkillsSection`**

Heading “Build loadout”. Render each `skillGroups` entry as a labeled list (not card chrome unless needed for readability — prefer simple grouped lists).

- [ ] **Step 4: Implement `EducationSection`**

Degrees + languages from `education`.

- [ ] **Step 5: Implement `ContactSection`**

Heading “Let’s talk” / “Party invite”. Links for email, phone, LinkedIn, GitHub using `profile` fields.

- [ ] **Step 6: Replace placeholders in `App.tsx`**

Render `IntroSection`, `SkillsSection`, placeholder still OK for projects/experience until next tasks, plus education/contact.

- [ ] **Step 7: Visual pass**

Run: `npm run dev`  
Expected: hero reads as Bohdan-branded; skills/education/contact populated.

- [ ] **Step 8: Commit**

```bash
git add src/components/SectionReveal.tsx src/components/SectionReveal.module.css src/sections src/App.tsx
git commit -m "feat: add intro, skills, education, and contact sections"
```

---

### Task 6: Projects section + QuestDrawer

**Files:**
- Create: `src/components/QuestCard.tsx`, `src/components/QuestCard.module.css`, `src/components/QuestDrawer.tsx`, `src/components/QuestDrawer.module.css`, `src/sections/ProjectsSection.tsx`, `src/sections/ProjectsSection.module.css`
- Test: `src/__tests__/QuestDrawer.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `projects`, `getFeaturedProjects`, `getProjectById`
- Produces: `ProjectsSection` with local `selectedId` state; `QuestDrawer` props `{ project: Project | null; onClose: () => void }`

- [ ] **Step 1: Write failing drawer test**

`src/__tests__/QuestDrawer.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { QuestDrawer } from '@/components/QuestDrawer'
import { getProjectById } from '@/data/projects'

describe('QuestDrawer', () => {
  it('renders selected quest details and closes', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const project = getProjectById('money')
    render(<QuestDrawer project={project ?? null} onClose={onClose} />)

    expect(screen.getByRole('dialog')).toHaveTextContent(/Money|e-wallet/i)
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- src/__tests__/QuestDrawer.test.tsx`  
Expected: FAIL — `QuestDrawer` missing

- [ ] **Step 3: Implement `QuestDrawer`**

- `role="dialog"` + `aria-modal="true"` when `project` is non-null  
- Show title, period, summary, tech list, highlights  
- Close button labeled “Close”  
- Overlay click closes  
- Escape key closes  
- Return `null` when `project` is null  

- [ ] **Step 4: Implement `QuestCard` + `ProjectsSection`**

- Featured row: `getFeaturedProjects()`  
- “More quests” list: remaining projects  
- Card click sets `selectedId`  
- RPG-flavored section copy OK (“Active quests”) but keep professional tone  

- [ ] **Step 5: Run tests**

Run: `npm run test -- src/__tests__/QuestDrawer.test.tsx`  
Expected: PASS

- [ ] **Step 6: Wire into App and commit**

```bash
git add src/components/QuestCard.tsx src/components/QuestCard.module.css src/components/QuestDrawer.tsx src/components/QuestDrawer.module.css src/sections/ProjectsSection.tsx src/sections/ProjectsSection.module.css src/__tests__/QuestDrawer.test.tsx src/App.tsx
git commit -m "feat: add quest cards and project detail drawer"
```

---

### Task 7: Experience (Campaign log) section

**Files:**
- Create: `src/sections/ExperienceSection.tsx`, `src/sections/ExperienceSection.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `experience`, `getProjectById`
- Produces: chronological campaign entries with related quest name chips (non-interactive labels or buttons that open the same drawer via optional callback)

- [ ] **Step 1: Implement ExperienceSection**

For each role render company, title, period, employment note, summary, responsibility bullets, related project titles.

Prefer Botsi/SwytApp first, then Binariks with both employment phases mentioned in `period` / `employment` strings.

- [ ] **Step 2: Wire into App**

- [ ] **Step 3: Manual check**

Run: `npm run dev`  
Expected: both employers visible with concrete responsibilities.

- [ ] **Step 4: Commit**

```bash
git add src/sections/ExperienceSection.tsx src/sections/ExperienceSection.module.css src/App.tsx
git commit -m "feat: add campaign log experience section"
```

---

### Task 8: Visual polish + responsive rail behavior

**Files:**
- Modify: `src/styles/global.css`, `src/App.module.css`, `src/components/JourneyRail.module.css`, section CSS modules as needed

**Interfaces:**
- Consumes: existing components
- Produces: polished desktop/mobile layout meeting visual constraints

- [ ] **Step 1: Desktop polish**

- Ensure hero typography hierarchy (name > title > bio)  
- Teal accent on CTAs and active nav/rail stop  
- Soft atmospheric background remains  
- Avatar transition feels ease-out, ~150–200ms  

- [ ] **Step 2: Mobile behavior**

At `max-width: 959px`:

- Hide vertical `JourneyRail`  
- Show a thin top progress bar under nav using `journey.progress` (width percentage)  
- Sections full-width with comfortable padding  

Implement progress bar in `Nav` or a tiny `JourneyProgress` component if cleaner:

```tsx
<div
  className={styles.progress}
  style={{ transform: `scaleX(${progress})` }}
  aria-hidden="true"
/>
```

- [ ] **Step 3: Accessibility pass**

- Focus styles on links/buttons  
- Drawer traps focus basically (at least initial focus on Close)  
- Section headings are real `h1`/`h2`  

- [ ] **Step 4: Verify**

Run: `npm run test`  
Expected: all tests PASS  

Run: `npm run build`  
Expected: success  

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "style: polish responsive journey UI and accessibility"
```

---

### Task 9: GitHub Pages deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `package.json` (if needed), README note optional — only if user asked; otherwise skip README

**Interfaces:**
- Consumes: Vite `base: '/'` for user site `lobt2000.github.io`
- Produces: Actions workflow that builds and deploys `dist` to GitHub Pages

- [ ] **Step 1: Add workflow**

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master, main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Document deploy prerequisites in commit message / chat only**

User must:

1. Create/connect GitHub repo `lobt2000/lobt2000.github.io` (or rename remote accordingly)  
2. Enable Pages → Source: GitHub Actions  
3. Push `master`/`main`

- [ ] **Step 3: Local production verify**

Run: `npm run build && npm run preview`  
Expected: site works at preview URL.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy portfolio to GitHub Pages"
```

---

### Task 10: Final content QA against the design spec

**Files:**
- Modify: `src/data/*.ts` only if gaps found

**Interfaces:**
- Consumes: design spec content lists
- Produces: no missing projects/employers/skills; title exact match

- [ ] **Step 1: Checklist verification**

Confirm present:

- [ ] Title exact: `Front-End / Full-Stack Developer`  
- [ ] Contacts: email, phone, LinkedIn, GitHub  
- [ ] Skills union groups  
- [ ] Projects: all 12 ids  
- [ ] Experience: Botsi/SwytApp + Binariks  
- [ ] Education: MSc + BSc  
- [ ] Languages: Ukrainian Native, English Upper-Intermediate  

- [ ] **Step 2: Run full verification**

```bash
npm run test
npm run build
```

Expected: both succeed.

- [ ] **Step 3: Commit only if data fixes were needed**

```bash
git add src/data
git commit -m "fix: fill content gaps from portfolio design spec"
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|---|---|
| Front-End / Full-Stack positioning | Task 2 profile + Global Constraints |
| English-only single page | Tasks 5–7 |
| Scroll avatar journey | Tasks 3–4 |
| Reduced motion | Tasks 3, 8 |
| Sticky nav + skip to contact | Task 4 |
| Skills / Projects / Experience / Education / Contact | Tasks 5–7 |
| Quest detail interaction | Task 6 |
| Merged CV + LinkedIn projects | Tasks 2, 10 |
| React + Vite + TS + CSS variables | Task 1 |
| GitHub Pages deploy | Task 9 |
| Mobile rail collapse | Task 8 |
| Visual direction (slate/teal, Fraunces/Manrope) | Tasks 1, 8 |

No intentional placeholders left in task steps. Open implementation items from the spec (photo, CV PDF) remain optional and are not required to close v1.
