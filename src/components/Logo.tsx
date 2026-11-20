import { Link } from 'react-router-dom'
import { INVADER_PATH } from './ProductArt'

export function Invader({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-0.5 -0.5 13 9" className={className} shapeRendering="crispEdges" aria-hidden="true">
      <path d={INVADER_PATH} fill="#000" transform="translate(.45 .45)" opacity=".6" />
      <path d={INVADER_PATH} fill="#39E81B" />
    </svg>
  )
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="דומינטור — לעמוד הבית">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-ink-800 ring-1 ring-white/10 transition group-hover:ring-slime-500/50 group-hover:shadow-[0_0_24px_-4px_rgba(57,232,27,.6)]">
        <Invader className="w-7 transition group-hover:-translate-y-0.5" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[19px] font-black tracking-tight">דומינטור</span>
          <span className="block text-[10px] font-bold tracking-[.32em] text-mist-400">DOMINATOR</span>
        </span>
      )}
    </Link>
  )
}
