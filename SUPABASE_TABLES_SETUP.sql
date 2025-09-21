-- SUPABASE TABLES SETUP SCRIPT
-- Run this script in the Supabase SQL editor to create the required tables

-- 1. Create the blog_posts table first
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  tags TEXT[],
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts (date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- 3. Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Create basic policies for blog_posts (restrictive initially)
CREATE POLICY "Allow public read access to published posts" 
ON blog_posts FOR SELECT 
USING (published = true);

-- 5. Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'editor', 'author')) DEFAULT 'author',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 6. Create index for user_roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles (user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles (role);

-- 7. Enable Row Level Security for user_roles
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 8. Create basic policy for user_roles
CREATE POLICY "Users can read their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- 9. Create storage bucket for blog images
-- Note: This might need to be done in the Supabase Storage dashboard instead
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('blog-images', 'blog-images', true)
-- ON CONFLICT (id) DO NOTHING;

-- 10. Grant permissions
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON user_roles TO authenticated;

-- 11. Sample data insertion (uncomment to use)
-- INSERT INTO blog_posts (slug, title, excerpt, content, author_name, published) 
-- VALUES 
--   ('welcome-to-playora', 'Welcome to PlayOra', 'Discover the amazing features of PlayOra', 'PlayOra is a revolutionary sports app...', 'PlayOra Team', true),
--   ('how-to-book-courts', 'How to Book Sports Courts', 'Easy steps to book your favorite sports courts', 'Booking courts on PlayOra is simple...', 'PlayOra Team', true);