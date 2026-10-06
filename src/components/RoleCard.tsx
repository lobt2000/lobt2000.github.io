import type { Role } from '@/data/types'
import { getProjectById } from '@/data/projects'
import styles from './RoleCard.module.css'

export function RoleCard({ role }: { role: Role }) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3>
          {role.company}
        </h3>
        <p className={styles.period}>{role.period}</p>
      </header>
      <p className={styles.meta}>
        {role.title} · {role.location} · {role.employment}
      </p>
      <p className={styles.summary}>{role.summary}</p>
      <ul className={styles.related}>
        {role.relatedProjectIds.map((id) => {
          const project = getProjectById(id)
          return project ? <li key={id}>{project.title}</li> : null
        })}
      </ul>
      <details className={styles.details}>
        <summary>Responsibilities</summary>
        <ul>
          {role.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
    </article>
  )
}
