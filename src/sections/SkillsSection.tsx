import { skillGroups } from '@/data/skills'
import { ChapterFrame } from '@/components/ChapterFrame'
import { SkillGroupCard } from '@/components/SkillGroupCard'
import styles from './SkillsSection.module.css'

export function SkillsSection({ active }: { active: boolean }) {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <ChapterFrame kicker="Skills" title="Skills" active={active}>
        <p className={styles.lead} id="skills-title">
          Production skills across Angular, React, and Node.js.
        </p>
      </ChapterFrame>
      <div className={styles.grid}>
        {skillGroups.map((group) => (
          <SkillGroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  )
}
