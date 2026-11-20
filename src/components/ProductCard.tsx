import { Link } from 'react-router-dom'
import { Heart, Plus, ShieldCheck, Truck } from 'lucide-react'
import { formatPrice, type Product } from '../data/products'
import { getCategory } from '../data/categories'
import { useStore } from '../context/StoreContext'
import ProductArt from './ProductArt'
import Badges from './Badges'
import Rating from './Rating'

export const discountOf = (p: Product) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0)

export default function ProductCard({ product: p, className = '' }: { product: Product; className?: string }) {
  const { add, wishlist, toggleWish } = useStore()
  const cat = getCategory(p.category)!
  const wished = wishlist.includes(p.id)
  const preorder = p.badges.includes('preorder')
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-800 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,.9),0_0_0_1px_rgba(124,92,255,.18)] ${className}`}>
      <Link to={`/product/${p.id}`} className="relative block aspect-[5/4] overflow-hidden bg-ink-850" aria-label={p.name}>
        <div
          className="absolute inset-0 opacity-60 transition duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(60% 60% at 50% 55%, ${cat.from}33, transparent 70%)` }}
        />
        <div className="grid-bg absolute inset-0 opacity-40" />
        <ProductArt id={p.id} kind={p.art} hue={p.hue} label={p.label} className="relative h-full w-full p-5 transition duration-500 group-hover:scale-[1.06]" />
        <div className="absolute right-3 top-3">
          <Badges badges={p.badges} discount={discountOf(p)} />
        </div>
      </Link>
      <button
        onClick={() => toggleWish(p.id)}
        className={`absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full border backdrop-blur transition ${wished ? 'border-fire-500/50 bg-fire-500/20 text-fire-400' : 'border-white/10 bg-ink-900/60 text-mist-300 opacity-100 hover:text-white sm:opacity-0 sm:group-hover:opacity-100'}`}
        aria-label={wished ? 'הסרה מהמועדפים' : 'הוספה למועדפים'}
        aria-pressed={wished}
      >
        <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-mist-400">
          <span className="font-semibold">{p.brand}</span>
          <Rating value={p.rating} count={p.reviews} />
        </div>
        <Link to={`/product/${p.id}`} className="line-clamp-2 min-h-[2.6em] text-[15px] font-semibold leading-snug text-mist-100 transition hover:text-white">
          {p.name}
        </Link>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-mist-400">
          {p.officialWarranty && (
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-slime-500" />
              אחריות יבואן רשמי
            </span>
          )}
          {p.fastShip && (
            <span className="inline-flex items-center gap-1">
              <Truck className="h-3.5 w-3.5 text-neon-400" />
              משלוח מהיר
            </span>
          )}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="leading-tight">
            {p.oldPrice && <div className="text-xs text-mist-500 line-through">{formatPrice(p.oldPrice)}</div>}
            <div className="font-display text-xl font-extrabold text-white">{formatPrice(p.price)}</div>
          </div>
          <button
            onClick={() => add(p.id)}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-white/[0.06] px-3.5 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-fire-500 hover:ring-fire-500 hover:shadow-glow active:scale-95"
            aria-label={`הוספת ${p.name} לסל`}
          >
            <Plus className="h-4 w-4" />
            {preorder ? 'הזמנה' : 'לסל'}
          </button>
        </div>
      </div>
    </article>
  )
}
