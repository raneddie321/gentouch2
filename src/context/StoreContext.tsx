import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '../data/products'
import { SITE } from '../data/site'

type Line = { id: string; qty: number }
export type CartItem = { product: Product; qty: number }
type User = { name: string; email: string; club: boolean }
type Toast = { id: number; text: string }

type Store = {
  items: CartItem[]
  count: number
  subtotal: number
  shipping: number
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  wishlist: string[]
  toggleWish: (id: string) => void
  user: User | null
  login: (u: User) => void
  logout: () => void
  toasts: Toast[]
  toast: (text: string) => void
}

const Ctx = createContext<Store | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v))
  } catch {
    /* storage unavailable */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => load('dom.cart', []))
  const [wishlist, setWishlist] = useState<string[]>(() => load('dom.wish', []))
  const [user, setUser] = useState<User | null>(() => load('dom.user', null))
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => save('dom.cart', lines), [lines])
  useEffect(() => save('dom.wish', wishlist), [wishlist])
  useEffect(() => save('dom.user', user), [user])

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600)
  }, [])

  const add = useCallback(
    (id: string, qty = 1) => {
      const prod = getProduct(id)
      if (!prod) return
      setLines((ls) => {
        const ex = ls.find((l) => l.id === id)
        if (ex) return ls.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, prod.stock) } : l))
        return [...ls, { id, qty }]
      })
      setCartOpen(true)
    },
    [],
  )
  const setQty = useCallback((id: string, qty: number) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))))
  }, [])
  const remove = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), [])
  const clear = useCallback(() => setLines([]), [])
  const toggleWish = useCallback(
    (id: string) => {
      const has = wishlist.includes(id)
      toast(has ? 'הוסר מהמועדפים' : 'נוסף למועדפים ❤')
      setWishlist((w) => (has ? w.filter((x) => x !== id) : [...w, id]))
    },
    [toast, wishlist],
  )

  const value = useMemo<Store>(() => {
    const items = lines
      .map((l) => ({ product: getProduct(l.id)!, qty: l.qty }))
      .filter((i) => i.product)
    const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0)
    const count = items.reduce((s, i) => s + i.qty, 0)
    const shipping = subtotal === 0 || subtotal >= SITE.freeShippingFrom ? 0 : 39
    return {
      items,
      count,
      subtotal,
      shipping,
      add,
      setQty,
      remove,
      clear,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWish,
      user,
      login: (u) => setUser(u),
      logout: () => setUser(null),
      toasts,
      toast,
    }
  }, [lines, add, setQty, remove, clear, cartOpen, wishlist, toggleWish, user, toasts, toast])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore must be used inside StoreProvider')
  return c
}
