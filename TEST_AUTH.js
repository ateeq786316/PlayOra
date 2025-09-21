// TEST_AUTH.js
// Simple script to test authentication

import { createClient } from '@supabase/supabase-js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

async function testAuth() {
  console.log('Testing authentication...');
  
  // Test environment variables
  console.log('Admin email from env:', process.env.VITE_ADMIN_EMAIL);
  console.log('Admin password from env:', process.env.VITE_ADMIN_PASSWORD ? 'SET' : 'NOT SET');
  
  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('blog_posts').select('count').single();
    if (error) {
      console.log('Supabase connection error:', error.message);
    } else {
      console.log('Supabase connection successful');
    }
  } catch (error) {
    console.log('Supabase connection failed:', error.message);
  }
  
  console.log('Test completed');
}

testAuth();