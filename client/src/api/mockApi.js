// Browser-only stand-in for httpApi.js, with the same function names and return shapes. Data stays in the browser.

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
    // Storage may be blocked; the request still counts as sent.
  }
}
