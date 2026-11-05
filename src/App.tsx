import { useState } from 'react'
import type { Side } from './content/wedding'
import { FamilySidePrompt } from './components/gate/FamilySidePrompt'
import { MusicProvider } from './components/music/MusicPlayer'
import { Site } from './components/site/Site'
import { readSide, saveSide } from './lib/storage'

export function App() {
  const [side, setSide] = useState<Side | null>(() => readSide())
  const [showSite, setShowSite] = useState(() => readSide() !== null)
  const [showGate, setShowGate] = useState(() => readSide() === null)

  return (
    <MusicProvider armed={showSite}>
      {showSite ? <Site side={side} /> : null}
      {showGate ? (
        <FamilySidePrompt
          onBegin={(next) => {
            saveSide(next)
            setSide(next)
            setShowSite(true)
          }}
          onDone={() => setShowGate(false)}
        />
      ) : null}
    </MusicProvider>
  )
}
