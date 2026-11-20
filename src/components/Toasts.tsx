import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'
export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[90] flex -translate-x-1/2 flex-col items-center gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-700/95 px-4 py-2.5 text-sm font-semibold shadow-2xl backdrop-blur animate-fade-up">
          <CheckCircle2 className="h-4 w-4 text-slime-500" />
          {t.text}
        </div>
      ))}
    </div>
  )
}
