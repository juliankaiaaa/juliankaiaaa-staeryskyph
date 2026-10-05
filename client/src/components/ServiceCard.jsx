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
      className={`service-card${expanded ? ' service-card--expanded' : ''}${onToggle ? ' service-card--clickable' : ''}`}
      data-accent={expanded ? accent : undefined}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (onToggle && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onToggle()
        }
      }}
      tabIndex={onToggle ? 0 : undefined}
      aria-expanded={onToggle ? expanded : undefined}
    >
      {photo ? (
        <img className="service-photo" src={photo} alt={title} />
      ) : (
        <div className="service-photo" aria-hidden="true"></div>
      )}

      <div className="service-copy">
        <h3>{title}</h3>

        {expanded && text.includes('\n\n')
          ? text.split('\n\n').map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
          : <p>{text}</p>}

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
          <Link
            className="service-action"
            to={action.to}
            onClick={(event) => event.stopPropagation()}
          >
            {action.label}
          </Link>
        </div>
      </div>
    </article>
  )
}
