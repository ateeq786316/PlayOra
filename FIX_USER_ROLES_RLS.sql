-- FIX_USER_ROLES_RLS.sql
-- Script to fix Row Level Security policies on user_roles table

-- First, let's drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;

-- Recreate the SELECT policy for users to read their own role
CREATE POLICY "Users can read their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for admin users to manage all roles
CREATE POLICY "Admin can manage all roles"
ON user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin'
  )
);

-- Ensure RLS is enabled
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;