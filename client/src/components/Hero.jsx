import { useRef } from 'react'
import Navbar from './Navbar.jsx'
import Decor from './Decor.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import brownStar from '../assets/images/decorations/brown_star.png'
import brownHeart from '../assets/images/decorations/brown_heart.png'
import brownAsterisk from '../assets/images/decorations/brown_asterisk.png'
import brownOctagram from '../assets/images/decorations/brown_octagram.png'

/* The cover shared by every page. variant "page" uses the smaller inner title */
export default function Hero({ id, active, kicker, title, intro, variant }) {
  const panelRef = useRef(null)

  useScallopFit(panelRef, '--scallop')

  return (
    <section id={id} className={variant === 'page' ? 'hero hero--page' : 'hero'}>
      <div className="pink-panel" ref={panelRef}></div>

      <Decor src={brownHeart} className="hero-sym hero-sym-heart" />
      <Decor src={brownAsterisk} className="hero-sym hero-sym-asterisk" />
      <Decor src={brownOctagram} className="hero-sym hero-sym-octagram" />

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
