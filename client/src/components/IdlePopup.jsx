import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Decor from './Decor.jsx'
import brownHeart from '../assets/images/decorations/brown_heart.png'

const IDLE_MS = 10 * 60 * 1000
const ACTIVITY = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']

/* A paper note that appears after 10 minutes without activity */
export default function IdlePopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => setOpen(true), IDLE_MS)

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setOpen(true), IDLE_MS)
    }

    ACTIVITY.forEach((name) => window.addEventListener(name, reset, { passive: true }))

    return () => {
      clearTimeout(timer)
      ACTIVITY.forEach((name) => window.removeEventListener(name, reset))
    }
  }, [])

  if (!open) return null

  return (
    <div className="idle-overlay" onClick={() => setOpen(false)}>
      <div
        className="idle-note"
        role="dialog"
        aria-modal="true"
        aria-labelledby="idle-title"
        onClick={(event) => event.stopPropagation()}
      >
        <Decor src={brownHeart} className="decor-inline idle-heart" />

        <h2 id="idle-title">Have something specific in mind?</h2>
        <p>Send us your request and let us see how we can help.</p>

        <div className="idle-actions">
          <Link to="/request" className="btn" onClick={() => setOpen(false)}>
            Got A Request?
          </Link>
          <button type="button" className="idle-close" onClick={() => setOpen(false)}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
