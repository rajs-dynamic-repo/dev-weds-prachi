import { useState } from 'react'
import type { FormEvent } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { PartyPoppers } from '../ornament/PartyPoppers'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { readWishes, saveWishes } from '../../lib/storage'
import type { Wish } from '../../lib/storage'

function Heart() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        d="M12 19.2s-6.4-3.9-6.4-8.1A3.5 3.5 0 0 1 12 8.6a3.5 3.5 0 0 1 6.4 2.5c0 4.2-6.4 8.1-6.4 8.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

const sampleNames = new Set(['Paper check', 'Burst check'])

function loadWishes() {
  const saved = readWishes()
  const kept = saved.filter((wish) => !sampleNames.has(wish.name))
  if (kept.length !== saved.length) saveWishes(kept)
  return kept
}

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(() => loadWishes())
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [burst, setBurst] = useState(0)
  const reduced = usePrefersReducedMotion()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextName = name.trim()
    const nextMessage = message.trim()
    if (!nextName || !nextMessage) return
    const next: Wish = {
      id: crypto.randomUUID(),
      name: nextName.slice(0, 60),
      message: nextMessage.slice(0, 280),
      createdAt: new Date().toISOString(),
    }
    const updated = [next, ...wishes].slice(0, 80)
    setWishes(updated)
    saveWishes(updated)
    setName('')
    setMessage('')
    setBurst((count) => count + 1)
  }

  return (
    <section className="band band--cream" id="wishes">
      <SectionHeading
        eyebrow="For the couple"
        title="Leave a wish"
        lede="A blessing kept on this device, until the day we read them together."
      />
      <div className="wishes" data-reveal="">
        {burst > 0 && !reduced ? <PartyPoppers key={burst} /> : null}
        <form className="wish-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Your name</span>
            <input
              name="name"
              autoComplete="name"
              maxLength={60}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Your wish</span>
            <textarea
              name="message"
              maxLength={280}
              rows={3}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />
          </label>
          <button className="button" type="submit">
            Send a blessing
          </button>
        </form>
        <aside className="wish-board" aria-label="Wishes for the couple">
          <h3 className="wish-board__title">
            <Heart />
            Wishes for the couple
          </h3>
          <div className="wish-scroll">
            {wishes.length === 0 ? (
              <p className="wish-empty">Be the first to leave a blessing.</p>
            ) : (
              wishes.map((wish) => (
                <article className="wish" key={wish.id}>
                  <p>&ldquo;{wish.message}&rdquo;</p>
                  <cite>— {wish.name}</cite>
                </article>
              ))
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
