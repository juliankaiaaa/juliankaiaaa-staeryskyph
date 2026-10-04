import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScallopFit } from '../App'
import './pages.css'

const SERVICES = [
  {
    number: '01',
    title: 'Consolidation Services',
    description:
      'Combine your purchases into one shipment to make receiving your items easier and more organized.',
  },
  {
    number: '02',
    title: 'Korea Purchase Assistance',
    description:
      'We help you purchase K-pop merchandise and other items from Korean websites and sellers.',
  },
  {
    number: '03',
    title: 'Japan Site Purchase Assistance',
    description:
      'Get items from Japanese shopping websites even when direct international purchasing is not available.',
  },
  {
    number: '04',
    title: 'Thailand Purchase Assistance',
    description:
      'Purchase items from Thailand with assistance from checkout to forwarding.',
  },
  {
    number: '05',
    title: 'Mercari Japan Purchase Assistance',
    description:
      'Looking for something on Mercari Japan? Send us the listing and we can assist with the purchase.',
  },
  {
    number: '06',
    title: 'Bunjang Korea Purchase Assistance',
    description:
      'We assist with purchases from Bunjang Korea so you can access listings from Korean sellers.',
  },
  {
    number: '07',
    title: 'Weverse Purchase Assistance',
    description:
      'Get your favorite official K-pop merchandise from Weverse Shop with our purchase assistance.',
  },
  {
    number: '08',
    title: 'Address Rental / Forwarding',
    description:
      'Use our available overseas address services for receiving and forwarding your purchases.',
  },
]

export default function Services() {
  const panelRef = useRef(null)

  useScallopFit(panelRef, '--scallop')

  return (
    <div className="inner-page services-page">
      <main>
        <section className="hero">
          <div className="pink-panel" ref={panelRef}></div>

          <nav aria-label="Main">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services" aria-current="page">Services</Link>
            <Link to="/request">Connect</Link>
          </nav>

          <div className="hero-content">
            <span className="star star-hero" aria-hidden="true"></span>

            <p className="page-kicker">WHAT WE DO</p>

            <h1>Services Offered</h1>

            <p className="page-intro">
              From Japan and Korea to Thailand and beyond, Staery Sky PH
              helps make overseas purchases a little easier.
            </p>
          </div>

          <span className="blob hero-blob" aria-hidden="true"></span>
        </section>

        <section className="service-list-section">
          <div className="section-label">OUR SERVICES</div>

          <div className="full-service-grid">
            {SERVICES.map((service) => (
              <article className="full-service-card" key={service.number}>
                <span className="service-number">{service.number}</span>

                <div className="service-card-content">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>

                  <Link to="/request" className="text-link">
                    Request this service →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="how-it-works">
          <div className="how-it-works-heading">
            <span className="section-label">HOW IT WORKS</span>
            <h2>From your wishlist to your doorstep.</h2>
          </div>

          <div className="steps-grid">
            <div className="step">
              <span>01</span>
              <h3>Send your request</h3>
              <p>
                Tell us what you are looking for and send the item link
                whenever available.
              </p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>Get your quotation</h3>
              <p>
                We check the item details and provide the corresponding
                price and fees.
              </p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Secure your order</h3>
              <p>
                Once your order is confirmed and payment requirements are
                completed, we proceed with the purchase.
              </p>
            </div>

            <div className="step">
              <span>04</span>
              <h3>Receive your items</h3>
              <p>
                Your items are consolidated, prepared for shipping, and
                eventually delivered to you.
              </p>
            </div>
          </div>
        </section>

        <section className="page-cta">
          <span className="page-cta-star">✦</span>

          <h2>Have something specific in mind?</h2>

          <p>
            Send us your request and let us see how we can help.
          </p>

          <Link to="/request" className="primary-button">
            Got A Request?
          </Link>
        </section>
      </main>

      <footer>
        <div>
          <h3>Hours</h3>
          <p>Monday-Friday</p>
          <p>10:00 AM-10:00 PM</p>
          <br />
          <p>Saturday-Sunday</p>
          <p>11:00 AM-9:00 PM</p>
        </div>

        <div>
          <h3>Location</h3>
          <p>Pampanga, Philippines</p>
        </div>

        <div>
          <h3>Links</h3>
          <p><Link to="/about">About</Link></p>
          <p><a href="#">X / Twitter</a></p>
          <p><a href="#">Facebook</a></p>
          <p><a href="#">Instagram</a></p>
        </div>

        <span className="star star-outline footer-mark" aria-hidden="true"></span>

        <div className="copyright">© 2026 Staery Sky PH</div>
      </footer>
    </div>
  )
}