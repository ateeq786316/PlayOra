# Supabase Database Schema

## 1. User Roles Table

```sql
-- Create user_roles table
CREATE TABLE user_roles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'editor', 'author')) DEFAULT 'author',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for better query performance
CREATE INDEX idx_user_roles_user_id ON user_roles (user_id);
CREATE INDEX idx_user_roles_role ON user_roles (role);

-- Enable Row Level Security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own role
CREATE POLICY "Users can read their own role"
ON user_roles FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for admin full access
-- Note: This policy will be updated after the first admin user is created
CREATE POLICY "Allow admin full access to user roles"
ON user_roles FOR ALL
USING (false);  -- Initially deny all, update after admin user creation

-- Grant permissions
GRANT ALL ON user_roles TO authenticated;
```

## 2. Blog Posts Table

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
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

-- Create indexes for better query performance
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_date ON blog_posts (date DESC);
CREATE INDEX idx_blog_posts_published ON blog_posts (published);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for read access to published posts
CREATE POLICY "Allow public read access to published posts" 
ON blog_posts FOR SELECT 
USING (published = true);

-- Create policies for blog post operations
-- Note: These policies will be updated after the first admin user is created
CREATE POLICY "Allow insert for authorized users" 
ON blog_posts FOR INSERT 
WITH CHECK (false);  -- Initially deny all, update after user setup

CREATE POLICY "Allow update for authorized users" 
ON blog_posts FOR UPDATE 
USING (false)  -- Initially deny all, update after user setup
WITH CHECK (false);  -- Initially deny all, update after user setup

CREATE POLICY "Allow delete for authorized users" 
ON blog_posts FOR DELETE 
USING (false);  -- Initially deny all, update after user setup

-- Grant permissions
GRANT ALL ON blog_posts TO authenticated;
```

## 3. Storage Setup

```sql
-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);
```

## 4. RLS Policies for Storage

```sql
-- Create policy for public read access to blog images
CREATE POLICY "Public read access to blog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Create policies for storage operations
-- Note: These policies will be updated after the first admin user is created
CREATE POLICY "Allow upload for authorized users"
ON storage.objects FOR INSERT
WITH CHECK (false);  -- Initially deny all, update after user setup

CREATE POLICY "Allow admin full access to blog images"
ON storage.objects FOR ALL
USING (false);  -- Initially deny all, update after user setup
```

## 5. Hardcoded Admin User Setup

To set up a hardcoded admin user for testing purposes, follow these steps:

1. First, create a user account with a specific email and password through the Supabase Auth interface or using the Supabase SDK:

```javascript
// Example using Supabase JavaScript SDK
const { data, error } = await supabase.auth.signUp({
  email: 'admin@playora.com',
  password: 'AdminPassword123!'
});
```

2. After creating the user, get the user ID from the response and assign the admin role:

```sql
-- Replace 'USER_ID_FROM_SIGNUP' with the actual user ID from the signup response
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_FROM_SIGNUP', 'admin');
```

3. Update the RLS policies to recognize this specific admin user:

```sql
-- Update user_roles policies to allow access for the hardcoded admin
DROP POLICY "Allow admin full access to user_roles" ON user_roles;
CREATE POLICY "Allow admin full access to user_roles"
ON user_roles FOR ALL
USING (
  auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
  OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- Update blog_posts policies
DROP POLICY "Allow insert for authorized users" ON blog_posts;
CREATE POLICY "Allow insert for editors and admins" 
ON blog_posts FOR INSERT 
WITH CHECK (
  auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
  OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
);

DROP POLICY "Allow update for authorized users" ON blog_posts;
CREATE POLICY "Allow update for editors and admins" 
ON blog_posts FOR UPDATE 
USING (
  auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
  OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
)
WITH CHECK (
  auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
  OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('admin', 'editor')
  )
);

DROP POLICY "Allow delete for authorized users" ON blog_posts;
CREATE POLICY "Allow delete for admins only" 
ON blog_posts FOR DELETE 
USING (
  auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
  OR EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role = 'admin'
  )
);

-- Update storage policies
DROP POLICY "Allow upload for authorized users" ON storage.objects;
CREATE POLICY "Allow upload for editors and admins"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND (
    auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
    OR EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role IN ('admin', 'editor')
    )
  )
);

DROP POLICY "Allow admin full access to blog images" ON storage.objects;
CREATE POLICY "Allow admin full access to blog images"
ON storage.objects FOR ALL
USING (
  bucket_id = 'blog-images' 
  AND (
    auth.uid() = 'USER_ID_FROM_SIGNUP'  -- Hardcoded admin user ID
    OR EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_roles.user_id = auth.uid() 
      AND user_roles.role = 'admin'
    )
  )
);
```

## 6. Alternative: Environment-Based Admin Setup

For development environments, you can also set up the admin user using environment variables:

1. Add these environment variables to your `.env` file:
```
VITE_ADMIN_EMAIL=admin@playora.com
VITE_ADMIN_PASSWORD=AdminPassword123!
```

2. Create a setup script to automatically create the admin user:

```javascript
// setupAdmin.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const setupAdminUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: process.env.VITE_ADMIN_EMAIL,
    password: process.env.VITE_ADMIN_PASSWORD
  });

  if (error) {
    console.error('Error creating admin user:', error);
    return;
  }

  // Assign admin role
  const { error: roleError } = await supabase
    .from('user_roles')
    .insert([
      { user_id: data.user.id, role: 'admin' }
    ]);

  if (roleError) {
    console.error('Error assigning admin role:', roleError);
  } else {
    console.log('Admin user created successfully!');
  }
};

setupAdminUser();
```

## 7. Testing the Admin Panel

Once the admin user is set up, you can test the admin panel:

1. Navigate to `/login` in your application
2. Enter the hardcoded credentials:
   - Email: `admin@playora.com`
   - Password: `AdminPassword123!`
3. You should be redirected to the admin dashboard
4. From there, you can create, edit, and delete blog posts