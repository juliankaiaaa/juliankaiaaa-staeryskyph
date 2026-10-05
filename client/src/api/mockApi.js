// The browser-only stand-in. Same function names and return shapes as
// httpApi.js, so the pages cannot tell the difference. Data stays in the
// visitor's own browser.

import seed from './seed.json'

const REQUESTS_KEY = 'staery:requests'

// A real network is not instant, so keep a small delay.
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms))

export async function listServices() {
  await delay()
  return seed.slice()
}

export async function createRequest(input) {
  await delay()
  const created = {
    ...input,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  }

  try {
    const stored = JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]')
    localStorage.setItem(REQUESTS_KEY, JSON.stringify([...stored, created]))
  } catch {
    // Storage can be blocked. The request still counts as sent in the demo.
  }

  return created
}
