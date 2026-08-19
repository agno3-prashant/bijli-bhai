import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we're in development and credentials are missing
const isMissingCredentials = !supabaseUrl || !supabaseAnonKey

if (isMissingCredentials) {
  console.warn('⚠️ Supabase credentials missing. Some features will not work until you configure your .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

// Initialize Supabase client (will throw if credentials are missing and we try to use it)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)