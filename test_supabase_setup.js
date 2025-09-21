// Test script to verify Supabase setup
// Run this script to check if tables were created correctly

import { createClient } from '@supabase/supabase-js';

// Get credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseSetup() {
  console.log('Testing Supabase setup...\n');
  
  // Test 1: Check if blog_posts table exists
  console.log('1. Checking blog_posts table...');
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error('❌ Error accessing blog_posts table:', error.message);
    } else {
      console.log('✅ blog_posts table exists and is accessible');
    }
  } catch (err) {
    console.error('❌ Error accessing blog_posts table:', err.message);
  }
  
  // Test 2: Check if user_roles table exists
  console.log('\n2. Checking user_roles table...');
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('id')
      .limit(1);
      
    if (error) {
      console.error('❌ Error accessing user_roles table:', error.message);
    } else {
      console.log('✅ user_roles table exists and is accessible');
    }
  } catch (err) {
    console.error('❌ Error accessing user_roles table:', err.message);
  }
  
  // Test 3: Check table structures
  console.log('\n3. Checking table structures...');
  try {
    // Get table info from Supabase
    const { data: blogPostsColumns, error: blogPostsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'blog_posts');
      
    if (blogPostsError) {
      console.error('❌ Error getting blog_posts table structure:', blogPostsError.message);
    } else {
      console.log('✅ blog_posts table structure:');
      blogPostsColumns.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type})`);
      });
    }
  } catch (err) {
    console.error('❌ Error getting blog_posts table structure:', err.message);
  }
  
  try {
    const { data: userRolesColumns, error: userRolesError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'user_roles');
      
    if (userRolesError) {
      console.error('❌ Error getting user_roles table structure:', userRolesError.message);
    } else {
      console.log('✅ user_roles table structure:');
      userRolesColumns.forEach(col => {
        console.log(`   - ${col.column_name} (${col.data_type})`);
      });
    }
  } catch (err) {
    console.error('❌ Error getting user_roles table structure:', err.message);
  }
  
  console.log('\n✅ Supabase setup test completed!');
}

// Run the test
testSupabaseSetup();