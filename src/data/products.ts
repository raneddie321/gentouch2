import type { CategoryId } from './categories'
import { photoOf } from './photos'

// Simulated catalog modeled on Dominator's product range. Prices are illustrative.

export type ArtKind =
  | 'console-tower'
  | 'console-box'
  | 'handheld'
  | 'controller'
  | 'headset'
  | 'vr'
  | 'pc'
  | 'laptop'
  | 'monitor'
  | 'mouse'
  | 'keyboard'
  | 'chair'
  | 'game'
  | 'wheel'
  | 'pedals'
  | 'cockpit'
  | 'joystick'
  | 'car'
  | 'drone'
  | 'plane'
  | 'figure'
  | 'lamp'
  | 'apparel'

export type Badge = 'hot' | 'new' | 'preorder' | 'sale' | 'exclusive'

export type Product = {
  id: string
  name: string
  brand: string
  category: CategoryId
  sub: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  art: ArtKind
  hue: string
  label?: string
  image?: string
  badges: Badge[]
  fastShip: boolean
  officialWarranty: boolean
  stock: number
  short: string
  specs: [string, string][]
}

type Seed = Omit<Product, 'rating' | 'reviews' | 'fastShip' | 'officialWarranty' | 'stock' | 'badges' | 'specs'> &
  Partial<Pick<Product, 'rating' | 'reviews' | 'fastShip' | 'officialWarranty' | 'stock' | 'badges' | 'specs'>>

let n = 0
const p = (s: Seed): Product => {
  n++
  return {
    rating: 4.5 + ((n * 37) % 5) / 10,
    reviews: 12 + ((n * 53) % 240),
    fastShip: true,
    officialWarranty: true,
    stock: 3 + ((n * 7) % 30),
    badges: [],
    specs: [],
    ...s,
    image: photoOf(s.id),
  }
}

