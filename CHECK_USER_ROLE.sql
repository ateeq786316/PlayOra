-- CHECK_USER_ROLE.sql
-- Script to check if qasimtrustw@gmail.com has an admin role

-- First, find the user ID for qasimtrustw@gmail.com
SELECT id, email, created_at FROM auth.users WHERE email = 'qasimtrustw@gmail.com';

-- Then, check if this user has a role assigned
SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  ur.created_at,
  u.email
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'qasimtrustw@gmail.com';

-- Check all admin users
SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  ur.created_at,
  u.email
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE ur.role = 'admin';