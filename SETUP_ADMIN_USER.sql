-- SETUP ADMIN USER WITH HARDCODED CREDENTIALS
-- Follow these steps to set up an admin user for the PlayOra platform

-- IMPORTANT: This script assumes you have already:
-- 1. Created the database tables (using SUPABASE_TABLES_SETUP.sql)
-- 2. Set up an admin user through the Supabase Auth dashboard

-- STEP 1: First, you need to create an admin user through the Supabase Auth dashboard
-- - Go to your Supabase project dashboard
-- - Navigate to Authentication > Users
-- - Click "Add user" and create a user with:
--   Email: admin@playora.com
--   Password: AdminPassword123!
-- - Note the User ID (a UUID) - you'll need it for STEP 2

-- STEP 2: Assign admin role to the user
-- Replace 'YOUR_ADMIN_USER_ID_HERE' with the actual User ID from STEP 1
INSERT INTO user_roles (user_id, role) 
VALUES ('YOUR_ADMIN_USER_ID_HERE', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- STEP 3: Update RLS policies for proper access control
-- These policies allow the admin user to perform all operations

-- Update user_roles policies
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

-- Update blog_posts policies
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

-- Create storage bucket for blog images (if not already created)
-- Note: This might need to be done in the Supabase Storage dashboard instead
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Update RLS policies for storage
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

-- Create policy for public read access to blog images
DROP POLICY IF EXISTS "Public read access to blog images" ON storage.objects;
CREATE POLICY "Public read access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Verify the setup
SELECT 
  ur.user_id,
  ur.role,
  u.email
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE ur.role = 'admin';