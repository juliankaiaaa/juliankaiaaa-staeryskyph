import { Link } from 'react-router-dom'

/*
  One service card: number badge, photo area, title, text and a button.
  When photo is null, an empty stitched photo area shows until a real photo
  is added in data/services.js.
*/
export default function ServiceCard({ title, text, photo, action }) {
  return (
    <article className="service-card">

      {photo ? (
        <img className="service-photo" src={photo} alt={title} />
      ) : (
        <div className="service-photo" aria-hidden="true"></div>
      )}

      <h3>{title}</h3>

      <p>{text}</p>

      <Link className="service-action" to={action.to}>
        {action.label}
      </Link>
    </article>
  )
}
