import { Link } from 'react-router-dom'
import { INVADER_PATH } from './ProductArt'

/** The Dominator invader, drawn as the same die-cut sticker as the brand logo. */
export function Invader({ className = '', flat = false }: { className?: string; flat?: boolean }) {
  return (
    <svg viewBox="-2 -2 16 13" className={className} shapeRendering="crispEdges" aria-hidden="true">
      {!flat && (
        <>
          <path d={INVADER_PATH} fill="#121417" stroke="#121417" strokeWidth="2.6" strokeLinejoin="round" transform="translate(-.5 .6)" />
          <path d={INVADER_PATH} fill="#121417" stroke="#121417" strokeWidth="2.6" strokeLinejoin="round" />
          <path d={INVADER_PATH} fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
        </>
      )}
      <path d={INVADER_PATH} fill="#34D61C" />
    </svg>
  )
}

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="דומינטור, לעמוד הבית">
      <Invader className="w-11 transition-transform duration-200 group-hover:-rotate-6" />
      <span className="font-display text-[38px] font-bold leading-none tracking-tight">דומינטור</span>
    </Link>
  )
}
