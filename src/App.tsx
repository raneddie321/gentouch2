import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toasts from './components/Toasts'
import { WhatsAppIcon } from './components/Icons'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import Repair from './pages/Repair'
import Branches from './pages/Branches'
import Account from './pages/Account'
import Info from './pages/Info'
import NotFound from './pages/NotFound'
import { waLink } from './data/site'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    if (!pathname.startsWith('/product')) document.title = 'דומינטור | גיימינג, קונסולות, מחשבים ומעבדת תיקונים'
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-fire-500 focus:px-4 focus:py-2">
        דילוג לתוכן הראשי
      </a>
      <ScrollTop />
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:cat" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/account" element={<Account />} />
          <Route path="/info/:page" element={<Info />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Toasts />
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="ייעוץ בוואטסאפ"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25C565] text-white shadow-[0_10px_30px_-6px_rgba(37,197,101,.7)] transition hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
