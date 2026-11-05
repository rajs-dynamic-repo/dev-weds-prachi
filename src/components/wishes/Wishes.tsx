import { useState } from 'react'
import type { FormEvent } from 'react'
import { SectionHeading } from '../layout/SectionHeading'
import { readWishes, saveWishes } from '../../lib/storage'
import type { Wish } from '../../lib/storage'

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(() => readWishes())
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

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
  }

  return (
    <section className="band band--cream" id="wishes">
      <SectionHeading
        eyebrow="For the couple"
        title="Leave a wish"
        lede="A blessing kept on this device, until the day we read them together."
      />
      <form className="wish-form" onSubmit={onSubmit} data-reveal="">
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
      <div className="wish-list">
        {wishes.length === 0 ? (
          <p className="wish-empty">Be the first to leave a blessing.</p>
        ) : (
          wishes.map((wish) => (
            <article className="wish" key={wish.id}>
              <p>{wish.message}</p>
              <cite>{wish.name}</cite>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
