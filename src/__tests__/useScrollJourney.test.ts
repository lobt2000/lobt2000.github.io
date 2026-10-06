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
