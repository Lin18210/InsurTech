import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Enable session persistence
    autoRefreshToken: true, // Automatically refresh the token before it expires
    detectSessionInUrl: true, // Detect OAuth sessions from URL (for Google login)
    storage: window.localStorage, // Use localStorage for session storage
    storageKey: 'insurtech-auth-token', // Custom storage key for the session
  }
})
