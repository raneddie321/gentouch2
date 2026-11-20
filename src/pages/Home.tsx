import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShieldCheck, Users, BadgeCheck, Truck } from 'lucide-react'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import { WhatsAppIcon } from '../components/Icons'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS, formatPrice, getProduct, type ArtKind } from '../data/products'
import { waLink } from '../data/site'

const LAUNCHES = [
  {
    product: 'switch-2-mkw',
    tab: 'Nintendo Switch 2',
    title: 'Switch 2 על המדף.',
    sub: 'באנדל ההשקה עם Mario Kart World',
    text: 'מסך 7.9 אינץ׳ ב-120Hz, ג׳ויקונים מגנטיים ו-4K בעגינה. במלאי בחיפה ובתל אביב, עם אחריות יבואן רשמי.',
  },
  {
    product: 'ps5-pro',
    tab: 'PlayStation 5 Pro',
    title: 'PS5 Pro במלאי.',
    sub: '2TB, משלוח עד 24 שעות',
    text: 'גרפיקה חדה יותר, Ray Tracing מלא ו-PSSR. אפשר לאסוף מהסניף עוד היום, או לקבל עד הבית מחר.',
  },
  {
    product: 'dom-titan',
    tab: 'מחשבים בהרכבה אישית',
    title: 'המחשב שלכם, נבנה אצלנו.',
    sub: 'RTX 50, בדיקת עומס של 24 שעות',
    text: 'בוחרים יחד איתכם כל רכיב, מרכיבים במעבדה בחיפה, מריצים בדיקות עומס ונותנים 3 שנות אחריות.',
  },
]

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Deals />
      <Lab />
      <NewArrivals />
      <Trust />
    </>
  )
}

