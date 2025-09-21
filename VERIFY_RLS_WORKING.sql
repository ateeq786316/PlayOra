-- VERIFY_RLS_WORKING.sql
-- Script to verify that RLS policies are working correctly

-- 1. Check if RLS is enabled on user_roles table
SELECT 
  relname AS table_name,
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS force_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname = 'user_roles' AND n.nspname = 'public';

-- 2. Check current RLS policies on user_roles table
SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command, -- r = SELECT, a = INSERT, w = UPDATE, d = DELETE
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'user_roles'::regclass;

-- 3. Check permissions on user_roles table
SELECT 
  table_name,
  privilege_type,
  grantee
FROM information_schema.role_table_grants
WHERE table_name = 'user_roles'
ORDER BY privilege_type;

-- 4. Test a direct query as the specific user
-- This simulates what happens when the app tries to get the user's role
-- Replace 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95' with your actual user ID
SET LOCAL "request.jwt.claim.sub" = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';
SELECT 
  id,
  user_id,
  role,
  created_at
FROM user_roles 
WHERE user_id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';