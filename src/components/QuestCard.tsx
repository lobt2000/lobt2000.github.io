import type { Project } from '@/data/types'
import styles from './QuestCard.module.css'

interface QuestCardProps {
  project: Project
  index: number
}

export function QuestCard({ project, index }: QuestCardProps) {
  return (
    <article className={`${styles.card} ${project.source === 'personal' ? styles.pet : ''}`}>
      <header className={styles.header}>
        <span className={styles.kicker}>
          Quest {String(index + 1).padStart(2, '0')} · {project.domain}
        </span>
        <span className={styles.period}>{project.period}</span>
      </header>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.summary}>{project.summary}</p>
      <h4 className={styles.subhead}>Tech</h4>
      <ul className={styles.tech}>
        {project.tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h4 className={styles.subhead}>Highlights</h4>
      <ul className={styles.highlights}>
        {project.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {(project.demoUrl || project.sourceUrl) && (
        <div className={styles.links}>
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              Open demo
            </a>
          ) : null}
          {project.sourceUrl ? (
            <a href={project.sourceUrl} target="_blank" rel="noreferrer">
              Source
            </a>
          ) : null}
        </div>
      )}
    </article>
  )
}
