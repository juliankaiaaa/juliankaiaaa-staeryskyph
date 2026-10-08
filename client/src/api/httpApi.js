// Live Supabase client. Access is limited by Row Level Security (supabase/schema.sql).

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

function requireClient() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in client/.env.')
  }
  return supabase
}

export async function listServices() {
  const { data, error } = await requireClient()
    .from('services')
    .select('id, number, title, summary, description')
    .order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

// No .select() after insert: anonymous visitors cannot read inquiries back.
export async function createInquiry(input) {
  const { error } = await requireClient()
    .from('inquiries')
    .insert({
      name: input.name,
      email: input.email,
      message: input.message,
      service: input.service,
      details: input.details,
    })

  if (error) {
    console.error('Inquiry failed:', error)
    throw new Error('We could not send your request. Please try again.')
  }
}
