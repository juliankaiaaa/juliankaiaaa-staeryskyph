import { createClient } from '@supabase/supabase-js'

// The anon key is public by design. Row Level Security in supabase/schema.sql
// is what limits what it can do, so it is safe to ship in the browser.
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, anonKey)
