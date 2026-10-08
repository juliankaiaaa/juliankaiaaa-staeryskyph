import { Link } from 'react-router-dom'

/* Navigation links in page order */
export const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'contact', label: 'Connect', to: '/request' },
]

/* aria-current draws the active underline */
export default function Navbar({ active }) {
  return (
    <nav aria-label="Main">
      {NAV_LINKS.map(({ id, label, to }) => (
        <Link
          key={id}
          to={to}
          aria-current={active === id ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
