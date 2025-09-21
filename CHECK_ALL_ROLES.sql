-- CHECK_ALL_ROLES.sql
-- Script to check all roles in the user_roles table

SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  ur.created_at,
  u.email
FROM user_roles ur
LEFT JOIN auth.users u ON ur.user_id = u.id
ORDER BY ur.created_at DESC;