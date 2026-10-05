import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* Starts every page at the top, so a route change never keeps the old scroll position */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
