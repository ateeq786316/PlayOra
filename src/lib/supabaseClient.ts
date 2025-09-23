import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and anon key from environment variables
// These will be set in Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY || ''

// Create Supabase client with proper auth configuration
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  { 
    auth: { 
      persistSession: true, 
      autoRefreshToken: true, 
      detectSessionInUrl: true 
    }
  }
)

// Types for our blog posts
export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string | null
  content: string
  date: string
  author_name: string
  author_avatar: string | null
  tags: string[] | null
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}

// Types for user roles
export interface UserRole {
  id: number
  user_id: string
  role: 'admin' | 'editor' | 'author'
  created_at: string
}