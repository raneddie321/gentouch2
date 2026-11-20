import { BADGE_LABEL, type Badge } from '../data/products'
const STYLE: Record<Badge, string> = {
  hot: 'bg-fire-500 text-white',
  sale: 'bg-[#FFB020] text-ink-900',
  new: 'bg-neon-500 text-white',
  preorder: 'bg-[#14C8A8] text-ink-900',
  exclusive: 'bg-slime-500 text-ink-900',
}
export default function Badges({ badges, discount }: { badges: Badge[]; discount?: number }) {
  if (!badges.length && !discount) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {discount ? <span className="chip bg-fire-500 text-white">-{discount}%</span> : null}
      {badges
        .filter((b) => !(discount && b === 'sale'))
        .map((b) => (
          <span key={b} className={`chip ${STYLE[b]}`}>
            {BADGE_LABEL[b]}
          </span>
        ))}
    </div>
  )
}
