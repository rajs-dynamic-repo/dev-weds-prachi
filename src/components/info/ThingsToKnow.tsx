import { wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'

export function ThingsToKnow() {
  return (
    <section className="band band--cream" id="notes">
      <SectionHeading eyebrow="Before you travel" title="A few gentle notes" />
      <div className="notes" data-reveal-stagger="">
        {wedding.notes.map((note) => (
          <article className="note" key={note.title}>
            <h3>{note.title}</h3>
            <p>{note.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
