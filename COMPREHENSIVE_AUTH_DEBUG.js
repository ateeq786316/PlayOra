// COMPREHENSIVE_AUTH_DEBUG.js
// Comprehensive script to debug authentication issues

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

async function comprehensiveAuthDebug() {
  try {
    console.log('=== Comprehensive Authentication Debug ===');
    
    // 1. Check environment variables
    console.log('\n1. Environment Variables:');
    console.log('  Supabase URL:', process.env.VITE_SUPABASE_URL ? 'SET' : 'NOT SET');
    console.log('  Supabase Key:', process.env.VITE_SUPABASE_KEY ? 'SET' : 'NOT SET');
    console.log('  Admin Email:', process.env.VITE_ADMIN_EMAIL);
    console.log('  Admin Password:', process.env.VITE_ADMIN_PASSWORD ? 'SET' : 'NOT SET');
    console.log('  Development Mode:', process.env.NODE_ENV === 'development');
    
    // 2. Check current Supabase session
    console.log('\n2. Current Supabase Session:');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.log('  Session Error:', sessionError.message);
    } else {
      console.log('  Session exists:', !!session);
      if (session) {
        console.log('  Session expires at:', session.expires_at);
        console.log('  User ID:', session.user?.id);
        console.log('  User Email:', session.user?.email);
      }
    }
    
    // 3. Get current user
    console.log('\n3. Current User:');
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.log('  User Error:', userError.message);
    } else {
      console.log('  User exists:', !!user);
      if (user) {
        console.log('  User ID:', user.id);
        console.log('  User Email:', user.email);
        console.log('  User Confirmed:', user.email_confirmed_at);
        
        // 4. Check user role
        console.log('\n4. User Role:');
        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
            
          if (roleError) {
            console.log('  Role Error:', roleError.message);
            console.log('  Role Error Details:', roleError);
          } else {
            console.log('  Role:', roleData?.role || 'NO ROLE ASSIGNED');
          }
        } catch (roleException) {
          console.log('  Role Exception:', roleException.message);
        }
      }
    }
    
    // 5. Check all users and roles (for debugging)
    console.log('\n5. All Users and Roles:');
    try {
      const { data: allRoles, error: allRolesError } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .order('created_at', { ascending: false });
        
      if (allRolesError) {
        console.log('  All Roles Error:', allRolesError.message);
      } else {
        console.log('  Total role entries:', allRoles.length);
        allRoles.forEach((role, index) => {
          console.log(`  ${index + 1}. User: ${role.user_id}, Role: ${role.role}`);
        });
      }
    } catch (allRolesException) {
      console.log('  All Roles Exception:', allRolesException.message);
    }
    
    // 6. Test direct role query for the specific user
    console.log('\n6. Direct Role Query for Current User:');
    if (user) {
      try {
        console.log('  Querying role for user ID:', user.id);
        const { data: directRoleData, error: directRoleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
          
        if (directRoleError) {
          console.log('  Direct Role Query Error:', directRoleError.message);
          console.log('  Direct Role Query Error Code:', directRoleError.code);
        } else {
          console.log('  Direct Role Query Result:', directRoleData);
        }
      } catch (directRoleException) {
        console.log('  Direct Role Query Exception:', directRoleException.message);
      }
    }
    
    console.log('\n=== End Debug ===');
  } catch (error) {
    console.error('Comprehensive Debug Script Error:', error);
  }
}

// Run the debug function
comprehensiveAuthDebug();