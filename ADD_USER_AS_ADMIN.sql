-- ADD_USER_AS_ADMIN.sql
-- Script to add a user as admin in the PlayOra platform

-- First, you need to find the User ID for qasimtrustw@gmail.com
-- Run this query to find the user ID:
SELECT id, email, created_at FROM auth.users WHERE email = 'qasimtrustw@gmail.com';

-- Once you have the user ID, replace 'USER_ID_FROM_ABOVE_QUERY' with the actual ID
-- and run this INSERT statement:
INSERT INTO user_roles (user_id, role) 
VALUES ('b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Verify the user has been added as admin
SELECT 
  ur.user_id,
  ur.role,
  u.email,
  u.created_at
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'qasimtrustw@gmail.com';

-- Check all admin users
SELECT 
  ur.user_id,
  ur.role,
  u.email,
  u.created_at
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE ur.role = 'admin';