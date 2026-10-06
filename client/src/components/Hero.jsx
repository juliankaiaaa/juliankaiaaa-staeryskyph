import { useRef } from 'react'
import Navbar from './Navbar.jsx'
import Decor from './Decor.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import brownStar from '../assets/decorations/brown_star.png'

/* The cover shared by every page. variant "page" uses the smaller inner title */
export default function Hero({ id, active, kicker, title, intro, variant }) {
  const panelRef = useRef(null)

  useScallopFit(panelRef, '--scallop')

  return (
    <section id={id} className={variant === 'page' ? 'hero hero--page' : 'hero'}>
      <div className="pink-panel" ref={panelRef}></div>

      <Decor src={brownStar} className="hero-sym hero-sym-star-left" />
      <Decor src={brownStar} className="hero-sym hero-sym-star-mid" />
      <Decor src={brownStar} className="hero-sym hero-sym-star-low" />
      <Decor src={brownStar} className="hero-sym hero-sym-star-high" />
      <Decor src={brownStar} className="hero-sym hero-sym-travel hero-sym-travel-1" />
      <Decor src={brownStar} className="hero-sym hero-sym-travel hero-sym-travel-2" />
      <Decor src={brownStar} className="hero-sym hero-sym-travel hero-sym-travel-3" />

      <Navbar active={active} />

      <div className="hero-content">
        <Decor src={brownStar} className="star-hero" />

        {kicker && <p className="page-kicker">{kicker}</p>}

        <h1>{title}</h1>

        {intro && <p className="hero-intro">{intro}</p>}
      </div>

    </section>
  )
}
