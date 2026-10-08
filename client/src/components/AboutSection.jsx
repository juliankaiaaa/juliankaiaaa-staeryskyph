import AboutImage from './AboutImage.jsx'

/* Text block beside the scalloped image, used on Home and About */
export default function AboutSection({ id, label, title, action, children }) {
  return (
    <section id={id} className="about">
      <div className="about-text">
        {label && <span className="section-label">{label}</span>}

        <h2>{title}</h2>

        {children}

        {action}
      </div>

      <AboutImage />
    </section>
  )
}
