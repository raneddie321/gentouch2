import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CalendarCheck, Gamepad2, Cpu, Monitor, Joystick, Wrench, ClipboardCheck, Search, CheckCircle2, ShieldCheck, Clock, ChevronDown, PackageCheck } from 'lucide-react'
import ProductArt from '../components/ProductArt'
import { WhatsAppIcon } from '../components/Icons'
import { BRANCHES, waLink } from '../data/site'
import { useStore } from '../context/StoreContext'
import { Field } from './Checkout'

const DEVICES = [
  { id: 'console', name: 'קונסולה', icon: Monitor, issues: ['התחממות / רעש מאוורר', 'אין תמונה / HDMI', 'לא נדלקת', 'כונן לא קורא דיסקים', 'ניקוי והחלפת משחה תרמית', 'אחר'] },
  { id: 'controller', name: 'שלט / בקר', icon: Gamepad2, issues: ['דריפט בסטיק', 'כפתור לא מגיב', 'לא נטען / סוללה', 'טריגר תקוע', 'אחר'] },
  { id: 'pc', name: 'מחשב', icon: Cpu, issues: ['שדרוג חומרה', 'מסך כחול / קריסות', 'התחממות', 'התקנת מערכת הפעלה', 'בדיקת ביצועים', 'אחר'] },
  { id: 'sim', name: 'הגה / סימולטור', icon: Joystick, issues: ['משוב כוח לא עובד', 'כיול', 'דוושה לא מגיבה', 'אחר'] },
]

const SERVICES = [
  { t: 'החלפת סטיקים (דריפט)', p: 149, d: 'חיישני Hall Effect זמינים כשדרוג', k: 'controller' as const, h: '#F5F7FB' },
  { t: 'ניקוי + משחה תרמית', p: 249, d: 'PS5 / PS4 / Xbox — כולל מתכת נוזלית', k: 'console-tower' as const, h: '#E8ECF5' },
  { t: 'החלפת שקע HDMI', p: 349, d: 'הלחמה מקצועית ובדיקת תמונה מלאה', k: 'console-box' as const, h: '#1F2937' },
  { t: 'שדרוג / תיקון מחשב', p: 199, d: 'אבחון, שדרוג רכיבים ובדיקות עומס', k: 'pc' as const, h: '#7C5CFF' },
  { t: 'תיקון Joy-Con / Switch', p: 129, d: 'דריפט, מסילות ומסכים', k: 'handheld' as const, h: '#FF4D4D' },
  { t: 'תיקון הגאים וסימולטורים', p: 229, d: 'Logitech, Thrustmaster, Fanatec, MOZA', k: 'wheel' as const, h: '#FFB020' },
]

const STEPS = [
  { i: CalendarCheck, t: 'קובעים תור', s: 'אונליין או בוואטסאפ, בחיפה או בתל אביב' },
  { i: Search, t: 'אבחון מקצועי', s: 'בדיקה מלאה תוך 48 שעות ממוצע' },
  { i: ClipboardCheck, t: 'הצעת מחיר', s: 'מאשרים לפני כל עבודה — בלי הפתעות' },
  { i: PackageCheck, t: 'חוזרים לשחק', s: 'עם 90 יום אחריות על התיקון' },
]

const FAQ = [
  ['כמה עולה האבחון?', 'האבחון חינם כשמבצעים את התיקון אצלנו. אם מחליטים לא לתקן — דמי בדיקה של ₪79 בלבד.'],
  ['כמה זמן לוקח תיקון?', 'רוב התיקונים מסתיימים תוך 2–5 ימי עסקים. החלפת סטיקים בשלט מתבצעת לרוב באותו היום.'],
  ['האם התיקון פוגע באחריות היבואן?', 'מעבדת דומינטור היא מעבדה מורשית — תיקון אצלנו שומר על האחריות של מוצרים שנרכשו אצלנו.'],
  ['אפשר לשלוח מכשיר בשליח?', 'כן! יש שירות איסוף והחזרה עד הבית מכל הארץ ב-₪59 לכיוון. דברו איתנו בוואטסאפ לתיאום.'],
]

type Ticket = { id: string; device: string; issue: string; branch: string; date: string; time: string; name: string; created: number }

function loadTickets(): Ticket[] {
  try {
    return JSON.parse(localStorage.getItem('dom.tickets') || '[]')
  } catch {
    return []
  }
}

