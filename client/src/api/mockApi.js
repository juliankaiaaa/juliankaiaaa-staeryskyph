// The browser-only stand-in. Same function names and return shapes as
// httpApi.js, so the pages cannot tell the difference. Data stays in the
// visitor's own browser.

import seed from './seed.json'

const INQUIRIES_KEY = 'staery:inquiries'

// A real network is not instant, so keep a small delay.
const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export async function listServices() {
  await delay(250)
  return seed.slice()
}

export async function createInquiry(input) {
  await delay()

  const saved = {
    ...input,
    id: crypto.randomUUID(),
    status: 'New',
    created_at: new Date().toISOString(),
  }

  try {
    const stored = JSON.parse(localStorage.getItem(INQUIRIES_KEY) || '[]')
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify([...stored, saved]))
  } catch {
    // Storage can be blocked. The demo still counts the request as sent.
  }
}
