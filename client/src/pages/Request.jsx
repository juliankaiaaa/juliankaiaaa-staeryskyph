import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import SiteFooter from '../components/SiteFooter.jsx'
import Decor from '../components/Decor.jsx'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'
import brownStar from '../assets/images/decorations/brown_star.png'

/* Request page, the form for asking us to find an item */
export default function Request() {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  useScallopFit(formRef, '--scallop')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

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
                Fill out the form with as much information as you can. Item
                links are especially helpful when requesting purchase
                assistance.
              </p>

              <div className="card card--pink request-note">
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
              {submitted ? (
                <div className="form-success">
                  <Decor src={brownStar} className="decor-inline success-art" />

                  <h2>Request received!</h2>

                  <p>
                    Thank you for sending your request. We'll check the
                    details and get back to you.
                  </p>

                  <button
                    type="button"
                    className="btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      Name
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required
                      />
                    </label>

                    <label>
                      Contact / Username
                      <input
                        type="text"
                        name="contact"
                        placeholder="@username"
                        required
                      />
                    </label>
                  </div>

                  <label>
                    Service
                    <select name="service" required defaultValue="">
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="consolidation">
                        Consolidation Services
                      </option>
                      <option value="korea">Korea Purchase Assistance</option>
                      <option value="japan">
                        Japan Site Purchase Assistance
                      </option>
                      <option value="thailand">
                        Thailand Purchase Assistance
                      </option>
                      <option value="mercari">
                        Mercari Japan Purchase Assistance
                      </option>
                      <option value="bunjang">
                        Bunjang Korea Purchase Assistance
                      </option>
                      <option value="weverse">
                        Weverse Purchase Assistance
                      </option>
                      <option value="address">
                        Address Rental / Forwarding
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label>
                    Item / Request Link
                    <input type="url" name="link" placeholder="https://..." />
                  </label>

                  <label>
                    Request Details
                    <textarea
                      name="details"
                      rows="6"
                      placeholder="Tell us what you're looking for..."
                      required
                    ></textarea>
                  </label>

                  <button type="submit" className="btn">
                    Submit Request →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
