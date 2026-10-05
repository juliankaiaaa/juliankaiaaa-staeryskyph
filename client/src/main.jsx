import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

import App from './App.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Request from './pages/Request.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request" element={<Request />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
