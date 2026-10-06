import { education } from '@/data/education'
import { ChapterFrame } from '@/components/ChapterFrame'
import styles from './EducationSection.module.css'

export function EducationSection({ active }: { active: boolean }) {
  return (
    <section
      id="education"
      className={styles.section}
      aria-labelledby="education-title"
    >
      <ChapterFrame kicker="Education" title="Degrees & languages" active={active} />
      <div className={styles.columns} id="education-title">
        <div className={styles.panel}>
          <h3>Degrees</h3>
          <ul className={styles.list}>
            {education.degrees.map((degree) => (
              <li className={styles.item} key={degree.id}>
                <strong>{degree.degree}</strong>
                <span>
                  {degree.school} · {degree.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.panel}>
          <h3>Languages</h3>
          <ul className={styles.list}>
            {education.languages.map((language) => (
              <li className={styles.item} key={language.name}>
                <strong>{language.name}</strong>
                <span>{language.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
