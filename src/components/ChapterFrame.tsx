import type { ReactNode } from 'react'
import styles from './ChapterFrame.module.css'

interface ChapterFrameProps {
  kicker: string
  title: string
  active?: boolean
  children?: ReactNode
}

export function ChapterFrame({
  kicker,
  title,
  active,
  children,
}: ChapterFrameProps) {
  return (
    <header className={styles.header}>
      <p className={active ? styles.kickerActive : styles.kicker}>
        {active ? `You are here · ${kicker}` : kicker}
      </p>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </header>
  )
}
