import { createClient } from '@supabase/supabase-js'

// The anon key is public by design. Row Level Security in supabase/schema.sql
// is what limits what it can do, so it is safe to ship in the browser.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Demo mode imports this file too, so it must not throw when the keys are unset.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null
