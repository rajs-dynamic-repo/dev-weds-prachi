import { wedding } from '../../content/wedding'
import { useCountdown } from '../../hooks/useCountdown'
import { SectionHeading } from '../layout/SectionHeading'

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function Tick({ value, label }: { value: string; label: string }) {
  return (
    <div className="tick">
      <span className="tick__num" key={value}>
        {value}
      </span>
      <span className="tick__label">{label}</span>
    </div>
  )
}

export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(wedding.dateISO)

  return (
    <section className="band band--wine" id="countdown">
      <SectionHeading
        tone="wine"
        eyebrow='Until we say "I do"'
        title="The countdown is on"
      />
      <div className="ticks" data-reveal-stagger="">
        <Tick value={pad(days)} label="Days" />
        <Tick value={pad(hours)} label="Hours" />
        <Tick value={pad(minutes)} label="Minutes" />
        <Tick value={pad(seconds)} label="Seconds" />
      </div>
      <p className="countdown__when" data-reveal="">
        {done ? 'The day is here' : `${wedding.dateShort} · ${wedding.city}`}
      </p>
    </section>
  )
}
