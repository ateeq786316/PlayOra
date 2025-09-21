# Vercel Deployment Fix for Admin Login

## Issue
The admin login works locally but not on the live site because environment variables are not configured in Vercel.

## Solution

### Step 1: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your PlayOra project
3. Go to Settings > Environment Variables
4. Add the following environment variables:

```
VITE_ADMIN_EMAIL=admin@playora.com
VITE_ADMIN_PASSWORD=AdminPassword123!
VITE_SUPABASE_URL=your_actual_supabase_url
VITE_SUPABASE_KEY=your_actual_supabase_anon_key
```

Replace `your_actual_supabase_url` and `your_actual_supabase_anon_key` with your actual Supabase credentials.

### Step 2: Redeploy Your Application

After adding the environment variables:
1. Go to the Deployments tab
2. Click on the "Redeploy" button
3. Wait for the deployment to complete

### Step 3: Verify the Fix

1. Visit https://www.playoraapp.com/login
2. Try logging in with:
   - Email: admin@playora.com
   - Password: AdminPassword123!

## Why This Happens

Vercel doesn't automatically use your local [.env](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/.env) file. Environment variables must be explicitly configured in the Vercel project settings to be available to your deployed application.

The `VITE_` prefix is necessary for Vite to expose these variables to the client-side code.