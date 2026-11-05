import type { Side } from '../../content/wedding'
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
import { Invitation } from '../invitation/Invitation'
import { RSVP } from '../rsvp/RSVP'
import { Wishes } from '../wishes/Wishes'

export function Site({ side }: { side: Side | null }) {
  const reduced = usePrefersReducedMotion()
  useLenis(!reduced)
  useReveal(!reduced)

  return (
    <main>
      <a className="skip" href="#invitation">
        Skip to the invitation
      </a>
      <Hero reduced={reduced} />
      <Invitation />
      <Countdown />
      <DateReveal />
      <Celebrations />
      <FamilyBlessings />
      <Wishes />
      <RSVP side={side} />
      <ThingsToKnow />
      <Instagram />
      <Footer />
    </main>
  )
}
