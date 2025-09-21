-- FIX_RLS_FOR_QASIM.sql
-- Script to fix RLS policies to ensure qasimtrustw@gmail.com can access admin features

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Allow insert for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow update for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow delete for admins only" ON blog_posts;

-- Create simple policies for user_roles
CREATE POLICY "User can read own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admin can manage any role"
ON user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur2 
    WHERE ur2.user_id = auth.uid() AND ur2.role = 'admin'
  )
);

-- Create policies for blog_posts
CREATE POLICY "Public can read published posts"
ON blog_posts FOR SELECT
USING (published = true);

CREATE POLICY "Admin can insert posts"
ON blog_posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Admin can update posts"
ON blog_posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Admin can delete posts"
ON blog_posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Enable RLS on both tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON user_roles TO authenticated;
GRANT ALL ON blog_posts TO authenticated;

-- Verify RLS is enabled
SELECT 
  relname AS table_name,
  relrowsecurity AS rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relname IN ('user_roles', 'blog_posts') AND n.nspname = 'public';