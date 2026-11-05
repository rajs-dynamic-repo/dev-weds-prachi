import { wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'
import { FlowerMark } from '../ornament/ornaments'

function Clock() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 8v4.5l3 2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Pin() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="11" r="1.6" fill="currentColor" />
    </svg>
  )
}

export function Celebrations() {
  return (
    <section className="band band--wine" id="celebrations">
      <SectionHeading
        tone="wine"
        eyebrow="Gather with us"
        title="The Celebrations"
        lede={wedding.celebrationLede}
      />
      <div className="timeline" aria-hidden="true">
        <span className="timeline__line" />
        {wedding.events.map((event) => (
          <span className="timeline__node" key={event.index}>
            <FlowerMark tone="wine" />
          </span>
        ))}
      </div>
      <div className="events" data-reveal-stagger="">
        {wedding.events.map((event) => (
          <article className="event" key={event.index}>
            <p className="event__index">{event.index}</p>
            <h3>{event.title}</h3>
            <p className="event__copy">{event.description}</p>
            <p className="event__meta">
              <Clock /> {event.time}
            </p>
            <p className="event__meta">
              <Pin /> {event.place}
            </p>
            {wedding.venue.mapUrl ? (
              <a className="way" href={wedding.venue.mapUrl} target="_blank" rel="noreferrer">
                Find your way
              </a>
            ) : null}
          </article>
        ))}
      </div>
      <p className="events__address" data-reveal="">
        {wedding.venue.address}
      </p>
    </section>
  )
}
