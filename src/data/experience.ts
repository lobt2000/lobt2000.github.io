import type { Role } from './types'

export const experience: Role[] = [
  {
    id: 'botsi-swytapp',
    company: 'SwytApp / Botsi',
    title: 'Software Engineer',
    location: 'Remote',
    period: 'February 2025 – January 2026',
    employment: 'Full-time',
    summary:
      'Front-end engineering on a SaaS platform that helps mobile teams configure subscriptions, paywalls, pricing, and promotional offers without app updates — with analytics, A/B testing, and role-based access.',
    responsibilities: [
      'Maintained and extended Paywall Builder flows for flexible monetization configuration.',
      'Identified and fixed performance bottlenecks to improve load times and UI responsiveness.',
      'Reviewed and approved pull requests against coding standards and best practices.',
      'Collaborated with designers and backend engineers on end-to-end delivery.',
      'Implemented UI improvements aligned with Angular best practices and modern architecture.',
    ],
    relatedProjectIds: ['botsi'],
  },
  {
    id: 'binariks',
    company: 'Binariks',
    title: 'Software Engineer',
    location: 'Lviv',
    period: 'February 2021 – present',
    employment:
      'Full-time Front-End (Feb 2021 – Jan 2025); Contractor Full-Stack (Jan 2025 – present)',
    summary:
      'Developed, optimized, and maintained user-facing features across Angular and React products; migrated legacy stacks; delivered admin panels, booking flows, and selected full-stack work with Node.js and modern data platforms.',
    responsibilities: [
      'Implemented and optimized new and existing product functionality.',
      'Migrated legacy systems (including AngularJS to Angular).',
      'Collaborated with cross-functional teams and integrated external platforms.',
      'Refactored application codebases for efficiency and maintainability.',
      'Built booking pages, admin panels, and specialized tooling (including trajectory tools).',
      'Wrote and ran unit and integration tests (Jasmine, Protractor).',
      'Developed React components with MUI and contributed to Next.js products.',
      'Maintained and supported live production projects.',
    ],
    relatedProjectIds: [
      'ghouse',
      'money',
      'maltzah',
      'eatstreat',
      'wizdi',
      'aleph',
      'medvisit',
      'admin-tool',
    ],
  },
]
