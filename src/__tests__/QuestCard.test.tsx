import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuestCard } from '@/components/QuestCard'
import { getProjectById } from '@/data/projects'

describe('QuestCard', () => {
  it('shows drawer details inline on the card', () => {
    const project = getProjectById('money')
    render(<QuestCard project={project!} index={0} />)

    expect(screen.getByRole('heading', { name: /the money/i })).toBeInTheDocument()
    expect(screen.getByText('Fastify')).toBeInTheDocument()
    expect(
      screen.getByText(/architected e-wallet registration/i),
    ).toBeInTheDocument()
  })

  it('does not render demo or source when urls are absent', () => {
    const project = getProjectById('botsi')
    render(<QuestCard project={project!} index={0} />)
    expect(screen.queryByRole('link', { name: /open demo/i })).toBeNull()
    expect(screen.queryByRole('link', { name: /source/i })).toBeNull()
  })
})
