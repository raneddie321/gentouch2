import { Clock, MapPin, Navigation, Phone, CheckCircle2 } from 'lucide-react'
import { BRANCHES, mapsLink, waLink, wazeLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'

export default function Branches() {
  return (
    <div className="container-x py-10">
      <span className="eyebrow">בואו לבקר</span>
      <h1 className="h-section mt-2">הסניפים שלנו</h1>
      <p className="mt-2 max-w-2xl text-mist-300">עמדות ניסיון, ייעוץ פנים מול פנים, איסוף עצמי ומעבדת תיקונים. אותו מחיר כמו באתר — תמיד.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {BRANCHES.map((b) => (
          <article key={b.id} className="card overflow-hidden">
            <div className="relative h-56 bg-ink-850">
              <iframe
                title={`מפה — סניף ${b.city}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(b.mapQuery)}&z=16&output=embed`}
                className="h-full w-full opacity-80 [filter:invert(.92)_hue-rotate(180deg)_saturate(.6)]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold">
                <MapPin className="h-6 w-6 text-fire-400" /> סניף {b.city}
              </h2>
              <p className="mt-1 text-mist-300">{b.address}</p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-mist-200">
                    <Clock className="h-4 w-4" /> שעות פתיחה
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    {b.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-3">
                        <span className="text-mist-400">{h.days}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold text-mist-200">בסניף</h3>
                  <ul className="space-y-1.5 text-sm text-mist-300">
                    {b.services.map((s) => (
                      <li key={s} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-slime-500" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href={wazeLink(b.mapQuery)} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">
                  <Navigation className="h-4 w-4 text-[#7FDDFF]" /> ניווט ב-Waze
                </a>
                <a href={mapsLink(b.mapQuery)} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-sm">
                  <MapPin className="h-4 w-4" /> Google Maps
                </a>
                <a href={`tel:${b.phone}`} className="btn-ghost !py-2.5 text-sm">
                  <Phone className="h-4 w-4" /> {b.phone}
                </a>
                <a href={waLink(`היי, שאלה לסניף ${b.city}`)} target="_blank" rel="noreferrer" className="btn-wa !py-2.5 text-sm">
                  <WhatsAppIcon className="h-4 w-4" /> וואטסאפ
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
