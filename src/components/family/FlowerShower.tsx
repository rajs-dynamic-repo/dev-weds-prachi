import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const SIZES = [15, 20, 25]
const COLORS = ['#6E2433', '#A68456', '#C4A574']

type Bloom = {
  x: number
  y: number
  size: number
  speed: number
  sway: number
  phase: number
  spin: number
  turn: number
  color: string
  alpha: number
}

function paintBloom(ctx: CanvasRenderingContext2D, bloom: Bloom) {
  ctx.save()
  ctx.translate(bloom.x, bloom.y)
  ctx.rotate(bloom.spin)
  ctx.globalAlpha = bloom.alpha
  ctx.fillStyle = bloom.color
  for (let petal = 0; petal < 6; petal += 1) {
    ctx.save()
    ctx.rotate((Math.PI * 2 * petal) / 6)
    ctx.beginPath()
    ctx.ellipse(0, -bloom.size * 0.22, bloom.size * 0.13, bloom.size * 0.28, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(0, 0, bloom.size * 0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

export function FlowerShower() {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frame = 0
    let running = true
    let looping = false
    let cancelled = false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const blooms: Bloom[] = []

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const make = (width: number, height: number): Bloom => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: SIZES[Math.floor(Math.random() * SIZES.length)],
      speed: 0.22 + Math.random() * 0.28,
      sway: 0.25 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      spin: Math.random() * Math.PI * 2,
      turn: (Math.random() - 0.5) * 0.004,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.12 + Math.random() * 0.1,
    })

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      for (const bloom of blooms) {
        if (!reduced && running) {
          bloom.y += bloom.speed
          bloom.x += Math.sin(bloom.y * 0.01 + bloom.phase) * bloom.sway * 0.35
          bloom.spin += bloom.turn
          if (bloom.y > height + bloom.size) {
            bloom.y = -bloom.size
            bloom.x = Math.random() * width
          }
        }
        paintBloom(ctx, bloom)
      }
      if (!reduced && running) {
        looping = true
        frame = requestAnimationFrame(draw)
      } else {
        looping = false
      }
    }

    const start = () => {
      if (cancelled) return
      if (canvas.clientWidth < 2) {
        frame = requestAnimationFrame(start)
        return
      }
      resize()
      const count = Math.min(26, Math.max(14, Math.round((canvas.clientWidth * canvas.clientHeight) / 52000)))
      for (let index = 0; index < count; index += 1) blooms.push(make(canvas.clientWidth, canvas.clientHeight))
      draw()
    }

    start()

    const onResize = () => {
      const before = canvas.clientHeight
      resize()
      const grown = canvas.clientHeight - before
      if (grown > 40) {
        const extra = Math.round((canvas.clientWidth * grown) / 52000)
        for (let index = 0; index < extra; index += 1) {
          blooms.push(make(canvas.clientWidth, canvas.clientHeight))
        }
      }
    }
    const onVisibility = () => {
      running = !document.hidden
      if (running && !looping && !reduced) draw()
    }
    const observer = new ResizeObserver(onResize)
    observer.observe(canvas.parentElement ?? canvas)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={ref} className="flower-shower" aria-hidden="true" />
}
