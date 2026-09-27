import brownBg from './assets/images/brown-polkadot-bg.png'
import pinkCurve from './assets/images/pink-curved.png'

export default function App() {
  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${brownBg})` }}
    >

      <main className="content">

        {/* Home */}
        <section
          id="home"
          className="hero"
        >
          <img
            src={pinkCurve}
            alt=""
            className="pink-panel"
          />

          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Connect</a>
          </nav>

          <div className="hero-content">
            <h1>Staery Sky PH</h1>

            <p>
              ☆ from here, there, everywhere — to you ♡
            </p>
          </div>
        </section>

        {/* About */}
        <section id="about" className="about">

          <div className="about-text">
            <h2>Who is Staery Sky PH?</h2>

            <p>
              Staery Sky PH is a purchase assistance service for K-pop fans,
              helping you get items from Japan, Korea, and other places.
            </p>

            <button>Learn more</button>
          </div>

          <div
            className="about-image"
            style={{ backgroundImage: `url(${brownBg})` }}
          >
          </div>

        </section>

        {/* Services */}
        <section id="services" className="services">

          <div className="services-heading">
            <span className="star star-top">*</span>

            <h2>
              Featured
              <br />
              Services
            </h2>

            <span className="star star-bottom">*</span>
          </div>

          <div className="services-grid">

            <div className="service-card">
              <div className="service-photo"></div>

              <h3>Korean Address Rental</h3>

              <p>
                Korean address rental service
              </p>
            </div>

            <div className="service-card">
              <div className="service-photo"></div>

              <h3>Mercari Purchase Assistance</h3>

              <p>
                Japan purchase assistance
              </p>
            </div>

            <div className="service-card">
              <div className="service-photo"></div>

              <h3>Thailand Address Rental</h3>

              <p>
                Thailand address rental service
              </p>
            </div>

          </div>

        </section>

        {/* Footer */}
        <footer id="contact">

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

            <p>About</p>
            <p>X / Twitter</p>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>

          <div className="copyright">
            © 2026 Staery Sky PH
          </div>

        </footer>

      </main>

    </div>
  )
}