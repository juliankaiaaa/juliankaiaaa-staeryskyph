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
import ScrollToTop from './components/ScrollToTop.jsx'

import './styles.css'

/* The key restarts the fade and rise animation on every route change */
function AnimatedRoutes() {
  const { pathname } = useLocation()

  return (
    <div className="page-transition" key={pathname}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request" element={<Request />} />
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
