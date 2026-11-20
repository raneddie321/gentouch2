import { BADGE_LABEL, type Badge } from '../data/products'

const STYLE: Record<Badge, string> = {
  hot: 'bg-paper text-ink',
  sale: 'bg-hot text-white border-hot',
  new: 'bg-ink text-white',
  preorder: 'bg-signal-tint text-ink',
  exclusive: 'bg-go text-ink',
}

export default function Badges({ badges, discount }: { badges: Badge[]; discount?: number }) {
  const list = badges.filter((b) => b !== 'sale' && b !== 'hot').slice(0, 1)
  if (!list.length && !discount) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {discount ? <span className="tag border-hot bg-hot text-white">{discount}%-</span> : null}
      {list.map((b) => (
        <span key={b} className={`tag ${STYLE[b]}`}>
          {BADGE_LABEL[b]}
        </span>
      ))}
    </div>
  )
}
