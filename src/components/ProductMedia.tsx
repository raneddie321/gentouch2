import ProductArt from './ProductArt'
import type { Product } from '../data/products'

/** Real product photo when we have one, otherwise the vector illustration. */
export default function ProductMedia({ p, id, className = '', sticker = false, eager = false }: { p: Product; id: string; className?: string; sticker?: boolean; eager?: boolean }) {
  if (p.image) {
    const cls = className.replace(/(^|\s)p-[\d.]+(?=\s|$)/g, ' ')
    const frame = sticker ? ' aspect-[6/5] rounded-2xl border-[3px] border-ink bg-paper shadow-hard-lg' : ''
    return <img src={p.image} alt={p.name} width={960} height={800} loading={eager || sticker ? 'eager' : 'lazy'} decoding="async" className={`${cls}${frame} object-cover`} />
  }
  return <ProductArt id={id} kind={p.art} hue={p.hue} label={p.label} sticker={sticker} className={className} />
}
