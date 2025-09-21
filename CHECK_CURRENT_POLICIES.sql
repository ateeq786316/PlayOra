-- CHECK_CURRENT_POLICIES.sql
-- Script to check the current RLS policies on user_roles table

SELECT 
  polname AS policy_name,
  polrelid::regclass AS table_name,
  polcmd AS command,
  polqual AS using_expression,
  polwithcheck AS with_check_expression
FROM pg_policy
WHERE polrelid = 'user_roles'::regclass;