-- VERIFY_USER_ROLE.sql
-- Script to verify that qasimtrustw@gmail.com has the correct admin role

-- Check if the user exists
SELECT id, email, created_at FROM auth.users WHERE email = 'qasimtrustw@gmail.com';

-- Check if the user has admin role
SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  ur.created_at,
  u.email
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'qasimtrustw@gmail.com';

-- Check all policies
SELECT 
  cls.relname as table_name,
  pol.polname as policy_name
FROM pg_policy pol
JOIN pg_class cls ON cls.oid = pol.polrelid
WHERE cls.relname IN ('user_roles', 'blog_posts')
ORDER BY cls.relname, pol.polname;