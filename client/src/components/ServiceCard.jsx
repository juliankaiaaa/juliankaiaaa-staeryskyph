import { Link } from 'react-router-dom'

/*
  One service card. When onToggle is given, the card can expand to show its
  details and steps. Without it, the card is the plain version used on Home.
*/
export default function ServiceCard({
  title,
  text,
  photo,
  action,
  expanded = false,
  onToggle,
  steps = [],
  accent = 'cream',
}) {
  return (
    <article
      className={`service-card${expanded ? ' service-card--expanded' : ''}`}
      data-accent={expanded ? accent : undefined}
    >
      {photo ? (
        <img className="service-photo" src={photo} alt={title} />
      ) : (
        <div className="service-photo" aria-hidden="true"></div>
      )}

      <h3>{title}</h3>

      <p>{text}</p>

      {expanded && (
        <div className="service-details">
          <ol className="service-steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="service-actions">
        {onToggle && (
          <button
            type="button"
            className="service-toggle"
            aria-expanded={expanded}
            onClick={onToggle}
          >
            {expanded ? 'Show less' : 'View details'}
          </button>
        )}

        <Link className="service-action" to={action.to}>
          {action.label}
        </Link>
      </div>
    </article>
  )
}
