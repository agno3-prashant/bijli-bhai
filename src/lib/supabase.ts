import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const looksLikePlaceholder = (value: string | undefined) => {
  if (!value) return true
  const normalized = value.toLowerCase()
  return (
    normalized.includes('your-project-id') ||
    normalized.includes('your_supabase') ||
    normalized.includes('your-anon-key') ||
    normalized.includes('your_anon_key') ||
    normalized.includes('placeholder')
  )
}

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey) &&
  !looksLikePlaceholder(supabaseUrl) &&
  !looksLikePlaceholder(supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase credentials missing or still set to placeholders. Using local mock data until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.'
  )
}

// Always create a client so imports never throw. Placeholder values are only used when env is unset.
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl! : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey! : 'public-anon-key'
)