import { Link } from 'react-router-dom'

/*
  One service card: a polaroid frame with a photo, the number, title, text
  and button. When photo is null, a CSS placeholder fills the frame.
*/
export default function ServiceCard({
  number,
  title,
  text,
  photo,
  action,
}) {
  return (
    <article className="service-card">
      <div className="service-panel">
        {photo ? (
          <img className="service-photo" src={photo} alt={title} />
        ) : (
          <div className="service-placeholder" aria-hidden="true"></div>
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
