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
