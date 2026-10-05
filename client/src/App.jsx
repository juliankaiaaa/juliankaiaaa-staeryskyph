import { Link } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/* Navigation targets, in page order */
const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'contact', label: 'Connect', href: '/request' },
]

/* Edit the descriptions to match what each service really covers */
const SERVICES = [
  {
    title: 'Consolidation Services',
    description: 'Combine your orders into one shipment',
  },
  {
    title: 'Korea Purchase Assistance',
    description: 'We buy items from Korea for you',
  },
  {
    title: 'Japan Site Purchase Assistance',
    description: 'We buy from Japanese shopping sites',
  },
  {
    title: 'Thailand Purchase Assistance',
    description: 'We buy items from Thailand for you',
  },
  {
    title: 'Mercari Japan Purchase Assistance',
    description: 'Mercari Japan purchase assistance',
  },
  {
    title: 'Bunjang Korea Purchase Assistance',
    description: 'Bunjang Korea purchase assistance',
  },
  {
    title: 'Weverse Purchase Assistance',
    description: 'Weverse shop purchase assistance',
  },
  {
    title: 'Address Rental / Forwarding',
    description: 'Korea and Thailand address rental and forwarding',
  },
]

/* Replace the placeholder links with your real pages */
const SOCIAL_LINKS = [
  { label: 'X / Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
]

/*
  Counts how many scallops fit along each side of an element and sets
  --cols and --rows, so the scalloped border always ends on a full bump.
  sizeVar is the CSS variable that holds the target scallop size.
*/
export function useScallopFit(ref, sizeVar) {
  useLayoutEffect(() => {
    const el = ref.current

    if (!el) return

    const measure = (value) => {
      const probe = document.createElement('div')
      probe.style.cssText = `position:absolute;visibility:hidden;width:${value}`
      el.appendChild(probe)

      const px = probe.getBoundingClientRect().width

      probe.remove()

      return px
    }

    const fit = () => {
      const style = getComputedStyle(el)
      const size = measure(style.getPropertyValue(sizeVar).trim())

      if (!size) return

      const width =
        el.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)

      const height =
        el.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)

      el.style.setProperty(
        '--cols',
        Math.max(2, Math.round(width / size))
      )

      el.style.setProperty(
        '--rows',
        Math.max(2, Math.round(height / size))
      )
    }

    fit()

    const observer = new ResizeObserver(fit)
    observer.observe(el)

    return () => observer.disconnect()
  }, [ref, sizeVar])
}

/* Tracks which section is currently in view */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0

      const probe = window.innerHeight * 0.35

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2

      let current = ids[0]

      for (const id of ids) {
        const el = document.getElementById(id)

        if (el && el.getBoundingClientRect().top <= probe) {
          current = id
        }
      }

      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

/* The link of the current section gets aria-current, which draws the underline */
function Navbar({ active }) {
  return (
    <nav aria-label="Main">
      {NAV_LINKS.map(({ id, label, href }) => (
        <Link
          key={id}
          to={href}
          aria-current={active === id ? 'location' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

/* Horizontal scroller with arrows that only show when there is more to scroll to */
function ServiceCarousel({ children }) {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  useEffect(() => {
    const el = track.current

    if (!el) return

    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end:
          el.scrollLeft + el.clientWidth >=
          el.scrollWidth - 4,
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

      <div className="services-grid" ref={track}>
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

export default function App() {
  const active = useActiveSection(
    NAV_LINKS.map((link) => link.id)
  )

  const panelRef = useRef(null)
  const aboutImageRef = useRef(null)

  useScallopFit(panelRef, '--scallop')
  useScallopFit(aboutImageRef, '--scallop-lg')

  return (
    <div className="page">
      <main className="content">

        {/* Home, the cover page */}
        <section id="home" className="hero">

          {/* CSS scalloped pink panel */}
          <div className="pink-panel" ref={panelRef}></div>

          <Navbar active={active} />

          <div className="hero-content">
            <span
              className="star star-hero"
              aria-hidden="true"
            ></span>

            <h1>Staery Sky PH</h1>

            <p>☆ from here, there, everywhere — to you ♡</p>
          </div>

          <span
            className="blob hero-blob"
            aria-hidden="true"
          ></span>

        </section>

        {/* About */}
        <section id="about" className="about">

          <div className="about-text">
            <h2>Who is Staery Sky PH?</h2>

            <p>
              Staery Sky PH is a purchase assistance service for K-pop fans,
              helping you get items from Japan, Korea, and other places.
            </p>

            <Link className="about-action" to="/about">
              Learn more
            </Link>
          </div>

          {/* CSS polka-dot background with a photo frame layered on top */}
          <div className="about-image" ref={aboutImageRef}>
            <span
              className="paper-scrap"
              aria-hidden="true"
            ></span>

            <div className="polaroid">
              <div className="polaroid-photo"></div>

              <span
                className="star star-about"
                aria-hidden="true"
              ></span>

              <span
                className="heart heart-about"
                aria-hidden="true"
              ></span>
            </div>
          </div>

        </section>

        {/* Services */}
        <section id="services" className="services">

          <div className="services-heading">
            <span
              className="star star-top"
              aria-hidden="true"
            ></span>

            <h2>Featured Services</h2>

            <span
              className="star star-outline star-bottom"
              aria-hidden="true"
            ></span>
          </div>

          <ServiceCarousel>
            {SERVICES.map(({ title, description }) => (
              <div className="service-card" key={title}>
                <div className="service-photo"></div>

                <h3>{title}</h3>

                <p>{description}</p>

                <Link
                  className="service-action"
                  to="/services"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </ServiceCarousel>

        </section>

        {/* Footer, the back page */}
        <footer id="contact">

          {/* Hours */}
          <div>
            <h3>Hours</h3>

            <p>Monday-Friday</p>
            <p>10:00 AM-10:00 PM</p>

            <br />

            <p>Saturday-Sunday</p>
            <p>11:00 AM-9:00 PM</p>
          </div>

          {/* Location */}
          <div>
            <h3>Location</h3>

            <p>Pampanga, Philippines</p>
          </div>

          {/* Links */}
          <div>
            <h3>Links</h3>

            <p>
              <Link to="/about">About</Link>
            </p>

            <p>
              <Link to="/services">Services</Link>
            </p>

            <p>
              <Link to="/request">Got A Request?</Link>
            </p>

            {SOCIAL_LINKS.map(({ label, href }) => (
              <p key={label}>
                <a href={href}>{label}</a>
              </p>
            ))}
          </div>

          {/* Paper star above the copyright line */}
          <span
            className="star star-outline footer-mark"
            aria-hidden="true"
          ></span>

          {/* Copyright */}
          <div className="copyright">
            © 2026 Staery Sky PH
          </div>

        </footer>

      </main>
    </div>
  )
}