import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createInquiry } from '../api'
import { SERVICE_FORMS, validateInquiry } from '../data/inquiryForms.js'

const EMPTY_VALUES = { name: '', email: '', message: '' }

// One form for every service. The fields change with the service chosen.
const makeRefCode = () =>
  'SSPH-' + Math.random().toString(36).slice(2, 6).toUpperCase()

export default function InquiryForm({ initialService = '' }) {
  const [service, setService] = useState(SERVICE_FORMS[initialService] ? initialService : '')
  const [values, setValues] = useState(EMPTY_VALUES)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [refCode, setRefCode] = useState('')
  const [serverError, setServerError] = useState('')

  const form = SERVICE_FORMS[service]
  const fields = form?.fields ?? []

  const requiredNames = useMemo(
    () => ['name', 'email', 'message', ...fields.filter((f) => f.required).map((f) => f.name)],
    [fields]
  )
  const filledCount = requiredNames.filter((name) => String(values[name] ?? '').trim()).length
  const progress = Math.round((filledCount / requiredNames.length) * 100)

  const setValue = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }))
    if (touched[name]) {
      setErrors(validateInquiry(service, { ...values, [name]: value }))
    }
  }

  const markTouched = (name) => {
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors(validateInquiry(service, values))
  }

  const chooseService = (next) => {
    setService(next)
    setErrors({})
    setTouched({})
  }

  const reset = () => {
    setValues(EMPTY_VALUES)
    setTouched({})
    setErrors({})
    setServerError('')
    setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validateInquiry(service, values)
    const allTouched = Object.fromEntries([...requiredNames, ...Object.keys(values)].map((n) => [n, true]))
    setTouched(allTouched)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    const details = Object.fromEntries(
      fields.map((field) => [field.name, String(values[field.name] ?? '').trim()])
    )

    setStatus('sending')
    setServerError('')
    const reference = makeRefCode()

    try {
      await createInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        service: form ? form.label : 'General inquiry',
        details: { ...details, reference },
      })
      setRefCode(reference)
      setStatus('sent')
    } catch (error) {
      setServerError(error.message)
      setStatus('error')
    }
  }

  const fieldError = (name) =>
    touched[name] && errors[name] ? <p className="field-error">{errors[name]}</p> : null

  const fieldClass = (name) =>
    touched[name] && errors[name] ? 'field field--invalid' : 'field'

  const sent = status === 'sent'

  return (
    <div className="request-stage">
      <div className="request-card">
        <span className="request-tape" aria-hidden="true"></span>
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
      <header className="inquiry-head">
        <h2>{form ? form.label : 'General question'}</h2>
        <p>{form ? form.intro : 'Tell us what you are looking for and we will reply by email with a quote.'}</p>
      </header>

      <div className="inquiry-progress-row">
        <div className="inquiry-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }}></span>
        </div>
        <span className="inquiry-progress-text">
          {filledCount} of {requiredNames.length} required
        </span>
      </div>

      <label className="field">
        Which service is this for?
        <select value={service} onChange={(e) => chooseService(e.target.value)}>
          <option value="">General question</option>
          {Object.entries(SERVICE_FORMS).map(([slug, item]) => (
            <option key={slug} value={slug}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <div className="form-row">
        <label className={fieldClass('name')}>
          Your name
          <input
            type="text"
            value={values.name}
            placeholder="Your name"
            maxLength={120}
            onChange={(e) => setValue('name', e.target.value)}
            onBlur={() => markTouched('name')}
          />
          {fieldError('name')}
        </label>

        <label className={fieldClass('email')}>
          Email
          <input
            type="email"
            value={values.email}
            placeholder="you@example.com"
            maxLength={254}
            onChange={(e) => setValue('email', e.target.value)}
            onBlur={() => markTouched('email')}
          />
          {fieldError('email')}
        </label>
      </div>

      {fields.map((field) => (
        <label key={field.name} className={fieldClass(field.name)}>
          {field.label}

          {field.type === 'select' ? (
            <select
              value={values[field.name] ?? ''}
              onChange={(e) => setValue(field.name, e.target.value)}
              onBlur={() => markTouched(field.name)}
            >
              <option value="">Choose one</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              rows={4}
              value={values[field.name] ?? ''}
              maxLength={field.max}
              placeholder={field.placeholder}
              onChange={(e) => setValue(field.name, e.target.value)}
              onBlur={() => markTouched(field.name)}
            />
          ) : (
            <input
              type={field.type}
              value={values[field.name] ?? ''}
              min={field.min}
              max={field.max}
              maxLength={field.type === 'number' ? undefined : field.max}
              placeholder={field.placeholder}
              onChange={(e) => setValue(field.name, e.target.value)}
              onBlur={() => markTouched(field.name)}
            />
          )}
          {fieldError(field.name)}
        </label>
      ))}

      <label className={fieldClass('message')}>
        {form ? 'Anything else we should know?' : 'Tell us what you need'}
        <textarea
          rows={5}
          value={values.message}
          maxLength={2000}
          placeholder="Tell us what you are looking for..."
          onChange={(e) => setValue('message', e.target.value)}
          onBlur={() => markTouched('message')}
        />
        <span className="field-count">{values.message.length} / 2000</span>
        {fieldError('message')}
      </label>

      {status === 'error' && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <div className="inquiry-buttons">
        <button type="button" className="inquiry-cancel" onClick={reset}>Cancel</button>
        <button type="submit" className="inquiry-send" disabled={status === 'sending' || sent}>
          {status === 'sending' ? 'Sending…' : 'Send inquiry'}
        </button>
      </div>
    </form>
      </div>

      {sent && (
        <div className="receipt" role="status">
          <span className="receipt-tape" aria-hidden="true"></span>
          <div className="receipt-body">
            <p className="receipt-label">Inquiry received</p>
            <div className="receipt-code">{refCode}</div>
            <p className="receipt-text">
              Keep this reference code. We will reply to your email with a quote.
            </p>
          </div>
          <div className="receipt-band">
            <Link className="receipt-btn" to="/services">Back to services</Link>
            <button type="button" className="receipt-again" onClick={reset}>Send another request</button>
          </div>
        </div>
      )}

      <svg className="stage-star stage-star-pink" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" /></svg>
      <svg className="stage-star stage-star-blue" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" /></svg>
    </div>
  )
}
