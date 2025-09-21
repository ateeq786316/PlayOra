-- SUPABASE ADMIN USER AND POLICIES SETUP SCRIPT
-- Run this script AFTER creating the tables and setting up an admin user in Supabase Auth

-- 1. First, create an admin user through the Supabase Auth dashboard
-- Then, get the user ID and replace 'YOUR_ADMIN_USER_ID' below with the actual ID

-- 2. Assign admin role to the user (replace 'YOUR_ADMIN_USER_ID' with actual user ID)
INSERT INTO user_roles (user_id, role) 
VALUES ('YOUR_ADMIN_USER_ID', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- 3. Update RLS policies for user_roles table
DROP POLICY IF EXISTS "Allow admin full access to user_roles" ON user_roles;
CREATE POLICY "Allow admin full access to user_roles"
ON user_roles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- 4. Update RLS policies for blog_posts table
DROP POLICY IF EXISTS "Allow insert for authorized users" ON blog_posts;
CREATE POLICY "Allow insert for editors and admins" 
ON blog_posts FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
);

DROP POLICY IF EXISTS "Allow update for authorized users" ON blog_posts;
CREATE POLICY "Allow update for editors and admins" 
ON blog_posts FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
);

DROP POLICY IF EXISTS "Allow delete for authorized users" ON blog_posts;
CREATE POLICY "Allow delete for admins only" 
ON blog_posts FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- 5. Create storage bucket for blog images (if not already created)
-- Note: This might need to be done in the Supabase Storage dashboard instead
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Update RLS policies for storage
DROP POLICY IF EXISTS "Allow upload for authorized users" ON storage.objects;
CREATE POLICY "Allow upload for editors and admins"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
);

DROP POLICY IF EXISTS "Allow admin full access to blog images" ON storage.objects;
CREATE POLICY "Allow admin full access to blog images"
ON storage.objects FOR ALL
USING (
  bucket_id = 'blog-images' 
  AND EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- 7. Create policy for public read access to blog images
DROP POLICY IF EXISTS "Public read access to blog images" ON storage.objects;
CREATE POLICY "Public read access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');