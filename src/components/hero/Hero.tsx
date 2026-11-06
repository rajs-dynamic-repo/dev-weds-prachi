import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { wedding } from '../../content/wedding'
import { gsap } from '../../lib/gsap'
import { Jasmine, LeafSprig, Lotus, Mandala, Marigold, Rose } from '../ornament/ornaments'

const blooms = [
  { kind: 'marigold', size: 250, fx: -70, fy: -36, fr: -10, x: -700, y: -300, r: -28 },
  { kind: 'rose', size: 210, fx: 96, fy: 8, fr: 8, x: 660, y: -260, r: 22 },
  { kind: 'lotus', size: 230, fx: -30, fy: 54, fr: -4, x: -580, y: 270, r: -16 },
  { kind: 'jasmine', size: 130, fx: 150, fy: -48, fr: 12, x: 520, y: 290, r: 18 },
  { kind: 'marigold', size: 180, fx: -160, fy: 16, fr: 6, x: -400, y: -410, r: 14 },
  { kind: 'rose', size: 170, fx: 18, fy: 120, fr: -12, x: 320, y: 400, r: -20 },
  { kind: 'leaf', size: 210, fx: -130, fy: -120, fr: -18, x: -760, y: 50, r: -36 },
  { kind: 'jasmine', size: 120, fx: 170, fy: 78, fr: 10, x: 740, y: 100, r: 24 },
  { kind: 'lotus', size: 190, fx: -16, fy: -130, fr: 4, x: 36, y: -460, r: 10 },
  { kind: 'marigold', size: 156, fx: 86, fy: 140, fr: -6, x: -210, y: 440, r: -10 },
  { kind: 'leaf', size: 190, fx: 140, fy: -16, fr: 16, x: 760, y: -90, r: 28 },
] as const

function BloomArt({ kind }: { kind: (typeof blooms)[number]['kind'] }) {
  if (kind === 'rose') return <Rose />
  if (kind === 'lotus') return <Lotus />
  if (kind === 'jasmine') return <Jasmine />
  if (kind === 'leaf') return <LeafSprig />
  return <Marigold />
}

export function Hero({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLElement>(null)
  const [scale, setScale] = useState(() =>
    Math.min(1.85, Math.max(0.78, window.innerWidth / 1000)),
  )

  useEffect(() => {
    const onResize = () => setScale(Math.min(1.85, Math.max(0.78, window.innerWidth / 1000)))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (reduced || !root) return

    const ctx = gsap.context(() => {
      const factor = () => Math.max(0.48, Math.min(1, window.innerWidth / 1200))
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: '+=170%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      root.querySelectorAll<HTMLElement>('.bloom').forEach((el) => {
        const toX = Number(el.dataset.x)
        const toY = Number(el.dataset.y)
        const toR = Number(el.dataset.r)
        timeline.fromTo(
          el,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => Number(el.dataset.fx) * factor(),
            y: () => Number(el.dataset.fy) * factor(),
            rotation: Number(el.dataset.fr),
            scale: Number(el.dataset.s),
          },
          {
            xPercent: -50,
            yPercent: -50,
            x: () => toX * factor(),
            y: () => toY * factor(),
            rotation: toR,
            scale: Number(el.dataset.s) * 0.86,
            ease: 'none',
          },
          0,
        )
      })

      timeline.fromTo(
        '.hero__names',
        { opacity: 0, y: 28, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none' },
        0,
      )
      timeline.fromTo(
        '.hero__meta',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'none' },
        0.42,
      )
      timeline.to('.hero__hint', { opacity: 0, ease: 'none' }, 0)
    }, root)

    return () => ctx.revert()
  }, [reduced, scale])

  return (
    <section className={reduced ? 'hero hero--still' : 'hero hero--animate'} id="top" ref={rootRef}>
      {reduced ? null : (
        blooms.map((bloom, index) => (
          <div
            key={`${bloom.kind}-${index}`}
            className={`bloom bloom--${bloom.kind}`}
            style={{ width: Math.round(bloom.size * scale) }}
            data-x={bloom.x}
            data-y={bloom.y}
            data-r={bloom.r}
            data-fx={bloom.fx}
            data-fy={bloom.fy}
            data-fr={bloom.fr}
            data-s={bloom.kind === 'leaf' ? 1 : 1.08}
          >
            <BloomArt kind={bloom.kind} />
          </div>
        ))
      )}
      <div className="hero__stage">
        {reduced ? <Mandala className="hero__mandala" /> : null}
        <h1 className="hero__names">
          <span>{wedding.groom.name}</span>
          <em>&</em>
          <span>{wedding.bride.name}</span>
        </h1>
        <div className="hero__meta">
          <p>Together with their families</p>
          <p className="hero__invite">Inviting you</p>
        </div>
      </div>
      {reduced ? null : (
        <p className="hero__hint">
          Scroll to reveal
          <i />
        </p>
      )}
    </section>
  )
}
