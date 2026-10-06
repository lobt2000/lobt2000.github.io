import type { SkillGroup } from '@/data/types'
import styles from './SkillGroupCard.module.css'

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <article className={styles.card}>
      <h3>{group.title}</h3>
      <ul>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
