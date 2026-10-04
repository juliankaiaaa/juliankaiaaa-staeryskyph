import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Request from './pages/Request.jsx'

import './styles.css'
import './pages/pages.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)