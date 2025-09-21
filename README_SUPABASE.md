# Supabase Setup Instructions

This document provides step-by-step instructions for setting up the Supabase database for the PlayOra project.

## Prerequisites

1. A Supabase account (free tier available)
2. A new Supabase project created

## Setup Steps

### 1. Create Database Tables

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `SUPABASE_TABLES_SETUP.sql` into the editor
4. Run the script to create the required tables

### 2. Insert Sample Blog Posts (Optional)

1. In the SQL Editor, copy and paste the contents of `INSERT_SAMPLE_BLOG_POSTS.sql`
2. Run the script to add sample blog posts to your database

### 3. Set Up Authentication

1. Go to the Authentication section in your Supabase dashboard
2. Create a new user account that will serve as your admin user:
   - Email: admin@playora.com
   - Password: AdminPassword123!
3. Note the User ID (you'll need it for the next step)

### 4. Configure Admin User and Policies

1. Back in the SQL Editor, copy and paste the contents of `SETUP_ADMIN_USER.sql`
2. Replace `YOUR_ADMIN_USER_ID_HERE` with the actual User ID from step 3
3. Run the script to set up the admin role and RLS policies

### 5. Configure Environment Variables

1. In your Supabase project dashboard, go to Settings > API
2. Copy the Project URL and anon public key
3. Create a `.env` file in your project root with the following:

```
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_KEY=your_anon_key_here
```

### 6. Test the Setup

1. Run the development server: `npm run dev`
2. Navigate to `/login`
3. Sign in with the admin credentials:
   - Email: admin@playora.com
   - Password: AdminPassword123!
4. You should be redirected to the admin dashboard

## Troubleshooting

### Common Issues

1. **Relation does not exist**: Make sure you've run the table creation script first
2. **Permission denied**: Ensure you've updated the RLS policies
3. **User not found**: Double-check the User ID used in the admin setup script

### Resetting the Database

If you need to reset your database setup:

1. Drop the existing tables:
   ```sql
   DROP TABLE IF EXISTS blog_posts, user_roles;
   ```

2. Re-run the setup scripts in order

## Security Notes

- Never commit your actual Supabase credentials to version control
- Use the `.env.example` file as a template for other developers
- In production, ensure RLS policies are properly configured
- The hardcoded admin credentials are only for development/testing purposes