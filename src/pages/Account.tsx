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
        <div className="card mx-auto grid max-w-4xl overflow-hidden md:grid-cols-2">
          <div className="relative hidden bg-gradient-to-br from-neon-600/40 via-ink-800 to-fire-600/25 p-10 md:block">
            <div className="grid-bg absolute inset-0 opacity-50" />
            <div className="relative">
              <Crown className="h-10 w-10 text-[#FFC85A]" />
              <h2 className="mt-4 font-display text-3xl font-black">ברוכים הבאים ל-Crew</h2>
              <ul className="mt-6 space-y-3 text-mist-200">
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
            <h1 className="font-display text-2xl font-black">התחברות / הרשמה</h1>
            <p className="mt-1 text-sm text-mist-400">נשלח אליכם קוד חד-פעמי — בלי סיסמאות.</p>
            <div className="mt-6 space-y-4">
              <Field name="name" label="שם מלא" err={errors.name} autoComplete="name" />
              <Field name="email" label="אימייל" type="email" err={errors.email} autoComplete="email" />
              <label className="flex items-center gap-2 text-sm text-mist-300">
                <input type="checkbox" name="club" defaultChecked className="accent-fire-500" /> צרפו אותי למועדון הלקוחות
              </label>
            </div>
            <button className="btn-primary mt-6 w-full">כניסה</button>
            <Link to="/account?tab=wishlist" className="mt-4 block text-center text-sm text-mist-400 hover:text-white">
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
      <h1 className="h-section">{user ? `היי ${user.name.split(' ')[0]} 👾` : 'המועדפים שלי'}</h1>
      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col" aria-label="אזור אישי">
          {tabs
            .filter((t) => user || t.id === 'wishlist')
            .map((t) => (
              <button key={t.id} onClick={() => setSp({ tab: t.id })} className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-right text-sm font-semibold transition ${tab === t.id ? 'bg-white/[0.07] text-white' : 'text-mist-400 hover:text-white'}`}>
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
              className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm text-mist-500 hover:text-fire-400"
            >
              <LogOut className="h-4 w-4" /> התנתקות
            </button>
          ) : (
            <button onClick={() => setSp({ tab: 'profile' })} className="flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm text-fire-400">
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
              <div className="card p-6">
                <div className="text-sm text-mist-400">שם</div>
                <div className="text-lg font-bold">{user.name}</div>
                <div className="mt-3 text-sm text-mist-400">אימייל</div>
                <div className="font-semibold">{user.email}</div>
              </div>
              <div className="card bg-gradient-to-br from-[#FFB020]/15 to-transparent p-6">
                <Crown className="h-7 w-7 text-[#FFC85A]" />
                <div className="mt-2 font-display text-lg font-extrabold">{user.club ? 'חבר/ת מועדון Crew' : 'עדיין לא במועדון'}</div>
                <div className="text-sm text-mist-300">{user.club ? 'קוד ההטבה שלך: CREW50' : 'הצטרפו בתחתית העמוד וקבלו ₪50'}</div>
              </div>
              <Link to="/repair#track" className="card flex items-center gap-3 p-6 transition hover:border-neon-500/30 sm:col-span-2">
                <Wrench className="h-6 w-6 text-neon-400" /> מעקב אחר תיקונים במעבדה
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
    <div className="card flex flex-col items-center p-12 text-center">
      <Icon className="h-10 w-10 text-mist-500" />
      <p className="mt-3 text-mist-300">{text}</p>
      <Link to="/catalog" className="btn-primary mt-6">
        לקטלוג
      </Link>
    </div>
  )
}
