import { useEffect, useState } from 'react'
import type { SectionId } from '@/data/types'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

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

export function useScrollJourney(sectionIds: SectionId[]) {
  const reducedMotion = usePrefersReducedMotion()
  const [state, setState] = useState({
    activeId: sectionIds[0],
    progress: 0,
    pathProgress: 0,
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
        pathProgress: result.pathProgress,
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
