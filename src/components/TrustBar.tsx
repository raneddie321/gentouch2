import { ShieldCheck, Users, BadgeCheck, Truck } from 'lucide-react'
const ITEMS = [
  { icon: ShieldCheck, title: 'אחריות יבואן רשמי', text: 'כל מוצר מגיע עם אחריות מלאה ותעודת יבואן — בלי הפתעות.', color: '#39E81B' },
  { icon: Users, title: 'ייעוץ מגיימרים לגיימרים', text: 'הצוות שלנו משחק בדיוק במה שאתם משחקים. נעזור לבחור נכון.', color: '#7C5CFF' },
  { icon: BadgeCheck, title: 'מחיר זהה באתר ובסניפים', text: 'אותו מחיר הוגן בכל ערוץ — אונליין, בחיפה ובתל אביב.', color: '#FFB020' },
  { icon: Truck, title: 'משלוחים מהירים לכל הארץ', text: 'משלוח עד 24–72 שעות, או איסוף עצמי חינם מהסניפים.', color: '#FF4D2E' },
]
export default function TrustBar() {
  return (
    <section className="container-x py-14 sm:py-20" aria-labelledby="trust-title">
      <div className="mb-8 text-center">
        <span className="eyebrow">למה דומינטור</span>
        <h2 id="trust-title" className="h-section mt-2">
          קונים בביטחון, משחקים בראש שקט
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title} className="card group p-6 transition hover:-translate-y-1 hover:border-white/15">
            <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl ring-1 transition group-hover:scale-110" style={{ background: `${it.color}1A`, boxShadow: `0 0 30px -10px ${it.color}`, color: it.color, borderColor: it.color }}>
              <it.icon className="h-6 w-6" />
            </span>
            <h3 className="font-display text-lg font-bold">{it.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mist-400">{it.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
