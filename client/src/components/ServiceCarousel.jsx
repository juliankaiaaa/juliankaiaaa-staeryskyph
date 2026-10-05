import { useEffect, useRef, useState } from 'react'

/* Horizontal scroller with arrows that only show when there is more to scroll to */
export default function ServiceCarousel({ children }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  useEffect(() => {
    const el = track.current

    if (!el) return

    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      })

    update()

    el.addEventListener('scroll', update, { passive: true })

    const observer = new ResizeObserver(update)
    observer.observe(el)

    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  const scrollByCard = (direction) => {
    const el = track.current

    if (!el) return

    const card = el.querySelector('.service-card')

    if (!card) return

    const gap = parseFloat(getComputedStyle(el).columnGap) || 0

    el.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="services-carousel">
      {!edge.start && (
        <button
          type="button"
          className="carousel-arrow carousel-arrow-prev"
          aria-label="Previous services"
          onClick={() => scrollByCard(-1)}
        >
          ‹
        </button>
      )}

      <div className="service-track" ref={track}>
        {children}
      </div>

      {!edge.end && (
        <button
          type="button"
          className="carousel-arrow carousel-arrow-next"
          aria-label="Next services"
          onClick={() => scrollByCard(1)}
        >
          ›
        </button>
      )}
    </div>
  )
}
