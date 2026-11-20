import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X, Truck } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import { SITE } from '../data/site'
import ProductArt from './ProductArt'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, items, subtotal, setQty, remove, count } = useStore()
  useEffect(() => {
    if (!cartOpen) return
    document.body.style.overflow = 'hidden'
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setCartOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [cartOpen, setCartOpen])

  const left = Math.max(0, SITE.freeShippingFrom - subtotal)
  const pct = Math.min(100, (subtotal / SITE.freeShippingFrom) * 100)

  return (
    <div className={`fixed inset-0 z-[70] ${cartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setCartOpen(false)} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="עגלת קניות"
        className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col border-r border-white/10 bg-ink-850 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(.2,.7,.2,1)] ${cartOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-extrabold">
            <ShoppingBag className="h-5 w-5 text-fire-400" />
            הסל שלי <span className="text-sm font-medium text-mist-400">({count})</span>
          </h2>
          <button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5" aria-label="סגירת הסל">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length > 0 && (
          <div className="border-b border-white/5 px-5 py-3">
            <div className="mb-2 flex items-center gap-2 text-sm text-mist-300">
              <Truck className="h-4 w-4 text-neon-400" />
              {left > 0 ? (
                <span>
                  עוד <b className="text-white">{formatPrice(left)}</b> למשלוח חינם
                </span>
              ) : (
                <span className="font-semibold text-slime-400">מגיע לך משלוח חינם! 🎉</span>
              )}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-l from-fire-500 to-neon-500 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-white/[0.04]">
                <ShoppingBag className="h-9 w-9 text-mist-500" />
              </div>
              <p className="font-display text-lg font-bold">הסל עדיין ריק</p>
              <p className="mt-1 text-sm text-mist-400">בואו נמצא לכם משהו ששווה לשחק בו</p>
              <Link to="/catalog" onClick={() => setCartOpen(false)} className="btn-primary mt-6">
                לקטלוג המלא
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(({ product: p, qty }) => (
                <li key={p.id} className="flex gap-3 rounded-2xl border border-white/5 bg-ink-800 p-3 animate-fade-up">
                  <Link to={`/product/${p.id}`} onClick={() => setCartOpen(false)} className="h-20 w-24 shrink-0 rounded-xl bg-ink-850">
                    <ProductArt id={`c-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-1.5" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/product/${p.id}`} onClick={() => setCartOpen(false)} className="line-clamp-2 text-sm font-semibold leading-snug hover:text-white">
                        {p.name}
                      </Link>
                      <button onClick={() => remove(p.id)} className="text-mist-500 transition hover:text-fire-400" aria-label={`הסרת ${p.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <Qty value={qty} max={p.stock} onChange={(v) => setQty(p.id, v)} />
                      <span className="font-display font-extrabold">{formatPrice(p.price * qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/5 bg-ink-900/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-mist-300">סה״כ ביניים</span>
              <span className="font-display text-2xl font-extrabold">{formatPrice(subtotal)}</span>
            </div>
            <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full text-base">
              למעבר לתשלום מאובטח
            </Link>
            <button onClick={() => setCartOpen(false)} className="mt-2 w-full py-2 text-sm text-mist-400 hover:text-white">
              המשך קנייה
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

export function Qty({ value, onChange, max = 99 }: { value: number; onChange: (v: number) => void; max?: number }) {
  return (
    <div className="inline-flex items-center rounded-xl border border-white/10 bg-ink-850">
      <button onClick={() => onChange(Math.min(max, value + 1))} className="grid h-8 w-8 place-items-center text-mist-300 hover:text-white" aria-label="הוספת יחידה">
        <Plus className="h-3.5 w-3.5" />
      </button>
      <span className="w-7 text-center text-sm font-bold tabular-nums">{value}</span>
      <button onClick={() => onChange(value - 1)} className="grid h-8 w-8 place-items-center text-mist-300 hover:text-white" aria-label="הפחתת יחידה">
        <Minus className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
