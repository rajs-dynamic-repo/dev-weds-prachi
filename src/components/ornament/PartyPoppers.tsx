import type { CSSProperties } from 'react'

const BURST = [
  { x: -36, y: -92, r: -28, d: '0ms', c: '#FBF6EE', s: '11px', round: false },
  { x: -78, y: -110, r: 36, d: '30ms', c: '#6E2433', s: '10px', round: true },
  { x: -118, y: -58, r: 16, d: '10ms', c: '#E4D0A8', s: '13px', round: false },
  { x: -54, y: -28, r: -64, d: '60ms', c: '#C4A574', s: '9px', round: true },
  { x: -132, y: -8, r: 48, d: '20ms', c: '#FBF6EE', s: '12px', round: false },
  { x: -88, y: 34, r: -40, d: '40ms', c: '#6E2433', s: '10px', round: false },
  { x: -146, y: -84, r: 80, d: '70ms', c: '#E8C97A', s: '8px', round: true },
  { x: 28, y: -74, r: 18, d: '15ms', c: '#FBF6EE', s: '11px', round: true },
  { x: 18, y: -40, r: -22, d: '45ms', c: '#E4D0A8', s: '14px', round: false },
  { x: -24, y: 46, r: 60, d: '55ms', c: '#6E2433', s: '9px', round: true },
  { x: -102, y: -128, r: -12, d: '25ms', c: '#F6F0E6', s: '8px', round: true },
  { x: 46, y: -18, r: 30, d: '35ms', c: '#C4A574', s: '10px', round: false },
]

const INSIDE = [
  { x: -22, y: -46, r: -28, d: '0ms', c: '#FBF6EE', s: '11px', round: false },
  { x: -48, y: -34, r: 36, d: '30ms', c: '#6E2433', s: '10px', round: true },
  { x: -58, y: -6, r: 16, d: '10ms', c: '#E4D0A8', s: '13px', round: false },
  { x: -18, y: 32, r: -64, d: '60ms', c: '#C4A574', s: '9px', round: true },
  { x: -44, y: 18, r: 48, d: '20ms', c: '#FBF6EE', s: '12px', round: false },
  { x: -36, y: -58, r: -40, d: '40ms', c: '#6E2433', s: '10px', round: false },
  { x: 10, y: -40, r: 18, d: '15ms', c: '#FBF6EE', s: '11px', round: true },
  { x: 6, y: 24, r: -22, d: '45ms', c: '#E4D0A8', s: '14px', round: false },
  { x: -8, y: 44, r: 60, d: '55ms', c: '#6E2433', s: '9px', round: true },
  { x: 16, y: -12, r: 30, d: '35ms', c: '#C4A574', s: '10px', round: false },
]

function bitStyle(bit: (typeof BURST)[number]): CSSProperties {
  return {
    ['--x' as string]: `${bit.x}px`,
    ['--y' as string]: `${bit.y}px`,
    ['--r' as string]: `${bit.r}deg`,
    ['--d' as string]: bit.d,
    ['--c' as string]: bit.c,
    ['--s' as string]: bit.s,
  }
}

export function PartyPoppers({ contained = false }: { contained?: boolean }) {
  const bits = contained ? INSIDE : BURST
  return (
    <div className={contained ? 'poppers poppers--in' : 'poppers'} aria-hidden="true">
      <span className="popper popper--left">
        {bits.map((bit, index) => (
          <i key={index} className={bit.round ? 'popper__bit is-round' : 'popper__bit'} style={bitStyle(bit)} />
        ))}
      </span>
      <span className="popper popper--right">
        {bits.map((bit, index) => (
          <i key={index} className={bit.round ? 'popper__bit is-round' : 'popper__bit'} style={bitStyle(bit)} />
        ))}
      </span>
    </div>
  )
}
