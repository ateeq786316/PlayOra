-- FIX_BLOG_POSTS_RLS.sql
-- Script to fix Row Level Security policies on blog_posts table to allow admin users to insert/update/delete

-- First, let's drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Allow public read access to published posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Allow admin to delete blog posts" ON blog_posts;

-- Recreate the SELECT policy for published posts (public read access)
CREATE POLICY "Allow public read access to published posts" 
ON blog_posts FOR SELECT 
USING (published = true);

-- Create INSERT policy for authenticated users with admin role
CREATE POLICY "Allow admin to insert blog posts" 
ON blog_posts FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create UPDATE policy for authenticated users with admin role
CREATE POLICY "Allow admin to update blog posts" 
ON blog_posts FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create DELETE policy for authenticated users with admin role
CREATE POLICY "Allow admin to delete blog posts" 
ON blog_posts FOR DELETE 
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Ensure RLS is enabled
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;