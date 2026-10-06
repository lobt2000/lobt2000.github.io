import { profile } from '@/data/profile'
import styles from './IntroSection.module.css'

export function IntroSection({ active }: { active: boolean }) {
  return (
    <section id="intro" className={styles.section} aria-label="Intro">
      <p className={active ? styles.eyebrowActive : styles.eyebrow}>
        {active ? 'You are here · Player profile · Online' : 'Player profile · Online'}
      </p>
      <h1 className={styles.name}>{profile.name}</h1>
      <p className={styles.title}>{profile.title}</p>
      <p className={styles.bio}>{profile.bio}</p>
      <div className={styles.actions}>
        <a className={styles.primary} href="#workQuests">
          View quests
        </a>
        <a className={styles.secondary} href="#experience">
          Campaign log
        </a>
      </div>
      <p className={styles.meta}>
        <span className={styles.dot} aria-hidden="true" />
        {profile.location}
      </p>
    </section>
  )
}
