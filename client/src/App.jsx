import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from './components/Hero.jsx'
import AboutSection from './components/AboutSection.jsx'
import ServiceCarousel from './components/ServiceCarousel.jsx'
import ServiceCard from './components/ServiceCard.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Decor from './components/Decor.jsx'
import { NAV_LINKS } from './components/Navbar.jsx'
import useActiveSection from './hooks/useActiveSection.js'
import { SERVICES } from './data/services.js'
import { listServices } from './api'
import { withPhotos } from './data/services.js'
import pinkStar from './assets/decorations/pink_star.png'
import pinkAsterisk from './assets/decorations/pink_asterisk.png'

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

/* Home, the cover page */
export default function App() {
  // The static list shows at once and is replaced when the API answers
  const [services, setServices] = useState(SERVICES)

  useEffect(() => {
    listServices().then((rows) => setServices(withPhotos(rows))).catch(() => {})
  }, [])

  const active = useActiveSection(SECTION_IDS)

  return (
    <div className="page">
      <main className="content">

        <Hero
          id="home"
          active={active}
          title="Staery Sky PH"
          intro="☆ from here, there, everywhere — to you ♡"
        />

        <AboutSection
          id="about"
          title="Who is Staery Sky PH?"
          action={
            <Link className="btn" to="/about">
              Learn more
            </Link>
          }
        >
          <p>
            Staery Sky PH is a purchase assistance service for K-pop fans,
            helping you get items from Japan, Korea, and other places.
          </p>
        </AboutSection>

        <section id="services" className="services">
          <div className="services-heading">
            <Decor src={pinkStar} className="star-top" />

            <h2>Featured Services</h2>

            <Decor src={pinkAsterisk} className="star-bottom" />
          </div>

          <ServiceCarousel>
            {services.map((service) => (
              <ServiceCard
                key={service.number}
                number={service.number}
                title={service.title}
                text={service.summary}
                photo={service.photo}
                action={{ label: 'Learn more', to: '/services' }}
              />
            ))}
          </ServiceCarousel>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
