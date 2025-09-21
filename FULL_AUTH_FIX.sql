-- FULL_AUTH_FIX.sql
-- Complete fix for authentication and authorization issues

-- 1. Drop all existing policies on user_roles
DROP POLICY IF EXISTS "Users can read their own role" ON user_roles;
DROP POLICY IF EXISTS "Users can insert their own role" ON user_roles;
DROP POLICY IF EXISTS "Users can update their own role" ON user_roles;
DROP POLICY IF EXISTS "Admin can manage all roles" ON user_roles;
DROP POLICY IF EXISTS "Allow admin full access to user_roles" ON user_roles;

-- 2. Drop all existing policies on blog_posts
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow insert for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow update for editors and admins" ON blog_posts;
DROP POLICY IF EXISTS "Allow delete for admins only" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to delete blog posts" ON blog_posts;

-- 3. Recreate basic SELECT policy for user_roles (simple, no circular dependencies)
CREATE POLICY "Users can read their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 4. Create policies for admin full access to user_roles
CREATE POLICY "Admin full access to user_roles"
ON user_roles FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur2 
    WHERE ur2.user_id = auth.uid() AND ur2.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur2 
    WHERE ur2.user_id = auth.uid() AND ur2.role = 'admin'
  )
);

-- 5. Recreate basic policies for blog_posts
CREATE POLICY "Public read access to published posts" 
ON blog_posts FOR SELECT 
USING (published = true);

CREATE POLICY "Admin insert access to blog_posts" 
ON blog_posts FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

CREATE POLICY "Admin update access to blog_posts" 
ON blog_posts FOR UPDATE 
TO authenticated
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

CREATE POLICY "Admin delete access to blog_posts" 
ON blog_posts FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- 6. Ensure RLS is enabled on both tables
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 7. Grant necessary permissions
GRANT ALL ON user_roles TO authenticated;
GRANT ALL ON blog_posts TO authenticated;

-- 8. Verify the user still has admin role
INSERT INTO user_roles (user_id, role)
VALUES ('b4fcd0a7-96e0-42f5-9f99-bd793fffbd95', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- 9. Check the final state
SELECT 
  ur.id,
  ur.user_id,
  ur.role,
  u.email
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE ur.user_id = 'b4fcd0a7-96e0-42f5-9f99-bd793fffbd95';