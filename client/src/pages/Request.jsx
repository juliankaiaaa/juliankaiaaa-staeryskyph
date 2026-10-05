import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useScallopFit } from '../App'
import './pages.css'

export default function Request() {
  const [submitted, setSubmitted] = useState(false)
  const panelRef = useRef(null)

  useScallopFit(panelRef, '--scallop')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="inner-page request-page">
      <main>
        <section className="hero">
          <div className="pink-panel" ref={panelRef}></div>

          <nav aria-label="Main">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/request" aria-current="page">Connect</Link>
          </nav>

          <div className="hero-content">
            <span className="star star-hero" aria-hidden="true"></span>

            <p className="page-kicker">LET'S FIND IT</p>

            <h1>Got A Request?</h1>

            <p className="page-intro">
              Found something overseas that you want to purchase? Tell us
              about it below.
            </p>
          </div>

          <span className="blob hero-blob" aria-hidden="true"></span>
        </section>

        <section className="request-section">
          <div className="request-info">
            <span className="section-label">SEND US A MESSAGE</span>

            <h2>Tell us what you're looking for.</h2>

            <p>
              Fill out the form with as much information as you can.
              Item links are especially helpful when requesting purchase
              assistance.
            </p>

            <div className="request-note">
              <span>✦</span>

              <p>
                Please double-check your item link and details before
                submitting your request.
              </p>
            </div>

            <div className="request-links">
              <Link to="/services">
                View our services →
              </Link>

              <Link to="/about">
                Learn more about us →
              </Link>
            </div>
          </div>

          <div className="request-form-wrapper">
            {submitted ? (
              <div className="form-success">
                <span className="success-star">✦</span>

                <h2>Request received!</h2>

                <p>
                  Thank you for sending your request. We'll check the
                  details and get back to you.
                </p>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form className="request-form" onSubmit={handleSubmit}>
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
                    <option value="korea">
                      Korea Purchase Assistance
                    </option>
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
                  <input
                    type="url"
                    name="link"
                    placeholder="https://..."
                  />
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

                <button type="submit" className="primary-button">
                  Submit Request →
                </button>
              </form>
            )}
          </div>
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