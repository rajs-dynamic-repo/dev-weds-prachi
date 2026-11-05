import { useEffect, useRef } from 'react'
import type { Side } from '../../content/wedding'
import { wedding } from '../../content/wedding'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { gsap } from '../../lib/gsap'
import { CornerFlowers, FlowerMark, Garland } from '../ornament/ornaments'
import { Snowfield } from '../snow/Snowfield'
import { useMusic } from '../music/MusicPlayer'

type FamilySidePromptProps = {
  onBegin: (side: Side) => void
  onDone: () => void
}

const sides: Side[] = ['groom', 'bride']

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function FamilySidePrompt({ onBegin, onDone }: FamilySidePromptProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const leaving = useRef(false)
  const reduced = usePrefersReducedMotion()
  const music = useMusic()

  useEffect(() => {
    if (reduced) return
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.gate__card', { y: 36, opacity: 0, duration: 1.05, ease: 'power3.out' })
      gsap.from('.bouquet__art', {
        scale: 0.72,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.12,
      })
      gsap.from('.choice', {
        y: 16,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        delay: 0.28,
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  const choose = (side: Side) => {
    if (leaving.current) return
    leaving.current = true
    music.play()
    onBegin(side)
    const root = rootRef.current
    const card = cardRef.current
    if (reduced || !root || !card) {
      onDone()
      return
    }
    gsap.to(card, { y: -16, scale: 0.985, duration: 0.75, ease: 'power2.inOut' })
    gsap.to(root, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: onDone,
    })
  }

  return (
    <div className="gate" ref={rootRef}>
      <Snowfield />
      <div className="gate__card" ref={cardRef}>
        <CornerFlowers />
        <Garland className="garland garland--top" />
        <Garland className="garland garland--bottom" />
        <FlowerMark className="gate__seal" />
        <h1 className="gate__title">
          Which side are you
          <br />
          joining us from?
        </h1>
        <div className="choices">
          {sides.map((side) => {
            const person = side === 'groom' ? wedding.groom : wedding.bride
            return (
              <button key={side} type="button" className="choice" onClick={() => choose(side)}>
                <span className="choice__kicker">{person.sideLabel}</span>
                <span className="choice__name">{person.name}</span>
                <span className="choice__go">
                  Continue <Arrow />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
