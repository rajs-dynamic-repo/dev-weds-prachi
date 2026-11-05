import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Side } from '../../content/wedding'
import { sideOf, wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Reply = {
  name: string
  side: string
  attending: 'yes' | 'no'
  guests: string
  note: string
}

export function RSVP({ side }: { side: Side | null }) {
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const guestSide = side ? sideOf(side) : null

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (attending !== 'yes' && attending !== 'no') {
      setError('Let us know if you can join.')
      return
    }
    const form = new FormData(event.currentTarget)
    const reply: Reply = {
      name: String(form.get('name') || '').trim(),
      side: guestSide ? guestSide.sideLabel : 'A guest',
      attending,
      guests: attending === 'yes' ? String(form.get('guests') || '1') : '0',
      note: String(form.get('note') || '').trim(),
    }
    if (!reply.name) {
      setError('Please add your name.')
      return
    }
    setError('')
    setStatus('sending')

    if (wedding.rsvpEndpoint) {
      try {
        const response = await fetch(wedding.rsvpEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(reply),
        })
        if (!response.ok) throw new Error('Could not send')
        setStatus('sent')
      } catch {
        setStatus('error')
        setError('The reply could not be sent. You can mail it instead.')
      }
      return
    }

    const params = new URLSearchParams({
      subject: `Wedding reply from ${reply.name}`,
      body: [
        `Name: ${reply.name}`,
        `Side: ${reply.side}`,
        `Attending: ${reply.attending === 'yes' ? 'Yes' : 'No'}`,
        `Guests: ${reply.guests}`,
        `Note: ${reply.note || '—'}`,
      ].join('\n'),
    })
    window.location.href = `mailto:${wedding.rsvpEmail}?${params.toString()}`
    setStatus('sent')
  }

  return (
    <section className="band band--wine" id="rsvp">
      <SectionHeading
        tone="wine"
        eyebrow="Kindly reply"
        title="Will you join us?"
        lede="A short note is all we need."
      />
      <div className="rsvp" data-reveal="">
        {status === 'sent' ? (
          <p className="form__success" role="status">
            {wedding.rsvpEndpoint
              ? 'Thank you. Your reply is with us.'
              : 'Thank you. Your mail app should open with the reply ready to send.'}
          </p>
        ) : (
          <form onSubmit={onSubmit}>
            {guestSide ? <p className="rsvp__side">Joining from {guestSide.name}&rsquo;s side</p> : null}
            <label className="field">
              <span>Your name</span>
              <input name="name" autoComplete="name" required maxLength={80} />
            </label>
            <div className="field">
              <span>Will you be there?</span>
              <div className="pills">
                <button
                  type="button"
                  className="pill"
                  aria-pressed={attending === 'yes'}
                  onClick={() => setAttending('yes')}
                >
                  With joy, yes
                </button>
                <button
                  type="button"
                  className="pill"
                  aria-pressed={attending === 'no'}
                  onClick={() => setAttending('no')}
                >
                  Not this time
                </button>
              </div>
            </div>
            {attending === 'yes' ? (
              <label className="field">
                <span>Guests, including you</span>
                <input name="guests" type="number" min={1} max={10} defaultValue={1} />
              </label>
            ) : null}
            <label className="field">
              <span>A note, if you wish</span>
              <textarea name="note" rows={3} maxLength={400} />
            </label>
            {error ? <p className="form__error">{error}</p> : null}
            <button className="button" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Send reply'}
            </button>
            {status === 'error' ? (
              <p className="form__error">
                <a href={`mailto:${wedding.rsvpEmail}`}>Open a mail draft</a>
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  )
}
