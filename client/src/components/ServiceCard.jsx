import { Link } from 'react-router-dom'
import Decor from './Decor.jsx'

/* One service card: number, title, text, a colored art panel and a button */
export default function ServiceCard({ number, title, text, tone, art, action }) {
  return (
    <article className={`card service-card card--${tone}`}>
      <div className="service-card-top">
        <span className="tag">{number}</span>

        <span className="service-arrow" aria-hidden="true">↗</span>
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <div className="service-panel">
        <Decor src={art} className="decor-inline service-art" />
      </div>

      <Link className="btn" to={action.to}>
        {action.label}
      </Link>
    </article>
  )
}
