import { useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS, type SectionId } from '@/data/types'
import styles from './JourneyRail.module.css'

const PATH_D =
  'M70 8 C 110 80, 28 140, 80 210 S 24 330, 70 400 S 118 500, 70 580 S 36 620, 70 632'

interface JourneyRailProps {
  activeId: SectionId
  pathProgress: number
  reducedMotion: boolean
}

interface Point {
  id: SectionId
  x: number
  y: number
}

export function JourneyRail({
  activeId,
  pathProgress,
  reducedMotion,
}: JourneyRailProps) {
  const pathRef = useRef<SVGPathElement>(null)
  const [nodes, setNodes] = useState<Point[]>([])
  const [marker, setMarker] = useState({ x: 70, y: 16 })

  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    setNodes(
      SECTIONS.map((section, index) => {
        const t = index / Math.max(SECTIONS.length - 1, 1)
        const point = path.getPointAtLength(t * len)
        return { id: section.id, x: point.x, y: point.y }
      }),
    )
    const point = path.getPointAtLength(
      Math.min(Math.max(pathProgress, 0), 1) * len,
    )
    setMarker({ x: point.x, y: point.y })
  }, [pathProgress])

  return (
    <aside className={styles.rail} aria-label="Journey path">
      <p className={styles.caption}>Journey</p>
      <div className={styles.track}>
        <svg
          viewBox="0 0 140 640"
          preserveAspectRatio="none"
          className={styles.svg}
          role="img"
          aria-hidden="true"
        >
        <path d={PATH_D} className={styles.roadGlow} fill="none" />
        <path
          ref={pathRef}
          id="journey-road"
          d={PATH_D}
          className={styles.road}
          fill="none"
        />
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={activeId === node.id ? 6 : 4}
            className={
              activeId === node.id ? styles.nodeActive : styles.node
            }
          />
        ))}
        <circle
          cx={marker.x}
          cy={marker.y}
          r={7}
          className={styles.marker}
          style={{
            transition: reducedMotion ? 'none' : 'cx 180ms ease-out, cy 180ms ease-out',
          }}
        />
      </svg>
      </div>
    </aside>
  )
}
