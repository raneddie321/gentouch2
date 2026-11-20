import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Heart, LogOut, Package, User, Wrench, Crown } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Field } from './Checkout'

export default function Account() {
  const { user, login, logout, wishlist, toast } = useStore()
  const [sp, setSp] = useSearchParams()
  const tab = sp.get('tab') || (user ? 'profile' : 'wishlist')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const wished = PRODUCTS.filter((p) => wishlist.includes(p.id))

  if (!user && tab !== 'wishlist') {
    return (
      <div className="container-x py-12">
        <div className="panel mx-auto grid max-w-4xl overflow-hidden md:grid-cols-2">
          <div className="relative hidden mat-grid p-10 text-white md:block">
            <div className="relative">
              <Crown className="h-10 w-10 text-ink" />
              <h2 className="mt-4 h-display text-[48px]">מועדון הלקוחות של דומינטור</h2>
              <ul className="mt-6 space-y-3 text-white/85">
                <li>✓ מעקב הזמנות ותיקונים</li>
                <li>✓ רשימת מועדפים מסונכרנת</li>
                <li>✓ ₪50 הטבה לקנייה הראשונה</li>
                <li>✓ גישה מוקדמת להזמנות מוקדמות</li>
              </ul>
            </div>
          </div>
          <form
            noValidate
            className="p-6 sm:p-10"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const name = String(fd.get('name') || '').trim()
              const email = String(fd.get('email') || '').trim()
              const errs: Record<string, string> = {}
              if (name.length < 2) errs.name = 'נא להזין שם'
              if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'אימייל לא תקין'
              setErrors(errs)
              if (Object.keys(errs).length) return
              login({ name, email, club: !!fd.get('club') })
              toast(`היי ${name.split(' ')[0]}, התחברת בהצלחה`)
              setSp({ tab: 'profile' })
            }}
          >
            <h1 className="text-2xl font-bold">התחברות / הרשמה</h1>
            <p className="mt-1 text-sm text-mute">נשלח אליכם קוד חד-פעמי — בלי סיסמאות.</p>
            <div className="mt-6 space-y-4">
              <Field name="name" label="שם מלא" err={errors.name} autoComplete="name" />
              <Field name="email" label="אימייל" type="email" err={errors.email} autoComplete="email" />
              <label className="flex items-center gap-2 text-sm text-ink-2">
                <input type="checkbox" name="club" defaultChecked className="accent-hot" /> צרפו אותי למועדון הלקוחות
              </label>
            </div>
            <button className="btn-go mt-6 w-full">כניסה</button>
            <Link to="/account?tab=wishlist" className="mt-4 block text-center text-sm text-mute hover:text-ink">
              צפייה במועדפים בלי להתחבר
            </Link>
          </form>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'הפרופיל שלי', icon: User },
    { id: 'orders', label: 'ההזמנות שלי', icon: Package },
    { id: 'wishlist', label: `מועדפים (${wishlist.length})`, icon: Heart },
  ]

  return (
    <div className="container-x py-10">
      <h1 className="h-section">{user ? `היי ${user.name.split(' ')[0]}` : 'המועדפים שלי'}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="אזור אישי">
          {tabs
            .filter((t) => user || t.id === 'wishlist')
            .map((t) => (
              <button key={t.id} onClick={() => setSp({ tab: t.id })} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-right text-sm font-semibold transition ${tab === t.id ? 'bg-stage text-ink' : 'text-mute hover:text-ink'}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          {user ? (
            <button
              onClick={() => {
                logout()
                toast('התנתקת')
                setSp({})
              }}
              className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm text-mute-2 hover:text-hot"
            >
              <LogOut className="h-4 w-4" /> התנתקות
            </button>
          ) : (
            <button onClick={() => setSp({ tab: 'profile' })} className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm text-hot">
              <User className="h-4 w-4" /> התחברות
            </button>
          )}
        </nav>
        <div>
          {tab === 'wishlist' &&
            (wished.length ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
                {wished.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <Empty icon={Heart} text="עוד לא שמרתם מוצרים. לחצו על הלב בכרטיס מוצר כדי לשמור." />
            ))}
          {tab === 'orders' && <Empty icon={Package} text="אין עדיין הזמנות בחשבון הזה." />}
          {tab === 'profile' && user && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel p-6">
                <div className="text-sm text-mute">שם</div>
                <div className="text-lg font-bold">{user.name}</div>
                <div className="mt-3 text-sm text-mute">אימייל</div>
                <div className="font-semibold">{user.email}</div>
              </div>
              <div className="panel bg-go-tint p-6">
                <Crown className="h-7 w-7 text-ink" />
                <div className="mt-2 text-lg font-bold">{user.club ? 'חבר/ת מועדון Crew' : 'עדיין לא במועדון'}</div>
                <div className="text-sm text-ink-2">{user.club ? 'קוד ההטבה שלך: CREW50' : 'הצטרפו בתחתית העמוד וקבלו ₪50'}</div>
              </div>
              <Link to="/repair#track" className="panel flex items-center gap-3 p-6 transition hover:border-signal-tint sm:col-span-2">
                <Wrench className="h-6 w-6 text-signal" /> מעקב אחר תיקונים במעבדה
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Empty({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="panel flex flex-col items-center p-12 text-center">
      <Icon className="h-10 w-10 text-mute-2" />
      <p className="mt-3 text-ink-2">{text}</p>
      <Link to="/catalog" className="btn-go mt-6">
        לקטלוג
      </Link>
    </div>
  )
}
