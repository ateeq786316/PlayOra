-- ENSURE_QASIM_ADMIN.sql
-- Script to ensure qasimtrustw@gmail.com has admin role

-- First, find the user ID for qasimtrustw@gmail.com
SELECT id, email, created_at FROM auth.users WHERE email = 'qasimtrustw@gmail.com';

-- Then, ensure this user has an admin role
-- Replace 'USER_ID_FROM_ABOVE_QUERY' with the actual user ID from the first query
-- For example, if the user ID is 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', use that instead
INSERT INTO user_roles (user_id, role)
VALUES ('b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- If you have a different user ID, uncomment and modify the line below:
-- VALUES ('YOUR_USER_ID_HERE', 'admin')

-- Verify the user has admin role
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