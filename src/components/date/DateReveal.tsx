import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { wedding } from '../../content/wedding'
import { SectionHeading } from '../layout/SectionHeading'

function paint(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.floor(rect.width * dpr))
  canvas.height = Math.max(1, Math.floor(rect.height * dpr))
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = '#6E2433'
  ctx.fillRect(0, 0, rect.width, rect.height)
  ctx.fillStyle = 'rgba(228, 208, 168, 0.55)'
  for (let y = 16; y < rect.height; y += 22) {
    for (let x = 16; x < rect.width; x += 22) {
      ctx.beginPath()
      ctx.moveTo(x, y - 3.2)
      ctx.lineTo(x + 3.2, y)
      ctx.lineTo(x, y + 3.2)
      ctx.lineTo(x - 3.2, y)
      ctx.closePath()
      ctx.fill()
    }
  }
  ctx.fillStyle = '#FBF6EE'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '500 13px Outfit, sans-serif'
  ctx.fillText('RUB HERE TO UNCOVER', rect.width / 2, rect.height / 2 - 12)
  ctx.font = '400 12px Outfit, sans-serif'
  ctx.fillStyle = 'rgba(251, 246, 238, 0.78)'
  ctx.fillText('Use your finger or cursor', rect.width / 2, rect.height / 2 + 14)
  return ctx
}

export function DateReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const lastRef = useRef<{ x: number; y: number } | null>(null)
  const drawing = useRef(false)
  const scratched = useRef(false)
  const moves = useRef(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let frame = 0
    let cancelled = false

    const draw = () => {
      if (cancelled || scratched.current) return
      const rect = canvas.getBoundingClientRect()
      if (rect.width < 2) {
        frame = requestAnimationFrame(draw)
        return
      }
      ctxRef.current = paint(canvas)
    }

    draw()
    document.fonts?.ready
      .then(() => {
        if (moves.current === 0) draw()
      })
      .catch(() => undefined)

    const onResize = () => {
      if (!scratched.current) draw()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const finish = () => {
    scratched.current = true
    setDone(true)
  }

  const sample = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    let total = 0
    const step = Math.max(16, Math.floor((width * height) / 4000)) * 4
    for (let index = 3; index < data.length; index += step) {
      total += 1
      if (data[index] < 28) clear += 1
    }
    if (total > 0 && clear / total > 0.56) finish()
  }

  const erase = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx || done) return
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = 'rgba(0,0,0,1)'
    ctx.lineWidth = 48
    ctx.beginPath()
    if (lastRef.current) {
      ctx.moveTo(lastRef.current.x, lastRef.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    } else {
      ctx.arc(x, y, 24, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
    lastRef.current = { x, y }
    moves.current += 1
    if (moves.current % 6 === 0) sample()
  }

  return (
    <section className="band band--cream" id="date">
      <SectionHeading
        eyebrow="Mark your calendar"
        title="A day to remember"
        lede="Scratch the card to discover the day we celebrate."
      />
      <div className="keepsake" data-reveal="">
        <p className="keepsake__label">
          <CalendarIcon /> A secret tucked inside
        </p>
        <div className="scratch" data-lenis-prevent="">
          <div className="scratch__secret">
            <p className="eyebrow">Save the date</p>
            <p className="scratch__day">{wedding.weekday}</p>
            <p className="scratch__date">{wedding.dateDisplay}</p>
            <p className="scratch__place">{wedding.city}</p>
          </div>
          <canvas
            ref={canvasRef}
            className={done ? 'is-done' : undefined}
            aria-label="Scratch the card to reveal the wedding date"
            onPointerDown={(event) => {
              if (done) return
              drawing.current = true
              event.currentTarget.setPointerCapture(event.pointerId)
              erase(event)
            }}
            onPointerMove={(event) => {
              if (drawing.current) erase(event)
            }}
            onPointerUp={() => {
              drawing.current = false
              lastRef.current = null
            }}
            onPointerCancel={() => {
              drawing.current = false
              lastRef.current = null
            }}
          />
        </div>
        <p className="keepsake__foot">A little keepsake for you</p>
      </div>
      <button type="button" className="button button--ghost reveal-date" onClick={finish}>
        Scratch to reveal the date
      </button>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}
