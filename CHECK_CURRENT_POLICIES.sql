-- CHECK_CURRENT_POLICIES.sql
-- Script to check current RLS policies

SELECT 
  cls.relname as table_name,
  pol.polname as policy_name
FROM pg_policy pol
JOIN pg_class cls ON cls.oid = pol.polrelid
WHERE cls.relname IN ('user_roles', 'blog_posts')
ORDER BY cls.relname, pol.polname;