import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Heart, ShieldCheck, Truck, Store, RotateCcw, Check, Share2, CreditCard } from 'lucide-react'
import ProductArt from '../components/ProductArt'
import ProductCard, { discountOf } from '../components/ProductCard'
import Badges from '../components/Badges'
import Rating from '../components/Rating'
import { Qty } from '../components/CartDrawer'
import { WhatsAppIcon } from '../components/Icons'
import { getProduct, PRODUCTS, formatPrice } from '../data/products'
import { getCategory } from '../data/categories'
import { BRANCHES, waLink } from '../data/site'
import { useStore } from '../context/StoreContext'
import { SectionHead } from './Home'
import NotFound from './NotFound'
import { PHOTOS } from '../data/photos'

const VIEWS = ['#ECEEF2', '#E3E7ED', '#F4F5F8']

export default function ProductPage() {
  const { id } = useParams()
  const p = getProduct(id)
  const { add, wishlist, toggleWish, toast } = useStore()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)
  const [view, setView] = useState(0)
  const [tab, setTab] = useState<'specs' | 'shipping' | 'warranty'>('specs')

  useEffect(() => {
    setQty(1)
    setView(0)
    if (p) document.title = `${p.name} | דומינטור`
  }, [p])

  if (!p) return <NotFound />
  const cat = getCategory(p.category)!
  const sub = cat.subs.find((s) => s.id === p.sub)
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id)
    .sort((a, b) => Number(b.sub === p.sub) - Number(a.sub === p.sub))
    .slice(0, 4)
  const disc = discountOf(p)
  const wished = wishlist.includes(p.id)
  const preorder = p.badges.includes('preorder')
  const installments = p.price >= 1000 ? Math.min(12, Math.floor(p.price / 300)) : 0

  return (
    <div className="container-x py-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-mute" aria-label="פירורי לחם">
        <Link to="/" className="hover:text-ink">ראשי</Link>
        <ChevronLeft className="h-3.5 w-3.5" />
        <Link to={`/catalog/${cat.id}`} className="hover:text-ink">{cat.name}</Link>
        {sub && (
          <>
            <ChevronLeft className="h-3.5 w-3.5" />
            <Link to={`/catalog/${cat.id}?sub=${sub.id}`} className="hover:text-ink">{sub.name}</Link>
          </>
        )}
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-[140px] lg:self-start">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-stage">
            <div className="absolute inset-0 transition-colors duration-300" style={{ background: VIEWS[view] }} />
            <div className="absolute right-4 top-4 z-10">
              <Badges badges={p.badges} discount={disc} />
            </div>
            {p.image ? (
              <img src={p.image} alt={p.name} width={960} height={800} className="relative aspect-[6/5] w-full object-cover" />
            ) : (
              <ProductArt
                id={`pp-${p.id}`}
                kind={p.art}
                hue={p.hue}
                label={p.label}
                className={`relative aspect-[5/4] w-full p-10 transition-transform duration-300 ${view === 1 ? 'scale-110' : view === 2 ? '-scale-x-100' : ''}`}
              />
            )}
          </div>
          {p.image && PHOTOS[p.id] && (
            <p className="mt-2 text-xs text-mute">
              צילום: {PHOTOS[p.id].author}, {PHOTOS[p.id].license}, דרך{' '}
              <a href={PHOTOS[p.id].url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                Wikimedia Commons
              </a>
            </p>
          )}
          <div className={`mt-3 grid grid-cols-3 gap-3 ${p.image ? 'hidden' : ''}`}>
            {VIEWS.map((v, i) => (
              <button key={i} onClick={() => setView(i)} className={`relative aspect-[5/4] overflow-hidden rounded-2xl border bg-stage transition ${view === i ? 'border-ink ring-2 ring-ink/10' : 'border-line hover:border-ink'}`} aria-label={`תצוגה ${i + 1}`}>
                <div className="absolute inset-0" style={{ background: v }} />
                <ProductArt id={`pt-${p.id}-${i}`} kind={p.art} hue={p.hue} label={p.label} className="relative h-full w-full p-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <Link to={`/catalog?brand=${encodeURIComponent(p.brand)}`} className="text-sm font-bold text-signal hover:text-signal/80">
              {p.brand}
            </Link>
            <Rating value={p.rating} count={p.reviews} size="md" />
          </div>
          <h1 className="mt-2 text-[28px] font-bold leading-tight sm:text-[34px]">{p.name}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-2">{p.short}</p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-[34px] font-bold tabular-nums">{formatPrice(p.price)}</span>
            {p.oldPrice && (
              <>
                <span className="pb-1 text-lg text-mute-2 line-through">{formatPrice(p.oldPrice)}</span>
                <span className="mb-1.5 rounded-lg bg-hot-tint px-2 py-1 text-sm font-bold text-hot">חוסכים {formatPrice(p.oldPrice - p.price)}</span>
              </>
            )}
          </div>
          {installments > 0 && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-mute">
              <CreditCard className="h-4 w-4" />
              או {installments} תשלומים של {formatPrice(Math.ceil(p.price / installments))} ללא ריבית
            </p>
          )}

          <div className="mt-5 flex items-center gap-2 text-sm">
            {preorder ? (
              <span className="inline-flex items-center gap-2 font-semibold text-[#14C8A8]">
                <span className="h-2 w-2 rounded-full bg-[#14C8A8]" /> הזמנה מוקדמת — אספקה משוערת תוך 14 יום
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 font-semibold text-go-deep">
                <span className="h-2 w-2 animate-pulse rounded-full bg-go" /> במלאי {p.stock < 8 && `— נשארו ${p.stock} יחידות בלבד`}
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Qty value={qty} max={p.stock} onChange={(v) => setQty(Math.max(1, v))} />
            <button onClick={() => add(p.id, qty)} className="btn-go flex-1 text-base sm:flex-none sm:px-10">
              {preorder ? 'הזמנה מוקדמת' : 'הוספה לסל'}
            </button>
            <button
              onClick={() => {
                add(p.id, qty)
                nav('/checkout')
              }}
              className="btn-line flex-1 text-base sm:flex-none"
            >
              קנייה מהירה
            </button>
            <button onClick={() => toggleWish(p.id)} className={`grid h-12 w-12 place-items-center rounded-xl border transition ${wished ? 'border-hot bg-hot-tint text-hot' : 'border-line text-ink-2 hover:text-ink'}`} aria-label="מועדפים" aria-pressed={wished}>
              <Heart className={`h-5 w-5 ${wished ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href)
                  toast('הקישור הועתק')
                } catch {
                  toast('לא ניתן להעתיק את הקישור')
                }
              }}
              className="grid h-12 w-12 place-items-center rounded-xl border border-line text-ink-2 hover:text-ink"
              aria-label="שיתוף"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-sm text-ink-2">
            יש שאלה על המוצר?{' '}
            <a href={waLink(`היי, אשמח לייעוץ לגבי ${p.name}`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold underline underline-offset-4">
              <WhatsAppIcon className="h-4 w-4 text-[#1FA855]" />
              כתבו לנו בוואטסאפ
            </a>
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { i: ShieldCheck, t: 'אחריות יבואן רשמי', s: 'כולל תעודת אחריות', c: 'text-go-deep' },
              { i: Truck, t: 'משלוח מהיר', s: 'עד 24–72 שעות לכל הארץ', c: 'text-signal' },
              { i: Store, t: 'איסוף עצמי חינם', s: 'מחיפה או מתל אביב', c: 'text-[#FFB020]' },
              { i: RotateCcw, t: '14 ימי החזרה', s: 'לפי חוק הגנת הצרכן', c: 'text-hot' },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3">
                <x.i className={`h-5 w-5 shrink-0 ${x.c}`} />
                <span>
                  <span className="block text-sm font-semibold">{x.t}</span>
                  <span className="block text-xs text-mute">{x.s}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-line bg-paper p-4">
            <div className="mb-2 text-sm font-bold">זמינות בסניפים</div>
            {BRANCHES.map((b, i) => (
              <div key={b.id} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-ink-2">סניף {b.city}</span>
                {preorder ? (
                  <span className="text-mute-2">בהזמנה מוקדמת</span>
                ) : (p.stock + i) % 4 === 0 ? (
                  <span className="text-[#FFB020]">זמין להזמנה לסניף</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-go-deep">
                    <Check className="h-4 w-4" /> במלאי — איסוף היום
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex gap-1 border-b border-line" role="tablist">
              {(
                [
                  ['specs', 'מפרט טכני'],
                  ['shipping', 'משלוח ואיסוף'],
                  ['warranty', 'אחריות'],
                ] as const
              ).map(([k, l]) => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative px-4 py-3 text-sm font-semibold transition ${tab === k ? 'text-ink' : 'text-mute hover:text-ink'}`}>
                  {l}
                  {tab === k && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-hot" />}
                </button>
              ))}
            </div>
            <div className="py-5 text-sm leading-relaxed text-ink-2" role="tabpanel">
              {tab === 'specs' && (
                <dl className="divide-y divide-line overflow-hidden rounded-xl border border-line">
                  {[['מותג', p.brand], ['מק״ט', `DM-${p.id.replace(/^dom-/, '').toUpperCase()}`], ...p.specs].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[140px_1fr] bg-paper px-4 py-3">
                      <dt className="text-mute">{k}</dt>
                      <dd className="font-medium text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'shipping' && (
                <ul className="list-disc space-y-2 pr-5">
                  <li>משלוח עד הבית: ₪39, חינם בהזמנה מעל ₪499. אספקה תוך 1–3 ימי עסקים.</li>
                  <li>משלוח אקספרס באותו יום לאזור המרכז וחיפה בהזמנה עד 13:00.</li>
                  <li>איסוף עצמי חינם מהסניפים בחיפה ובתל אביב — לרוב כבר באותו היום.</li>
                </ul>
              )}
              {tab === 'warranty' && (
                <p>
                  המוצר מגיע באחריות יבואן רשמי ל-{p.specs.find(([k]) => k === 'אחריות')?.[1] ?? 'שנה לפחות'}. שירות האחריות ניתן ישירות דרך מעבדת דומינטור, כך שאין צורך לשלוח את המוצר ליבואן —
                  פשוט מגיעים לסניף או{' '}
                  <Link to="/repair" className="text-signal underline">
                    קובעים תור אונליין
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <SectionHead title="אולי יתאים לכם גם" link={{ to: `/catalog/${cat.id}`, label: `לכל ${cat.name}` }} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
