import { Link } from 'react-router-dom'
import Decor from './Decor.jsx'
import brownStar from '../assets/decorations/brown_star.png'

/* Replace the placeholder links with your real pages */
const SOCIAL_LINKS = [
  { label: 'X / Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
]

/* Footer shared by every page */
export default function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <div>
        <h3>Hours</h3>
        <p>
          Monday-Friday
          <br />
          10:00 AM-10:00 PM
        </p>
        <p>
          Saturday-Sunday
          <br />
          11:00 AM-9:00 PM
        </p>
      </div>

      <div>
        <h3>Location</h3>
        <p>Pampanga, Philippines</p>
      </div>

      <div>
        <h3>Links</h3>
        <p>
        </p>
        <p>
        </p>
        <p>
        </p>
        {SOCIAL_LINKS.map(({ label, href }) => (
          <p key={label}>
            <a href={href}>{label}</a>
          </p>
        ))}
      </div>

      <Decor src={brownStar} className="footer-mark" />

      <div className="copyright">© 2026 Staery Sky PH</div>
    </footer>
  )
}
