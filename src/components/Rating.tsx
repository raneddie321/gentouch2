import { Star } from 'lucide-react'
export default function Rating({ value, count, size = 'sm' }: { value: number; count?: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <span className="inline-flex items-center gap-1 text-mist-400" aria-label={`דירוג ${value} מתוך 5`}>
      <Star className={`${s} fill-[#FFB020] text-[#FFB020]`} />
      <span className={`font-semibold text-mist-100 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{value.toFixed(1)}</span>
      {count !== undefined && <span className={size === 'sm' ? 'text-xs' : 'text-sm'}>({count})</span>}
    </span>
  )
}
