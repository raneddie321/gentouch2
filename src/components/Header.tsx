import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Heart, Menu, ShoppingBag, User, Wrench, X } from 'lucide-react'
import Logo from './Logo'
import SearchBox from './SearchBox'
import ProductArt from './ProductArt'
import { WhatsAppIcon } from './Icons'
import { CATEGORIES, type Category } from '../data/categories'
import { PRODUCTS, formatPrice } from '../data/products'
import { SITE, waLink } from '../data/site'
import { useStore } from '../context/StoreContext'

const NAV_LABEL: Record<string, string> = {
  consoles: 'קונסולות',
  pcs: 'מחשבי גיימינג',
  games: 'משחקים',
  sims: 'סימולטורים',
  rc: 'רכבים וטיסנים',
  merch: "פופ ומרצ'נדייז",
}

export default function Header() {
  const { count, setCartOpen, wishlist, user } = useStore()
  const [mega, setMega] = useState<Category | null>(null)
  const [mobile, setMobile] = useState(false)
  const [bump, setBump] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const loc = useLocation()

  useEffect(() => {
    setMega(null)
    setMobile(false)
  }, [loc.pathname, loc.search])
  useEffect(() => {
    if (!count) return
    setBump(true)
    const t = setTimeout(() => setBump(false), 350)
    return () => clearTimeout(t)
  }, [count])
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const openMega = (c: Category) => {
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMega(c), mega ? 0 : 120)
  }
  const closeMega = () => {
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMega(null), 160)
  }

  return (
    <>
      <div className="bg-ink text-[13px] text-white/85">
        <div className="container-x flex h-9 items-center justify-between gap-4">
          <p className="truncate">
            משלוח חינם מעל {formatPrice(SITE.freeShippingFrom)}, או איסוף עצמי מהסניפים בחיפה ובתל אביב
          </p>
          <nav className="hidden shrink-0 items-center gap-5 md:flex" aria-label="קישורי שירות">
            <Link to="/branches" className="hover:text-white">
              סניפים ושעות פתיחה
            </Link>
            <Link to="/repair#track" className="hover:text-white">
              מעקב אחר תיקון
            </Link>
          </nav>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-md" onMouseLeave={closeMega}>
        <div className="container-x flex h-[76px] items-center gap-3 lg:gap-8">
          <button className="-mr-2 grid h-10 w-10 place-items-center rounded-lg hover:bg-stage lg:hidden" onClick={() => setMobile(true)} aria-label="פתיחת תפריט">
            <Menu className="h-6 w-6" />
          </button>
          <Logo />
          <div className="hidden flex-1 md:block lg:max-w-[560px]">
            <SearchBox />
          </div>
          <div className="mr-auto flex items-center gap-1">
            <a href={waLink()} target="_blank" rel="noreferrer" className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-stage xl:inline-flex">
              <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" />
              ייעוץ בוואטסאפ
            </a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-lg text-[#1FA855] hover:bg-stage xl:hidden" aria-label="ייעוץ בוואטסאפ">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link to="/account" className="hidden h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium hover:bg-stage sm:inline-flex">
              <User className="h-5 w-5" />
              <span className="hidden lg:inline">{user ? user.name.split(' ')[0] : 'כניסה'}</span>
            </Link>
            <Link to="/account?tab=wishlist" className="relative hidden h-10 w-10 place-items-center rounded-lg hover:bg-stage sm:grid" aria-label={`מועדפים, ${wishlist.length} מוצרים`}>
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-hot ring-2 ring-paper" />}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className={`mr-1 inline-flex h-10 items-center gap-2 rounded-[10px] bg-ink px-3.5 text-sm font-semibold text-white transition-transform hover:bg-ink-2 ${bump ? 'scale-105' : ''}`}
              aria-label={`עגלת קניות, ${count} פריטים`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">סל</span>
              <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11.5px] font-bold tabular-nums ${count ? 'bg-go text-ink' : 'bg-white/15'}`}>{count}</span>
            </button>
          </div>
        </div>

        <div className="container-x pb-3 md:hidden">
          <SearchBox />
        </div>

        <nav className="hidden border-t border-line lg:block" aria-label="קטגוריות">
          <div className="container-x flex h-12 items-stretch">
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.id}
                to={`/catalog/${c.id}`}
                onMouseEnter={() => openMega(c)}
                onFocus={() => openMega(c)}
                className={({ isActive }) => `relative inline-flex items-center gap-1 px-3.5 text-[15px] font-medium first:pr-0 ${isActive || mega?.id === c.id ? 'text-ink' : 'text-ink-2 hover:text-ink'}`}
              >
                {NAV_LABEL[c.id]}
                <ChevronDown className={`h-3.5 w-3.5 text-mute transition-transform ${mega?.id === c.id ? 'rotate-180' : ''}`} />
                <span className={`absolute bottom-0 left-3.5 right-3.5 h-[3px] rounded-t bg-ink transition-opacity group-first:right-0 ${mega?.id === c.id ? 'opacity-100' : 'opacity-0'}`} />
              </NavLink>
            ))}
            <div className="mr-auto flex items-center gap-1">
              <NavLink to="/catalog?sale=1" onMouseEnter={closeMega} className="px-3 text-[15px] font-semibold text-hot hover:underline hover:underline-offset-4">
                מבצעי השבוע
              </NavLink>
              <NavLink to="/repair" onMouseEnter={closeMega} className="inline-flex items-center gap-2 rounded-lg bg-mat px-3 py-1.5 text-sm font-semibold text-white hover:bg-mat-deep">
                <Wrench className="h-4 w-4" />
                מעבדת תיקונים
              </NavLink>
            </div>
          </div>
        </nav>

        {mega && <MegaPanel c={mega} onEnter={() => clearTimeout(timer.current)} />}
      </header>

      {mobile && <MobileMenu onClose={() => setMobile(false)} />}
    </>
  )
}

function MegaPanel({ c, onEnter }: { c: Category; onEnter: () => void }) {
  const featured = PRODUCTS.filter((p) => p.category === c.id)
    .sort((a, b) => b.badges.length - a.badges.length)
    .slice(0, 3)
  return (
    <div onMouseEnter={onEnter} className="absolute inset-x-0 top-full hidden border-b border-line bg-paper shadow-[0_24px_40px_-24px_rgba(18,20,23,.25)] lg:block">
      <div className="container-x grid grid-cols-12 gap-10 py-8">
        <div className="col-span-3">
          <h2 className="h-display text-[40px]">{c.name}</h2>
          <ul className="mt-4 space-y-0.5">
            {c.subs.map((s) => (
              <li key={s.id}>
                <Link to={`/catalog/${c.id}?sub=${s.id}`} className="block rounded-md py-1.5 text-[15px] text-ink-2 hover:text-ink hover:underline hover:underline-offset-4">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to={`/catalog/${c.id}`} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">
            כל המוצרים בקטגוריה
          </Link>
        </div>
        <div className="col-span-9 grid grid-cols-3 gap-4">
          {featured.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="group rounded-xl border border-line p-2 hover:border-ink">
              <span className="block aspect-[6/4] rounded-lg bg-stage">
                <ProductArt id={`m-${p.id}`} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-3" />
              </span>
              <span className="mt-2 block px-1 text-sm font-semibold leading-snug">{p.name}</span>
              <span className="block px-1 pb-1 text-sm tabular-nums text-mute">{formatPrice(p.price)}</span>
            </Link>
          ))}
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
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm animate-rise flex-col bg-paper">
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <Logo />
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-stage" aria-label="סגירת התפריט">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {CATEGORIES.map((c) => (
            <div key={c.id} className="border-b border-line">
              <button onClick={() => setOpen(open === c.id ? null : c.id)} className="flex w-full items-center justify-between py-4 text-right text-[17px] font-semibold" aria-expanded={open === c.id}>
                {c.name}
                <ChevronDown className={`h-4 w-4 text-mute transition-transform ${open === c.id ? 'rotate-180' : ''}`} />
              </button>
              {open === c.id && (
                <ul className="pb-3">
                  <li>
                    <Link to={`/catalog/${c.id}`} className="block py-2 font-semibold underline underline-offset-4">
                      הכל ב{c.short}
                    </Link>
                  </li>
                  {c.subs.map((s) => (
                    <li key={s.id}>
                      <Link to={`/catalog/${c.id}?sub=${s.id}`} className="block py-2 text-ink-2">
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="space-y-1 py-4 text-[15px]">
            <Link to="/catalog?sale=1" className="block py-2 font-semibold text-hot">
              מבצעי השבוע
            </Link>
            <Link to="/repair" className="block py-2 font-semibold">
              מעבדת תיקונים וקביעת תור
            </Link>
            <Link to="/branches" className="block py-2">
              סניפים ושעות פתיחה
            </Link>
            <Link to="/account" className="block py-2">
              {user ? 'האזור האישי' : 'כניסה לאזור האישי'}
            </Link>
          </div>
        </div>
        <div className="border-t border-line p-4">
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-line w-full">
            <WhatsAppIcon className="h-5 w-5 text-[#1FA855]" />
            ייעוץ בוואטסאפ
          </a>
        </div>
      </aside>
    </div>
  )
}
