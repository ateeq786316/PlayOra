-- DIAGNOSE_USER_ROLE_ERROR.sql
-- Script to diagnose the 500 error when accessing user_roles table

-- 1. Check if the specific user exists in auth.users
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users 
WHERE id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';

-- 2. Check if the user has a role in user_roles table
SELECT 
  id,
  user_id,
  role,
  created_at
FROM user_roles 
WHERE user_id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';

-- 3. Check all users and their roles (if the specific user doesn't exist)
SELECT 
  u.id,
  u.email,
  ur.role,
  u.created_at
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
ORDER BY u.created_at DESC;

-- 4. Check current RLS policies on user_roles table
SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'user_roles'::regclass;

-- 5. Check if RLS is enabled on user_roles table
SELECT 
  relname AS table_name,
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS force_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname = 'user_roles' AND n.nspname = 'public';

-- 6. Check permissions on user_roles table
SELECT 
  table_name,
  privilege_type,
  grantee
FROM information_schema.role_table_grants
WHERE table_name = 'user_roles'
ORDER BY privilege_type;