import { SECTIONS, type SectionId } from '@/data/types'
import { profile } from '@/data/profile'
import styles from './Nav.module.css'

interface NavProps {
  activeId: SectionId
  progress: number
}

export function Nav({ activeId, progress }: NavProps) {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#intro">
          {profile.name}
        </a>
        <nav className={styles.links} aria-label="Primary">
          {SECTIONS.filter((section) => section.id !== 'contact').map(
            (section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={
                  activeId === section.id ? styles.linkActive : styles.link
                }
              >
                {section.label}
              </a>
            ),
          )}
          <a className={styles.skip} href="#contact">
            Skip to contact
          </a>
        </nav>
      </div>
      <div
        className={styles.progress}
        style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
        aria-hidden="true"
      />
    </header>
  )
}
