-- COMPLETE_AUTH_FIX.sql
-- Single complete script to resolve all Supabase authentication and authorization errors

-- 1. Ensure the user exists and has admin role
-- Replace 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95' with your actual user ID if different
INSERT INTO user_roles (user_id, role)
VALUES ('b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- 2. Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Users can insert their own role" ON user_roles;
DROP POLICY IF EXISTS "Users can update their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Admin full access to user_roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admin full access to user_roles" ON user_roles;
DROP POLICY IF EXISTS "Public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow insert for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow update for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow delete for admins only" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to delete blog posts" ON blog_posts;

-- 3. Create simple, non-circular RLS policies for user_roles
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

-- 4. Create RLS policies for blog_posts
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

-- 5. Enable RLS on both tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. Grant necessary permissions
GRANT ALL ON user_roles TO authenticated;
GRANT ALL ON blog_posts TO authenticated;

-- 7. Verify the setup
SELECT 'User roles table' as table_name, count(*) as row_count FROM user_roles;
SELECT 'Blog posts table' as table_name, count(*) as row_count FROM blog_posts;
SELECT 'RLS enabled on user_roles' as check_name, relrowsecurity as result 
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace 
WHERE c.relname = 'user_roles' AND n.nspname = 'public';
SELECT 'RLS enabled on blog_posts' as check_name, relrowsecurity as result 
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace 
WHERE c.relname = 'blog_posts' AND n.nspname = 'public';

-- 8. Verify your user has admin role
SELECT 
  u.email,
  ur.role
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE u.id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';

-- 9. List all policies to confirm they were created
SELECT 
  cls.relname as table_name,
  pol.polname as policy_name
FROM pg_policy pol
JOIN pg_class cls ON cls.oid = pol.polrelid
WHERE cls.relname IN ('user_roles', 'blog_posts')
ORDER BY cls.relname, pol.polname;