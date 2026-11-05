import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const sampleRate = 32000
const duration = 16
const length = sampleRate * duration
const samples = new Float64Array(length)

function periodic(freq) {
  return Math.round(freq * duration) / duration
}

const drone = [
  { f: periodic(65.41), g: 0.1 },
  { f: periodic(130.81), g: 0.18 },
  { f: periodic(196), g: 0.11 },
  { f: periodic(261.63), g: 0.07 },
  { f: periodic(329.63), g: 0.028 },
]

const melody = [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33].map(periodic)
const step = duration / melody.length

for (let i = 0; i < length; i += 1) {
  const t = i / sampleRate
  const trem = 0.84 + 0.16 * Math.sin((2 * Math.PI * 2 * t) / duration)
  let sample = 0

  for (const tone of drone) {
    sample += tone.g * trem * Math.sin(2 * Math.PI * tone.f * t)
    sample += tone.g * 0.22 * trem * Math.sin(2 * Math.PI * tone.f * 2 * t)
  }

  melody.forEach((freq, index) => {
    const local = t - index * step
    if (local < 0 || local > 1.7) return
    const env = Math.exp(-local * 2.35) * Math.min(1, local / 0.04)
    sample += 0.065 * env * Math.sin(2 * Math.PI * freq * t)
  })

  samples[i] = sample
}

let peak = 0
for (let i = 0; i < length; i += 1) peak = Math.max(peak, Math.abs(samples[i]))
const gain = peak > 0 ? 0.5 / peak : 1

const buffer = Buffer.alloc(44 + length * 2)
buffer.write('RIFF', 0)
buffer.writeUInt32LE(36 + length * 2, 4)
buffer.write('WAVE', 8)
buffer.write('fmt ', 12)
buffer.writeUInt32LE(16, 16)
buffer.writeUInt16LE(1, 20)
buffer.writeUInt16LE(1, 22)
buffer.writeUInt32LE(sampleRate, 24)
buffer.writeUInt32LE(sampleRate * 2, 28)
buffer.writeUInt16LE(2, 32)
buffer.writeUInt16LE(16, 34)
buffer.write('data', 36)
buffer.writeUInt32LE(length * 2, 40)

for (let i = 0; i < length; i += 1) {
  const value = Math.max(-1, Math.min(1, samples[i] * gain))
  buffer.writeInt16LE(Math.round(value * 32767), 44 + i * 2)
}

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'audio')
fs.mkdirSync(dir, { recursive: true })
const file = path.join(dir, 'ambient.wav')
fs.writeFileSync(file, buffer)
console.log(`Wrote ${file} (${buffer.length} bytes)`)
