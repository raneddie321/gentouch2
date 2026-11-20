import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronLeft, PackageSearch } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { CATEGORIES, getCategory } from '../data/categories'
import { PRODUCTS, searchProducts, formatPrice, type Product } from '../data/products'

const SORTS = [
  { id: 'popular', label: 'הכי פופולרי' },
  { id: 'new', label: 'חדש באתר' },
  { id: 'price-asc', label: 'מחיר: מהנמוך לגבוה' },
  { id: 'price-desc', label: 'מחיר: מהגבוה לנמוך' },
  { id: 'discount', label: 'ההנחה הגדולה' },
]
const PRICE_STEPS = [250, 500, 1000, 2500, 5000, 10000, 25000]

export default function Catalog() {
  const { cat } = useParams()
  const [sp, setSp] = useSearchParams()
  const [sheet, setSheet] = useState(false)
  const category = getCategory(cat)
  const q = sp.get('q') || ''
  const sub = sp.get('sub') || ''
  const sale = sp.get('sale') === '1'
  const sort = sp.get('sort') || 'popular'
  const max = Number(sp.get('max')) || 0
  const brands = sp.getAll('brand')
  const stockOnly = sp.get('stock') === '1'

  const set = (k: string, v: string | null) => {
    const n = new URLSearchParams(sp)
    if (v === null || v === '') n.delete(k)
    else n.set(k, v)
    setSp(n, { replace: true })
  }
  const toggleBrand = (b: string) => {
    const n = new URLSearchParams(sp)
    const all = n.getAll('brand')
    n.delete('brand')
    ;(all.includes(b) ? all.filter((x) => x !== b) : [...all, b]).forEach((x) => n.append('brand', x))
    setSp(n, { replace: true })
  }

  const base = useMemo(() => {
    let list: Product[] = q ? searchProducts(q, 100) : PRODUCTS
    if (category) list = list.filter((p) => p.category === category.id)
    return list
  }, [q, category])

  const results = useMemo(() => {
    let list = base
    if (sub) list = list.filter((p) => p.sub === sub)
    if (sale) list = list.filter((p) => p.oldPrice)
    if (max) list = list.filter((p) => p.price <= max)
    if (brands.length) list = list.filter((p) => brands.includes(p.brand))
    if (stockOnly) list = list.filter((p) => !p.badges.includes('preorder'))
    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sort === 'discount') sorted.sort((a, b) => (b.oldPrice ? 1 - b.price / b.oldPrice : 0) - (a.oldPrice ? 1 - a.price / a.oldPrice : 0))
    else if (sort === 'new') sorted.sort((a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new')))
    else if (!q) sorted.sort((a, b) => b.reviews * b.rating + (b.badges.includes('hot') ? 500 : 0) - (a.reviews * a.rating + (a.badges.includes('hot') ? 500 : 0)))
    return sorted
  }, [base, sub, sale, max, brands, stockOnly, sort, q])

  const brandOptions = Array.from(new Set(base.map((p) => p.brand))).sort()
  const title = q ? `תוצאות חיפוש: "${q}"` : sale ? 'מבצעים' : category ? category.name : 'הקטלוג המלא'
  const activeCount = [sub, sale, max, stockOnly].filter(Boolean).length + brands.length

  const Filters = (
    <div className="space-y-7">
      <FilterGroup title="קטגוריה">
        <ul className="space-y-0.5">
          <li>
            <Link to={{ pathname: '/catalog', search: q ? `?q=${encodeURIComponent(q)}` : '' }} className={`block rounded-lg px-2 py-1.5 text-sm ${!category ? 'bg-stage font-bold text-ink' : 'text-ink-2 hover:text-ink'}`}>
              כל הקטגוריות
            </Link>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={{ pathname: `/catalog/${c.id}`, search: q ? `?q=${encodeURIComponent(q)}` : '' }} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${category?.id === c.id ? 'bg-stage font-bold text-ink' : 'text-ink-2 hover:text-ink'}`}>
                <c.icon className="h-4 w-4 opacity-70" />
                {c.name}
              </Link>
              {category?.id === c.id && (
                <ul className="my-1 mr-6 space-y-0.5 border-r border-line pr-3">
                  {c.subs.map((s) => (
                    <li key={s.id}>
                      <button onClick={() => set('sub', sub === s.id ? null : s.id)} className={`w-full py-1 text-right text-[13px] ${sub === s.id ? 'font-bold text-hot' : 'text-mute hover:text-ink'}`}>
                        {s.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </FilterGroup>

      <FilterGroup title="מחיר עד">
        <div className="flex flex-wrap gap-2">
          {PRICE_STEPS.map((v) => (
            <button key={v} onClick={() => set('max', max === v ? null : String(v))} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${max === v ? 'border-ink bg-go-tint text-ink' : 'border-line text-ink-2 hover:border-ink'}`}>
              {formatPrice(v)}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="מותג">
        <div className="max-h-60 space-y-1 overflow-y-auto pl-1">
          {brandOptions.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1 py-1 text-sm text-ink-2 hover:text-ink">
              <input type="checkbox" checked={brands.includes(b)} onChange={() => toggleBrand(b)} className="h-4 w-4 rounded hover:border-ink bg-stage accent-hot" />
              {b}
              <span className="mr-auto text-xs text-mute-2">{base.filter((p) => p.brand === b).length}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="זמינות ומבצעים">
        <Toggle label="רק מבצעים" checked={sale} onChange={(v) => set('sale', v ? '1' : null)} />
        <Toggle label="במלאי מיידי בלבד" checked={stockOnly} onChange={(v) => set('stock', v ? '1' : null)} />
      </FilterGroup>
    </div>
  )

  return (
    <div className="container-x py-8">
      <nav className="mb-4 flex items-center gap-1 text-sm text-mute" aria-label="פירורי לחם">
        <Link to="/" className="hover:text-ink">
          ראשי
        </Link>
        <ChevronLeft className="h-3.5 w-3.5" />
        <Link to="/catalog" className="hover:text-ink">
          קטלוג
        </Link>
        {category && (
          <>
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="text-ink-2">{category.name}</span>
          </>
        )}
      </nav>

      <header className="mb-8 border-b border-line pb-6">
        <div className="relative">
          <h1 className="h-display text-[52px] sm:text-[64px]">{title}</h1>
          <p className="mt-1 text-ink-2">{category ? category.tagline : 'כל המוצרים ברשת, באותו מחיר כמו בסניפים ובאחריות יבואן רשמי.'}</p>
          {category && (
            <div className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1">
              <button onClick={() => set('sub', null)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${!sub ? 'bg-ink text-white' : 'bg-stage text-ink-2 hover:bg-stage'}`}>
                הכל
              </button>
              {category.subs.map((s) => (
                <button key={s.id} onClick={() => set('sub', s.id)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${sub === s.id ? 'bg-ink text-white' : 'bg-stage text-ink-2 hover:bg-stage'}`}>
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[140px]">{Filters}</div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-mute">
              <b className="text-ink">{results.length}</b> מוצרים
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setSheet(true)} className="btn-line !px-3.5 !py-2 text-sm lg:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                סינון {activeCount > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-hot text-[11px]">{activeCount}</span>}
              </button>
              <label className="sr-only" htmlFor="sort">
                מיון
              </label>
              <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value)} className="h-10 rounded-xl border border-line bg-paper px-3 text-sm text-ink outline-none focus:border-signal-tint">
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {activeCount > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {brands.map((b) => (
                <ActiveChip key={b} label={b} onClear={() => toggleBrand(b)} />
              ))}
              {max > 0 && <ActiveChip label={`עד ${formatPrice(max)}`} onClear={() => set('max', null)} />}
              {sale && <ActiveChip label="מבצעים" onClear={() => set('sale', null)} />}
              {stockOnly && <ActiveChip label="במלאי" onClear={() => set('stock', null)} />}
              {sub && <ActiveChip label={category?.subs.find((s) => s.id === sub)?.name ?? sub} onClear={() => set('sub', null)} />}
              <button onClick={() => setSp(q ? { q } : {}, { replace: true })} className="text-sm font-semibold text-hot hover:text-hot">
                ניקוי הכל
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="panel flex flex-col items-center p-12 text-center">
              <PackageSearch className="h-12 w-12 text-mute-2" />
              <p className="mt-4 text-xl font-bold">לא נמצאו מוצרים</p>
              <p className="mt-1 text-mute">נסו להסיר חלק מהסינונים או לחפש משהו אחר</p>
              <button onClick={() => setSp({}, { replace: true })} className="btn-go mt-6">
                הצגת כל המוצרים
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p, i) => (
                <div key={p.id} className="animate-rise" style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}>
                  <ProductCard product={p} className="h-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {sheet && (
        <div className="fixed inset-0 z-[65] lg:hidden" role="dialog" aria-modal="true" aria-label="סינון">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setSheet(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-line bg-stage p-5 animate-rise">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">סינון מוצרים</h2>
              <button onClick={() => setSheet(false)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-stage" aria-label="סגירה">
                <X className="h-5 w-5" />
              </button>
            </div>
            {Filters}
            <button onClick={() => setSheet(false)} className="btn-go sticky bottom-0 mt-6 w-full">
              הצגת {results.length} מוצרים
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-mute">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-ink-2">
      {label}
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-ink' : 'bg-line-strong'}`}>
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${checked ? 'right-6' : 'right-1'}`} />
      </button>
    </label>
  )
}
function ActiveChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button onClick={onClear} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-stage px-3 py-1.5 text-xs font-semibold text-ink-2 hover:border-hot">
      {label}
      <X className="h-3.5 w-3.5" />
    </button>
  )
}
