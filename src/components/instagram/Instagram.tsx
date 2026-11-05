import { wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'
import { FlowerMark } from '../ornament/ornaments'

export function Instagram() {
  const handle = wedding.instagram.replace('@', '').trim()
  const href = handle ? `https://instagram.com/${handle}` : undefined
  const frames = [0, 1, 2]

  return (
    <section className="band band--wine" id="instagram">
      <SectionHeading
        tone="wine"
        eyebrow="After the music"
        title="Moments we'll keep"
        lede={
          handle
            ? `Follow along @${handle}`
            : 'Photographs will gather here after the celebrations.'
        }
      />
      <div className="frames" data-reveal-stagger="">
        {frames.map((frame) => {
          const inner = (
            <>
              <FlowerMark tone="wine" />
              <span>Soon</span>
            </>
          )
          return href ? (
            <a className="frame" href={href} target="_blank" rel="noreferrer" key={frame}>
              {inner}
            </a>
          ) : (
            <div className="frame" key={frame}>
              {inner}
            </div>
          )
        })}
      </div>
      <p className="hashtag">#{wedding.hashtag}</p>
    </section>
  )
}
