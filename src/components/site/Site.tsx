import { useLenis } from '../../hooks/useLenis'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useReveal } from '../../hooks/useReveal'
import { Celebrations } from '../celebrations/Celebrations'
import { Countdown } from '../countdown/Countdown'
import { DateReveal } from '../date/DateReveal'
import { FamilyBlessings } from '../family/FamilyBlessings'
import { Footer } from '../footer/Footer'
import { Hero } from '../hero/Hero'
import { ThingsToKnow } from '../info/ThingsToKnow'
import { Instagram } from '../instagram/Instagram'
import { Wishes } from '../wishes/Wishes'

export function Site() {
  const reduced = usePrefersReducedMotion()
  useLenis(!reduced)
  useReveal(!reduced)

  return (
    <main>
      <a className="skip" href="#family">
        Skip to the families
      </a>
      <Hero reduced={reduced} />
      <FamilyBlessings />
      <DateReveal />
      <Countdown />
      <Celebrations />
      <Wishes />
      <ThingsToKnow />
      <Instagram />
      <Footer />
    </main>
  )
}
