import { wedding } from '../content/wedding'
import type { Wish } from './storage'

function endpoint() {
  return wedding.wishesUrl.trim()
}

export function wishesAreShared() {
  return endpoint().length > 0
}

function asWish(value: unknown): Wish | null {
  if (!value || typeof value !== 'object') return null
  const wish = value as Partial<Wish>
  if (typeof wish.name !== 'string' || typeof wish.message !== 'string') return null
  const name = wish.name.trim().slice(0, 60)
  const message = wish.message.trim().slice(0, 280)
  if (!name || !message) return null
  return {
    id: typeof wish.id === 'string' && wish.id ? wish.id : crypto.randomUUID(),
    name,
    message,
    createdAt: typeof wish.createdAt === 'string' ? wish.createdAt : '',
  }
}

export async function fetchSharedWishes(): Promise<Wish[]> {
  const response = await fetch(endpoint())
  if (!response.ok) throw new Error('The wish list could not be loaded.')
  const payload: unknown = await response.json()
  const rows = Array.isArray(payload)
    ? payload
    : payload && typeof payload === 'object' && Array.isArray((payload as { wishes?: unknown }).wishes)
      ? (payload as { wishes: unknown[] }).wishes
      : []
  return rows.flatMap((row) => {
    const wish = asWish(row)
    return wish ? [wish] : []
  })
}

export async function publishSharedWish(name: string, message: string): Promise<Wish> {
  const response = await fetch(endpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ name, message }),
  })
  if (!response.ok) throw new Error('The blessing could not be sent.')
  const payload: unknown = await response.json()
  const saved =
    payload && typeof payload === 'object' ? asWish((payload as { wish?: unknown }).wish) : null
  if ((payload as { error?: unknown })?.error) throw new Error('The blessing could not be sent.')
  return (
    saved ?? {
      id: crypto.randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    }
  )
}
