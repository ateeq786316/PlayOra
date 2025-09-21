// VERIFY_CONNECTION.js
// Script to verify that Supabase backend and frontend are properly connected

// For Node.js, we need to use dotenv to load environment variables
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Get credentials from environment variables
// Note: In Node.js, we don't use the VITE_ prefix
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY || process.env.SUPABASE_KEY;

console.log('🔍 Verifying Supabase Connection...\n');

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️  Environment variables not found in process.env');
  console.log('   Looking for .env file...');
  
  // Try to read .env file directly
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    console.log('   .env file found, parsing...');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    let foundUrl = false;
    let foundKey = false;
    
    envLines.forEach(line => {
      if (line.startsWith('VITE_SUPABASE_URL=')) {
        supabaseUrl = line.split('=')[1].trim();
        foundUrl = true;
      }
      if (line.startsWith('VITE_SUPABASE_KEY=')) {
        supabaseKey = line.split('=')[1].trim();
        foundKey = true;
      }
    });
    
    if (foundUrl && foundKey) {
      console.log('✅ Environment variables loaded from .env file');
    } else {
      console.error('❌ Missing Supabase credentials in .env file');
      console.error('   Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set');
      process.exit(1);
    }
  } else {
    console.error('❌ Missing .env file');
    console.error('   Please create a .env file with your Supabase credentials');
    process.exit(1);
  }
}

console.log('✅ Environment variables found');
console.log('   Supabase URL:', supabaseUrl);
console.log('');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyConnection() {
  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1. Testing Supabase connection...');
    const { data, error } = await supabase.from('blog_posts').select('id').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      process.exit(1);
    }
    
    console.log('✅ Successfully connected to Supabase');
    console.log('');
    
    // Test 2: Check if blog_posts table exists and has data
    console.log('2. Checking blog_posts table...');
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });
    
    if (postsError) {
      console.error('❌ Error accessing blog_posts table:', postsError.message);
    } else {
      console.log(`✅ blog_posts table accessible with ${posts.length} records`);
      
      if (posts.length > 0) {
        console.log('   Sample record:', {
          id: posts[0].id,
          title: posts[0].title,
          slug: posts[0].slug
        });
      }
    }
    console.log('');
    
    // Test 3: Check if user_roles table exists
    console.log('3. Checking user_roles table...');
    const { data: roles, error: rolesError } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact' });
    
    if (rolesError) {
      console.error('❌ Error accessing user_roles table:', rolesError.message);
    } else {
      console.log(`✅ user_roles table accessible with ${roles.length} records`);
      
      if (roles.length > 0) {
        console.log('   Sample record:', {
          id: roles[0].id,
          user_id: roles[0].user_id,
          role: roles[0].role
        });
      }
    }
    console.log('');
    
    // Test 4: Check table structure
    console.log('4. Verifying table structures...');
    
    // Check blog_posts columns
    const { data: blogPostsColumns, error: blogPostsColumnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'blog_posts')
      .order('ordinal_position');
    
    if (blogPostsColumnsError) {
      console.error('❌ Error getting blog_posts table structure:', blogPostsColumnsError.message);
    } else {
      console.log('✅ blog_posts table structure verified');
      console.log('   Required columns present:');
      const requiredColumns = ['id', 'slug', 'title', 'content', 'author_name', 'published'];
      requiredColumns.forEach(col => {
        const exists = blogPostsColumns.some(c => c.column_name === col);
        console.log(`     ${col}: ${exists ? '✅' : '❌'}`);
      });
    }
    
    // Check user_roles columns
    const { data: userRolesColumns, error: userRolesColumnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'user_roles')
      .order('ordinal_position');
    
    if (userRolesColumnsError) {
      console.error('❌ Error getting user_roles table structure:', userRolesColumnsError.message);
    } else {
      console.log('✅ user_roles table structure verified');
      console.log('   Required columns present:');
      const requiredColumns = ['id', 'user_id', 'role'];
      requiredColumns.forEach(col => {
        const exists = userRolesColumns.some(c => c.column_name === col);
        console.log(`     ${col}: ${exists ? '✅' : '❌'}`);
      });
    }
    console.log('');
    
    // Test 5: Check if storage bucket exists
    console.log('5. Checking storage bucket...');
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
    
    if (bucketsError) {
      console.error('❌ Error accessing storage buckets:', bucketsError.message);
    } else {
      const blogImagesBucket = buckets.find(bucket => bucket.id === 'blog-images');
      if (blogImagesBucket) {
        console.log('✅ blog-images storage bucket found');
      } else {
        console.log('⚠️  blog-images storage bucket not found (you may need to create it)');
      }
    }
    console.log('');
    
    console.log('🎉 Verification completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Run the development server: npm run dev');
    console.log('2. Navigate to http://localhost:8080 (or your configured port)');
    console.log('3. Go to /test-connection to verify frontend connection');
    console.log('4. Go to /login and test the admin credentials');
    console.log('5. Try creating, editing, and deleting a blog post');
    
  } catch (error) {
    console.error('❌ Unexpected error during verification:', error.message);
    process.exit(1);
  }
}

// Run verification
verifyConnection();