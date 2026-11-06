import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { PartyPoppers } from '../ornament/PartyPoppers'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { fetchSharedWishes, publishSharedWish, wishesAreShared } from '../../lib/guestbook'
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
  const shared = wishesAreShared()
  const [wishes, setWishes] = useState<Wish[]>(() => (shared ? [] : loadWishes()))
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [burst, setBurst] = useState(0)
  const [sending, setSending] = useState(false)
  const [note, setNote] = useState('')
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!shared) return
    let ignore = false
    fetchSharedWishes()
      .then((list) => {
        if (!ignore) setWishes(list)
      })
      .catch(() => {
        if (!ignore) setNote('The wish list could not be loaded. Please try again in a moment.')
      })
    return () => {
      ignore = true
    }
  }, [shared])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextName = name.trim().slice(0, 60)
    const nextMessage = message.trim().slice(0, 280)
    if (!nextName || !nextMessage || sending) return
    if (!reduced) setBurst((count) => count + 1)

    if (!shared) {
      const next: Wish = {
        id: crypto.randomUUID(),
        name: nextName,
        message: nextMessage,
        createdAt: new Date().toISOString(),
      }
      const updated = [next, ...wishes].slice(0, 80)
      setWishes(updated)
      saveWishes(updated)
      setName('')
      setMessage('')
      return
    }

    setSending(true)
    setNote('')
    publishSharedWish(nextName, nextMessage)
      .then((saved) => {
        setWishes((current) => [saved, ...current.filter((wish) => wish.id !== saved.id)].slice(0, 80))
        setName('')
        setMessage('')
      })
      .catch(() => {
        setNote('The blessing could not be sent. Please try again.')
      })
      .finally(() => setSending(false))
  }

  return (
    <section className="band band--cream" id="wishes">
      <SectionHeading
        eyebrow="For the couple"
        title="Leave a wish"
        lede={
          shared
            ? 'A blessing for the couple, read by everyone who opens this page.'
            : 'A blessing kept on this device, until the day we read them together.'
        }
      />
      <div className="wishes" data-reveal="">
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
          <span className="wish-send">
            {burst > 0 && !reduced ? <PartyPoppers key={burst} button /> : null}
            <button className="button" type="submit" disabled={sending}>
              {sending ? 'Sending' : 'Send a blessing'}
            </button>
          </span>
          {note ? <p className="wish-note">{note}</p> : null}
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
