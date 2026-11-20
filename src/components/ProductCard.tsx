import { Link } from 'react-router-dom'
import { Heart, Plus } from 'lucide-react'
import { formatPrice, type Product } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductArt from './ProductArt'
import Badges from './Badges'

// eslint-disable-next-line react-refresh/only-export-components
export const discountOf = (p: Product) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0)

export default function ProductCard({ product: p, className = '' }: { product: Product; className?: string }) {
  const { add, wishlist, toggleWish } = useStore()
  const wished = wishlist.includes(p.id)
  const preorder = p.badges.includes('preorder')
  return (
    <article className={`group relative flex flex-col rounded-2xl border border-line bg-paper p-2 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-ink hover:shadow-hard ${className}`}>
      <Link to={`/product/${p.id}`} className="relative block aspect-[6/5] overflow-hidden rounded-xl bg-stage" aria-label={p.name}>
        <ProductArt id={p.id} kind={p.art} hue={p.hue} label={p.label} className="h-full w-full p-4 transition-transform duration-300 group-hover:scale-[1.04]" />
        <div className="absolute right-2 top-2">
          <Badges badges={p.badges} discount={discountOf(p)} />
        </div>
      </Link>
      <button
        onClick={() => toggleWish(p.id)}
        className={`absolute left-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-paper/90 transition ${wished ? 'text-hot' : 'text-mute hover:text-ink'}`}
        aria-label={wished ? `הסרת ${p.name} מהמועדפים` : `שמירת ${p.name} במועדפים`}
        aria-pressed={wished}
      >
        <Heart className={`h-[17px] w-[17px] ${wished ? 'fill-current' : ''}`} />
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-3">
        <div className="text-[12.5px] text-mute">{p.brand}</div>
        <Link to={`/product/${p.id}`} className="mt-0.5 line-clamp-2 min-h-[2.7em] text-[15px] font-semibold leading-snug hover:underline hover:decoration-2 hover:underline-offset-4">
          {p.name}
        </Link>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="leading-none">
            <div className={`text-[19px] font-bold tabular-nums ${p.oldPrice ? 'text-hot' : ''}`}>{formatPrice(p.price)}</div>
            {p.oldPrice ? <div className="mt-1 text-xs text-mute-2 line-through">{formatPrice(p.oldPrice)}</div> : <div className="mt-1 text-xs text-mute">אחריות יבואן רשמי</div>}
          </div>
          <button
            onClick={() => add(p.id)}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1 rounded-[10px] border-2 border-ink bg-go px-2.5 text-ink transition-[transform,box-shadow] duration-150 hover:shadow-hard-sm active:scale-95 sm:px-3"
            aria-label={`${preorder ? 'הזמנה מוקדמת של' : 'הוספת'} ${p.name} לסל`}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden text-sm font-semibold sm:inline">{preorder ? 'הזמנה' : 'לסל'}</span>
          </button>
        </div>
      </div>
    </article>
  )
}
