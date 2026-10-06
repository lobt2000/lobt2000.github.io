import { profile } from '@/data/profile'
import { ChapterFrame } from '@/components/ChapterFrame'
import { ContactTile } from '@/components/ContactTile'
import styles from './ContactSection.module.css'

export function ContactSection({ active }: { active: boolean }) {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <ChapterFrame kicker="Invite" title="Let’s talk" active={active}>
        <p className={styles.lead} id="contact-title">
          Open to interesting front-end and full-stack product work.
        </p>
      </ChapterFrame>
      <div className={styles.grid}>
        <ContactTile
          label="Email"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <ContactTile
          label="Phone"
          value={profile.phone}
          href={`tel:${profile.phone.replace(/\s/g, '')}`}
        />
        <ContactTile
          label="LinkedIn"
          value="bohdan-kolodiy"
          href={profile.linkedin}
        />
        <ContactTile label="GitHub" value="lobt2000" href={profile.github} />
      </div>
      <p className={styles.footer}>
        © {new Date().getFullYear()} {profile.name}. Built with React + Vite ·
        Deployed on GitHub Pages.
      </p>
    </section>
  )
}
