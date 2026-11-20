import { Check } from 'lucide-react'
import { useStore } from '../context/StoreContext'
export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex -translate-x-1/2 flex-col items-center gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="flex animate-rise items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-lift">
          <Check className="h-4 w-4 text-go" strokeWidth={3} />
          {t.text}
        </div>
      ))}
    </div>
  )
}
