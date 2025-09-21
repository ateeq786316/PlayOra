-- FIX_USER_ROLES_RLS_V2.sql
-- Script to fix Row Level Security policies on user_roles table (Version 2)
-- This version avoids circular dependencies in RLS policies

-- First, let's drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;

-- Recreate the SELECT policy for users to read their own role
-- This policy allows users to read their own role without circular dependencies
CREATE POLICY "Users can read their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for users to INSERT their own role (typically done by admin)
CREATE POLICY "Users can insert their own role"
ON user_roles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to UPDATE their own role (typically done by admin)
CREATE POLICY "Users can update their own role"
ON user_roles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create policy for admin users to manage all roles
-- This policy allows admins to read, insert, update, and delete any user role
CREATE POLICY "Admin can manage all roles"
ON user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin'
  )
);

-- Ensure RLS is enabled
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON user_roles TO authenticated;