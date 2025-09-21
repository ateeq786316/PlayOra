-- CHECK_USER_ROLE.sql
-- Script to check if the user has a role assigned

SELECT 
  id,
  user_id,
  role,
  created_at
FROM user_roles 
WHERE user_id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';