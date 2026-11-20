import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Heart, Menu, ShoppingBag, User, Wrench, X, Zap, Truck, ShieldCheck, ArrowLeft } from 'lucide-react'
import Logo from './Logo'
import SearchBox from './SearchBox'
import ProductArt from './ProductArt'
import { WhatsAppIcon } from './Icons'
import { CATEGORIES, type Category } from '../data/categories'
import { PRODUCTS, formatPrice } from '../data/products'
import { SITE, waLink } from '../data/site'
import { useStore } from '../context/StoreContext'

export default function Header() {
  const { count, setCartOpen, wishlist, user } = useStore()
  const [mega, setMega] = useState<Category | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bump, setBump] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const loc = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => {
    setMega(null)
    setMobile(false)
  }, [loc.pathname, loc.search])
  useEffect(() => {
    if (!count) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 400)
    return () => clearTimeout(t)
  }, [count])
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const openMega = (c: Category) => {
    clearTimeout(timer.current)
    setMega(c)
  }
  const closeMega = () => {
    timer.current = window.setTimeout(() => setMega(null), 140)
  }

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-40 border-b border-white/5 bg-ink-950 text-[12.5px] text-mist-300">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-5 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-neon-400" />
              משלוח חינם בהזמנה מעל {formatPrice(SITE.freeShippingFrom)}
            </span>
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-slime-500" />
              אחריות יבואן רשמי על כל המוצרים
            </span>
            <span className="hidden items-center gap-1.5 lg:inline-flex">
              <Zap className="h-3.5 w-3.5 text-fire-400" />
              GTA VI כבר במלאי — משלוח עד 24 שעות
            </span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/branches" className="hover:text-white">
              סניפים: חיפה · תל אביב
            </Link>
            <Link to="/repair" className="hover:text-white">
              מעקב תיקון
            </Link>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-ink-900/85 shadow-[0_10px_30px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl' : 'bg-ink-900/40 backdrop-blur'}`}>
        <div className="container-x flex h-[72px] items-center gap-3 lg:gap-6">
          <button className="grid h-10 w-10 place-items-center rounded-xl text-mist-200 hover:bg-white/5 lg:hidden" onClick={() => setMobile(true)} aria-label="פתיחת תפריט">
            <Menu className="h-6 w-6" />
          </button>
          <Logo />
          <div className="mx-auto hidden w-full max-w-xl md:block">
            <SearchBox />
          </div>
          <div className="mr-auto flex items-center gap-1 sm:gap-2 md:mr-0">
            <a href={waLink()} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-xl border border-[#25C565]/30 bg-[#25C565]/10 px-3 py-2 text-sm font-semibold text-[#5BE38E] transition hover:bg-[#25C565]/20 xl:inline-flex">
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              ייעוץ בוואטסאפ
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl text-[#5BE38E] hover:bg-white/5 xl:hidden" aria-label="ייעוץ בוואטסאפ">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link to="/account" className="hidden h-10 items-center gap-2 rounded-xl px-2.5 text-sm text-mist-200 hover:bg-white/5 sm:inline-flex" aria-label="אזור אישי">
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">{user ? `היי, ${user.name.split(' ')[0]}` : 'התחברות'}</span>
            </Link>
            <Link to="/account?tab=wishlist" className="relative hidden h-10 w-10 place-items-center rounded-xl text-mist-200 hover:bg-white/5 sm:grid" aria-label="מועדפים">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-fire-500" />}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className={`relative inline-flex h-10 items-center gap-2 rounded-xl bg-white/[0.05] px-3 text-sm font-bold ring-1 ring-white/10 transition hover:bg-white/10 ${bump ? 'scale-110' : ''}`}
              aria-label={`עגלת קניות, ${count} פריטים`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">הסל</span>
              <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] ${count ? 'bg-fire-500 text-white' : 'bg-white/10 text-mist-300'}`}>{count}</span>
            </button>
          </div>
        </div>

        <div className="container-x pb-3 md:hidden">
          <SearchBox />
        </div>

        {/* Desktop category nav */}
        <nav className="hidden border-t border-white/5 lg:block" onMouseLeave={closeMega} aria-label="קטגוריות">
          <div className="container-x flex h-12 items-center gap-1">
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.id}
                to={`/catalog/${c.id}`}
                onMouseEnter={() => openMega(c)}
                onFocus={() => openMega(c)}
                className={({ isActive }) =>
                  `relative inline-flex h-full items-center gap-1.5 px-3 text-[14.5px] font-medium transition ${isActive || mega?.id === c.id ? 'text-white' : 'text-mist-300 hover:text-white'}`
                }
              >
                <c.icon className="h-4 w-4 opacity-70" />
                {c.short === "מרצ'נדייז" ? "פופ ומרצ'נדייז" : c.short === 'על שלט' ? 'רכבים על שלט' : c.short}
                <ChevronDown className={`h-3.5 w-3.5 opacity-50 transition ${mega?.id === c.id ? 'rotate-180' : ''}`} />
                <span className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-fire-500 transition ${mega?.id === c.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </NavLink>
            ))}
            <NavLink to="/repair" onMouseEnter={() => setMega(null)} className="mr-auto inline-flex items-center gap-2 rounded-lg bg-gradient-to-l from-neon-600/25 to-fire-500/20 px-3.5 py-1.5 text-sm font-bold text-white ring-1 ring-neon-500/30 transition hover:ring-neon-400/60">
              <Wrench className="h-4 w-4 text-neon-300" />
              מעבדת תיקונים
            </NavLink>
            <NavLink to="/catalog?sale=1" onMouseEnter={() => setMega(null)} className="inline-flex items-center gap-1.5 px-3 text-sm font-bold text-fire-400 hover:text-fire-300">
              <Zap className="h-4 w-4" />
              מבצעים
            </NavLink>
          </div>

          {mega && <MegaPanel c={mega} onEnter={() => clearTimeout(timer.current)} />}
        </nav>
      </header>

      {mobile && <MobileMenu onClose={() => setMobile(false)} />}
    </>
  )
}

function MegaPanel({ c, onEnter }: { c: Category; onEnter: () => void }) {
  const featured = PRODUCTS.filter((p) => p.category === c.id).sort((a, b) => b.badges.length - a.badges.length).slice(0, 2)
  return (
    <div onMouseEnter={onEnter} className="absolute inset-x-0 top-full border-y border-white/5 bg-ink-850 shadow-[0_40px_80px_-20px_rgba(0,0,0,.95)]">
      <div className="container-x grid grid-cols-12 gap-8 py-8">
        <div className="col-span-3">
          <div className="mb-1 flex items-center gap-2 font-display text-lg font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
              <c.icon className="h-4 w-4 text-white" />
            </span>
            {c.name}
          </div>
          <p className="mb-4 text-sm text-mist-400">{c.tagline}</p>
          <ul className="space-y-0.5">
            {c.subs.map((s) => (
              <li key={s.id}>
                <Link to={`/catalog/${c.id}?sub=${s.id}`} className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-[15px] text-mist-300 transition hover:bg-white/[0.04] hover:text-white">
                  {s.name}
                  <ArrowLeft className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to={`/catalog/${c.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-fire-400 hover:text-fire-300">
            לכל {c.short === 'על שלט' ? 'הרכבים על שלט' : `ה${c.short}`} <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="col-span-6 grid grid-cols-2 gap-4">
          {featured.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-ink-800 p-3 transition hover:border-white/15">
              <span className="h-24 w-28 shrink-0 rounded-xl bg-ink-850">
                <ProductArt id={`m-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-2 transition group-hover:scale-105" />
              </span>
              <span className="flex flex-col justify-center">
                <span className="text-xs font-semibold text-mist-400">{p.brand}</span>
                <span className="line-clamp-2 text-sm font-semibold">{p.name}</span>
                <span className="mt-1 font-display font-extrabold">{formatPrice(p.price)}</span>
              </span>
            </Link>
          ))}
        </div>
        <div className="col-span-3">
          <Link to="/repair" className="relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-neon-500/20 bg-gradient-to-br from-neon-600/30 via-ink-800 to-ink-800 p-5">
            <Wrench className="absolute left-4 top-4 h-16 w-16 text-neon-400/20" />
            <span className="eyebrow !text-neon-300">מעבדת דומינטור</span>
            <span className="mt-1 font-display text-lg font-extrabold leading-tight">שלט עם דריפט? קונסולה מתחממת?</span>
            <span className="mt-1 text-sm text-mist-300">אבחון מקצועי תוך 48 שעות</span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white">
              קביעת תור <ArrowLeft className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null)
  const { user } = useStore()
  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="תפריט ראשי">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-ink-850 shadow-2xl animate-[fade-up_.3s_ease_both]">
        <div className="flex h-16 items-center justify-between border-b border-white/5 px-4">
          <Logo />
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5" aria-label="סגירת תפריט">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="border-b border-white/5">
              <button onClick={() => setOpen(open === c.id ? null : c.id)} className="flex w-full items-center gap-3 px-2 py-3.5 text-right font-semibold" aria-expanded={open === c.id}>
                <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}>
                  <c.icon className="h-4 w-4 text-white" />
                </span>
                <span className="flex-1">{c.name}</span>
                <ChevronDown className={`h-4 w-4 text-mist-400 transition ${open === c.id ? 'rotate-180' : ''}`} />
              </button>
              {open === c.id && (
                <ul className="pb-3 pr-12">
                  <li>
                    <Link to={`/catalog/${c.id}`} className="block py-2 text-sm font-bold text-fire-400">
                      הכל ב{c.short}
                    </Link>
                  </li>
                  {c.subs.map((s) => (
                    <li key={s.id}>
                      <Link to={`/catalog/${c.id}?sub=${s.id}`} className="block py-2 text-sm text-mist-300">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link to="/repair" className="mt-3 flex items-center gap-3 rounded-xl bg-neon-500/15 px-3 py-3.5 font-bold ring-1 ring-neon-500/30">
            <Wrench className="h-5 w-5 text-neon-300" />
            מעבדת תיקונים — קביעת תור
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to="/catalog?sale=1" className="btn-ghost !py-2.5 text-sm">
              מבצעים
            </Link>
            <Link to="/branches" className="btn-ghost !py-2.5 text-sm">
              סניפים
            </Link>
            <Link to="/account" className="btn-ghost col-span-2 !py-2.5 text-sm">
              <User className="h-4 w-4" />
              {user ? 'האזור האישי' : 'התחברות / הרשמה'}
            </Link>
          </div>
        </div>
        <div className="border-t border-white/5 p-4">
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-wa w-full">
            <WhatsAppIcon />
            ייעוץ מהיר בוואטסאפ
          </a>
        </div>
      </aside>
    </div>
  )
}
