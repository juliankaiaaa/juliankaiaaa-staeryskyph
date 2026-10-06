import { useEffect, useMemo, useState } from 'react'
import { listInquiries, updateInquiry } from '../api/adminApi.js'

const STATUSES = ['New', 'Replied', 'Closed']
const FILTERS = ['All', ...STATUSES]

/* The form stores its reference code in details. Older rows fall back to the id */
export const referenceOf = (inquiry) =>
  inquiry.details?.reference || `SSPH-${String(inquiry.id).slice(0, 4).toUpperCase()}`

const humanize = (key) => {
  const words = key.replace(/([A-Z])/g, ' $1').toLowerCase().trim()
  return words.charAt(0).toUpperCase() + words.slice(1)
}

const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`

function exportCsv(rows) {
  const header = ['Reference', 'Name', 'Email', 'Service', 'Received', 'Status', 'Message', 'Notes']
  const lines = rows.map((row) =>
    [referenceOf(row), row.name, row.email, row.service, row.created_at, row.status, row.message, row.notes]
      .map(csvCell)
      .join(',')
  )
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'inquiries.csv'
  link.click()
  URL.revokeObjectURL(url)
}

function InquiryDetail({ inquiry, onSaved }) {
  const [status, setStatus] = useState(inquiry.status)
  const [notes, setNotes] = useState(inquiry.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const dirty = status !== inquiry.status || notes !== (inquiry.notes ?? '')
  const answers = Object.entries(inquiry.details ?? {}).filter(([key, value]) => value && key !== 'reference')

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

  return (
    <div className="admin-detail">
      <div className="admin-answers">
        <h4>Their answers</h4>
        {answers.map(([key, value]) => (
          <p key={key}><span>{humanize(key)}:</span> {value}</p>
        ))}
        {inquiry.message && <p><span>Message:</span> {inquiry.message}</p>}
      </div>

      <div className="admin-controls">
        <label className="field">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className="field">
          Notes
          <textarea rows={2} value={notes} maxLength={2000} placeholder="Private notes" onChange={(e) => setNotes(e.target.value)} />
        </label>

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="button" className="btn" onClick={save} disabled={!dirty || saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  )
}

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    listInquiries().then(setInquiries).catch((err) => setError(err.message))
  }, [])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return (inquiries ?? []).filter((item) => {
      if (filter !== 'All' && item.status !== filter) return false
      if (!needle) return true
      return item.name.toLowerCase().includes(needle) || referenceOf(item).toLowerCase().includes(needle)
    })
  }, [inquiries, filter, query])

  const replaceInquiry = (updated) =>
    setInquiries((current) => current.map((item) => (item.id === updated.id ? updated : item)))

  if (error) return <p className="form-error" role="alert">{error}</p>
  if (!inquiries) return <p>Loading inquiries…</p>

  return (
    <>
      <div className="admin-bar">
        <h2>Inquiries</h2>
        <button type="button" className="admin-export" onClick={() => exportCsv(visible)} disabled={visible.length === 0}>
          Export CSV
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-chips" role="group" aria-label="Filter by status">
          {FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className={filter === name ? 'admin-chip is-active' : 'admin-chip'}
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <input
          className="admin-search"
          type="search"
          value={query}
          placeholder="Search name or reference code"
          aria-label="Search name or reference code"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {visible.length === 0 ? (
        <p>{inquiries.length === 0 ? 'No inquiries yet.' : 'No inquiries match.'}</p>
      ) : (
        <div className="admin-table" role="table">
          <div className="admin-row admin-row--head" role="row">
            <span>Reference</span><span>Name</span><span>Service</span><span>Received</span><span>Status</span>
          </div>

          {visible.map((inquiry) => {
            const open = openId === inquiry.id
            return (
              <div key={inquiry.id} className={open ? 'admin-item is-open' : 'admin-item'}>
                <button type="button" className="admin-row" aria-expanded={open} onClick={() => setOpenId(open ? null : inquiry.id)}>
                  <strong>{referenceOf(inquiry)}</strong>
                  <span>{inquiry.name}<small>{inquiry.email}</small></span>
                  <span>{inquiry.service || 'General'}</span>
                  <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                  <span><i className={`admin-pill admin-pill--${inquiry.status.toLowerCase()}`}>{inquiry.status}</i></span>
                </button>
                {open && <InquiryDetail inquiry={inquiry} onSaved={replaceInquiry} />}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
