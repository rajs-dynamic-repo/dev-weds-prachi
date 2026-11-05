import { wedding } from '../../content/wedding'
import { FlowerMark, Kalash, Swastik } from '../ornament/ornaments'

export function Footer() {
  return (
    <footer className="footer">
      <Swastik className="footer__mark" />
      <div className="footer__copy">
        <FlowerMark tone="dark" className="footer__flower" />
        <p className="footer__names">
          {wedding.groom.name} <em>&</em> {wedding.bride.name}
        </p>
        <p className="footer__date">
          {wedding.dateDisplay} · {wedding.venue.name}, {wedding.city}
        </p>
        <p className="footer__note">With love, and with room for you</p>
      </div>
      <Kalash className="footer__mark" />
    </footer>
  )
}
