import { Link } from 'react-router-dom'

/* Navigation targets, in page order. The id is the active key for each page */
export const NAV_LINKS = [
  { id: 'home', label: 'Home', to: '/' },
  { id: 'about', label: 'About', to: '/about' },
  { id: 'services', label: 'Services', to: '/services' },
  { id: 'contact', label: 'Connect', to: '/request' },
]

/* The active link gets aria-current, which draws the underline */
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
