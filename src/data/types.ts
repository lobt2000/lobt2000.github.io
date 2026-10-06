export type SectionId =
  | 'intro'
  | 'skills'
  | 'workQuests'
  | 'petQuests'
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
  domain: string
  summary: string
  tech: string[]
  highlights: string[]
  source: ProjectSource
  featured?: boolean
  demoUrl?: string
  sourceUrl?: string
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
  { id: 'skills', label: 'Skills' },
  { id: 'workQuests', label: 'Work' },
  { id: 'petQuests', label: 'Pets' },
  { id: 'experience', label: 'Campaign' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
