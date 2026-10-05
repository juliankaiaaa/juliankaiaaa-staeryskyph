import { useMemo, useState } from 'react'
import { createInquiry } from '../api'
import { SERVICE_FORMS, validateInquiry } from '../data/inquiryForms.js'

const EMPTY_VALUES = { name: '', email: '', message: '' }

// One form for every service. The fields change with the service chosen.
export default function InquiryForm({ initialService = '' }) {
  const [service, setService] = useState(SERVICE_FORMS[initialService] ? initialService : '')
  const [values, setValues] = useState(EMPTY_VALUES)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
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

    try {
      await createInquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        service: form ? form.label : 'General inquiry',
        details,
      })
      setStatus('sent')
    } catch (error) {
      setServerError(error.message)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="inquiry-stamp" role="status">
        <span className="inquiry-stamp-mark" aria-hidden="true">✓</span>
        <h2>Request received!</h2>
        <p>Thank you. We will check the details and get back to you by email.</p>
        <button type="button" className="btn" onClick={reset}>
          Send another request
        </button>
      </div>
    )
  }

  const fieldError = (name) =>
    touched[name] && errors[name] ? <p className="field-error">{errors[name]}</p> : null

  const fieldClass = (name) =>
    touched[name] && errors[name] ? 'field field--invalid' : 'field'

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
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

      {form && <p className="inquiry-intro">{form.intro}</p>}

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

      <button type="submit" className="btn btn--wide" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request →'}
      </button>
    </form>
  )
}
