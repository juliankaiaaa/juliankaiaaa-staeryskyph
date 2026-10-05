import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScallopFit } from '../App'
import './pages.css'

export default function About() {
  const panelRef = useRef(null)
  const imageRef = useRef(null)

  useScallopFit(panelRef, '--scallop')
  useScallopFit(imageRef, '--scallop-lg')

  return (
    <div className="inner-page about-page">
      <main>
        <section className="hero">
          <div className="pink-panel" ref={panelRef}></div>

          <nav aria-label="Main">
            <Link to="/">Home</Link>
            <Link to="/about" aria-current="page">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/request">Connect</Link>
          </nav>

          <div className="hero-content">
            <span className="star star-hero" aria-hidden="true"></span>

            <p className="page-kicker">GET TO KNOW US</p>

            <h1>About Staery Sky PH</h1>

            <p className="page-intro">
              Making overseas shopping feel a little closer, easier, and
              more accessible for K-pop fans.
            </p>
          </div>

          <span className="heart hero-blob" aria-hidden="true"></span>
        </section>

        <section className="about-story">
          <div className="about-story-image about-image" ref={imageRef}>
            <div className="fake-polaroid">
              <div className="fake-photo">
                <span>SS</span>
              </div>

              <p>from here, there, everywhere</p>
            </div>

            <span className="floating-star">✦</span>
            <span className="floating-heart">♡</span>
          </div>

          <div className="about-story-content">
            <span className="section-label">WHO WE ARE</span>

            <h2>Bringing your finds closer to home.</h2>

            <p>
              Staery Sky PH is a purchase assistance service created to
              help K-pop fans access items from overseas shops and
              marketplaces.
            </p>

            <p>
              Whether you found something on Mercari Japan, Bunjang
              Korea, Weverse, or another overseas store, we help make
              the purchasing and forwarding process easier to navigate.
            </p>

            <p>
              Our goal is simple: help you get the things you love from
              wherever they are to wherever you are.
            </p>
          </div>
        </section>

        <section className="mission-vision">
          <article className="mv-card mission-card">
            <span className="mv-label">OUR MISSION</span>

            <h2>Make overseas shopping easier.</h2>

            <p>
              To provide accessible and organized purchase assistance
              services for fans who want to shop from overseas
              platforms.
            </p>
          </article>

          <article className="mv-card vision-card">
            <span className="mv-label">OUR VISION</span>

            <h2>More finds, fewer barriers.</h2>

            <p>
              To become a trusted bridge between fans in the Philippines
              and the merchandise they love from around the world.
            </p>
          </article>
        </section>

        <section className="why-section">
          <div className="why-heading">
            <span className="section-label">WHY CHOOSE US?</span>

            <h2>A little more care behind every order.</h2>
          </div>

          <div className="why-grid">
            <article>
              <span>01</span>
              <h3>Organized</h3>
              <p>
                Orders, payments, shipping details, and updates are
                organized so you can easily keep track of your purchase.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Accessible</h3>
              <p>
                We help bridge the gap between you and overseas shops
                that may otherwise be difficult to access.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Fan-focused</h3>
              <p>
                Built with collectors and K-pop fans in mind, from
                individual finds to larger merchandise orders.
              </p>
            </article>
          </div>
        </section>

        <section className="page-cta">
          <span className="page-cta-star">♡</span>

          <h2>Ready to find something?</h2>

          <p>
            Tell us what you are looking for and we'll take it from there.
          </p>

          <Link to="/request" className="primary-button">
            Send A Request
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