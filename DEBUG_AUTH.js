// DEBUG_AUTH.js
// Script to debug authentication issues

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

async function debugAuth() {
  try {
    console.log('=== Authentication Debug ===');
    
    // Check if we're in development mode
    console.log('Development mode:', process.env.NODE_ENV === 'development');
    
    // Check environment variables
    console.log('Admin email:', process.env.VITE_ADMIN_EMAIL);
    console.log('Admin password:', process.env.VITE_ADMIN_PASSWORD ? 'SET' : 'NOT SET');
    
    // Check localStorage for dev admin user
    if (typeof localStorage !== 'undefined') {
      const devUser = localStorage.getItem('dev-admin-user');
      console.log('Dev admin user in localStorage:', devUser);
    } else {
      console.log('localStorage not available (Node.js environment)');
    }
    
    // Get current user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser();
    console.log('Current Supabase user:', user);
    if (error) {
      console.log('Supabase auth error:', error.message);
    }
    
    // If user exists, check their role
    if (user) {
      console.log('Checking role for user:', user.id);
      
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
        
      console.log('Role data:', roleData);
      if (roleError) {
        console.log('Role query error:', roleError.message);
        console.log('Error details:', roleError);
      }
    } else {
      console.log('No authenticated user found');
    }
    
    console.log('=== End Debug ===');
  } catch (error) {
    console.error('Debug script error:', error);
  }
}

// Run the debug function
debugAuth();