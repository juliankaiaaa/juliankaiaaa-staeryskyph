import { useRef } from 'react'
import Decor from './Decor.jsx'
import useScallopFit from '../hooks/useScallopFit.js'
import brownStar from '../assets/images/decorations/brown_star.png'
import brownHeart from '../assets/images/decorations/brown_heart.png'

/* Scalloped dotted side with a photo frame on top, used by Home and About */
export default function AboutImage() {
  const imageRef = useRef(null)

  useScallopFit(imageRef, '--scallop-lg')

  return (
    <div className="about-image" ref={imageRef}>
      <span className="paper-scrap" aria-hidden="true"></span>

      <div className="polaroid">
        <div className="polaroid-photo"></div>

        <Decor src={brownStar} className="star-about" />
        <Decor src={brownHeart} className="heart-about" />
      </div>
    </div>
  )
}
