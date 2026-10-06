import { StrictMode } from 'react'
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
import IdlePopup from './components/IdlePopup.jsx'

import useScrollReveal from './hooks/useScrollReveal.js'
import './styles/index.css'

/* The key restarts the fade on every route change */
function AnimatedRoutes() {
  const { pathname } = useLocation()

  useScrollReveal(pathname)

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
      <IdlePopup />

      <AnimatedRoutes />
    </HashRouter>
  </StrictMode>
)