function Hero() {
  const [i, setI] = useState(0)
  const l = LAUNCHES[i]
  const p = getProduct(l.product)!
  return (
    <section className="container-x pb-16 pt-10 lg:pb-20 lg:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-2">
            <span className="h-2 w-2 rounded-full bg-go ring-4 ring-go/25" />
            במלאי בשני הסניפים
          </p>
          <h1 key={l.title} className="h-display mt-4 animate-rise text-[64px] sm:text-[96px] lg:text-[112px]">
            {l.title}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-ink-2">{l.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="btn-go px-6 text-base">
              לקטלוג המלא
            </Link>
            <a href={waLink(`היי, אשמח לייעוץ לגבי ${l.tab}`)} target="_blank" rel="noreferrer" className="btn-line px-5 text-base">
              <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" />
              ייעוץ מהיר בוואטסאפ
            </a>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <Link to={`/product/${p.id}`} key={p.id} className="relative block" aria-label={`${p.name}, ${formatPrice(p.price)}`}>
            <ProductArt id={`hero-${p.id}`} kind={p.art} hue={p.hue} label={p.label} sticker className="mx-auto w-full max-w-[600px] animate-stick" />
            <span className="absolute left-[6%] top-[4%] grid h-[104px] w-[104px] rotate-[10deg] place-items-center rounded-full border-2 border-ink bg-hot text-center text-white shadow-hard sm:h-[124px] sm:w-[124px]">
              <span className="leading-none">
                <span className="block text-xs font-medium opacity-90">{p.oldPrice ? 'במקום ' + formatPrice(p.oldPrice) : 'רק'}</span>
                <span className="mt-1 block text-[22px] font-bold tabular-nums sm:text-[26px]">{formatPrice(p.price)}</span>
              </span>
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 border-t border-line sm:grid-cols-3" role="tablist" aria-label="השקות חמות">
        {LAUNCHES.map((x, idx) => {
          const xp = getProduct(x.product)!
          const on = idx === i
          return (
            <button
              key={x.product}
              role="tab"
              aria-selected={on}
              onClick={() => setI(idx)}
              className={`relative flex items-center gap-3 py-4 text-right transition-colors sm:pl-6 ${on ? '' : 'text-mute hover:text-ink'}`}
            >
              <span className={`absolute -top-px right-0 h-[3px] w-full transition-colors ${on ? 'bg-ink' : 'bg-transparent'}`} />
              <span className="h-12 w-14 shrink-0 rounded-lg bg-paper">
                <ProductArt id={`tab-${x.product}`} kind={xp.art} hue={xp.hue} label={xp.label} className="h-full w-full p-1" />
              </span>
              <span>
                <span className={`block font-semibold ${on ? 'text-ink' : ''}`}>{x.tab}</span>
                <span className="block text-sm">{x.sub}</span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

const CAT_ART: Record<string, { art: ArtKind; hue: string; label?: string; rot: string }> = {
  consoles: { art: 'controller', hue: '#F5F7FB', rot: '-rotate-[8deg]' },
  pcs: { art: 'pc', hue: '#7C5CFF', rot: 'rotate-[6deg]' },
  games: { art: 'game', hue: '#E5341A', label: 'GTA VI', rot: '-rotate-[5deg]' },
  sims: { art: 'wheel', hue: '#FFB020', rot: 'rotate-[7deg]' },
  rc: { art: 'car', hue: '#34D61C', rot: '-rotate-[4deg]' },
  merch: { art: 'figure', hue: '#FFD60A', rot: 'rotate-[8deg]' },
}
const TILE_BG: Record<string, string> = {
  consoles: 'bg-tile-consoles',
  pcs: 'bg-tile-pcs',
  games: 'bg-tile-games',
  sims: 'bg-tile-sims',
  rc: 'bg-tile-rc',
  merch: 'bg-tile-merch',
}

function Categories() {
  return (
    <section className="border-t border-line bg-paper py-16 lg:py-20" aria-labelledby="cat-title">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="cat-title" className="h-section">
            מה משחקים היום?
          </h2>
          <Link to="/catalog" className="text-[15px] font-semibold underline underline-offset-4 hover:decoration-2">
            לכל הקטלוג
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {CATEGORIES.map((c) => {
            const a = CAT_ART[c.id]
            const count = PRODUCTS.filter((p) => p.category === c.id).length
            return (
              <Link
                key={c.id}
                to={`/catalog/${c.id}`}
                className={`group relative flex min-h-[200px] flex-col overflow-hidden rounded-[18px] border-[1.5px] border-ink p-4 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-hard-lg sm:min-h-[260px] sm:p-6 ${TILE_BG[c.id]}`}
              >
                <h3 className="h-display max-w-[9ch] text-[34px] sm:text-[48px]">{c.name}</h3>
                <p className="mt-2 hidden max-w-[22ch] text-[15px] text-ink-2 sm:block">{c.tagline}</p>
                <span className="mt-auto text-sm font-medium text-ink-2">{count} מוצרים</span>
                <ProductArt
                  id={`cat-${c.id}`}
                  kind={a.art}
                  hue={a.hue}
                  label={a.label}
                  sticker
                  className={`pointer-events-none absolute -bottom-3 -left-3 w-[62%] max-w-[260px] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105 sm:-bottom-4 sm:-left-2 sm:w-[54%] ${a.rot}`}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Deals() {
  const deals = PRODUCTS.filter((p) => p.oldPrice || p.badges.includes('hot'))
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('article') as HTMLElement | null
    el.scrollBy({ left: -dir * ((card?.offsetWidth ?? 260) + 16) * 2, behavior: 'smooth' })
  }
  return (
    <section className="py-16 lg:py-20" aria-labelledby="deals-title">
      <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="deals-title" className="h-section">
            מבצעי השבוע
          </h2>
          <p className="mt-3 text-ink-2">
            המחירים מתחלפים ביום ראשון בחצות. נשארו <Countdown />
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-paper hover:border-ink" aria-label="המוצרים הקודמים">
            <ChevronRight className="h-5 w-5" />
          </button>
          <button onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-paper hover:border-ink" aria-label="המוצרים הבאים">
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 pt-1 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:px-[max(2rem,calc((100vw-1280px)/2+2rem))]">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} className="w-[248px] shrink-0 snap-start sm:w-[272px]" />
        ))}
      </div>
    </section>
  )
}

function Countdown() {
  const end = useRef(nextSunday())
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const d = Math.max(0, end.current - now)
  const days = Math.floor(d / 864e5)
  const hms = [Math.floor((d / 36e5) % 24), Math.floor((d / 6e4) % 60), Math.floor((d / 1e3) % 60)].map((n) => String(n).padStart(2, '0')).join(':')
  return (
    <b className="font-semibold tabular-nums text-ink">
      {days > 0 && `${days === 1 ? 'יום' : `${days} ימים`} ו-`}
      <span dir="ltr">{hms}</span>
    </b>
  )
}
function nextSunday() {
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7))
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

const LAB_PRICES = [
  ['החלפת סטיק בשלט (דריפט)', 149],
  ['ניקוי קונסולה והחלפת משחה תרמית', 249],
  ['החלפת שקע HDMI', 349],
  ['תיקון ג׳ויקון', 129],
  ['שדרוג או תיקון מחשב', 199],
  ['תיקון הגה או דוושות', 229],
] as const

function Lab() {
  return (
    <section className="mat-grid text-white" aria-labelledby="lab-title">
      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="font-medium text-white/75">מעבדת התיקונים של דומינטור</p>
          <h2 id="lab-title" className="h-display mt-3 text-[56px] sm:text-[72px] lg:text-[88px]">
            שלט עם דריפט? קונסולה שמתחממת?
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg text-white/85">
            טכנאים שמתקנים קונסולות, שלטים, מחשבים והגאים כל יום. מקבלים הצעת מחיר לפני שנוגעים במכשיר, ועדכון בוואטסאפ בכל שלב.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/repair#book" className="btn-go px-6 text-base">
              קביעת תור למעבדה
            </Link>
            <Link to="/repair" className="btn border-2 border-white/40 px-5 text-base text-white hover:border-white">
              איך זה עובד
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[460px] -rotate-[1.5deg]">
          <div className="ticket bg-paper px-6 pb-6 pt-8 text-ink shadow-[-8px_10px_0_rgba(0,0,0,.25)] sm:px-8">
            <div className="flex items-baseline justify-between border-b-2 border-dashed border-line-strong pb-4">
              <span className="h-display text-[34px]">מחירון מעבדה</span>
              <span className="text-sm text-mute">החל מ־</span>
            </div>
            <ul className="divide-y divide-line">
              {LAB_PRICES.map(([t, price]) => (
                <li key={t} className="flex items-baseline justify-between gap-4 py-3 text-[15px]">
                  <span>{t}</span>
                  <span className="font-semibold tabular-nums">₪{price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t-2 border-dashed border-line-strong pt-4 text-sm text-ink-2">
              אבחון חינם כשמתקנים אצלנו, ו-90 יום אחריות על כל תיקון.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.badges.includes('new') || p.badges.includes('exclusive') || p.badges.includes('preorder')).slice(0, 8)
  return (
    <section className="container-x py-16 lg:py-20" aria-labelledby="new-title">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="new-title" className="h-section">
          חדש על המדף
        </h2>
        <Link to="/catalog?sort=new" className="text-[15px] font-semibold underline underline-offset-4 hover:decoration-2">
          כל החדשים
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

const TRUST = [
  { icon: ShieldCheck, title: 'אחריות יבואן רשמי', text: 'על כל מוצר, עם תעודה. את השירות נותנת המעבדה שלנו, בלי לשלוח ליבואן.' },
  { icon: Users, title: 'ייעוץ מגיימרים לגיימרים', text: 'הצוות משחק במה שאתם משחקים, ויגיד לכם גם מתי לא כדאי לקנות.' },
  { icon: BadgeCheck, title: 'אותו מחיר באתר ובסניפים', text: 'המחיר שאתם רואים כאן הוא המחיר בחיפה ובתל אביב. בלי מחיר מיוחד לאונליין.' },
  { icon: Truck, title: 'משלוח מהיר לכל הארץ', text: 'תוך 1–3 ימי עסקים, אקספרס באותו יום במרכז ובחיפה, או איסוף עצמי חינם.' },
]

function Trust() {
  return (
    <section className="border-y border-line bg-paper" aria-label="למה לקנות בדומינטור">
      <div className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="py-8 sm:px-6 lg:border-l lg:border-line lg:py-12 lg:first:pr-0 lg:last:border-l-0">
            <t.icon className="h-7 w-7" strokeWidth={1.75} />
            <h3 className="mt-4 text-[17px] font-semibold">{t.title}</h3>
            <p className="mt-1.5 max-w-[34ch] text-[15px] text-ink-2">{t.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SectionHead({ title, id, link }: { eyebrow?: string; title: string; id?: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {link && (
        <Link to={link.to} className="text-[15px] font-semibold underline underline-offset-4 hover:decoration-2">
          {link.label}
        </Link>
      )}
    </div>
  )
}
