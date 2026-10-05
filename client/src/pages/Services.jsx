import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import ServiceCard from '../components/ServiceCard.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import Decor from '../components/Decor.jsx'
import { SERVICES } from '../data/services.js'
import { listServices } from '../api'
import brownHeart from '../assets/images/decorations/brown_heart.png'

const STEPS = [
  {
    title: 'Send your request',
    text: 'Tell us what you are looking for and send the item link whenever available.',
  },
  {
    title: 'Get your quotation',
    text: 'We check the item details and provide the corresponding price and fees.',
  },
  {
    title: 'Secure your order',
    text: 'Once your order is confirmed and payment requirements are completed, we proceed with the purchase.',
  },
  {
    title: 'Receive your items',
    text: 'Your items are consolidated, prepared for shipping, and eventually delivered to you.',
  },
]

/* Services page, same cards as the Home carousel in a full grid */
export default function Services() {
  // The static list shows at once and is replaced when the API answers
  const [services, setServices] = useState(SERVICES)

  useEffect(() => {
    listServices().then(setServices).catch(() => {})
  }, [])

  const ctaRef = useRef(null)

  useScallopFit(ctaRef, '--scallop')

  return (
    <div className="page">
      <main className="content">

        <Hero
          active="services"
          variant="page"
          kicker="WHAT WE DO"
          title="Services Offered"
          intro="From Japan and Korea to Thailand and beyond, Staery Sky PH helps make overseas purchases a little easier."
        />

        <section className="band band--brown">
          <div className="band-inner">
            <div className="band-head">
              <span className="section-label">OUR SERVICES</span>
            </div>

            <div className="grid grid--4">
              {services.map((service) => (
                <ServiceCard
                  key={service.number}
                  number={service.number}
                  title={service.title}
                  text={service.description}
                  photo={service.photo}
                  action={{ label: 'Request this service', to: '/request' }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="band band--pink">
          <div className="band-inner">
            <div className="band-head">
              <span className="section-label">HOW IT WORKS</span>

              <h2>From your wishlist to your doorstep.</h2>
            </div>

            <div className="grid grid--4">
              {STEPS.map((step, index) => (
                <div className="step" key={step.title}>
                  <span className="tag">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band--brown cta">
          <div ref={ctaRef} className="band-inner cta-inner sticker">
            <div className="cta-letter">
              <Decor src={brownHeart} className="decor-inline cta-art" />
  
              <h2>Have something specific in mind?</h2>
  
              <p>Send us your request and let us see how we can help.</p>
  
              <Link to="/request" className="btn">
                Got A Request?
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
