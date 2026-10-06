import { experience } from '@/data/experience'
import { ChapterFrame } from '@/components/ChapterFrame'
import { RoleCard } from '@/components/RoleCard'
import styles from './ExperienceSection.module.css'

export function ExperienceSection({ active }: { active: boolean }) {
  return (
    <section
      id="experience"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <ChapterFrame kicker="Campaign log" title="Experience" active={active}>
        <p className={styles.lead} id="experience-title">
          Production front-end and full-stack work across SaaS, ops, healthcare, and learning.
        </p>
      </ChapterFrame>
      <div className={styles.list}>
        {experience.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </section>
  )
}
