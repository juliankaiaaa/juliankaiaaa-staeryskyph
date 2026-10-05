import { Link, useSearchParams } from 'react-router-dom'
import { useRef } from 'react'
import Hero from '../components/Hero.jsx'
import useTilt from '../hooks/useTilt.js'
import InquiryForm from '../components/InquiryForm.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

/* Request page. ?service=korea opens the form for that service */
export default function Request() {
  const [searchParams] = useSearchParams()
  const cardRef = useTilt()
  return (
    <div className="page">
      <main className="content">

        <Hero
          active="contact"
          variant="page"
          kicker="LET'S FIND IT"
          title="Got A Request?"
          intro="Found something overseas that you want to purchase? Tell us about it below."
        />

        <section className="band band--brown">
          <div className="band-inner request-layout">
            <div className="request-info">
              <span className="section-label">SEND US A MESSAGE</span>

              <h2>Tell us what you're looking for.</h2>

              <p>
                Pick the service you need and fill in its details. Item links
                are especially helpful when requesting purchase assistance.
              </p>

              <div className="card card--sky request-note">
                <p>
                  Please double-check your item link and details before
                  submitting your request.
                </p>
              </div>

              <div className="request-links">
                <Link to="/services" className="text-link">
                  View our services →
                </Link>

                <Link to="/about" className="text-link">
                  Learn more about us →
                </Link>
              </div>
            </div>

            <div ref={cardRef} className="request-card">
              <span className="clip" aria-hidden="true"></span>
              <InquiryForm initialService={searchParams.get('service') ?? ''} />
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
