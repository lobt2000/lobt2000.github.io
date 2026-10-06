import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    id: 'frameworks',
    title: 'Frameworks',
    items: [
      'Angular',
      'React',
      'Next.js',
      'Ionic',
      'Node.js',
      'Fastify',
      'Express',
    ],
  },
  {
    id: 'ui',
    title: 'UI',
    items: [
      'HTML5',
      'CSS3',
      'SCSS/SASS/LESS',
      'Bootstrap',
      'Angular Material',
      'MUI',
    ],
  },
  {
    id: 'state',
    title: 'State & Reactive',
    items: ['RxJS', 'NgRx', 'Redux/RTK'],
  },
  {
    id: 'languages',
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python (basic)', 'C# (basic)'],
  },
  {
    id: 'data',
    title: 'Data',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Prisma'],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    items: ['Docker', 'GitHub Actions', 'Azure DevOps', 'AWS', 'Git'],
  },
  {
    id: 'other',
    title: 'Other',
    items: [
      'WebSockets',
      'Web Workers',
      'Chart.js',
      'AmCharts',
      'Firebase',
      'JWT',
      'Medusa',
    ],
  },
]
