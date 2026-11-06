import { useEffect, useRef, useState } from 'react'
import type { TransitionEvent } from 'react'
import { wedding } from '../../content/wedding'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { SectionHeading } from '../layout/SectionHeading'
import { FlowerMark } from '../ornament/ornaments'

const FRAMES = [0, 1, 2]
const GAP = 16
const INTERVAL = 3200

export function Instagram() {
  const handle = wedding.instagram.replace('@', '').trim()
  const href = handle ? `https://instagram.com/${handle}` : undefined
  const reduced = usePrefersReducedMotion()
  const framesRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [order, setOrder] = useState(FRAMES)
  const [offset, setOffset] = useState(0)
  const [moving, setMoving] = useState(true)
  const [vertical, setVertical] = useState(false)
  const [card, setCard] = useState(0)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 720px)')
    const apply = () => setVertical(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const box = framesRef.current
    if (!box) return
    const measure = () => {
      const width = box.clientWidth
      const next = vertical ? width : (width - GAP * 2) / 3
      setCard(next)
      box.style.height = vertical ? `${next * 3 + GAP * 2}px` : `${next}px`
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(box)
    return () => observer.disconnect()
  }, [vertical])

  useEffect(() => {
    setOffset(0)
    setMoving(true)
  }, [vertical])

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (reduced) {
        setOrder((items) => [...items.slice(1), items[0]])
        return
      }
      setMoving(true)
      setOffset(1)
    }, INTERVAL)
    return () => window.clearInterval(timer)
  }, [reduced])

  const finish = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== trackRef.current || event.propertyName !== 'transform' || offset !== 1) return
    setMoving(false)
    setOrder((items) => [...items.slice(1), items[0]])
    setOffset(0)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMoving(true))
    })
  }

  const shown = reduced ? order : [...order, order[0]]
  const shift = offset * (card + GAP)
  const axis = vertical ? 'Y' : 'X'

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
      <div className="frames" ref={framesRef} data-axis={vertical ? 'y' : 'x'}>
        <div
          className="frames__track"
          ref={trackRef}
          onTransitionEnd={finish}
          style={{
            transform: `translate${axis}(-${shift}px)`,
            transition: moving && !reduced ? undefined : 'none',
          }}
        >
          {shown.map((frame, index) => {
            const duplicate = index === order.length
            const inner = (
              <>
                <FlowerMark tone="wine" />
                <span>Soon</span>
              </>
            )
            const style = card > 0 ? { width: card, height: card } : undefined
            if (href && !duplicate) {
              return (
                <a
                  className="frame"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={`${frame}-${index}`}
                  data-frame={frame}
                  style={style}
                >
                  {inner}
                </a>
              )
            }
            return (
              <div className="frame" key={`${frame}-${index}`} data-frame={frame} style={style} aria-hidden={duplicate || undefined}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
      <p className="hashtag">#{wedding.hashtag}</p>
    </section>
  )
}
