import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, Truck, Store, Zap, CreditCard, CheckCircle2, Tag, ShoppingBag, Smartphone } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { formatPrice } from '../data/products'
import { BRANCHES, SITE } from '../data/site'
import ProductMedia from '../components/ProductMedia'
import { Qty } from '../components/CartDrawer'

type Delivery = 'home' | 'express' | 'pickup'
const COUPONS: Record<string, { label: string; calc: (s: number) => number }> = {
  CREW50: { label: 'הטבת מועדון ₪50', calc: () => 50 },
  DOM10: { label: '10% הנחה', calc: (s) => Math.round(s * 0.1) },
}

export default function Checkout() {
  const { items, subtotal, setQty, clear, user } = useStore()
  const [delivery, setDelivery] = useState<Delivery>('home')
  const [branch, setBranch] = useState(BRANCHES[0].id)
  const [pay, setPay] = useState<'card' | 'bit'>('card')
  const [coupon, setCoupon] = useState('')
  const [applied, setApplied] = useState<string | null>(null)
  const [couponErr, setCouponErr] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<{ id: string; total: number; name: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const shipFee = delivery === 'pickup' ? 0 : delivery === 'express' ? 59 : subtotal >= SITE.freeShippingFrom ? 0 : 39
  const discount = applied ? Math.min(COUPONS[applied].calc(subtotal), subtotal) : 0
  const total = subtotal - discount + shipFee

  if (order) {
    return (
      <div className="container-x py-16">
        <div className="panel mx-auto max-w-xl p-8 text-center sm:p-12">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-go-tint ring-8 ring-go-tint/50">
            <CheckCircle2 className="h-10 w-10 text-go-deep" />
          </div>
          <h1 className="mt-6 h-display text-[52px]">תודה {order.name}, ההזמנה התקבלה!</h1>
          <p className="mt-2 text-ink-2">
            מספר הזמנה: <b className="font-display text-ink" dir="ltr">#{order.id}</b>
          </p>
          <p className="mt-1 text-mute">סה״כ שולם: {formatPrice(order.total)}. אישור ופרטי מעקב נשלחו אליכם בוואטסאפ ובמייל.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-go">
              חזרה לעמוד הבית
            </Link>
            <Link to="/catalog" className="btn-line">
              המשך קנייה
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <ShoppingBag className="mx-auto h-14 w-14 text-mute-2" />
        <h1 className="mt-4 text-2xl font-bold">הסל שלכם ריק</h1>
        <p className="mt-1 text-mute">הוסיפו מוצרים כדי להמשיך לתשלום</p>
        <Link to="/catalog" className="btn-go mt-6">
          לקטלוג המלא
        </Link>
      </div>
    )
  }

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const v = (k: string) => String(fd.get(k) || '').trim()
    const errs: Record<string, string> = {}
    if (v('name').length < 2) errs.name = 'נא להזין שם מלא'
    if (!/^0\d{8,9}$/.test(v('phone').replace(/\D/g, ''))) errs.phone = 'מספר טלפון לא תקין'
    if (!/^\S+@\S+\.\S+$/.test(v('email'))) errs.email = 'כתובת אימייל לא תקינה'
    if (delivery !== 'pickup') {
      if (v('city').length < 2) errs.city = 'נא להזין עיר'
      if (v('street').length < 2) errs.street = 'נא להזין רחוב ומספר'
    }
    if (pay === 'card') {
      if (v('card').replace(/\D/g, '').length < 15) errs.card = 'מספר כרטיס לא תקין'
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(v('exp'))) errs.exp = 'MM/YY'
      if (!/^\d{3,4}$/.test(v('cvv'))) errs.cvv = 'CVV'
    }
    if (!fd.get('terms')) errs.terms = 'יש לאשר את התקנון'
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus()
      return
    }
    setLoading(true)
    setTimeout(() => {
      setOrder({ id: String(Math.floor(100000 + Math.random() * 899999)), total, name: v('name').split(' ')[0] })
      clear()
      setLoading(false)
      window.scrollTo({ top: 0 })
    }, 1100)
  }

  return (
    <div className="container-x py-8">
      <h1 className="h-display mb-3 text-[56px]">קופה</h1>
      <p className="mb-8 flex items-center gap-1.5 text-sm text-mute">
        <Lock className="h-4 w-4 text-go-deep" /> תשלום מאובטח בתקן PCI-DSS
      </p>
      <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <Step n={1} title="פרטים אישיים">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="שם מלא" err={errors.name} defaultValue={user?.name} autoComplete="name" />
              <Field name="phone" label="טלפון נייד" err={errors.phone} type="tel" autoComplete="tel" placeholder="050-0000000" />
              <Field name="email" label="אימייל" err={errors.email} type="email" defaultValue={user?.email} autoComplete="email" className="sm:col-span-2" />
            </div>
          </Step>

          <Step n={2} title="אופן קבלה">
            <div className="grid gap-3 sm:grid-cols-3">
              <Choice active={delivery === 'home'} onClick={() => setDelivery('home')} icon={Truck} title="משלוח עד הבית" sub={subtotal >= SITE.freeShippingFrom ? 'חינם · 1–3 ימים' : '₪39 · 1–3 ימים'} />
              <Choice active={delivery === 'express'} onClick={() => setDelivery('express')} icon={Zap} title="אקספרס" sub="₪59 · עוד היום" />
              <Choice active={delivery === 'pickup'} onClick={() => setDelivery('pickup')} icon={Store} title="איסוף מהסניף" sub="חינם · לרוב היום" />
            </div>
            {delivery === 'pickup' ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <label key={b.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${branch === b.id ? 'border-ink bg-go-tint' : 'border-line hover:border-ink'}`}>
                    <input type="radio" name="branch" checked={branch === b.id} onChange={() => setBranch(b.id)} className="mt-1 accent-hot" />
                    <span>
                      <span className="block font-semibold">סניף {b.city}</span>
                      <span className="block text-sm text-mute">{b.address}</span>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field name="city" label="עיר" err={errors.city} autoComplete="address-level2" />
                <Field name="street" label="רחוב ומספר" err={errors.street} autoComplete="street-address" className="sm:col-span-2" />
                <Field name="apt" label="דירה / קומה (רשות)" />
                <Field name="notes" label="הערות לשליח (רשות)" className="sm:col-span-2" />
              </div>
            )}
          </Step>

          <Step n={3} title="תשלום">
            <div className="mb-4 grid grid-cols-2 gap-3">
              <Choice active={pay === 'card'} onClick={() => setPay('card')} icon={CreditCard} title="כרטיס אשראי" sub="עד 12 תשלומים" />
              <Choice active={pay === 'bit'} onClick={() => setPay('bit')} icon={Smartphone} title="Bit" sub="תשלום מהנייד" />
            </div>
            {pay === 'card' ? (
              <div className="grid gap-4 sm:grid-cols-4">
                <Field name="card" label="מספר כרטיס" err={errors.card} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" className="sm:col-span-2" dir="ltr" />
                <Field name="exp" label="תוקף" err={errors.exp} placeholder="MM/YY" autoComplete="cc-exp" dir="ltr" />
                <Field name="cvv" label="CVV" err={errors.cvv} inputMode="numeric" autoComplete="cc-csc" dir="ltr" />
                <div className="sm:col-span-2">
                  <label className="label" htmlFor="payments">
                    מספר תשלומים
                  </label>
                  <select id="payments" name="payments" className="input">
                    {Array.from({ length: total >= 1000 ? 12 : 3 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n === 1 ? 'תשלום אחד' : `${n} תשלומים — ${formatPrice(Math.ceil(total / n))} לחודש`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <p className="rounded-xl border border-line bg-stage p-4 text-sm text-ink-2">לאחר לחיצה על "ביצוע הזמנה" תישלח בקשת תשלום לאפליקציית Bit במספר הטלפון שהזנתם.</p>
            )}
            <p className="mt-4 text-xs text-mute-2">אתר הדגמה — לא מתבצע חיוב אמיתי. אין להזין פרטי כרטיס אמיתיים.</p>
          </Step>
        </div>

        <aside className="lg:sticky lg:top-[140px] lg:self-start">
          <div className="panel p-5">
            <h2 className="mb-4 text-lg font-bold">סיכום הזמנה</h2>
            <ul className="max-h-72 space-y-3 overflow-y-auto pl-1">
              {items.map(({ product: p, qty }) => (
                <li key={p.id} className="flex items-center gap-3">
                  <span className="h-14 w-16 shrink-0 rounded-lg bg-stage">
                    <ProductMedia p={p} id={`co-${p.id}`} className="h-full w-full p-1" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-1 text-sm font-semibold">{p.name}</span>
                    <span className="mt-1 block">
                      <Qty value={qty} max={p.stock} onChange={(v) => setQty(p.id, v)} />
                    </span>
                  </span>
                  <span className="text-sm font-bold">{formatPrice(p.price * qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-line pt-4">
              {applied ? (
                <div className="flex items-center justify-between rounded-xl bg-go-tint px-3 py-2.5 text-sm text-go-deep">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="h-4 w-4" /> {applied} — {COUPONS[applied].label}
                  </span>
                  <button type="button" onClick={() => setApplied(null)} className="text-xs underline">
                    הסרה
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="קוד קופון" className="input !py-2.5" aria-label="קוד קופון" dir="ltr" />
                  <button
                    type="button"
                    onClick={() => {
                      const c = coupon.trim().toUpperCase()
                      if (COUPONS[c]) {
                        setApplied(c)
                        setCouponErr('')
                      } else setCouponErr('קוד לא תקף (נסו CREW50 או DOM10)')
                    }}
                    className="btn-line !px-4 !py-2.5 text-sm"
                  >
                    הפעלה
                  </button>
                </div>
              )}
              {couponErr && <p className="mt-1.5 text-xs text-hot">{couponErr}</p>}
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              <Row k="סה״כ מוצרים" v={formatPrice(subtotal)} />
              {discount > 0 && <Row k="הנחה" v={`-${formatPrice(discount)}`} className="text-go-deep" />}
              <Row k="משלוח" v={shipFee ? formatPrice(shipFee) : 'חינם'} />
              <div className="flex items-center justify-between border-t border-line pt-3">
                <dt className="font-bold">לתשלום</dt>
                <dd className="text-2xl font-bold">{formatPrice(total)}</dd>
              </div>
            </dl>

            <label className="mt-4 flex items-start gap-2 text-xs text-mute">
              <input type="checkbox" name="terms" className="mt-0.5 accent-hot" />
              <span>
                קראתי ואני מאשר/ת את{' '}
                <Link to="/info/terms" className="underline">
                  תקנון האתר
                </Link>
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-hot">{errors.terms}</p>}

            <button disabled={loading} className="btn-go mt-4 w-full text-base">
              {loading ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <Lock className="h-4 w-4" /> ביצוע הזמנה · {formatPrice(total)}
                </>
              )}
            </button>
          </div>
        </aside>
      </form>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5 sm:p-6">
      <h2 className="mb-5 flex items-center gap-3 text-lg font-bold">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-hot-tint text-sm text-hot">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function Field({ name, label, err, className = '', ...rest }: { name: string; label: string; err?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="label" htmlFor={`f-${name}`}>
        {label}
      </label>
      <input id={`f-${name}`} name={name} className={`input ${err ? '!border-hot' : ''}`} aria-invalid={!!err} aria-describedby={err ? `e-${name}` : undefined} {...rest} />
      {err && (
        <p id={`e-${name}`} className="mt-1 text-xs text-hot">
          {err}
        </p>
      )}
    </div>
  )
}

function Choice({ active, onClick, icon: Icon, title, sub }: { active: boolean; onClick: () => void; icon: React.ComponentType<{ className?: string }>; title: string; sub: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`flex items-center gap-3 rounded-xl border p-4 text-right transition ${active ? 'border-ink bg-go-tint' : 'border-line hover:border-ink'}`}>
      <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-hot' : 'text-mute'}`} />
      <span>
        <span className="block text-sm font-bold">{title}</span>
        <span className="block text-xs text-mute">{sub}</span>
      </span>
    </button>
  )
}

function Row({ k, v, className = '' }: { k: string; v: string; className?: string }) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <dt className="text-mute">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  )
}
