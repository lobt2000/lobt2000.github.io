import type { EducationData } from './types'

export const education: EducationData = {
  degrees: [
    {
      id: 'msc',
      degree: 'MSc in Computer Engineering',
      school: 'Lviv Polytechnic National University',
      period: 'September 2022 – December 2023',
    },
    {
      id: 'bsc',
      degree: 'BSc in Computer Engineering',
      school: 'Lviv Polytechnic National University',
      period: 'September 2018 – June 2022',
    },
  ],
  languages: [
    { name: 'Ukrainian', level: 'Native' },
    { name: 'English', level: 'Upper-Intermediate' },
  ],
}
