import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
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
        <Search className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-mute transition group-focus-within:text-signal" />
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
          placeholder="חיפוש: PS5, הגה, RTX 5070, Funko…"
          className="h-11 w-full rounded-[10px] border border-line-strong bg-stage pr-11 pl-4 text-[15px] text-ink outline-none transition placeholder:text-mute focus:border-ink focus:bg-paper"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="חיפוש מוצרים"
        />
      </form>

      {open && (
        <div id={listId} role="listbox" className="absolute inset-x-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-line-strong bg-paper shadow-lift animate-rise">
          {!q.trim() ? (
            <div className="p-4">
              <div className="mb-2 text-sm text-mute">חיפושים פופולריים</div>
              <div className="flex flex-wrap gap-2">
                {POPULAR.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="rounded-full border border-line bg-stage px-3 py-1.5 text-sm text-ink-2 transition hover:border-ink hover:text-ink">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 && cats.length === 0 ? (
            <div className="p-5 text-sm text-mute">
              לא מצאנו תוצאות עבור "<span className="text-ink">{q}</span>". נסו מילה אחרת או{' '}
              <button className="text-signal underline" onClick={() => go('/catalog')}>
                עברו לקטלוג המלא
              </button>
            </div>
          ) : (
            <>
              {cats.map((c) => (
                <button key={c.id} onClick={() => go(`/catalog/${c.id}`)} className="flex w-full items-center gap-3 border-b border-line px-4 py-3 text-right text-sm hover:bg-stage">
                  <c.icon className="h-4 w-4 text-signal" />
                  קטגוריה: <span className="font-semibold">{c.name}</span>
                </button>
              ))}
              <ul>
                {results.map((p, i) => (
                  <li key={p.id} role="option" aria-selected={i === active}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(`/product/${p.id}`)}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-right transition ${i === active ? 'bg-stage' : ''}`}
                    >
                      <span className="h-12 w-14 shrink-0 rounded-lg bg-stage">
                        <ProductArt id={`s-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-1" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{p.name}</span>
                        <span className="block text-xs text-mute">{p.brand}</span>
                      </span>
                      <span className="text-sm font-bold">{formatPrice(p.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={submit} className="flex w-full items-center justify-between border-t border-line px-4 py-3 text-sm font-semibold underline-offset-4 hover:underline">
                לכל התוצאות עבור "{q}"
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
