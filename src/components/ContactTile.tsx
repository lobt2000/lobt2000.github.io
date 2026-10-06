import styles from './ContactTile.module.css'

interface ContactTileProps {
  label: string
  value: string
  href: string
}

export function ContactTile({ label, value, href }: ContactTileProps) {
  return (
    <a className={styles.tile} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </a>
  )
}
