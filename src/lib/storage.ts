import type { Side } from '../content/wedding'

const SIDE_KEY = 'dev-prachi-side'
const WISH_KEY = 'dev-prachi-wishes'

export type Wish = {
  id: string
  name: string
  message: string
  createdAt: string
}

export function readSide(): Side | null {
  try {
    const value = sessionStorage.getItem(SIDE_KEY)
    if (value === 'groom' || value === 'bride') return value
  } catch {
    /* private browsing */
  }
  return null
}

export function saveSide(side: Side) {
  try {
    sessionStorage.setItem(SIDE_KEY, side)
  } catch {
    /* ignore */
  }
}

export function readWishes(): Wish[] {
  try {
    const raw = localStorage.getItem(WISH_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((item) => {
      if (!item || typeof item !== 'object') return []
      const wish = item as Partial<Wish>
      if (typeof wish.name !== 'string' || typeof wish.message !== 'string') return []
      return [
        {
          id: typeof wish.id === 'string' ? wish.id : crypto.randomUUID(),
          name: wish.name.slice(0, 60),
          message: wish.message.slice(0, 280),
          createdAt: typeof wish.createdAt === 'string' ? wish.createdAt : '',
        },
      ]
    })
  } catch {
    return []
  }
}

export function saveWishes(wishes: Wish[]) {
  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishes.slice(0, 80)))
  } catch {
    /* ignore */
  }
}
