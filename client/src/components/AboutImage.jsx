import { useRef } from 'react'
import useScallopFit from '../hooks/useScallopFit.js'
import logo from '../assets/brand/ssph_logo.png'

/* Scalloped side with a polaroid, used on Home and About */
export default function AboutImage() {
  const imageRef = useRef(null)

  useScallopFit(imageRef, '--scallop-lg')

  return (
    <div className="about-image" ref={imageRef}>
      <span className="paper-scrap" aria-hidden="true"></span>

      <div className="polaroid">
        <div className="polaroid-photo">
          <img src={logo} alt="Staery Sky PH logo" />
        </div>
      </div>
    </div>
  )
}
