import { useRef } from 'react'
import useScallopFit from '../hooks/useScallopFit.js'

/* Scalloped dotted side with a photo frame on top, used by Home and About */
export default function AboutImage() {
  const imageRef = useRef(null)

  useScallopFit(imageRef, '--scallop-lg')

  return (
    <div className="about-image" ref={imageRef}>
      <span className="paper-scrap" aria-hidden="true"></span>

      <div className="polaroid">
        <div className="polaroid-photo"></div>
      </div>
    </div>
  )
}
