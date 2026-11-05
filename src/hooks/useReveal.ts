import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 1.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
          },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
        gsap.from(group.children, {
          y: 28,
          opacity: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 84%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [enabled])
}

export function refreshScroll() {
  ScrollTrigger.refresh()
}
