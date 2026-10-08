// Admin sign-in and inquiry management. Only users in the admins table pass Row Level Security.

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

function client() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in client/.env.')
  }
  return supabase
}

export async function getSession() {
  const { data } = await client().auth.getSession()
  return data.session
}

export function onAuthChange(callback) {
  const { data } = client().auth.onAuthStateChange((_event, session) => callback(session))
  return () => data.subscription.unsubscribe()
}

export async function signIn(email, password) {
  const { error } = await client().auth.signInWithPassword({ email, password })
  if (error) throw new Error('That email or password is not right.')
}

export async function signOut() {
  await client().auth.signOut()
}

export async function checkIsAdmin() {
  const { data: userData } = await client().auth.getUser()
  const user = userData?.user
  if (!user) return false

  const { data, error } = await client()
    .from('admins')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle()

  return !error && Boolean(data)
}

export async function listInquiries() {
  const { data, error } = await client()
    .from('inquiries')
    .select('id, name, email, message, service, details, status, notes, created_at')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data
}

export async function updateInquiry(id, { status, notes }) {
  const { error } = await client()
    .from('inquiries')
    .update({ status, notes })
    .eq('id', id)

  if (error) throw new Error(error.message)
}
