import { createClient } from '@supabase/supabase-js'

// The anon key is public. Row Level Security (supabase/schema.sql) limits what it can do.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Must not throw when the keys are unset, because demo mode imports this file.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null
