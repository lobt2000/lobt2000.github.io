import { getWorkProjects } from '@/data/projects'
import { ChapterFrame } from '@/components/ChapterFrame'
import { QuestCard } from '@/components/QuestCard'
import styles from './WorkQuestsSection.module.css'

export function WorkQuestsSection({ active }: { active: boolean }) {
  return (
    <section
      id="workQuests"
      className={styles.section}
      aria-labelledby="work-quests-title"
    >
      <ChapterFrame kicker="Work quests" title="Shipped in production" active={active}>
        <p className={styles.lead} id="work-quests-title">
          Binariks and Botsi products — stack and highlights on each card.
        </p>
      </ChapterFrame>
      <div className={styles.list}>
        {getWorkProjects().map((project, index) => (
          <QuestCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
