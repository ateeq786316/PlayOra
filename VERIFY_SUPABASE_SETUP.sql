-- VERIFY_SUPABASE_SETUP.sql
-- Script to verify that all Supabase components are properly set up

-- 1. Check if blog_posts table exists
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- 2. Check if user_roles table exists
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_roles'
ORDER BY ordinal_position;

-- 3. Check if indexes exist
SELECT 
  indexname, 
  tablename 
FROM pg_indexes 
WHERE tablename IN ('blog_posts', 'user_roles');

-- 4. Check RLS status
SELECT 
  schemaname, 
  tablename, 
  enabled 
FROM pg_tables 
WHERE tablename IN ('blog_posts', 'user_roles');

-- 5. Check if storage bucket exists
SELECT 
  id, 
  name, 
  public 
FROM storage.buckets 
WHERE name = 'blog-images';

-- 6. Count records in each table
SELECT 'blog_posts' as table_name, COUNT(*) as record_count FROM blog_posts
UNION ALL
SELECT 'user_roles' as table_name, COUNT(*) as record_count FROM user_roles;

-- 7. Check sample data
SELECT 
  id, 
  slug, 
  title, 
  published 
FROM blog_posts 
LIMIT 3;

-- 8. Check user roles
SELECT 
  id, 
  user_id, 
  role 
FROM user_roles 
LIMIT 3;

-- 9. Check policies
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd 
FROM pg_policies 
WHERE tablename IN ('blog_posts', 'user_roles')
ORDER BY tablename, policyname;