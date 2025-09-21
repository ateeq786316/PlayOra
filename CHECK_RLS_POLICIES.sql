-- CHECK_RLS_POLICIES.sql
-- Script to check the current Row Level Security policies on blog_posts table

-- Check if RLS is enabled on blog_posts
SELECT 
  tablename, 
  relname, 
  relrowsecurity AS rls_enabled,
  relforcerowsecurity AS force_rls
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
LEFT JOIN pg_tables t ON t.tablename = c.relname
WHERE c.relname = 'blog_posts' AND n.nspname = 'public';

-- Check all policies on blog_posts
SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command, -- r = SELECT, a = INSERT, w = UPDATE, d = DELETE
  polroles AS roles,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'blog_posts'::regclass;

-- Check if authenticated users have proper permissions
SELECT 
  grantee, 
  privilege_type, 
  is_grantable
FROM information_schema.role_table_grants
WHERE table_name = 'blog_posts' 
AND grantee IN ('authenticated', 'anon', 'public');

-- Check current user roles in the database
SELECT 
  r.rolname,
  r.rolsuper,
  r.rolinherit,
  r.rolcreaterole,
  r.rolcreatedb,
  r.rolcanlogin,
  r.rolreplication
FROM pg_roles r
WHERE r.rolname IN ('authenticated', 'anon', 'public', 'postgres');