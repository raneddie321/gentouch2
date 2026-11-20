import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Flame, Wrench, CalendarCheck, Gauge, Cpu, Gamepad2, Timer, Sparkles } from 'lucide-react'
import ProductArt from '../components/ProductArt'
import ProductCard from '../components/ProductCard'
import TrustBar from '../components/TrustBar'
import { WhatsAppIcon } from '../components/Icons'
import { CATEGORIES } from '../data/categories'
import { PRODUCTS, formatPrice, getProduct } from '../data/products'
import { waLink } from '../data/site'

const SLIDES = [
  {
    id: 'switch-2',
    eyebrow: 'השקה חמה',
    title: 'Nintendo Switch 2',
    accent: 'הגיע. ובמלאי.',
    text: 'מסך 7.9" 120Hz, Joy-Con 2 מגנטיים ו-4K בעגינה. באנדל מריו קארט וורלד במחיר השקה — באחריות יבואן רשמי.',
    from: '#FF3B30',
    to: '#7C5CFF',
    product: 'switch-2-mkw',
  },
  {
    id: 'ps5-pro',
    eyebrow: 'הזמנה מהירה',
    title: 'PlayStation 5 Pro',
    accent: 'הגרפיקה ברמה הבאה.',
    text: 'PSSR, Ray Tracing משופר ו-2TB אחסון. משלוח עד 24 שעות לכל הארץ או איסוף מהסניף עוד היום.',
    from: '#2B6BFF',
    to: '#7C5CFF',
    product: 'ps5-pro',
  },
  {
    id: 'pc',
    eyebrow: 'נבנה במעבדה שלנו',
    title: 'מחשבי גיימינג',
    accent: 'בהרכבה אישית.',
    text: 'RTX 50 Series, בדיקות עומס של 24 שעות, ניהול כבלים מושלם ו-3 שנות אחריות. בונים אותו יחד איתכם.',
    from: '#FF4D2E',
    to: '#FFB020',
    product: 'dom-titan',
  },
]

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <HotDeals />
      <RepairBanner />
      <NewArrivals />
      <TrustBar />
    </>
  )
}

