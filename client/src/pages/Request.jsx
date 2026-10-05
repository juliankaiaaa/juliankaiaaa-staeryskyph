import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import SiteFooter from '../components/SiteFooter.jsx'
import Decor from '../components/Decor.jsx'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'

/* Request page. ?service=korea opens the form for that service */
export default function Request() {
  const [searchParams] = useSearchParams()
  const formRef = useRef(null)

  useScallopFit(formRef, '--scallop')

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
                <Decor src={brownAsterisk} className="decor-inline note-art" />

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

            <div ref={formRef} className="sticker request-card">
              <InquiryForm initialService={searchParams.get('service') ?? ''} />
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