export default function Repair() {
  const loc = useLocation()
  useEffect(() => {
    if (loc.hash) setTimeout(() => document.querySelector(loc.hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [loc.hash])

  return (
    <>
      <section className="container-x pt-8">
        <div className="relative overflow-hidden rounded-[28px] border border-neon-500/25 bg-ink-850 p-6 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(70%_100%_at_100%_0%,rgba(124,92,255,.35),transparent_60%),radial-gradient(60%_80%_at_0%_100%,rgba(255,77,46,.2),transparent_60%)]" />
          <div className="grid-bg absolute inset-0 opacity-50" />
          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-neon-500/15 px-3 py-1 text-xs font-bold text-neon-300 ring-1 ring-neon-500/30">
                <Wrench className="h-3.5 w-3.5" /> מעבדת דומינטור
              </span>
              <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">מעבדת תיקונים מקצועית לקונסולות, שלטים ומחשבים</h1>
              <p className="mt-4 max-w-xl text-lg text-mist-300">טכנאים מוסמכים, חלפים מקוריים, הצעת מחיר לפני כל עבודה ו-90 יום אחריות על כל תיקון.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#book" className="btn-primary px-6 text-base">
                  <CalendarCheck className="h-5 w-5" /> קביעת תור אונליין
                </a>
                <a href="#track" className="btn-ghost px-6 text-base">
                  מעקב אחר תיקון
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist-300">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-slime-500" /> 90 יום אחריות</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-neon-400" /> אבחון תוך 48 שעות</span>
              </div>
            </div>
            <div className="relative mx-auto aspect-[5/4] w-full max-w-md">
              <div className="absolute inset-[15%] rounded-full bg-neon-500/30 blur-3xl" />
              <ProductArt id="repair-hero" kind="controller" hue="#F5F7FB" className="relative h-full w-full animate-float" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className="card relative p-5">
              <span className="absolute left-4 top-4 font-display text-4xl font-black text-white/5">0{i + 1}</span>
              <s.i className="h-7 w-7 text-neon-400" />
              <h3 className="mt-3 font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-mist-400">{s.s}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pb-14">
        <span className="eyebrow">מחירון שקוף</span>
        <h2 className="h-section mb-8 mt-2">שירותים פופולריים</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.t} className="card group flex items-center gap-4 p-4 transition hover:border-neon-500/30">
              <span className="h-20 w-24 shrink-0 rounded-xl bg-ink-850">
                <ProductArt id={`srv-${s.t}`} kind={s.k} hue={s.h} className="h-full w-full p-2 transition group-hover:scale-105" />
              </span>
              <span className="flex-1">
                <span className="block font-bold">{s.t}</span>
                <span className="block text-xs text-mist-400">{s.d}</span>
                <span className="mt-1 block text-sm font-bold text-neon-300">החל מ-₪{s.p}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <BookingForm />
      <TrackRepair />

      <section className="container-x py-14">
        <h2 className="h-section mb-6">שאלות נפוצות</h2>
        <div className="space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {q}
                <ChevronDown className="h-5 w-5 text-mist-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-mist-300">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}

function BookingForm() {
  const { toast, user } = useStore()
  const [device, setDevice] = useState(DEVICES[0].id)
  const [issue, setIssue] = useState('')
  const [branch, setBranch] = useState(BRANCHES[0].id)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const dev = DEVICES.find((d) => d.id === device)!

  const days = useMemo(() => {
    const out: { iso: string; label: string; day: string }[] = []
    const d = new Date()
    while (out.length < 8) {
      d.setDate(d.getDate() + 1)
      if (d.getDay() === 6) continue // Saturday closed
      out.push({
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        day: d.toLocaleDateString('he-IL', { weekday: 'short' }),
        label: d.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric' }),
      })
    }
    return out
  }, [])
  const isFriday = date && new Date(`${date}T12:00`).getDay() === 5
  const slots = (isFriday ? ['09:30', '10:30', '11:30', '12:30', '13:30'] : ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']).filter(
    (_, i) => (date.charCodeAt(9) + i) % 4 !== 0,
  )

  if (ticket) {
    const b = BRANCHES.find((x) => x.id === ticket.branch)!
    return (
      <section id="book" className="container-x scroll-mt-40 pb-14">
        <div className="card mx-auto max-w-2xl p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-slime-500" />
          <h2 className="mt-4 font-display text-2xl font-black">התור נקבע בהצלחה!</h2>
          <p className="mt-2 text-mist-300">
            מספר כרטיס תיקון: <b className="font-display text-white" dir="ltr">{ticket.id}</b>
          </p>
          <div className="mx-auto mt-5 grid max-w-md gap-2 rounded-2xl border border-white/10 bg-ink-850 p-4 text-right text-sm">
            <Info k="מכשיר" v={`${DEVICES.find((d) => d.id === ticket.device)?.name} — ${ticket.issue}`} />
            <Info k="סניף" v={`${b.city}, ${b.address}`} />
            <Info k="מועד" v={`${new Date(`${ticket.date}T12:00`).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })} בשעה ${ticket.time}`} />
          </div>
          <p className="mt-4 text-sm text-mist-400">שמרו את מספר הכרטיס כדי לעקוב אחר הסטטוס. תזכורת תישלח בוואטסאפ יום לפני.</p>
          <button onClick={() => setTicket(null)} className="btn-ghost mt-6">
            קביעת תור נוסף
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="book" className="container-x scroll-mt-40 pb-14">
      <div className="card overflow-hidden">
        <div className="grid lg:grid-cols-[1fr_340px]">
          <form
            noValidate
            className="p-5 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault()
              const fd = new FormData(e.currentTarget)
              const name = String(fd.get('name') || '').trim()
              const phone = String(fd.get('phone') || '').replace(/\D/g, '')
              const errs: Record<string, string> = {}
              if (!issue) errs.issue = 'בחרו את סוג התקלה'
              if (!date) errs.date = 'בחרו תאריך'
              if (!time) errs.time = 'בחרו שעה'
              if (name.length < 2) errs.name = 'נא להזין שם'
              if (!/^0\d{8,9}$/.test(phone)) errs.phone = 'מספר טלפון לא תקין'
              setErrors(errs)
              if (Object.keys(errs).length) return
              const t: Ticket = { id: `LAB-${Math.floor(10000 + Math.random() * 89999)}`, device, issue, branch, date, time, name, created: Date.now() }
              try {
                localStorage.setItem('dom.tickets', JSON.stringify([t, ...loadTickets()]))
              } catch {
                /* ignore */
              }
              setTicket(t)
              toast('התור נקבע — נתראה במעבדה!')
            }}
          >
            <span className="eyebrow">קביעת תור אונליין</span>
            <h2 className="h-section mb-6 mt-2">מה צריך תיקון?</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DEVICES.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => {
                    setDevice(d.id)
                    setIssue('')
                  }}
                  aria-pressed={device === d.id}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-bold transition ${device === d.id ? 'border-neon-500 bg-neon-500/10 text-white' : 'border-white/10 text-mist-300 hover:border-white/25'}`}
                >
                  <d.icon className={`h-7 w-7 ${device === d.id ? 'text-neon-300' : ''}`} />
                  {d.name}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="label">סוג התקלה</div>
              <div className="flex flex-wrap gap-2">
                {dev.issues.map((x) => (
                  <button type="button" key={x} onClick={() => setIssue(x)} aria-pressed={issue === x} className={`rounded-full border px-3.5 py-2 text-sm transition ${issue === x ? 'border-fire-500 bg-fire-500/15 text-white' : 'border-white/10 text-mist-300 hover:border-white/25'}`}>
                    {x}
                  </button>
                ))}
              </div>
              {errors.issue && <p className="mt-1 text-xs text-fire-300">{errors.issue}</p>}
            </div>

            <div className="mt-6">
              <div className="label">סניף</div>
              <div className="grid gap-3 sm:grid-cols-2">
                {BRANCHES.map((b) => (
                  <button type="button" key={b.id} onClick={() => setBranch(b.id)} aria-pressed={branch === b.id} className={`rounded-xl border p-3 text-right transition ${branch === b.id ? 'border-neon-500 bg-neon-500/10' : 'border-white/10 hover:border-white/25'}`}>
                    <span className="block font-bold">{b.city}</span>
                    <span className="block text-xs text-mist-400">{b.address}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="label">תאריך</div>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {days.map((d) => (
                  <button
                    type="button"
                    key={d.iso}
                    onClick={() => {
                      setDate(d.iso)
                      setTime('')
                    }}
                    aria-pressed={date === d.iso}
                    className={`flex w-16 shrink-0 flex-col items-center rounded-xl border py-2.5 transition ${date === d.iso ? 'border-fire-500 bg-fire-500/15' : 'border-white/10 hover:border-white/25'}`}
                  >
                    <span className="text-xs text-mist-400">{d.day}</span>
                    <span className="font-display font-bold">{d.label}</span>
                  </button>
                ))}
              </div>
              {errors.date && <p className="mt-1 text-xs text-fire-300">{errors.date}</p>}
            </div>

            {date && (
              <div className="mt-6 animate-fade-up">
                <div className="label">שעה</div>
                <div className="flex flex-wrap gap-2">
                  {slots.map((s) => (
                    <button type="button" key={s} onClick={() => setTime(s)} aria-pressed={time === s} className={`rounded-lg border px-3.5 py-2 text-sm tabular-nums transition ${time === s ? 'border-fire-500 bg-fire-500/15 text-white' : 'border-white/10 text-mist-300 hover:border-white/25'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="mt-1 text-xs text-fire-300">{errors.time}</p>}
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field name="name" label="שם מלא" err={errors.name} defaultValue={user?.name} autoComplete="name" />
              <Field name="phone" label="טלפון נייד" err={errors.phone} type="tel" autoComplete="tel" placeholder="050-0000000" />
            </div>
            <button className="btn-primary mt-6 w-full text-base sm:w-auto sm:px-10">
              <CalendarCheck className="h-5 w-5" /> אישור וקביעת תור
            </button>
          </form>
          <div className="relative border-t border-white/5 bg-gradient-to-b from-neon-600/20 to-transparent p-6 sm:p-8 lg:border-r lg:border-t-0">
            <h3 className="font-display text-xl font-extrabold">מעדיפים לדבר עם טכנאי?</h3>
            <p className="mt-2 text-sm text-mist-300">שלחו תמונה או סרטון של התקלה בוואטסאפ ותקבלו הערכת מחיר ראשונית תוך שעה (בשעות הפעילות).</p>
            <a href={waLink('היי, אשמח להערכת מחיר לתיקון')} target="_blank" rel="noreferrer" className="btn-wa mt-5 w-full">
              <WhatsAppIcon /> שליחה בוואטסאפ
            </a>
            <ul className="mt-6 space-y-3 text-sm text-mist-300">
              <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-slime-500" /> אבחון חינם בביצוע תיקון</li>
              <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-slime-500" /> חלפים מקוריים או איכותיים בלבד</li>
              <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-slime-500" /> עדכון סטטוס בוואטסאפ בכל שלב</li>
              <li className="flex gap-2"><CheckCircle2 className="h-5 w-5 shrink-0 text-slime-500" /> איסוף והחזרה בשליח מכל הארץ</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const STAGES = ['התקבל במעבדה', 'באבחון', 'ממתין לאישור הצעת מחיר', 'בתיקון', 'מוכן לאיסוף']

function TrackRepair() {
  const [q, setQ] = useState('')
  const [res, setRes] = useState<{ id: string; stage: number; device?: string } | null | 'none'>(null)
  return (
    <section id="track" className="container-x scroll-mt-40">
      <div className="card flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-center">
        <div className="lg:w-1/3">
          <h2 className="font-display text-2xl font-extrabold">מעקב אחר תיקון</h2>
          <p className="mt-1 text-sm text-mist-400">הזינו את מספר כרטיס התיקון (למשל LAB-12345)</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              const id = q.trim().toUpperCase()
              if (!/^LAB-\d{5}$/.test(id)) return setRes('none')
              const t = loadTickets().find((x) => x.id === id)
              const stage = t ? Math.min(4, Math.floor((Date.now() - t.created) / 36e5)) : Number(id.slice(-1)) % 5
              setRes({ id, stage, device: t ? DEVICES.find((d) => d.id === t.device)?.name : undefined })
            }}
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="LAB-00000" className="input" dir="ltr" aria-label="מספר כרטיס תיקון" />
            <button className="btn-primary !px-5">בדיקה</button>
          </form>
        </div>
        <div className="flex-1">
          {res === 'none' ? (
            <p className="rounded-xl bg-fire-500/10 p-4 text-sm text-fire-300">לא מצאנו כרטיס עם המספר הזה. בדקו שהמספר בפורמט LAB-12345.</p>
          ) : res ? (
            <div className="animate-fade-up">
              <div className="mb-4 text-sm text-mist-300">
                כרטיס <b className="text-white" dir="ltr">{res.id}</b> {res.device && `· ${res.device}`}
              </div>
              <ol className="grid grid-cols-5 gap-2">
                {STAGES.map((s, i) => (
                  <li key={s} className="text-center">
                    <div className={`h-2 rounded-full ${i <= res.stage ? 'bg-gradient-to-l from-neon-500 to-fire-500' : 'bg-white/10'}`} />
                    <div className={`mt-2 text-[11px] leading-tight sm:text-xs ${i === res.stage ? 'font-bold text-white' : 'text-mist-500'}`}>{s}</div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="grid h-full place-items-center rounded-2xl border border-dashed border-white/10 p-6 text-sm text-mist-500">הסטטוס יופיע כאן</div>
          )}
        </div>
      </div>
    </section>
  )
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-mist-400">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  )
}
