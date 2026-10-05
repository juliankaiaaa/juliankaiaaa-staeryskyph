import { Link } from 'react-router-dom'
import Decor from './Decor.jsx'

/* One service card: a pink art panel, then the number, title, text and button */
export default function ServiceCard({ number, title, text, art, action }) {
  return (
    <article className="service-card">
      <div className="service-panel">
        <Decor src={art} className="decor-inline service-art" />
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
