import { useState } from 'react'
import { FamilySidePrompt } from './components/gate/FamilySidePrompt'
import { Site } from './components/site/Site'
import { readSide, saveSide } from './lib/storage'

export function App() {
  const [showSite, setShowSite] = useState(() => readSide() !== null)
  const [showGate, setShowGate] = useState(() => readSide() === null)

  return (
    <>
      {showSite ? <Site /> : null}
      {showGate ? (
        <FamilySidePrompt
          onBegin={(next) => {
            saveSide(next)
            setShowSite(true)
          }}
          onDone={() => setShowGate(false)}
        />
      ) : null}
    </>
  )
}
