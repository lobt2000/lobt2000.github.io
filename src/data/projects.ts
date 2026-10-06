import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'botsi',
    title: 'Botsi',
    period: 'February 2025 – January 2026',
    domain: 'SaaS',
    summary:
      'SaaS dashboard for mobile teams to manage monetization — subscriptions, paywalls, pricing models, promotions, analytics, A/B testing, and RBAC — without shipping app updates.',
    tech: [
      'Angular',
      'TypeScript',
      'RxJS',
      'Angular Material',
      'REST API',
      'WebSockets',
      'Jasmine',
      'CI/CD',
      'AWS',
    ],
    highlights: [
      'Extended Paywall Builder for flexible offer configuration.',
      'Improved UI responsiveness and load performance.',
      'Owned PR reviews and Angular architectural improvements.',
    ],
    source: 'work',
    featured: true,
  },
  {
    id: 'ghouse',
    title: 'GHOUSE',
    period: '2024 – 2025 · ~1 year',
    domain: 'Config',
    summary:
      'Construction configuration platform connecting building companies with customers — product catalogues, interactive home customization, and real-time project cost calculation.',
    tech: ['React', 'Next.js', 'Prisma', 'Medusa', 'Supabase'],
    highlights: [
      'Built end-to-end front-end experiences focused on UX and responsiveness.',
      'Integrated Medusa for catalogs, pricing, and order workflows.',
      'Used Supabase for auth, real-time data, and secure configuration storage.',
      'Enhanced Excel report generation for stakeholder analytics.',
    ],
    source: 'work',
    featured: true,
  },
  {
    id: 'money',
    title: 'The Money',
    period: 'June 2024 – October 2024',
    domain: 'Fintech',
    summary:
      'Full-stack fintech PDP for personal finance and P2P transfers — unique e-wallets, deposits and withdrawals to virtual cards, transaction lifecycle, and in-app chat.',
    tech: [
      'Node.js',
      'Fastify',
      'TypeScript',
      'Angular',
      'PostgreSQL',
      'Docker',
      'RxJS',
      'JWT',
    ],
    highlights: [
      'Architected e-wallet registration with email verification.',
      'Implemented frozen-funds P2P flow and transaction status management.',
      'Built real-time chat tied to wallet IDs for secure transaction discussion.',
      'Designed PostgreSQL schema with seeding and cascading integrity rules.',
      'Containerized Fastify + Angular with CI lint/test gates.',
    ],
    source: 'personal',
    featured: true,
  },
  {
    id: 'pc-checkers',
    title: 'PC-checkers',
    period: 'November 2024 – December 2024',
    domain: 'Realtime',
    summary:
      'Remote monitoring and control system for a PC — live process view, system status, and real-time actions through a mobile-friendly client.',
    tech: ['Angular', 'Ionic', 'Node.js', 'Fastify', 'Python', 'WebSockets'],
    highlights: [
      'Built Angular + Ionic UI for processes, status, and remote control.',
      'Implemented Node.js + Fastify bridge with WebSocket messaging.',
      'Connected a Python WebSocket client on the monitored machine.',
    ],
    source: 'personal',
    featured: true,
  },
  {
    id: 'talenttrace',
    title: 'TalentTrace',
    period: 'June 2023 – November 2023',
    domain: 'HR',
    summary:
      'Full-stack HR platform for managing candidates and internal employees — objective evaluation, skill/potential assessment, ranked selection database, and meeting workflows.',
    tech: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Supported ranked candidate databases for vacancy matching.',
      'Enabled skill assessments and internal employee meeting flows.',
    ],
    source: 'personal',
  },
  {
    id: 'kindergarten',
    title: 'Kindergarten',
    period: 'June 2022 – November 2022',
    domain: 'Civic',
    summary:
      'Platform helping parents discover kindergartens and communicate with representatives — especially useful for facilities without their own websites.',
    tech: ['TypeScript', 'Angular', 'Node.js'],
    highlights: [
      'Designed an accessible information hub for kindergarten profiles.',
      'Focused on parent↔institution communication flows.',
    ],
    source: 'personal',
  },
  {
    id: 'maltzah',
    title: 'Maltzah — CloudCollector',
    period: 'Binariks',
    domain: 'Ops',
    summary:
      'Internal carpet manufacturing OPS system covering orders, production, payments, delivery, roles/permissions, and multi-image design configuration.',
    tech: [
      'Angular',
      'RxJS',
      'Angular Material',
      'Jasmine',
      'Laravel',
      'ImageMagick',
      'Redis',
      'SQS',
      'MySQL',
      'AWS',
      'Pulumi',
    ],
    highlights: [
      'Processed and calculated uploaded client designs.',
      'Formed invoices for customized orders.',
      'Coordinated simultaneous module communication and performance fixes.',
    ],
    source: 'work',
  },
  {
    id: 'eatstreat',
    title: 'EatStreat',
    period: 'Binariks',
    domain: 'Delivery',
    summary:
      'iPad platform connecting restaurants with delivery services — receive, process, and track orders from placement to delivery, including AngularJS→Angular migration.',
    tech: [
      'Angular.js',
      'Angular',
      'RxJS',
      'Ionic',
      'AWS',
      'NgRx',
      'Protractor',
      'Jasmine',
    ],
    highlights: [
      'Ported legacy AngularJS features to modern Angular.',
      'Supported and extended restaurant order workflows.',
      'Estimated and planned delivery with the team.',
    ],
    source: 'work',
  },
  {
    id: 'wizdi',
    title: 'WIZDI',
    period: 'Binariks',
    domain: 'Learning',
    summary:
      'Interactive learning platform for teachers and students — hybrid activities, materials, and iframe integrations from external exercise providers with role-based access.',
    tech: [
      'Angular',
      'ASP.NET Core',
      'Entity Framework Core',
      '.NET',
      'SQL Server',
      'MongoDB',
      'Redis',
      'Node.js',
      'xAPI',
      'LRS',
    ],
    highlights: [
      'Integrated external learning platforms into the core app.',
      'Built reusable Angular components and UI templates.',
      'Worked in a cross-functional delivery team.',
    ],
    source: 'work',
  },
  {
    id: 'aleph',
    title: 'Aleph',
    period: 'Binariks',
    domain: 'Tooling',
    summary:
      'Military-tech tooling for artillery processes — preparation, shooting trajectory, group building, and group management.',
    tech: ['Angular', 'RxJS', 'Angular Material'],
    highlights: [
      'Designed and maintained trajectory and group-management features.',
      'Supported production reliability and bug fixing.',
    ],
    source: 'work',
  },
  {
    id: 'medvisit',
    title: 'Medvisit',
    period: 'Binariks',
    domain: 'Health',
    summary:
      'Digital healthcare platform for booking doctor visits, medical request forms, profiles, visit history, and care evaluation with multilingual responsive UI.',
    tech: ['Angular', 'Angular Material', 'Bootstrap', 'REST API'],
    highlights: [
      'Delivered patient flows for auth, visit requests, profile, and history.',
      'Built complex reactive forms with validation for medical requests.',
      'Improved UX with toasts, loaders, and validation states.',
    ],
    source: 'work',
  },
  {
    id: 'admin-tool',
    title: 'Administration Tool',
    period: 'Binariks',
    domain: 'Internal',
    summary:
      'Internal tool for managers and accountants to manage time reports, employee task time, calendar leave (vacation/sick), and workforce distribution across projects.',
    tech: [
      'Angular',
      'RxJS',
      'Angular Material',
      'ASP.NET Core',
      'Entity Framework Core',
      '.NET',
      'SQL Server',
    ],
    highlights: [
      'Implemented department-driven reporting and leave workflows.',
      'Resolved performance issues across modules.',
      'Collaborated closely with BAs and QAs.',
    ],
    source: 'work',
  },
]

export function orderedByIds(ids: string[]): Project[] {
  return ids
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p))
}

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

export function getWorkProjects(): Project[] {
  const ordered = orderedByIds(WORK_ORDER)
  const rest = projects.filter(
    (p) => p.source === 'work' && !WORK_ORDER.includes(p.id),
  )
  return [...ordered, ...rest]
}

export function getPetProjects(): Project[] {
  const ordered = orderedByIds(PET_ORDER)
  const rest = projects.filter(
    (p) => p.source === 'personal' && !PET_ORDER.includes(p.id),
  )
  return [...ordered, ...rest]
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
