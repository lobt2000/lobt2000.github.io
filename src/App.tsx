import { SECTIONS } from '@/data/types'
import { Nav } from '@/components/Nav'
import { JourneyRail } from '@/components/JourneyRail'
import { IntroSection } from '@/sections/IntroSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { WorkQuestsSection } from '@/sections/WorkQuestsSection'
import { PetQuestsSection } from '@/sections/PetQuestsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { EducationSection } from '@/sections/EducationSection'
import { ContactSection } from '@/sections/ContactSection'
import { useScrollJourney } from '@/hooks/useScrollJourney'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import styles from './App.module.css'

const sectionIds = SECTIONS.map((s) => s.id)

export default function App() {
  const journey = useScrollJourney(sectionIds)
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className={styles.shell}>
      <Nav activeId={journey.activeId} progress={journey.progress} />
      <div className={styles.layout}>
        <JourneyRail
          activeId={journey.activeId}
          pathProgress={journey.pathProgress}
          reducedMotion={reducedMotion}
        />
        <main className={styles.main}>
          <IntroSection active={journey.activeId === 'intro'} />
          <SkillsSection active={journey.activeId === 'skills'} />
          <WorkQuestsSection active={journey.activeId === 'workQuests'} />
          <PetQuestsSection active={journey.activeId === 'petQuests'} />
          <ExperienceSection active={journey.activeId === 'experience'} />
          <EducationSection active={journey.activeId === 'education'} />
          <ContactSection active={journey.activeId === 'contact'} />
        </main>
      </div>
    </div>
  )
}
