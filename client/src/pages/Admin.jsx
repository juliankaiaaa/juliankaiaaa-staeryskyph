import { useEffect, useState } from 'react'
import AdminLogin from '../components/AdminLogin.jsx'
import AdminInquiries from '../components/AdminInquiries.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import { checkIsAdmin, getSession, onAuthChange, signOut } from '../api/adminApi.js'
import { isSupabaseConfigured } from '../api/supabaseClient.js'

/* Admin page at /#/admin. Only signed-in admins see the content. */
export default function Admin() {
  const [session, setSession] = useState(undefined)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    getSession().then(setSession)
    return onAuthChange(setSession)
  }, [])

  useEffect(() => {
    if (!session) {
      setAdmin(null)
      return
    }
    checkIsAdmin().then(setAdmin)
  }, [session])

  const logout = async () => {
    await signOut()
    setSession(null)
  }

  let content
  if (!isSupabaseConfigured) {
    content = <p>The admin page needs Supabase. Set the keys in client/.env first.</p>
  } else if (session === undefined || (session && admin === null)) {
    content = <p>Checking your access…</p>
  } else if (!session) {
    content = <AdminLogin />
  } else if (!admin) {
    content = (
      <>
        <p>This account is signed in, but it is not an admin.</p>
        <button type="button" className="btn" onClick={logout}>Sign out</button>
      </>
    )
  } else {
    content = (
      <>
        <div className="admin-toolbar">
          <h2>Inquiries</h2>
          <button type="button" className="btn" onClick={logout}>Sign out</button>
        </div>
        <AdminInquiries />
      </>
    )
  }

  return (
    <div className="page">
      <main className="content">
        <section className="band band--brown admin-band">
          <div className="band-inner">
            <span className="section-label">ADMIN</span>
            {content}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
