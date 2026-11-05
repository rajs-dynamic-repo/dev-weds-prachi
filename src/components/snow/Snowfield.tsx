import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Flake = {
  x: number
  y: number
  r: number
  s: number
  a: number
  w: number
  phase: number
}

export function Snowfield() {
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
    const flakes: Flake[] = []

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const make = (): Flake => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      r: Math.random() * 3.4 + 1.4,
      s: Math.random() * 0.55 + 0.28,
      a: Math.random() * 0.38 + 0.42,
      w: Math.random() * 0.55 + 0.15,
      phase: Math.random() * Math.PI * 2,
    })

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.shadowBlur = 0
      ctx.clearRect(0, 0, width, height)
      for (const flake of flakes) {
        if (!reduced && running) {
          flake.y += flake.s
          flake.x += Math.sin(flake.y * 0.012 + flake.phase) * flake.w * 0.4
          if (flake.y > height + 6) {
            flake.y = -6
            flake.x = Math.random() * width
          }
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,252,248,${flake.a})`
        ctx.shadowColor = 'rgba(255,255,255,0.85)'
        ctx.shadowBlur = flake.r * 3
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2)
        ctx.fill()
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
      const area = canvas.clientWidth * canvas.clientHeight
      const count = reduced ? 28 : Math.min(160, Math.max(80, Math.round(area / 18000)))
      for (let index = 0; index < count; index += 1) flakes.push(make())
      draw()
    }

    start()

    const onResize = () => resize()
    const onVisibility = () => {
      running = !document.hidden
      if (running && !looping && !reduced) draw()
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={ref} className="snow" aria-hidden="true" />
}
