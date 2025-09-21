-- FIX_RLS_POLICIES_CLEAN.sql
-- Clean script to fix RLS policies for qasimtrustw@gmail.com admin access

-- First, drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "User can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage any role" ON user_roles;
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admin full access to user_roles" ON user_roles;
DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can insert posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can update posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin can delete posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow insert for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow update for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow delete for admins only" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to delete blog posts" ON blog_posts;

-- Create clean policies for user_roles
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

-- Create clean policies for blog_posts
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

-- Enable RLS on both tables (this is safe to run even if already enabled)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON user_roles TO authenticated;
GRANT ALL ON blog_posts TO authenticated;

-- Verify the policies were created
SELECT 
  cls.relname as table_name,
  pol.polname as policy_name
FROM pg_policy pol
JOIN pg_class cls ON cls.oid = pol.polrelid
WHERE cls.relname IN ('user_roles', 'blog_posts')
ORDER BY cls.relname, pol.polname;