import { Link } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import AboutSection from '../components/AboutSection.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import Decor from '../components/Decor.jsx'
import pinkHeart from '../assets/images/decorations/pink_heart.png'

/* About page, same cover and about layout as Home */
export default function About() {
  return (
    <div className="page">
      <main className="content">

        <Hero
          active="about"
          variant="page"
          kicker="GET TO KNOW US"
          title="About Staery Sky PH"
          intro="Making overseas shopping feel a little closer, easier, and more accessible for K-pop fans."
        />

        <AboutSection label="WHO WE ARE" title="Bringing your finds closer to home.">
          <p>
            Staery Sky PH is a purchase assistance service created to help
            K-pop fans access items from overseas shops and marketplaces.
          </p>

          <p>
            Whether you found something on Mercari Japan, Bunjang Korea,
            Weverse, or another overseas store, we help make the purchasing
            and forwarding process easier to navigate.
          </p>

          <p>
            Our goal is simple: help you get the things you love from
            wherever they are to wherever you are.
          </p>
        </AboutSection>

        <section className="band band--brown">
          <div className="band-inner grid grid--2">
            <article className="card card--pink">
              <span className="section-label">OUR MISSION</span>

              <h2>Make overseas shopping easier.</h2>

              <p>
                To provide accessible and organized purchase assistance
                services for fans who want to shop from overseas platforms.
              </p>
            </article>

            <article className="card card--brown">
              <span className="section-label">OUR VISION</span>

              <h2>More finds, fewer barriers.</h2>

              <p>
                To become a trusted bridge between fans in the Philippines
                and the merchandise they love from around the world.
              </p>
            </article>
          </div>
        </section>

        <section className="band band--pink">
          <div className="band-inner">
            <div className="band-head">
              <span className="section-label">WHY CHOOSE US?</span>

              <h2>A little more care behind every order.</h2>
            </div>

            <div className="grid grid--3">
              <article className="card card--brown">
                <span className="tag">01</span>
                <h3>Organized</h3>
                <p>
                  Orders, payments, shipping details, and updates are
                  organized so you can easily keep track of your purchase.
                </p>
              </article>

              <article className="card card--brown">
                <span className="tag">02</span>
                <h3>Accessible</h3>
                <p>
                  We help bridge the gap between you and overseas shops that
                  may otherwise be difficult to access.
                </p>
              </article>

              <article className="card card--brown">
                <span className="tag">03</span>
                <h3>Fan-focused</h3>
                <p>
                  Built with collectors and K-pop fans in mind, from
                  individual finds to larger merchandise orders.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="band band--brown cta">
          <div className="band-inner cta-inner">
            <Decor src={pinkHeart} className="decor-inline cta-art" />

            <h2>Ready to find something?</h2>

            <p>Tell us what you are looking for and we'll take it from there.</p>

            <Link to="/request" className="btn">
              Send A Request
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
