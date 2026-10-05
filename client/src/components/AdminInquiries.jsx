import { useEffect, useState } from 'react'
import { listInquiries, updateInquiry } from '../api/adminApi.js'

const STATUSES = ['New', 'Replied', 'Closed']

function InquiryCard({ inquiry, onSaved }) {
  const [status, setStatus] = useState(inquiry.status)
  const [notes, setNotes] = useState(inquiry.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const dirty = status !== inquiry.status || notes !== (inquiry.notes ?? '')

  const save = async () => {
    setError('')
    setSaving(true)
    try {
      await updateInquiry(inquiry.id, { status, notes })
      onSaved({ ...inquiry, status, notes })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const details = Object.entries(inquiry.details ?? {}).filter(([, value]) => value)

  return (
    <article className="admin-card">
      <header className="admin-card-head">
        <div>
          <h3>{inquiry.name}</h3>
          <p className="admin-meta">
            <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
            {' · '}
            {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
        <span className="tag">{inquiry.service || 'General'}</span>
      </header>

      <p className="admin-message">{inquiry.message}</p>

      {details.length > 0 && (
        <dl className="admin-details">
          {details.map(([key, value]) => (
            <div key={key}>
              <dt>{key}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="admin-controls">
        <label className="field">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="field">
          Notes
          <textarea rows={3} value={notes} maxLength={2000} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="button" className="btn" onClick={save} disabled={!dirty || saving}>
        {saving ? 'Saving…' : 'Save changes'}
      </button>
    </article>
  )
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    listInquiries()
      .then(setInquiries)
      .catch((err) => setError(err.message))
  }, [])

  const replaceInquiry = (updated) => {
    setInquiries((current) => current.map((item) => (item.id === updated.id ? updated : item)))
  }

  if (error) return <p className="form-error" role="alert">{error}</p>
  if (!inquiries) return <p>Loading inquiries…</p>
  if (inquiries.length === 0) return <p>No inquiries yet.</p>

  return (
    <div className="admin-list">
      {inquiries.map((inquiry) => (
        <InquiryCard key={inquiry.id} inquiry={inquiry} onSaved={replaceInquiry} />
      ))}
    </div>
  )
}
