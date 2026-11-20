// Central business details. Replace placeholder contact values with the real ones before going live.
export const SITE = {
  name: 'דומינטור',
  nameEn: 'Dominator',
  // WhatsApp in international format, digits only (placeholder — replace with the real service number)
  whatsapp: '972500000000',
  phone: '*0000',
  email: 'service@dominator.example',
  social: {
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
  },
  freeShippingFrom: 499,
  credit: {
    name: 'אדי קציר — Eddie Studios',
    url: 'https://eddie-creates-magic.vercel.app/',
  },
}

export function waLink(text = 'היי דומינטור, אשמח לייעוץ') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

export type Branch = {
  id: string
  city: string
  address: string
  hours: { days: string; time: string }[]
  phone: string
  services: string[]
  mapQuery: string
}

export const BRANCHES: Branch[] = [
  {
    id: 'haifa',
    city: 'חיפה',
    address: 'שדרות מוריה 118, חיפה',
    hours: [
      { days: 'א׳–ה׳', time: '10:00–20:00' },
      { days: 'ו׳', time: '09:30–14:30' },
      { days: 'מוצ״ש', time: '19:00–22:30' },
    ],
    phone: '04-000-0000',
    services: ['חנות מלאה', 'מעבדת תיקונים', 'עמדות ניסיון סימולטורים'],
    mapQuery: 'שדרות מוריה 118 חיפה',
  },
  {
    id: 'tlv',
    city: 'תל אביב',
    address: 'דיזנגוף 240, תל אביב',
    hours: [
      { days: 'א׳–ה׳', time: '10:00–21:00' },
      { days: 'ו׳', time: '09:30–15:00' },
      { days: 'מוצ״ש', time: '19:00–23:00' },
    ],
    phone: '03-000-0000',
    services: ['חנות מלאה', 'קבלת מכשירים למעבדה', 'הרכבת מחשבים'],
    mapQuery: 'דיזנגוף 240 תל אביב',
  },
]

export const mapsLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export const wazeLink = (q: string) => `https://waze.com/ul?q=${encodeURIComponent(q)}&navigate=yes`