function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6500)
    return () => clearInterval(t)
  }, [paused])
  const s = SLIDES[i]
  const p = getProduct(s.product)!

  return (
    <section className="container-x pt-6 sm:pt-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label="השקות חמות">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-850">
        <div className="absolute inset-0 transition-[background] duration-700" style={{ background: `radial-gradient(70% 90% at 15% 50%, ${s.from}40, transparent 60%), radial-gradient(60% 80% at 0% 100%, ${s.to}33, transparent 60%)` }} />
        <div className="grid-bg absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,transparent,black_60%)]" />

        <div className="relative grid min-h-[520px] items-center gap-6 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div key={s.id} className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fire-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-fire-500" />
              </span>
              {s.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-[34px] font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {s.title}
              <span className="block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to left, ${s.from}, ${s.to})` }}>
                {s.accent}
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-mist-300">{s.text}</p>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-sm text-mist-400">החל מ-</span>
              <span className="font-display text-3xl font-black">{formatPrice(p.price)}</span>
              {p.oldPrice && <span className="text-mist-500 line-through">{formatPrice(p.oldPrice)}</span>}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/catalog" className="btn-primary px-6 text-base">
                לקטלוג המלא
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <a href={waLink(`היי, אשמח לייעוץ לגבי ${s.title}`)} target="_blank" rel="noreferrer" className="btn-wa px-6 text-base">
                <WhatsAppIcon />
                ייעוץ מהיר בוואטסאפ
              </a>
            </div>
          </div>

          <Link to={`/product/${p.id}`} key={`v-${s.id}`} className="relative mx-auto aspect-[5/4] w-full max-w-[560px] animate-fade-up" aria-label={p.name}>
            <div className="absolute inset-[12%] rounded-full blur-3xl" style={{ background: `${s.from}55` }} />
            <ProductArt id={`hero-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="relative h-full w-full animate-float drop-shadow-[0_30px_40px_rgba(0,0,0,.6)]" />
          </Link>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/5 px-6 py-4 sm:px-10">
          <div className="flex gap-2">
            {SLIDES.map((sl, idx) => (
              <button key={sl.id} onClick={() => setI(idx)} className="group flex items-center gap-2 py-1" aria-label={sl.title} aria-current={idx === i}>
                <span className="h-1.5 overflow-hidden rounded-full bg-white/10 transition-all" style={{ width: idx === i ? 56 : 22 }}>
                  {idx === i && <span key={`${i}-${paused}`} className="block h-full origin-right rounded-full bg-white" style={{ animation: paused ? 'none' : 'progress 6.5s linear both' }} />}
                </span>
                <span className={`hidden text-xs font-semibold md:inline ${idx === i ? 'text-white' : 'text-mist-500 group-hover:text-mist-300'}`}>{sl.title}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label="הקודם">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => setI((i + 1) % SLIDES.length)} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label="הבא">
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>

      {/* quick promo tiles */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { to: '/product/gta-6', icon: Sparkles, t: 'GTA VI כבר כאן', s: 'במלאי · משלוח עד 24 שעות', c: '#FF2E7E' },
          { to: '/catalog/sims', icon: Gauge, t: 'מרכז הסימולטורים', s: 'בואו לנסות בסניף חיפה', c: '#FFB020' },
          { to: '/catalog/pcs?sub=desktops', icon: Cpu, t: 'בונים לכם מחשב', s: 'ייעוץ והרכבה במעבדה', c: '#7C5CFF' },
        ].map((x) => (
          <Link key={x.t} to={x.to} className="card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-white/15">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: `${x.c}22`, color: x.c }}>
              <x.icon className="h-6 w-6" />
            </span>
            <span className="flex-1">
              <span className="block font-bold">{x.t}</span>
              <span className="block text-sm text-mist-400">{x.s}</span>
            </span>
            <ArrowLeft className="h-5 w-5 text-mist-500 transition group-hover:-translate-x-1 group-hover:text-white" />
          </Link>
        ))}
      </div>
    </section>
  )
}

const CAT_ART: Record<string, { art: Parameters<typeof ProductArt>[0]['kind']; hue: string; label?: string }> = {
  consoles: { art: 'controller', hue: '#F5F7FB' },
  pcs: { art: 'pc', hue: '#FF4D2E' },
  games: { art: 'game', hue: '#14C8A8', label: 'NEW' },
  sims: { art: 'wheel', hue: '#FFB020' },
  rc: { art: 'car', hue: '#39E81B' },
  merch: { art: 'figure', hue: '#FFD60A' },
}

function CategoryGrid() {
  const featured = CATEGORIES.filter((c) => c.id !== 'games')
  const big = featured.slice(0, 2)
  const small = featured.slice(2)
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="cat-title">
      <SectionHead eyebrow="מה בא לכם לשחק?" title="קטגוריות מובילות" id="cat-title" link={{ to: '/catalog', label: 'לכל הקטגוריות' }} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {big.map((c) => (
          <CatTile key={c.id} c={c} big />
        ))}
        {small.map((c) => (
          <CatTile key={c.id} c={c} />
        ))}
        <Link to="/catalog/games" className="card group flex items-center justify-between gap-4 p-5 transition hover:border-white/15 md:col-span-2 lg:col-span-4">
          <span className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-[#14C8A8] to-[#2B6BFF]">
              <Gamepad2 className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-display text-lg font-extrabold">משחקים לכל הקונסולות</span>
              <span className="text-sm text-mist-400">GTA VI, Mario Kart World, FC 26, Ghost of Yōtei ועוד</span>
            </span>
          </span>
          <span className="btn-ghost !py-2 text-sm">
            לכל המשחקים <ArrowLeft className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </section>
  )
}

function CatTile({ c, big = false }: { c: (typeof CATEGORIES)[number]; big?: boolean }) {
  const a = CAT_ART[c.id]
  const count = PRODUCTS.filter((p) => p.category === c.id).length
  return (
    <Link
      to={`/catalog/${c.id}`}
      className={`group relative isolate flex overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 ${big ? 'min-h-[300px] lg:col-span-2' : 'min-h-[240px]'}`}
    >
      <div className="absolute inset-0 -z-10 opacity-70 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(80% 80% at 20% 80%, ${c.from}40, transparent 60%), radial-gradient(60% 60% at 100% 0%, ${c.to}22, transparent 60%)` }} />
      <div className="relative z-10 flex flex-col">
        <span className="grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
          <c.icon className="h-5 w-5" />
        </span>
        <h3 className={`mt-4 font-display font-extrabold leading-tight ${big ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>{c.name}</h3>
        <p className="mt-1 max-w-[16rem] text-sm text-mist-300">{c.tagline}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold">
          {count} מוצרים
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
        </span>
      </div>
      <ProductArt
        id={`cat-${c.id}`}
        kind={a.art}
        hue={a.hue}
        label={a.label}
        className={`pointer-events-none absolute -left-4 bottom-0 transition duration-500 group-hover:-translate-y-2 group-hover:scale-105 ${big ? 'w-[55%] max-w-[340px]' : 'w-[58%]'}`}
      />
    </Link>
  )
}

function HotDeals() {
  const deals = PRODUCTS.filter((p) => p.oldPrice || p.badges.includes('hot'))
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('article') as HTMLElement | null
    el.scrollBy({ left: -dir * ((card?.offsetWidth ?? 280) + 16) * 2, behavior: 'smooth' })
  }
  return (
    <section className="py-6" aria-labelledby="deals-title">
      <div className="container-x">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow inline-flex items-center gap-1.5">
              <Flame className="h-4 w-4" /> מבצעי השבוע
            </span>
            <h2 id="deals-title" className="h-section mt-2">
              החמים ביותר עכשיו
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Countdown />
            <div className="hidden gap-2 sm:flex">
              <button onClick={() => scroll(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label="גלילה ימינה">
                <ChevronRight className="h-5 w-5" />
              </button>
              <button onClick={() => scroll(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 hover:bg-white/10" aria-label="גלילה שמאלה">
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-6 sm:scroll-px-6 sm:px-6 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))]">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} className="w-[260px] shrink-0 snap-start sm:w-[280px]" />
        ))}
        <Link to="/catalog?sale=1" className="grid w-[200px] shrink-0 snap-start place-items-center rounded-2xl border border-dashed border-white/15 text-center text-mist-300 transition hover:border-fire-500/50 hover:text-white">
          <span>
            <ArrowLeft className="mx-auto mb-2 h-6 w-6" />
            לכל המבצעים
          </span>
        </Link>
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
  const parts = [Math.floor(d / 864e5), Math.floor((d / 36e5) % 24), Math.floor((d / 6e4) % 60), Math.floor((d / 1e3) % 60)]
  return (
    <div className="flex items-center gap-2 rounded-xl border border-fire-500/25 bg-fire-500/10 px-3 py-2 text-sm" aria-label="זמן שנותר למבצע">
      <Timer className="h-4 w-4 text-fire-400" />
      <span className="text-mist-300">נגמר בעוד</span>
      <span className="font-display font-bold tabular-nums text-white" dir="ltr">
        {parts.map((n) => String(n).padStart(2, '0')).join(':')}
      </span>
    </div>
  )
}
function nextSunday() {
  const d = new Date()
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7))
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function RepairBanner() {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="lab-title">
      <div className="relative overflow-hidden rounded-[28px] border border-neon-500/25 bg-ink-850">
        <div className="absolute inset-0 bg-[radial-gradient(70%_100%_at_100%_0%,rgba(124,92,255,.35),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgba(255,77,46,.18),transparent_60%)]" />
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:p-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-neon-500/15 px-3 py-1 text-xs font-bold text-neon-300 ring-1 ring-neon-500/30">
              <Wrench className="h-3.5 w-3.5" /> מעבדת התיקונים של דומינטור
            </span>
            <h2 id="lab-title" className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              מחזירים אתכם למשחק.
              <span className="block text-mist-400">מהר, שקוף ובאחריות.</span>
            </h2>
            <p className="mt-4 max-w-xl text-mist-300">
              טכנאים מוסמכים לקונסולות, שלטים ומחשבים. החלפת סטיקים בדריפט, ניקוי והחלפת משחה תרמית, תיקוני HDMI, שדרוגי מחשב ושחזור מערכות — עם הצעת מחיר לפני כל עבודה.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/repair#book" className="btn-primary px-6 text-base">
                <CalendarCheck className="h-5 w-5" />
                קביעת תור למעבדה אונליין
              </Link>
              <a href={waLink('היי, יש לי תקלה ואשמח להצעת מחיר')} target="_blank" rel="noreferrer" className="btn-ghost px-6 text-base">
                <WhatsAppIcon className="h-5 w-5 text-[#5BE38E]" />
                שליחת תמונה של התקלה
              </a>
            </div>
            <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4">
              {[
                ['48 ש׳', 'זמן אבחון ממוצע'],
                ['90 יום', 'אחריות על כל תיקון'],
                ['12K+', 'מכשירים שתוקנו'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-black sm:text-3xl">{v}</dd>
                  <dd className="text-xs text-mist-400 sm:text-sm">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-3 self-center">
            {[
              { t: 'דריפט בשלט', p: 'מ-₪149', k: 'controller' as const, h: '#F5F7FB' },
              { t: 'התחממות קונסולה', p: 'מ-₪249', k: 'console-tower' as const, h: '#E8ECF5' },
              { t: 'תיקון HDMI', p: 'מ-₪349', k: 'console-box' as const, h: '#1F2937' },
              { t: 'שדרוג מחשב', p: 'מ-₪199', k: 'pc' as const, h: '#7C5CFF' },
            ].map((x) => (
              <Link key={x.t} to="/repair#book" className="group rounded-2xl border border-white/10 bg-ink-800/80 p-3 backdrop-blur transition hover:-translate-y-0.5 hover:border-neon-500/40">
                <div className="aspect-[5/3] rounded-xl bg-ink-850">
                  <ProductArt id={`lab-${x.t}`} kind={x.k} hue={x.h} className="h-full w-full p-2 transition group-hover:scale-105" />
                </div>
                <div className="mt-2 flex items-center justify-between px-1">
                  <span className="text-sm font-bold">{x.t}</span>
                  <span className="text-xs font-semibold text-neon-300">{x.p}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.badges.includes('new') || p.badges.includes('exclusive') || p.badges.includes('preorder')).slice(0, 8)
  return (
    <section className="container-x pt-2" aria-labelledby="new-title">
      <SectionHead eyebrow="טרי מהמשלוח" title="חדשים ובלעדיים" id="new-title" link={{ to: '/catalog?sort=new', label: 'לכל החדשים' }} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, id, link }: { eyebrow: string; title: string; id?: string; link?: { to: string; label: string } }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 id={id} className="h-section mt-2">
          {title}
        </h2>
      </div>
      {link && (
        <Link to={link.to} className="inline-flex items-center gap-1 text-sm font-bold text-mist-300 hover:text-white">
          {link.label} <ArrowLeft className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
