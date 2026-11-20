import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowLeft } from 'lucide-react'
import { formatPrice, searchProducts } from '../data/products'
import { CATEGORIES } from '../data/categories'
import ProductArt from './ProductArt'

const POPULAR = ['PS5', 'Switch 2', 'RTX 5070', 'הגה', 'Funko', 'רחפן']

export default function SearchBox({ onDone, autoFocus = false }: { onDone?: () => void; autoFocus?: boolean }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const nav = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const listId = useId()
  const results = searchProducts(q, 6)
  const cats = q.trim() ? CATEGORIES.filter((c) => c.name.includes(q.trim()) || c.short.includes(q.trim())).slice(0, 2) : []

  useEffect(() => {
    const h = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  useEffect(() => setActive(-1), [q])

  const go = (path: string) => {
    setOpen(false)
    setQ('')
    onDone?.()
    nav(path)
  }
  const submit = () => {
    if (active >= 0 && results[active]) return go(`/product/${results[active].id}`)
    if (q.trim()) go(`/catalog?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div ref={ref} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="group relative"
      >
        <Search className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mist-400 transition group-focus-within:text-neon-400" />
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, results.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, -1))
            } else if (e.key === 'Escape') setOpen(false)
          }}
          placeholder="חפשו קונסולה, משחק, הגה או מחשב…"
          className="h-12 w-full rounded-2xl border border-white/10 bg-ink-850/80 pr-11 pl-24 text-[15px] text-mist-100 placeholder:text-mist-500 outline-none transition focus:border-neon-500/70 focus:bg-ink-850 focus:ring-4 focus:ring-neon-500/15"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="חיפוש מוצרים"
        />
        <button type="submit" className="absolute left-1.5 top-1.5 h-9 rounded-xl bg-fire-500 px-4 text-sm font-bold text-white transition hover:bg-fire-400">
          חיפוש
        </button>
      </form>

      {open && (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-white/10 bg-ink-800/95 shadow-2xl backdrop-blur-xl animate-fade-up">
          {!q.trim() ? (
            <div className="p-4">
              <div className="mb-2 text-xs font-bold text-mist-400">חיפושים פופולריים</div>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-mist-300 transition hover:border-neon-500/50 hover:text-white">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 && cats.length === 0 ? (
            <div className="p-5 text-sm text-mist-400">
              לא מצאנו תוצאות עבור "<span className="text-white">{q}</span>". נסו מילה אחרת או{' '}
              <button className="text-neon-300 underline" onClick={() => go('/catalog')}>
                עברו לקטלוג המלא
              </button>
            </div>
          ) : (
            <>
              {cats.map((c) => (
                <button key={c.id} onClick={() => go(`/catalog/${c.id}`)} className="flex w-full items-center gap-3 border-b border-white/5 px-4 py-3 text-right text-sm hover:bg-white/[0.04]">
                  <c.icon className="h-4 w-4 text-neon-400" />
                  קטגוריה: <span className="font-semibold">{c.name}</span>
                </button>
              ))}
              <ul>
                {results.map((p, i) => (
                  <li key={p.id} role="option" aria-selected={i === active}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(`/product/${p.id}`)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-right transition ${i === active ? 'bg-white/[0.06]' : ''}`}
                    >
                      <span className="h-12 w-14 shrink-0 rounded-lg bg-ink-850">
                        <ProductArt id={`s-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-1" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{p.name}</span>
                        <span className="block text-xs text-mist-400">{p.brand}</span>
                      </span>
                      <span className="font-display text-sm font-bold">{formatPrice(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={submit} className="flex w-full items-center justify-between border-t border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-neon-300 hover:bg-white/[0.05]">
                לכל התוצאות עבור "{q}"
                <ArrowLeft className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
