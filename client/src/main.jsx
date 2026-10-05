import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import App from './App.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Request from './pages/Request.jsx'
import Admin from './pages/Admin.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import './styles.css'

/* Content that fades in once as it scrolls into view. Service cards are left out */
const REVEAL_SELECTOR =
  'main :is(h1, h2, h3, p, .section-label, .page-kicker, .hero-intro, .btn, .card, .step, .tag):not(.service-card, .service-card *)'

/* The key restarts the fade on every route change */
function AnimatedRoutes() {
  const { pathname } = useLocation()

  useEffect(() => {
    const items = document.querySelectorAll(REVEAL_SELECTOR)

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    items.forEach((el) => el.classList.add('reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  return (
    <div className="page-transition" key={pathname}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request" element={<Request />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />

      <AnimatedRoutes />
    </HashRouter>
  </StrictMode>
)