export const PRODUCTS: Product[] = [
  // ───────────── Consoles & accessories
  p({ id: 'ps5-pro', name: 'PlayStation 5 Pro 2TB', brand: 'Sony', category: 'consoles', sub: 'playstation', price: 3199, art: 'console-tower', hue: '#E8ECF5', badges: ['hot'], short: 'הקונסולה החזקה ביותר של סוני — 4K משופר, Ray Tracing מתקדם ו-PSSR.', specs: [['נפח אחסון', '2TB SSD'], ['רזולוציה', 'עד 8K'], ['כונן', 'ללא (ניתן להוסיף)'], ['אחריות', 'שנתיים יבואן רשמי']] }),
  p({ id: 'ps5-slim-digital', name: 'PlayStation 5 Slim Digital Edition', brand: 'Sony', category: 'consoles', sub: 'playstation', price: 1999, oldPrice: 2299, art: 'console-tower', hue: '#F2F4FA', badges: ['sale', 'hot'], short: 'גרסה דיגיטלית דקה וקלה, 1TB SSD ובקר DualSense.', specs: [['נפח אחסון', '1TB SSD'], ['רזולוציה', 'עד 4K 120Hz'], ['בקר', 'DualSense'], ['אחריות', 'שנתיים יבואן רשמי']] }),
  p({ id: 'ps5-slim-disc', name: 'PlayStation 5 Slim עם כונן', brand: 'Sony', category: 'consoles', sub: 'playstation', price: 2349, art: 'console-tower', hue: '#FFFFFF', short: 'הקונסולה עם כונן Blu-ray Ultra HD למשחקים פיזיים ולסרטים.', specs: [['נפח אחסון', '1TB SSD'], ['כונן', 'Ultra HD Blu-ray'], ['אחריות', 'שנתיים יבואן רשמי']] }),
  p({ id: 'switch-2', name: 'Nintendo Switch 2', brand: 'Nintendo', category: 'consoles', sub: 'nintendo', price: 1899, art: 'handheld', hue: '#FF4D4D', label: 'SWITCH 2', badges: ['hot'], short: 'הדור הבא של נינטנדו: מסך 7.9" 120Hz, Joy-Con 2 מגנטיים ו-4K בעגינה.', specs: [['מסך', '7.9" LCD 1080p 120Hz'], ['אחסון', '256GB'], ['עגינה', 'עד 4K'], ['אחריות', 'שנה יבואן רשמי']] }),
  p({ id: 'switch-2-mkw', name: 'Nintendo Switch 2 + Mario Kart World', brand: 'Nintendo', category: 'consoles', sub: 'nintendo', price: 2149, oldPrice: 2229, art: 'handheld', hue: '#FF3B30', label: 'MK WORLD', badges: ['exclusive', 'sale'], short: 'באנדל ההשקה: קונסולה + קוד הורדה למריו קארט וורלד.', specs: [['כולל', 'Mario Kart World (קוד)'], ['אחסון', '256GB'], ['אחריות', 'שנה יבואן רשמי']] }),
  p({ id: 'switch-oled', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'consoles', sub: 'nintendo', price: 1349, art: 'handheld', hue: '#F5F5F5', label: 'OLED', short: 'מסך OLED 7" חי ועשיר, 64GB ומעמד רחב.', specs: [['מסך', '7" OLED'], ['אחסון', '64GB'], ['אחריות', 'שנה יבואן רשמי']] }),
  p({ id: 'xbox-series-x', name: 'Xbox Series X 1TB', brand: 'Microsoft', category: 'consoles', sub: 'xbox', price: 2399, art: 'console-box', hue: '#1F2937', short: '12 טרהפלופס, 4K 120FPS ו-Quick Resume לכמה משחקים במקביל.', specs: [['אחסון', '1TB SSD'], ['רזולוציה', '4K 120Hz'], ['אחריות', 'שנה יבואן רשמי']] }),
  p({ id: 'xbox-series-s', name: 'Xbox Series S 512GB', brand: 'Microsoft', category: 'consoles', sub: 'xbox', price: 1399, oldPrice: 1549, art: 'console-box', hue: '#F3F4F6', badges: ['sale'], short: 'הקונסולה הקומפקטית והמשתלמת לעולם ה-Game Pass.', specs: [['אחסון', '512GB SSD'], ['רזולוציה', '1440p 120Hz'], ['אחריות', 'שנה יבואן רשמי']] }),
  p({ id: 'ps-portal', name: 'PlayStation Portal', brand: 'Sony', category: 'consoles', sub: 'handheld', price: 949, art: 'handheld', hue: '#EEF1F7', label: 'PORTAL', short: 'שחקו ב-PS5 מכל מקום בבית עם מסך 8" ובקרי DualSense מובנים.', specs: [['מסך', '8" LCD 1080p'], ['חיבור', 'Remote Play WiFi']] }),
  p({ id: 'rog-ally-x', name: 'ASUS ROG Ally', brand: 'ASUS', category: 'consoles', sub: 'handheld', price: 2690, art: 'handheld', hue: '#1A1A1A', label: 'ROG', badges: ['new'], short: 'מחשב גיימינג בכף היד עם Ryzen Z1 Extreme ומסך 120Hz.', specs: [['מעבד', 'Ryzen Z1 Extreme'], ['זיכרון', '16GB LPDDR5'], ['אחסון', '512GB'], ['מסך', '7" 120Hz']] }),
  p({ id: 'psvr2', name: 'PlayStation VR2', brand: 'Sony', category: 'consoles', sub: 'vr', price: 1799, oldPrice: 2199, art: 'vr', hue: '#F2F4FA', badges: ['sale'], short: 'מציאות מדומה עם OLED 4K HDR, מעקב עיניים ובקרי Sense.', specs: [['תצוגה', 'OLED 2000×2040 לעין'], ['תאימות', 'PS5 / PC']] }),
  p({ id: 'quest-3', name: 'Meta Quest 3 512GB', brand: 'Meta', category: 'consoles', sub: 'vr', price: 2299, art: 'vr', hue: '#E5E7EB', short: 'משקפי מציאות מעורבת עצמאיים עם Passthrough צבעוני.', specs: [['אחסון', '512GB'], ['מעבד', 'Snapdragon XR2 Gen 2']] }),
  p({ id: 'dualsense-edge', name: 'בקר DualSense Edge', brand: 'Sony', category: 'consoles', sub: 'controllers', price: 899, art: 'controller', hue: '#F5F7FB', badges: ['hot'], short: 'בקר פרו עם סטיקים מתחלפים, כפתורים אחוריים ופרופילים.', specs: [['חיבור', 'אלחוטי / USB-C'], ['תאימות', 'PS5, PC']] }),
  p({ id: 'dualsense-black', name: 'בקר DualSense Midnight Black', brand: 'Sony', category: 'consoles', sub: 'controllers', price: 299, oldPrice: 349, art: 'controller', hue: '#2A2D36', badges: ['sale'], short: 'משוב הפטי ו-Adaptive Triggers בצבע שחור לילה.', specs: [['חיבור', 'אלחוטי'], ['תאימות', 'PS5, PC']] }),
  p({ id: 'switch2-pro', name: 'Nintendo Switch Pro Controller', brand: 'Nintendo', category: 'consoles', sub: 'controllers', price: 289, art: 'controller', hue: '#3A3F4B', short: 'הבקר המקצועי של נינטנדו, תואם Switch ו-Switch 2, עם סוללה ל-40 שעות.', specs: [['חיבור', 'Bluetooth / USB-C'], ['סוללה', 'עד 40 שעות'], ['תאימות', 'Switch, Switch 2']] }),
  p({ id: 'xbox-controller', name: 'בקר Xbox Wireless — Carbon Black', brand: 'Microsoft', category: 'consoles', sub: 'controllers', price: 269, art: 'controller', hue: '#1F2329', short: 'הבקר הקלאסי של Xbox, תואם PC, מובייל ו-Xbox.', specs: [['חיבור', 'Xbox Wireless / Bluetooth']] }),
  p({ id: 'pulse-elite', name: 'אוזניות PlayStation Pulse Elite', brand: 'Sony', category: 'consoles', sub: 'audio', price: 599, art: 'headset', hue: '#F2F4FA', short: 'שמע Planar Magnetic, PlayStation Link וחיבור Bluetooth.', specs: [['חיבור', 'PS Link / Bluetooth'], ['סוללה', 'עד 30 שעות']] }),
  p({ id: 'arctis-nova-7', name: 'SteelSeries Arctis Nova 7', brand: 'SteelSeries', category: 'consoles', sub: 'audio', price: 729, art: 'headset', hue: '#2E3340', short: 'אלחוטיות עם חיבור כפול 2.4GHz + Bluetooth במקביל.', specs: [['חיבור', '2.4GHz + BT'], ['סוללה', '38 שעות']] }),

  // ───────────── Gaming PCs
  p({ id: 'dom-starter', name: 'Dominator Starter — RTX 5060 / i5-14400F', brand: 'Dominator', category: 'pcs', sub: 'desktops', price: 4690, oldPrice: 4990, art: 'pc', hue: '#39E81B', badges: ['sale'], short: 'המחשב המושלם לכניסה לגיימינג ב-1080p בהרכבה במעבדה שלנו.', specs: [['מעבד', 'Intel Core i5-14400F'], ['כרטיס מסך', 'RTX 5060 8GB'], ['זיכרון', '16GB DDR5'], ['אחסון', '1TB NVMe'], ['אחריות', '3 שנים']] }),
  p({ id: 'dom-viper', name: 'Dominator Viper — RTX 5070 / Ryzen 7 9700X', brand: 'Dominator', category: 'pcs', sub: 'desktops', price: 7490, art: 'pc', hue: '#FF4D2E', badges: ['hot'], short: 'מכונת 1440p אמיתית — 165FPS ומעלה ברוב הכותרים.', specs: [['מעבד', 'AMD Ryzen 7 9700X'], ['כרטיס מסך', 'RTX 5070 12GB'], ['זיכרון', '32GB DDR5 6000'], ['אחסון', '2TB NVMe Gen4'], ['אחריות', '3 שנים']] }),
  p({ id: 'dom-titan', name: 'Dominator Titan — RTX 5080 / Ryzen 7 9800X3D', brand: 'Dominator', category: 'pcs', sub: 'desktops', price: 11990, art: 'pc', hue: '#7C5CFF', badges: ['exclusive'], short: 'המעבד המהיר בעולם לגיימינג עם RTX 5080, קירור נוזלי 360.', specs: [['מעבד', 'AMD Ryzen 7 9800X3D'], ['כרטיס מסך', 'RTX 5080 16GB'], ['זיכרון', '32GB DDR5 6000 CL30'], ['אחסון', '2TB NVMe Gen4'], ['קירור', 'AIO 360mm'], ['אחריות', '3 שנים']] }),
  p({ id: 'dom-apex', name: 'Dominator Apex — RTX 5090 / Ryzen 9 9950X3D', brand: 'Dominator', category: 'pcs', sub: 'desktops', price: 19990, art: 'pc', hue: '#FFB020', badges: ['preorder'], short: 'ללא פשרות: 4K אולטרה, סטרימינג ויצירה — הדגל של המעבדה.', specs: [['מעבד', 'AMD Ryzen 9 9950X3D'], ['כרטיס מסך', 'RTX 5090 32GB'], ['זיכרון', '64GB DDR5 6400'], ['אחסון', '4TB NVMe Gen5'], ['אחריות', '3 שנים']] }),
  p({ id: 'rog-strix-g16', name: 'ASUS ROG Strix G16 — RTX 5070 Ti', brand: 'ASUS', category: 'pcs', sub: 'laptops', price: 9990, art: 'laptop', hue: '#FF2E7E', short: 'נייד גיימינג 16" 240Hz עם Core Ultra 9 ו-RTX 5070 Ti.', specs: [['מעבד', 'Intel Core Ultra 9 275HX'], ['כרטיס מסך', 'RTX 5070 Ti 12GB'], ['מסך', '16" 2.5K 240Hz'], ['זיכרון', '32GB']] }),
  p({ id: 'legion-5', name: 'Lenovo Legion 5 — RTX 5060', brand: 'Lenovo', category: 'pcs', sub: 'laptops', price: 6490, art: 'laptop', hue: '#2B6BFF', badges: ['new'], short: 'נייד מאוזן ושקט עם מסך OLED 15.1" ו-RTX 5060.', specs: [['מעבד', 'Ryzen 7 260'], ['כרטיס מסך', 'RTX 5060 8GB'], ['מסך', '15.1" OLED 165Hz']] }),
  p({ id: 'odyssey-oled', name: 'Samsung Odyssey OLED G6 27" 360Hz', brand: 'Samsung', category: 'pcs', sub: 'monitors', price: 3290, art: 'monitor', hue: '#7C5CFF', badges: ['hot'], short: 'QD-OLED 1440p עם 360Hz וזמן תגובה 0.03ms.', specs: [['פאנל', 'QD-OLED'], ['רזולוציה', '2560×1440'], ['קצב רענון', '360Hz']] }),
  p({ id: 'lg-ultragear', name: 'LG UltraGear 27" 180Hz IPS', brand: 'LG', category: 'pcs', sub: 'monitors', price: 899, oldPrice: 1049, art: 'monitor', hue: '#FF4D2E', badges: ['sale'], short: 'מסך QHD מהיר במחיר שפשוט אי אפשר לפספס.', specs: [['פאנל', 'IPS'], ['רזולוציה', '2560×1440'], ['קצב רענון', '180Hz']] }),
  p({ id: 'gpx-superlight-2', name: 'Logitech G Pro X Superlight 2', brand: 'Logitech', category: 'pcs', sub: 'peripherals', price: 599, art: 'mouse', hue: '#F5F5F5', short: 'עכבר eSports אלחוטי במשקל 60 גרם בלבד.', specs: [['חיישן', 'HERO 2 32K'], ['משקל', '60g']] }),
  p({ id: 'blackwidow-v4', name: 'Razer BlackWidow', brand: 'Razer', category: 'pcs', sub: 'peripherals', price: 749, art: 'keyboard', hue: '#39E81B', short: 'מקלדת מכנית עם חיוג מולטימדיה ו-Chroma RGB.', specs: [['מתגים', 'Razer Green'], ['תאורה', 'Chroma RGB']] }),
  p({ id: 'apex-pro-tkl', name: 'SteelSeries Apex 5', brand: 'SteelSeries', category: 'pcs', sub: 'peripherals', price: 549, art: 'keyboard', hue: '#FF4D2E', short: 'מקלדת היברידית-מכנית עם מסך OLED קטן ותאורת RGB לכל מקש.', specs: [['מתגים', 'היברידי-מכני'], ['פורמט', 'מלא עם משענת'], ['תאורה', 'RGB לכל מקש']] }),
  p({ id: 'secretlab-titan', name: 'כיסא גיימינג Racer אדום-שחור', brand: 'Dominator', category: 'pcs', sub: 'chairs', price: 899, art: 'chair', hue: '#FF4D2E', short: 'כיסא בסגנון מושב מרוץ עם כרית צוואר, כרית גב תחתון ומשענות ידיים מתכווננות.', specs: [['ריפוד', 'דמוי עור'], ['הטיית גב', 'עד 155°'], ['עומס מרבי', '120 ק״ג']] }),
  p({ id: 'cloud-iii', name: 'HyperX Cloud III', brand: 'HyperX', category: 'pcs', sub: 'peripherals', price: 399, art: 'headset', hue: '#FF2E2E', short: 'אוזניות חוטיות נוחות במיוחד עם סאונד מרחבי DTS.', specs: [['חיבור', 'USB / 3.5mm'], ['מיקרופון', 'נשלף']] }),

  // ───────────── Games
  p({ id: 'gta-6', name: 'Grand Theft Auto VI — PS5', brand: 'Rockstar Games', category: 'games', sub: 'ps5-games', price: 349, art: 'game', hue: '#FF2E7E', label: 'GTA VI', badges: ['new', 'hot'], short: 'ברוכים הבאים ל-Leonida. המשחק המצופה ביותר של העשור.', specs: [['פלטפורמה', 'PS5'], ['דירוג', '18+']] }),
  p({ id: 'mario-kart-world', name: 'Mario Kart World — Switch 2', brand: 'Nintendo', category: 'games', sub: 'switch-games', price: 329, art: 'game', hue: '#FF3B30', label: 'MARIO KART', badges: ['hot'], short: 'עולם פתוח, 24 מתחרים ומצב Knockout Tour.', specs: [['פלטפורמה', 'Switch 2'], ['שחקנים', 'עד 24 אונליין']] }),
  p({ id: 'ghost-yotei', name: 'Ghost of Yōtei — PS5', brand: 'Sony', category: 'games', sub: 'ps5-games', price: 299, art: 'game', hue: '#E11D48', label: 'YŌTEI', short: 'הרפתקת סמוראים עוצרת נשימה בצפון יפן.', specs: [['פלטפורמה', 'PS5'], ['דירוג', '18+']] }),
  p({ id: 'fc-26', name: 'EA Sports FC 26 — PS5', brand: 'EA', category: 'games', sub: 'ps5-games', price: 269, oldPrice: 299, art: 'game', hue: '#14C8A8', label: 'FC 26', badges: ['sale'], short: 'הכדורגל הכי אמיתי שיש, עם Ultimate Team ו-Career Mode.', specs: [['פלטפורמה', 'PS5']] }),
  p({ id: 'bo7', name: 'Call of Duty: Black Ops 7 — PS5', brand: 'Activision', category: 'games', sub: 'ps5-games', price: 299, art: 'game', hue: '#FF6B00', label: 'BO7', badges: ['new'], short: 'קמפיין, מולטיפלייר וזומבים — חוזרים ל-Black Ops.', specs: [['פלטפורמה', 'PS5'], ['דירוג', '18+']] }),
  p({ id: 'dk-bananza', name: 'Donkey Kong Bananza — Switch 2', brand: 'Nintendo', category: 'games', sub: 'switch-games', price: 299, art: 'game', hue: '#FFB020', label: 'DK', short: 'דונקי קונג חוזר בהרפתקה תלת-ממדית הרסנית.', specs: [['פלטפורמה', 'Switch 2']] }),
  p({ id: 'pokemon-za', name: 'Pokémon Legends: Z-A — Switch 2', brand: 'Nintendo', category: 'games', sub: 'switch-games', price: 279, art: 'game', hue: '#39E81B', label: 'POKÉMON Z-A', short: 'מגה-אבולוציות חוזרות בלב העיר Lumiose.', specs: [['פלטפורמה', 'Switch 2']] }),
  p({ id: 'spiderman-2', name: "Marvel's Spider-Man 2 — PS5", brand: 'Sony', category: 'games', sub: 'ps5-games', price: 179, oldPrice: 249, art: 'game', hue: '#DC2626', label: 'SPIDER-MAN 2', badges: ['sale'], short: 'פיטר ומיילס נגד ונום בניו יורק ענקית.', specs: [['פלטפורמה', 'PS5']] }),
  p({ id: 'forza-h5', name: 'Forza Horizon 5 — Xbox / PS5', brand: 'Xbox Game Studios', category: 'games', sub: 'xbox-games', price: 199, art: 'game', hue: '#2B6BFF', label: 'FORZA 5', short: 'פסטיבל המירוצים במקסיקו — מעל 500 מכוניות.', specs: [['פלטפורמה', 'Xbox Series / PS5']] }),

  // ───────────── Simulators
  p({ id: 'g29', name: 'Logitech G29 + Driving Force Shifter', brand: 'Logitech', category: 'sims', sub: 'wheels', price: 1099, oldPrice: 1299, art: 'wheel', hue: '#2E3340', badges: ['sale', 'hot'], short: 'ההגה הנמכר ביותר בישראל — עם ידית הילוכים 6+R.', specs: [['תאימות', 'PS5, PS4, PC'], ['משוב כוח', 'Dual Motor']] }),
  p({ id: 'g923', name: 'Logitech G923 TRUEFORCE', brand: 'Logitech', category: 'sims', sub: 'wheels', price: 1349, art: 'wheel', hue: '#1F2329', short: 'משוב TRUEFORCE ברזולוציה גבוהה שמרגיש כל מהמורה.', specs: [['תאימות', 'PS5 / Xbox / PC'], ['משוב כוח', 'TRUEFORCE']] }),
  p({ id: 't300', name: 'Thrustmaster T300 RS GT', brand: 'Thrustmaster', category: 'sims', sub: 'wheels', price: 1690, art: 'wheel', hue: '#B91C1C', short: 'מנוע Brushless ורצועה שקטה — הצעד הבא לסים אמיתי.', specs: [['תאימות', 'PS5, PS4, PC'], ['סיבוב', '1080°']] }),
  p({ id: 'csl-dd', name: 'Fanatec CSL DD 8Nm — Bundle', brand: 'Fanatec', category: 'sims', sub: 'wheels', price: 3290, art: 'wheel', hue: '#111827', badges: ['exclusive'], short: 'Direct Drive אמיתי עם 8Nm, הגה ודוושות.', specs: [['מומנט', '8Nm'], ['תאימות', 'PC / Xbox']] }),
  p({ id: 'moza-r5', name: 'MOZA R5 Bundle', brand: 'MOZA', category: 'sims', sub: 'wheels', price: 2290, art: 'wheel', hue: '#2B6BFF', badges: ['new'], short: 'בסיס Direct Drive 5.5Nm, הגה ES ודוושות SR-P Lite.', specs: [['מומנט', '5.5Nm'], ['תאימות', 'PC']] }),
  p({ id: 'tlcm', name: 'דוושות Thrustmaster Ferrari GT', brand: 'Thrustmaster', category: 'sims', sub: 'pedals', price: 279, art: 'pedals', hue: '#9CA3AF', short: 'סט דוושות גז ובלם עם בסיס רחב ומשטח מונע החלקה.', specs: [['דוושות', 'גז ובלם'], ['תאימות', 'PC, PlayStation']] }),
  p({ id: 'gtlite', name: 'קוקפיט Next Level Racing GTLite', brand: 'Next Level Racing', category: 'sims', sub: 'cockpits', price: 1290, art: 'cockpit', hue: '#2E3340', short: 'קוקפיט מתקפל — נכנס לכל סלון ומתקפל תוך שניות.', specs: [['תאימות', 'כל ההגאים המובילים'], ['מתקפל', 'כן']] }),
  p({ id: 'playseat-trophy', name: 'Playseat Trophy', brand: 'Playseat', category: 'sims', sub: 'cockpits', price: 2890, art: 'cockpit', hue: '#FF4D2E', short: 'מושב בהשראת מכוניות GT, מתאים ל-Direct Drive.', specs: [['מסגרת', 'פלדה'], ['תאימות', 'DD עד 12Nm']] }),
  p({ id: 'dom-sim-rig', name: 'Dominator Pro Sim Rig — מערכת מלאה', brand: 'Dominator', category: 'sims', sub: 'cockpits', price: 12900, art: 'cockpit', hue: '#7C5CFF', badges: ['exclusive', 'preorder'], short: 'שלדת אלומיניום, Direct Drive 12Nm, מסך כפול והתקנה בבית.', specs: [['שלדה', 'פרופיל אלומיניום 80/40'], ['בסיס', 'DD 12Nm'], ['התקנה', 'כולל הרכבה בבית הלקוח']] }),
  p({ id: 't16000m', name: 'Thrustmaster T.16000M FCS HOTAS', brand: 'Thrustmaster', category: 'sims', sub: 'flight', price: 699, art: 'joystick', hue: '#2E3340', short: 'ג׳ויסטיק + מצערת לסימולטורי טיסה עם חיישני Hall.', specs: [['תאימות', 'PC'], ['חיישנים', 'H.E.A.R.T Hall Effect']] }),

  // ───────────── RC
  p({ id: 'x-maxx', name: 'Traxxas X-Maxx 8S Brushless', brand: 'Traxxas', category: 'rc', sub: 'cars', price: 4990, art: 'car', hue: '#39E81B', badges: ['hot'], short: 'מפלצת 1:5 שמגיעה ליותר מ-80 קמ״ש. בלתי ניתנת לעצירה.', specs: [['קנה מידה', '1:5'], ['מהירות', '80+ קמ״ש'], ['הנעה', '4X4']] }),
  p({ id: 'slash-vxl', name: 'Traxxas Slash 4X4 VXL', brand: 'Traxxas', category: 'rc', sub: 'cars', price: 2290, art: 'car', hue: '#2B6BFF', short: 'שורט-קורס האגדי עם 100+ קמ״ש ב-3S.', specs: [['קנה מידה', '1:10'], ['מהירות', '100+ קמ״ש']] }),
  p({ id: 'kraton-6s', name: 'ARRMA Kraton 6S BLX', brand: 'ARRMA', category: 'rc', sub: 'cars', price: 2990, art: 'car', hue: '#FF4D2E', badges: ['new'], short: 'Speed Monster Truck עמיד במיוחד לקפיצות.', specs: [['קנה מידה', '1:8'], ['הנעה', '4X4']] }),
  p({ id: 'kids-monster', name: 'מונסטר טראק על שלט 1:16 לילדים', brand: 'Dominator Kids', category: 'rc', sub: 'cars', price: 249, oldPrice: 299, art: 'car', hue: '#FFB020', badges: ['sale'], short: 'רכב ראשון מושלם — עמיד, מהיר וכולל סוללה נטענת.', specs: [['קנה מידה', '1:16'], ['גיל', '6+']] }),
  p({ id: 'dji-mini-4', name: 'רחפן DJI Mini 4 Pro', brand: 'DJI', category: 'rc', sub: 'drones', price: 3690, art: 'drone', hue: '#9CA3AF', badges: ['hot'], short: 'מתחת ל-249 גרם, צילום 4K/60 HDR וחישה ב-360°.', specs: [['משקל', '<249g'], ['מצלמה', '4K/60 HDR'], ['זמן טיסה', '34 דק׳']] }),
  p({ id: 'dji-neo', name: 'רחפן DJI Neo', brand: 'DJI', category: 'rc', sub: 'drones', price: 799, art: 'drone', hue: '#E5E7EB', short: 'רחפן כף-יד לסלפי וידאו — המראה מהכף, בלי שלט.', specs: [['משקל', '135g'], ['מצלמה', '4K']] }),
  p({ id: 'ranger-757', name: 'טיסן Volantex Ranger 757', brand: 'Volantex', category: 'rc', sub: 'planes', price: 649, art: 'plane', hue: '#F5F5F5', short: 'טיסן מתחילים עם ייצוב גירו ומצב Return.', specs: [['מוטת כנפיים', '757mm'], ['ייצוב', 'Xpilot']] }),

  // ───────────── Merch
  p({ id: 'funko-spiderman', name: 'Funko Pop! Spider-Man', brand: 'Funko', category: 'merch', sub: 'funko', price: 69, art: 'figure', hue: '#DC2626', short: 'בובת פופ אספנות רשמית של ספיידרמן.', specs: [['גובה', '~10 ס״מ']] }),
  p({ id: 'funko-kratos', name: 'Funko Pop! Kratos — God of War', brand: 'Funko', category: 'merch', sub: 'funko', price: 79, art: 'figure', hue: '#9CA3AF', short: 'אל המלחמה בגרסת פופ אספנית.', specs: [['גובה', '~10 ס״מ']] }),
  p({ id: 'funko-mario', name: 'Funko Pop! Super Mario', brand: 'Funko', category: 'merch', sub: 'funko', price: 69, art: 'figure', hue: '#FF3B30', badges: ['hot'], short: "It's-a me! מריו בגרסת פופ רשמית.", specs: [['גובה', '~10 ס״מ']] }),
  p({ id: 'funko-pikachu', name: 'Funko Pop! Pikachu', brand: 'Funko', category: 'merch', sub: 'funko', price: 69, art: 'figure', hue: '#FFD60A', short: 'פיקאצ׳ו האהוב — חובה לכל אספן פוקימון.', specs: [['גובה', '~10 ס״מ']] }),
  p({ id: 'funko-vader', name: 'Funko Pop! Darth Vader', brand: 'Funko', category: 'merch', sub: 'funko', price: 69, art: 'figure', hue: '#1F2329', short: 'הצד האפל של הכוח, על המדף שלכם.', specs: [['גובה', '~10 ס״מ']] }),
  p({ id: 'ps-icons-light', name: 'מנורת PlayStation Icons', brand: 'Paladone', category: 'merch', sub: 'collectibles', price: 149, art: 'lamp', hue: '#2B6BFF', short: 'מנורת סמלי פלייסטיישן עם 3 מצבי תאורה.', specs: [['הפעלה', 'USB / סוללות']] }),
  p({ id: 'invader-lamp', name: 'מנורת פיקסל Invader של דומינטור', brand: 'Dominator', category: 'merch', sub: 'collectibles', price: 129, art: 'lamp', hue: '#39E81B', badges: ['exclusive'], short: 'מנורת הלוגו הירוקה שלנו — בלעדי לדומינטור.', specs: [['הפעלה', 'USB-C']] }),
  p({ id: 'dom-hoodie', name: 'קפוצ׳ון Dominator Gaming Crew', brand: 'Dominator', category: 'merch', sub: 'apparel', price: 189, art: 'apparel', hue: '#141821', badges: ['new'], short: 'קפוצ׳ון כותנה עבה עם לוגו האינביידר רקום.', specs: [['מידות', 'S–XXL'], ['בד', '80% כותנה']] }),
]

export const getProduct = (id?: string) => PRODUCTS.find((x) => x.id === id)

export const BRANDS = Array.from(new Set(PRODUCTS.map((x) => x.brand))).sort()

export const formatPrice = (n: number) => '₪' + n.toLocaleString('he-IL')

export const BADGE_LABEL: Record<Badge, string> = {
  hot: 'חם',
  new: 'חדש',
  preorder: 'הזמנה מוקדמת',
  sale: 'מבצע',
  exclusive: 'בלעדי',
}

export function searchProducts(q: string, limit = 8) {
  const t = q.trim().toLowerCase()
  if (!t) return []
  const words = t.split(/\s+/)
  return PRODUCTS.map((x) => {
    const hay = `${x.name} ${x.brand} ${x.short} ${x.sub}`.toLowerCase()
    const score = words.reduce((s, w) => s + (hay.includes(w) ? (x.name.toLowerCase().includes(w) ? 3 : 1) : -10), 0)
    return { x, score }
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.x)
}
