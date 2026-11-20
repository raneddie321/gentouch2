import { Star } from 'lucide-react'
export default function Rating({ value, count, size = 'sm' }: { value: number; count?: number; size?: 'sm' | 'md' }) {
  const t = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <span className={`inline-flex items-center gap-1 text-mute ${t}`} aria-label={`דירוג ${value} מתוך 5, ${count ?? 0} חוות דעת`}>
      <Star className={`${size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} fill-[#F5B400] text-[#F5B400]`} />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {count !== undefined && <span>({count})</span>}
    </span>
  )
}
