import type { LucideIcon } from 'lucide-react'
import { Gamepad2, Cpu, Disc3, Car, ToyBrick, Wrench, Joystick } from 'lucide-react'

export type CategoryId = 'consoles' | 'pcs' | 'games' | 'sims' | 'rc' | 'merch'

export type Category = {
  id: CategoryId
  name: string
  short: string
  tagline: string
  icon: LucideIcon
  from: string
  to: string
  subs: { id: string; name: string }[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'consoles',
    name: 'קונסולות ואביזרים',
    short: 'קונסולות',
    tagline: 'PS5, Switch 2, Xbox, VR ובקרים',
    icon: Gamepad2,
    from: '#7C5CFF',
    to: '#2B6BFF',
    subs: [
      { id: 'playstation', name: 'PlayStation' },
      { id: 'nintendo', name: 'Nintendo' },
      { id: 'xbox', name: 'Xbox' },
      { id: 'handheld', name: 'קונסולות ניידות' },
      { id: 'vr', name: 'מציאות מדומה VR' },
      { id: 'controllers', name: 'בקרים ושלטים' },
      { id: 'audio', name: 'אוזניות גיימינג' },
    ],
  },
  {
    id: 'pcs',
    name: 'מחשבי גיימינג',
    short: 'מחשבים',
    tagline: 'הרכבה אישית, ניידים, מסכים וציוד היקפי',
    icon: Cpu,
    from: '#FF4D2E',
    to: '#FF2E7E',
    subs: [
      { id: 'desktops', name: 'מחשבים בהרכבה אישית' },
      { id: 'laptops', name: 'מחשבים ניידים' },
      { id: 'monitors', name: 'מסכי גיימינג' },
      { id: 'peripherals', name: 'מקלדות ועכברים' },
      { id: 'chairs', name: 'כיסאות גיימינג' },
    ],
  },
  {
    id: 'games',
    name: 'משחקים',
    short: 'משחקים',
    tagline: 'כל הלהיטים לכל הקונסולות',
    icon: Disc3,
    from: '#14C8A8',
    to: '#2B6BFF',
    subs: [
      { id: 'ps5-games', name: 'משחקי PS5' },
      { id: 'switch-games', name: 'משחקי Nintendo' },
      { id: 'xbox-games', name: 'משחקי Xbox' },
    ],
  },
  {
    id: 'sims',
    name: 'סימולטורי נהיגה וטיסה',
    short: 'סימולטורים',
    tagline: 'הגאים, דוושות, קוקפיטים ו-Direct Drive',
    icon: Joystick,
    from: '#FFB020',
    to: '#FF4D2E',
    subs: [
      { id: 'wheels', name: 'הגאים' },
      { id: 'pedals', name: 'דוושות' },
      { id: 'cockpits', name: 'קוקפיטים ומושבים' },
      { id: 'flight', name: 'סימולטורי טיסה' },
    ],
  },
  {
    id: 'rc',
    name: 'רכבים וטיסנים על שלט',
    short: 'על שלט',
    tagline: 'Traxxas, Arrma, רחפני DJI וטיסנים',
    icon: Car,
    from: '#39E81B',
    to: '#14C8A8',
    subs: [
      { id: 'cars', name: 'רכבים על שלט' },
      { id: 'drones', name: 'רחפנים' },
      { id: 'planes', name: 'טיסנים' },
    ],
  },
  {
    id: 'merch',
    name: "בובות פופ ומרצ'נדייז",
    short: "מרצ'נדייז",
    tagline: 'Funko Pop, תאורה, ביגוד ואספנות',
    icon: ToyBrick,
    from: '#FF2E7E',
    to: '#7C5CFF',
    subs: [
      { id: 'funko', name: 'בובות Funko Pop' },
      { id: 'collectibles', name: 'אספנות ותאורה' },
      { id: 'apparel', name: 'ביגוד' },
    ],
  },
]

export const REPAIR_NAV = { name: 'מעבדת תיקונים', icon: Wrench }

export const getCategory = (id?: string) => CATEGORIES.find((c) => c.id === id)
