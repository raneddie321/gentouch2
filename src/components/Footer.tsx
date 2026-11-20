import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, Navigation, Phone, Instagram, Youtube, Crown, ArrowLeft, Lock } from 'lucide-react'
import Logo from './Logo'
import { TikTokIcon, WhatsAppIcon } from './Icons'
import { BRANCHES, SITE, mapsLink, waLink, wazeLink } from '../data/site'
import { CATEGORIES } from '../data/categories'
import { useStore } from '../context/StoreContext'

export default function Footer() {
  return (
    <footer className="relative mt-10 border-t border-white/5 bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-neon-500/50 to-transparent" />
      <ClubSignup />

      <div className="container-x grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist-400">
            רשת חנויות הגיימינג של ישראל. קונסולות, מחשבים בהרכבה אישית, סימולטורים, רכבים על שלט, מרצ'נדייז — ומעבדת תיקונים מקצועית שמחזירה אתכם למשחק.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <Social href={SITE.social.tiktok} label="TikTok">
              <TikTokIcon className="h-[18px] w-[18px]" />
            </Social>
            <Social href={SITE.social.youtube} label="YouTube">
              <Youtube className="h-5 w-5" />
            </Social>
            <Social href={SITE.social.instagram} label="Instagram">
              <Instagram className="h-5 w-5" />
            </Social>
            <Social href={waLink()} label="WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
            </Social>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5">
          {BRANCHES.map((b) => (
            <div key={b.id} className="card p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-extrabold">
                <MapPin className="h-5 w-5 text-fire-400" />
                סניף {b.city}
              </h3>
              <p className="mt-1 text-sm text-mist-300">{b.address}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {b.hours.map((h) => (
                  <li key={h.days} className="flex items-center justify-between gap-2 text-mist-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {h.days}
                    </span>
                    <span className="text-mist-200 tabular-nums">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={wazeLink(b.mapQuery)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#33CCFF]/10 px-3 py-1.5 text-xs font-bold text-[#7FDDFF] ring-1 ring-[#33CCFF]/25 hover:bg-[#33CCFF]/20">
                  <Navigation className="h-3.5 w-3.5" />
                  Waze
                </a>
                <a href={mapsLink(b.mapQuery)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold text-mist-200 ring-1 ring-white/10 hover:bg-white/10">
                  <MapPin className="h-3.5 w-3.5" />
                  Google Maps
                </a>
                <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-bold text-mist-200 ring-1 ring-white/10 hover:bg-white/10">
                  <Phone className="h-3.5 w-3.5" />
                  {b.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 lg:col-span-3">
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">קטגוריות</h4>
            <ul className="space-y-2 text-sm text-mist-400">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link to={`/catalog/${c.id}`} className="hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-bold text-white">שירות</h4>
            <ul className="space-y-2 text-sm text-mist-400">
              <li><Link to="/repair" className="hover:text-white">מעבדת תיקונים</Link></li>
              <li><Link to="/branches" className="hover:text-white">סניפים ושעות</Link></li>
              <li><Link to="/account" className="hover:text-white">האזור האישי</Link></li>
              <li><Link to="/info/shipping" className="hover:text-white">משלוחים והחזרות</Link></li>
              <li><Link to="/info/warranty" className="hover:text-white">אחריות</Link></li>
              <li><Link to="/info/terms" className="hover:text-white">תקנון האתר</Link></li>
              <li><Link to="/info/accessibility" className="hover:text-white">הצהרת נגישות</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-mist-500 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} דומינטור גיימינג. כל הזכויות שמורות.</span>
            <span className="inline-flex items-center gap-1">
              <Lock className="h-3.5 w-3.5" /> תשלום מאובטח · Visa · Mastercard · Bit · Apple Pay
            </span>
          </div>
          <a
            href={SITE.credit.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[12.5px] text-mist-400 transition hover:border-neon-500/40 hover:text-white"
          >
            <span>עיצוב ופיתוח הקונספט:</span>
            <span className="font-bold text-mist-200 group-hover:bg-gradient-to-l group-hover:from-fire-400 group-hover:to-neon-400 group-hover:bg-clip-text group-hover:text-transparent">{SITE.credit.name}</span>
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-mist-300 transition hover:-translate-y-0.5 hover:border-fire-500/50 hover:text-white">
      {children}
    </a>
  )
}

function ClubSignup() {
  const { toast } = useStore()
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  return (
    <div className="container-x pt-12">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-l from-neon-600/25 via-ink-800 to-fire-600/20 p-6 sm:p-10">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative grid items-center gap-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FFB020]/15 px-3 py-1 text-xs font-bold text-[#FFC85A]">
              <Crown className="h-3.5 w-3.5" />
              מועדון Dominator Crew
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold sm:text-3xl">הצטרפו למועדון וקבלו 50₪ לקנייה הראשונה</h2>
            <p className="mt-2 text-mist-300">גישה מוקדמת להזמנות מוקדמות, מבצעי חברים בלבד והטבות במעבדה.</p>
          </div>
          {done ? (
            <div className="rounded-2xl border border-slime-500/30 bg-slime-500/10 p-5 text-center font-semibold text-slime-400">ברוכים הבאים ל-Crew! קוד ההטבה CREW50 נשלח אליכם 🎮</div>
          ) : (
            <form
              className="flex flex-col gap-3 sm:flex-row"
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const email = String(fd.get('email') || '')
                const phone = String(fd.get('phone') || '')
                if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('נא להזין כתובת אימייל תקינה')
                if (phone && !/^0\d{8,9}$/.test(phone.replace(/\D/g, ''))) return setErr('מספר הטלפון לא תקין')
                setErr('')
                setDone(true)
                toast('נרשמתם למועדון בהצלחה')
              }}
            >
              <div className="flex-1">
                <label htmlFor="club-email" className="sr-only">אימייל</label>
                <input id="club-email" name="email" type="email" placeholder="האימייל שלכם" className="input" dir="rtl" />
              </div>
              <div className="sm:w-40">
                <label htmlFor="club-phone" className="sr-only">טלפון</label>
                <input id="club-phone" name="phone" type="tel" placeholder="נייד (רשות)" className="input" />
              </div>
              <button className="btn-primary whitespace-nowrap">הצטרפות חינם</button>
              {err && <p className="text-sm text-fire-300 sm:hidden">{err}</p>}
            </form>
          )}
        </div>
        {err && !done && <p className="relative mt-2 hidden text-sm text-fire-300 sm:block lg:text-left">{err}</p>}
      </div>
    </div>
  )
}
