require('dotenv').config() // Load from .env in current directory
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.VITE_SUPABASE_URL
// Prefer Service Role Key for Backend to bypass RLS, fall back to Anon Key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('✅ [Supabase] Using SERVICE_ROLE_KEY')
} else {
  console.log('⚠️ [Supabase] Using ANON_KEY (RLS enforced)')
}

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/VITE_SUPABASE_ANON_KEY in environment variables.")
}

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase
