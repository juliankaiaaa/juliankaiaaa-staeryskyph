import AboutImage from './AboutImage.jsx'

/* Pink text block beside the scalloped image. Used on Home and the About page */
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
