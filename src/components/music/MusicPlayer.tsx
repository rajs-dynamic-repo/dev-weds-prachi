import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { FlowerMark } from '../ornament/ornaments'

type MusicContextValue = {
  play: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const value = useContext(MusicContext)
  if (!value) throw new Error('Music player is not mounted')
  return value
}

const SRC = `${import.meta.env.BASE_URL}audio/ambient.wav`
const VOLUME = 0.34

export function MusicProvider({ armed, children }: { armed: boolean; children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const startedRef = useRef(false)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (startedRef.current) {
      if (audio.paused) {
        void audio.play().then(() => setStarted(true)).catch(() => undefined)
      }
      return
    }
    startedRef.current = true
    audio.muted = false
    setMuted(false)
    audio.volume = VOLUME
    void audio
      .play()
      .then(() => setStarted(true))
      .catch(() => {
        startedRef.current = false
        setStarted(false)
      })
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !startedRef.current) {
      play()
      return
    }
    audio.muted = !audio.muted
    setMuted(audio.muted)
    if (!audio.muted) audio.volume = VOLUME
  }, [play])

  useEffect(() => {
    if (!armed || started) return
    play()
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest('[data-music-toggle]')) return
      play()
    }
    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [armed, play, started])

  const quiet = !started || muted

  return (
    <MusicContext.Provider value={{ play }}>
      {children}
      <audio ref={audioRef} src={SRC} loop preload="auto" playsInline />
      <button
        type="button"
        className="music"
        data-music-toggle=""
        data-playing={started && !muted ? 'true' : 'false'}
        aria-pressed={started && !muted}
        aria-label={quiet ? 'Play music' : 'Mute music'}
        onClick={toggle}
      >
        <FlowerMark bare className="music__flower" />
        {quiet ? <span className="music__slash" /> : null}
      </button>
    </MusicContext.Provider>
  )
}
