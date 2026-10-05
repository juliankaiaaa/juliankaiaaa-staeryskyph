// The live client. Talks straight to Supabase, with access limited by the
// Row Level Security rules in supabase/schema.sql.

import { supabase } from './supabaseClient.js'

function fail(error) {
  throw new Error(error?.message || 'Something went wrong. Please try again.')
}

export async function listServices() {
  const { data, error } = await supabase
    .from('services')
    .select('id, number, title, summary, description')
    .order('sort_order', { ascending: true })

  if (error) fail(error)
  return data
}

export async function createRequest(input) {
  const { data, error } = await supabase
    .from('requests')
    .insert({
      name: input.name,
      contact: input.contact,
      service: input.service,
      link: input.link || '',
      details: input.details,
    })
    .select()
    .single()

  if (error) fail(error)
  return data
}
