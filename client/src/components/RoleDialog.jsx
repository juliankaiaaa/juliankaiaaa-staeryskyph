import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SEEN_KEY = 'staery:role-chosen'

/* Asks visitors once per tab whether they are a customer or an admin */
export default function RoleDialog() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const customerButton = useRef(null)

  const open = pathname !== '/admin' && !sessionStorage.getItem(SEEN_KEY)
  const close = () => sessionStorage.setItem(SEEN_KEY, 'yes')

  useEffect(() => {
    if (!open) return

    customerButton.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const chooseCustomer = () => {
    close()
  }

  const chooseAdmin = () => {
    close()
    navigate('/admin')
  }

  return (
    <div className="role-overlay" onClick={chooseCustomer}>
      <div
        className="role-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="role-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="role-kicker">WELCOME TO STAERY SKY PH</span>
        <h2 id="role-title">Are you a customer or an admin?</h2>
        <p>Customers can browse services and send a request. Admins sign in to manage inquiries.</p>

        <div className="role-choices">
          <button ref={customerButton} type="button" className="role-choice role-choice--customer" onClick={chooseCustomer}>
            <span className="role-choice-title">I'm a customer</span>
            <span className="role-choice-text">Browse the shop</span>
          </button>

          <button type="button" className="role-choice role-choice--admin" onClick={chooseAdmin}>
            <span className="role-choice-title">I'm an admin</span>
            <span className="role-choice-text">Sign in to manage</span>
          </button>
        </div>
      </div>
    </div>
  )
}
