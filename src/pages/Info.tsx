import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound'

const PAGES: Record<string, { title: string; body: string[] }> = {
  shipping: {
    title: 'משלוחים והחזרות',
    body: [
      'משלוח עד הבית לכל הארץ: ₪39, חינם בהזמנה מעל ₪499. זמן אספקה 1–3 ימי עסקים.',
      'משלוח אקספרס באותו היום לאזור המרכז וחיפה בהזמנה עד 13:00 — ₪59.',
      'איסוף עצמי חינם מהסניפים בחיפה ובתל אביב.',
      'ניתן לבטל עסקה ולהחזיר מוצר תוך 14 יום בהתאם לחוק הגנת הצרכן, כשהמוצר באריזתו המקורית וללא שימוש.',
    ],
  },
  warranty: {
    title: 'אחריות',
    body: [
      'כל המוצרים הנמכרים בדומינטור מגיעים עם אחריות יבואן רשמי בישראל.',
      'מחשבים בהרכבה אישית של דומינטור כוללים 3 שנות אחריות מלאה על חלקים ועבודה.',
      'שירות האחריות ניתן דרך מעבדת דומינטור — אין צורך לשלוח ליבואן.',
    ],
  },
  terms: {
    title: 'תקנון האתר',
    body: [
      'האתר הינו קונספט עיצובי להדגמה. המחירים, המלאי והמבצעים המוצגים הם להמחשה בלבד.',
      'ההזמנות באתר אינן מחייבות ולא מתבצע חיוב כספי.',
    ],
  },
  accessibility: {
    title: 'הצהרת נגישות',
    body: [
      'אנו פועלים להנגיש את האתר בהתאם לתקן הישראלי 5568 ולהנחיות WCAG 2.1 ברמה AA.',
      'האתר תומך בניווט מקלדת, ניגודיות גבוהה, תוויות לקוראי מסך ומכבד העדפת "הפחתת תנועה" של מערכת ההפעלה.',
      'נתקלתם בבעיה? פנו אלינו בוואטסאפ ונטפל בהקדם.',
    ],
  },
}

export default function Info() {
  const { page } = useParams()
  const p = page ? PAGES[page] : undefined
  if (!p) return <NotFound />
  return (
    <div className="container-x max-w-3xl py-12">
      <h1 className="h-section">{p.title}</h1>
      <div className="panel mt-6 space-y-4 p-6 leading-relaxed text-ink-2 sm:p-8">
        {p.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </div>
      <Link to="/" className="btn-line mt-6">
        חזרה לעמוד הבית
      </Link>
    </div>
  )
}
