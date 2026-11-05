import { wedding } from '../../content/wedding'
import { CornerFlowers, FlowerMark, Rule } from '../ornament/ornaments'

export function Invitation() {
  return (
    <section className="band band--cream" id="invitation">
      <div className="invite" data-reveal="">
        <CornerFlowers />
        <FlowerMark className="invite__seal" />
        <p className="eyebrow">Together with their families</p>
        <h2 className="invite__names">
          {wedding.groom.name} <em>&</em> {wedding.bride.name}
        </h2>
        <p className="invite__copy">{wedding.invitation}</p>
        <Rule />
        <p className="invite__when">
          {wedding.weekday}, {wedding.dateDisplay}
        </p>
        <p className="invite__where">
          {wedding.venue.name} · {wedding.city}
        </p>
      </div>
    </section>
  )
}
