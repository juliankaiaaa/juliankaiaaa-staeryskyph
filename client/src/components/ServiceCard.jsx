import { Link } from 'react-router-dom'
import Decor from './Decor.jsx'

/*
  One service card: a polaroid frame with a photo, the number, title, text
  and button. When photo is null, the placeholder shows the art sticker.
*/
export default function ServiceCard({
  number,
  title,
  text,
  photo,
  art,
  action,
}) {
  return (
    <article className="service-card">
      <div className="service-panel">
        {photo ? (
          <img className="service-photo" src={photo} alt={title} />
        ) : (
          <Decor src={art} className="decor-inline service-art" />
        )}
      </div>

      <div className="service-card-body">
        <span className="tag">{number}</span>

        <h3>{title}</h3>

        <p>{text}</p>

        <Link className="btn" to={action.to}>
          {action.label}
        </Link>
      </div>
    </article>
  )
}
