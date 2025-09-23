import { supabase } from '../lib/supabaseClient'

// Types
export interface AuthUser {
  id: string
  email: string
  role: 'admin' | 'editor' | 'author' | null
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  console.log('Signing in with:', email, password);
  
  // Check for hardcoded admin credentials in development
  const hardcodedEmail = import.meta.env.VITE_ADMIN_EMAIL || 'qasimtrustw@gmail.com';
  const hardcodedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Playora01';
  
  if (import.meta.env.DEV && email === hardcodedEmail && password === hardcodedPassword) {
    console.log('Using hardcoded credentials for development');
    // Simulate a successful login with admin role
    const mockUser = {
      id: 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', // Use the actual user ID
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
    console.error('Supabase sign in error:', error);
    throw new Error(error.message)
  }

  console.log('Supabase sign in successful:', data);
  
  // Check if user has admin role
  const userRole = await getUserRole(data.user?.id || '')
  console.log('User role:', userRole);
  
  return {
    user: data.user,
    role: userRole
  }
}

// Sign out
export async function signOut() {
  console.log('Signing out');
  // Remove dev admin user from localStorage
  localStorage.removeItem('dev-admin-user')
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Sign out error:', error);
    throw new Error(error.message)
  }
  
  return true
}

// Get current user
export async function getCurrentUser() {
  console.log('Getting current user');
  // Check for dev admin user first
  if (import.meta.env.DEV) {
    const devUser = localStorage.getItem('dev-admin-user')
    if (devUser) {
      console.log('Using dev user from localStorage');
      return JSON.parse(devUser)
    }
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  console.log('Supabase user:', user);
  
  if (!user) {
    console.log('No user found');
    return null
  }
  
  // Check if user has admin role
  const role = await getUserRole(user.id)
  console.log('User role from database:', role);
  
  return {
    id: user.id,
    email: user.email,
    role
  } as AuthUser
}

// Get user role from user_roles table
export async function getUserRole(userId: string) {
  console.log('Getting user role for user ID:', userId);
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single()

  if (error || !data) {
    console.error('Error getting user role:', error);
    return null
  }

  console.log('User role data:', data);
  return data.role
}

// Check if user is admin
export async function isAdmin() {
  const user = await getCurrentUser()
  const isAdminUser = user?.role === 'admin'
  console.log('Is admin check result:', isAdminUser);
  return isAdminUser
}

// Sign up (for initial admin user creation)
export async function signUp(email: string, password: string) {
  console.log('Signing up with:', email, password);
  // Check for hardcoded admin credentials in development
  const hardcodedEmail = import.meta.env.VITE_ADMIN_EMAIL || 'qasimtrustw@gmail.com';
  const hardcodedPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Playora01';
  
  if (import.meta.env.DEV && email === hardcodedEmail && password === hardcodedPassword) {
    console.log('Using hardcoded credentials for signup');
    // Simulate a successful signup with admin role
    const mockUser = {
      id: 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', // Use the actual user ID
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
    console.error('Supabase signup error:', error);
    throw new Error(error.message)
  }

  console.log('Supabase signup successful:', data);
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