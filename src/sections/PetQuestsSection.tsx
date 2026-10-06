import { getPetProjects } from '@/data/projects'
import { ChapterFrame } from '@/components/ChapterFrame'
import { QuestCard } from '@/components/QuestCard'
import styles from './PetQuestsSection.module.css'

export function PetQuestsSection({ active }: { active: boolean }) {
  return (
    <section
      id="petQuests"
      className={styles.section}
      aria-labelledby="pet-quests-title"
    >
      <ChapterFrame kicker="Pet quests" title="Built end-to-end" active={active}>
        <p className={styles.lead} id="pet-quests-title">
          Personal and PDP builds — stack and highlights on each card.
        </p>
      </ChapterFrame>
      <div className={styles.list}>
        {getPetProjects().map((project, index) => (
          <QuestCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
