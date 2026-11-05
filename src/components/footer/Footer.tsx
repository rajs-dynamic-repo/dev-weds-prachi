import { wedding } from '../../content/wedding'
import { FlowerMark } from '../ornament/ornaments'

export function Footer() {
  return (
    <footer className="footer">
      <FlowerMark tone="dark" />
      <p className="footer__names">
        {wedding.groom.name} <em>&</em> {wedding.bride.name}
      </p>
      <p className="footer__date">
        {wedding.dateDisplay} · {wedding.city}
      </p>
      <p className="footer__note">With love, and with room for you</p>
    </footer>
  )
}
