import { useRef } from 'react'
import Navbar from './Navbar.jsx'
import Decor from './Decor.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import brownStar from '../assets/images/decorations/brown_star.png'
import paperClip from '../assets/images/decorations/paper_clip.png'

/* The cover shared by every page. variant "page" uses the smaller inner title */
export default function Hero({ id, active, kicker, title, intro, variant }) {
  const panelRef = useRef(null)

  useScallopFit(panelRef, '--scallop')

  return (
    <section id={id} className={variant === 'page' ? 'hero hero--page' : 'hero'}>
      <div className="pink-panel" ref={panelRef}></div>

      <Navbar active={active} />

      <div className="hero-content">
        <Decor src={brownStar} className="star-hero" />

        {kicker && <p className="page-kicker">{kicker}</p>}

        <h1>{title}</h1>

        {intro && <p className="hero-intro">{intro}</p>}
      </div>

      <Decor src={paperClip} className="hero-clip" />
    </section>
  )
}
