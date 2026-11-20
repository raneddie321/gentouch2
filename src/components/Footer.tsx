import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Youtube } from 'lucide-react'
import Logo from './Logo'
import { TikTokIcon, WhatsAppIcon } from './Icons'
import { BRANCHES, SITE, mapsLink, waLink, wazeLink } from '../data/site'
import { CATEGORIES } from '../data/categories'
import { useStore } from '../context/StoreContext'

export default function Footer() {
  return (
    <footer className="mt-auto bg-paper">
      <ClubSignup />

      <div className="container-x grid gap-12 border-t border-line py-14 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Logo />
          <p className="mt-4 max-w-[36ch] text-[15px] text-ink-2">רשת חנויות גיימינג ומעבדת תיקונים. קונסולות, מחשבים בהרכבה אישית, סימולטורים, רכבים על שלט ואספנות.</p>
          <div className="mt-5 flex gap-1">
            <Social href={SITE.social.tiktok} label="דומינטור בטיקטוק">
              <TikTokIcon className="h-[19px] w-[19px]" />
            </Social>
            <Social href={SITE.social.youtube} label="דומינטור ביוטיוב">
              <Youtube className="h-5 w-5" />
            </Social>
            <Social href={SITE.social.instagram} label="דומינטור באינסטגרם">
              <Instagram className="h-5 w-5" />
            </Social>
            <Social href={waLink()} label="דומינטור בוואטסאפ">
              <WhatsAppIcon className="h-5 w-5" />
            </Social>
          </div>
        </div>

        {BRANCHES.map((b) => (
          <div key={b.id} className="lg:col-span-3">
            <h3 className="h-display text-[40px]">{b.city}</h3>
            <p className="mt-1 text-[15px]">{b.address}</p>
            <table className="mt-4 w-full max-w-[280px] text-[14.5px]">
              <caption className="sr-only">שעות פתיחה בסניף {b.city}</caption>
              <tbody>
                {b.hours.map((h) => (
                  <tr key={h.days}>
                    <th scope="row" className="py-0.5 text-right font-normal text-mute">
                      {h.days}
                    </th>
                    <td className="py-0.5 text-left tabular-nums" dir="ltr">
                      {h.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[14.5px] font-medium">
              <a href={wazeLink(b.mapQuery)} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:decoration-2">
                ניווט ב-Waze
              </a>
              <a href={mapsLink(b.mapQuery)} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:decoration-2">
                Google Maps
              </a>
              <a href={`tel:${b.phone}`} className="tabular-nums underline underline-offset-4 hover:decoration-2" dir="ltr">
                {b.phone}
              </a>
            </div>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-6 lg:col-span-3">
          <FooterList title="חנות">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/catalog/${c.id}`} className="hover:underline hover:underline-offset-4">
                  {c.short}
                </Link>
              </li>
            ))}
          </FooterList>
          <FooterList title="שירות">
            <li><Link to="/repair" className="hover:underline hover:underline-offset-4">מעבדת תיקונים</Link></li>
            <li><Link to="/repair#track" className="hover:underline hover:underline-offset-4">מעקב תיקון</Link></li>
            <li><Link to="/info/shipping" className="hover:underline hover:underline-offset-4">משלוחים והחזרות</Link></li>
            <li><Link to="/info/warranty" className="hover:underline hover:underline-offset-4">אחריות</Link></li>
            <li><Link to="/info/terms" className="hover:underline hover:underline-offset-4">תקנון</Link></li>
            <li><Link to="/info/accessibility" className="hover:underline hover:underline-offset-4">נגישות</Link></li>
          </FooterList>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-start justify-between gap-3 py-5 text-[13.5px] text-mute md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} דומינטור גיימינג בע״מ. תשלום מאובטח באשראי, Bit ו-Apple Pay.</p>
          <p>
            עיצוב ופיתוח הקונספט:{' '}
            <a href={SITE.credit.url} target="_blank" rel="noreferrer" className="font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
              {SITE.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-[15px] font-semibold">{title}</h4>
      <ul className="space-y-2 text-[14.5px] text-ink-2">{children}</ul>
    </div>
  )
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white">
      {children}
    </a>
  )
}

function ClubSignup() {
  const { toast } = useStore()
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  return (
    <section className="bg-go" aria-labelledby="club-title">
      <div className="container-x grid items-center gap-6 py-10 lg:grid-cols-2 lg:py-12">
        <div>
          <h2 id="club-title" className="h-display text-[44px] sm:text-[52px]">
            50 ₪ מתנה בהצטרפות למועדון
          </h2>
          <p className="mt-2 max-w-[48ch] text-ink-2">חברי המועדון שומעים ראשונים על הזמנות מוקדמות, מקבלים מבצעים שלא מתפרסמים ו-10% הנחה במעבדה.</p>
        </div>
        {done ? (
          <p className="text-lg font-semibold" role="status">
            נרשמתם. קוד ההטבה CREW50 נשלח למייל שלכם.
          </p>
        ) : (
          <form
            noValidate
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault()
              const email = String(new FormData(e.currentTarget).get('email') || '')
              if (!/^\S+@\S+\.\S+$/.test(email)) return setErr('כתובת המייל לא תקינה. בדקו שיש בה @ ונקודה.')
              setErr('')
              setDone(true)
              toast('נרשמתם למועדון')
            }}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="club-email" className="sr-only">
                כתובת מייל
              </label>
              <input id="club-email" name="email" type="email" placeholder="כתובת המייל שלכם" className="input h-12 border-ink sm:flex-1" aria-invalid={!!err} aria-describedby={err ? 'club-err' : undefined} />
              <button className="btn-ink h-12 px-6">הצטרפות למועדון</button>
            </div>
            {err && (
              <p id="club-err" className="mt-2 text-sm font-medium">
                {err}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
