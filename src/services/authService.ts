import { supabase } from '../lib/supabaseClient'

// Types
export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'editor' | 'author' | null
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  // Check for hardcoded admin credentials in development
  const hardcodedEmail = import.meta.env.VITE_ADMIN_EMAIL
  const hardcodedPassword = import.meta.env.VITE_ADMIN_PASSWORD
  
  if (import.meta.env.DEV && email === hardcodedEmail && password === hardcodedPassword) {
    // Simulate a successful login with admin role
    const mockUser = {
      id: 'admin-user-id',
      email: hardcodedEmail,
      role: 'admin' as const
    }
    
    // Store in localStorage for persistence during development
    localStorage.setItem('dev-admin-user', JSON.stringify(mockUser))
    
    return {
      user: mockUser,
      role: 'admin' as const
    }
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  // Check if user has admin role
  const userRole = await getUserRole(data.user?.id || '')
  
  return {
    user: data.user,
    role: userRole
  }
}

// Sign out
export async function signOut() {
  // Remove dev admin user from localStorage
  localStorage.removeItem('dev-admin-user')
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return true
}

// Get current user
export async function getCurrentUser() {
  // Check for dev admin user first
  if (import.meta.env.DEV) {
    const devUser = localStorage.getItem('dev-admin-user')
    if (devUser) {
      return JSON.parse(devUser)
    }
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  // Check if user has admin role
  const role = await getUserRole(user.id)
  
  return {
    id: user.id,
    email: user.email,
    role
  } as AuthUser
}

// Get user role from user_roles table
export async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    return null
  }

  return data.role
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

// Sign up (for initial admin user creation)
export async function signUp(email: string, password: string) {
  // Check for hardcoded admin credentials in development
  const hardcodedEmail = import.meta.env.VITE_ADMIN_EMAIL
  const hardcodedPassword = import.meta.env.VITE_ADMIN_PASSWORD
  
  if (import.meta.env.DEV && email === hardcodedEmail && password === hardcodedPassword) {
    // Simulate a successful signup with admin role
    const mockUser = {
      id: 'admin-user-id',
      email: hardcodedEmail,
      role: 'admin' as const
    }
    
    // Store in localStorage for persistence during development
    localStorage.setItem('dev-admin-user', JSON.stringify(mockUser))
    
    return {
      user: mockUser,
      role: 'admin' as const
    }
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

// Export the service functions as an object for easier import
export const authService = {
  signIn,
  signOut,
  getCurrentUser,
  isAdmin,
  signUp
}