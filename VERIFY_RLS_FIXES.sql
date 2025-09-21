-- VERIFY_RLS_FIXES.sql
-- Script to verify that the RLS fixes are working correctly

-- Check current policies on blog_posts
SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command, -- r = SELECT, a = INSERT, w = UPDATE, d = DELETE
  polroles AS roles,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'blog_posts'::regclass
ORDER BY polname;

-- Check current policies on user_roles
SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command, -- r = SELECT, a = INSERT, w = UPDATE, d = DELETE
  polroles AS roles,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'user_roles'::regclass
ORDER BY polname;

-- Check if the admin user exists
SELECT 
  u.email,
  ur.role,
  u.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';

-- Check permissions on tables
SELECT 
  table_name,
  privilege_type,
  grantee
FROM information_schema.role_table_grants
WHERE table_name IN ('blog_posts', 'user_roles')
AND grantee IN ('authenticated', 'anon', 'public')
ORDER BY table_name, privilege_type;