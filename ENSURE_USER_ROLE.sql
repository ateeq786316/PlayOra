-- ENSURE_USER_ROLE.sql
-- Script to ensure the user has a proper role entry

-- First, check if the user exists in auth.users
SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';

-- Check if the user has a role in user_roles table
SELECT 
  id,
  user_id,
  role,
  created_at
FROM user_roles 
WHERE user_id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';

-- If the user exists but doesn't have a role, insert one
-- Replace 'admin' with 'author' or 'editor' if you want a different role
INSERT INTO user_roles (user_id, role)
VALUES ('b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify the role was set correctly
SELECT 
  u.id,
  u.email,
  ur.role,
  u.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';