import { useEffect, useRef } from 'react'
import { wedding } from '../../content/wedding'
import { gsap } from '../../lib/gsap'
import { SectionHeading } from '../layout/SectionHeading'
import { FlowerMark, Mandala } from '../ornament/ornaments'

function FamilyColumn({
  label,
  parents,
  className,
}: {
  label: string
  parents: string[]
  className: string
}) {
  return (
    <div className={className}>
      <p className="eyebrow">{label}</p>
      <p className="parent">{parents[0]}</p>
      <p className="amp">&</p>
      <p className="parent">{parents[1]}</p>
    </div>
  )
}

export function FamilyBlessings() {
  const colsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cols = colsRef.current
    if (!cols) return
    const motion = gsap.matchMedia()
    motion.add('(min-width: 721px) and (prefers-reduced-motion: no-preference)', () => {
      const [groom, bride] = cols.querySelectorAll<HTMLElement>('.family__col')
      const play = { trigger: cols, start: 'top 82%', once: true }
      gsap.from(groom, {
        xPercent: 125,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { ...play },
      })
      gsap.from(bride, {
        xPercent: -125,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { ...play },
      })
    })
    return () => motion.revert()
  }, [])

  return (
    <section className="band band--cream" id="family">
      <SectionHeading title="Blessings from our families" />
      <div className="family" data-reveal="">
        <Mandala className="family__mandala" />
        <div className="family__cols" ref={colsRef}>
          <FamilyColumn
            className="family__col"
            label={wedding.groom.familyLabel}
            parents={wedding.groom.parents}
          />
          <div className="family__spine" aria-hidden="true">
            <span />
            <FlowerMark />
            <span />
          </div>
          <FamilyColumn
            className="family__col"
            label={wedding.bride.familyLabel}
            parents={wedding.bride.parents}
          />
        </div>
        <div className="family__quote">
          <p>{wedding.blessing}</p>
          <a className="link-quiet" href="#wishes">
            Leave us a wish
          </a>
        </div>
      </div>
    </section>
  )
}
