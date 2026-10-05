import express from 'express'
import cors from 'cors'
import { pool } from './db/pool.js'
import * as services from './servicesRepo.js'
import * as requests from './requestsRepo.js'

const app = express()

// Basic Auth protects the admin routes only. Visitors never need credentials.
function basicAuth(request, response, next) {
  const auth = request.headers.authorization

  if (!auth || !auth.startsWith('Basic ')) {
    response.setHeader('WWW-Authenticate', 'Basic')
    return response.status(401).json({ error: 'Authentication required' })
  }

  const encoded = auth.split(' ')[1]
  const decoded = Buffer.from(encoded, 'base64').toString()
  const [username, password] = decoded.split(':')

  if (
    username !== process.env.BASIC_AUTH_USER ||
    password !== process.env.BASIC_AUTH_PASSWORD
  ) {
    response.setHeader('WWW-Authenticate', 'Basic')
    return response.status(401).json({ error: 'Invalid credentials' })
  }

  next()
}

// Only the origins listed in CORS_ORIGINS may call this API from a browser.
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '100kb' }))

// Is the process alive?
app.get('/healthz', (request, response) => {
  response.json({ ok: true })
})

// Is the database reachable?
app.get('/readyz', async (request, response) => {
  try {
    await pool.query('SELECT 1')
    response.json({ ok: true, db: 'up' })
  } catch (error) {
    console.error('readyz failed:', error.message)
    response.status(503).json({ ok: false, db: 'down' })
  }
})

// Validation runs on the server too, because the browser form can be bypassed.
function validateRequest(body) {
  const errors = []
  const clean = (key, max) => {
    const value = typeof body[key] === 'string' ? body[key].trim() : ''
    if (value.length > max) errors.push(`${key} must be ${max} characters or fewer`)
    return value
  }

  const name = clean('name', 120)
  const contact = clean('contact', 120)
  const service = clean('service', 120)
  const link = clean('link', 500)
  const details = clean('details', 2000)

  if (!name) errors.push('name is required')
  if (!contact) errors.push('contact is required')
  if (!service) errors.push('service is required')
  if (!details) errors.push('details is required')

  return { errors, value: { name, contact, service, link, details } }
}

// Public routes
app.get('/api/services', async (request, response, next) => {
  try {
    response.json(await services.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.post('/api/requests', async (request, response, next) => {
  const { errors, value } = validateRequest(request.body ?? {})
  if (errors.length > 0) {
    return response.status(400).json({ error: errors.join('; ') })
  }

  try {
    response.status(201).json(await requests.create(pool, value))
  } catch (error) {
    next(error)
  }
})

// Admin routes, behind Basic Auth
app.use('/api/admin', basicAuth)

app.get('/api/admin/requests', async (request, response, next) => {
  try {
    response.json(await requests.getAll(pool))
  } catch (error) {
    next(error)
  }
})

app.put('/api/admin/services/:id', async (request, response, next) => {
  const body = request.body ?? {}
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const summary = typeof body.summary === 'string' ? body.summary.trim() : ''
  const description = typeof body.description === 'string' ? body.description.trim() : ''

  if (!title) return response.status(400).json({ error: 'title is required' })

  try {
    const row = await services.update(pool, request.params.id, { title, summary, description })
    if (!row) return response.status(404).json({ error: 'Not found' })
    response.json(row)
  } catch (error) {
    next(error)
  }
})

app.use((request, response) => {
  response.status(404).json({ error: 'No such route' })
})

// Details go to the logs. Visitors get a plain message.
app.use((error, request, response, next) => {
  console.error(error)
  response.status(500).json({ error: 'Something went wrong on the server' })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
  console.log(`CORS allows: ${allowedOrigins.join(', ')}`)
})
