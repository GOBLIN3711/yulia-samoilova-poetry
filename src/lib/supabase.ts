import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return url.startsWith('http://') || url.startsWith('https://')
  } catch {
    return false
  }
}

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl))

// Only create clients if URL is valid, otherwise use dummy placeholder
const DUMMY_URL = 'https://placeholder.supabase.co'
const DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder'

export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient(DUMMY_URL, DUMMY_KEY)

export const supabaseAdmin: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : createClient(DUMMY_URL, DUMMY_KEY)
