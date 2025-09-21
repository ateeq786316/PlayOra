# PlayOra - Sports Booking & Community App

A production-quality, single-page frontend website for PlayOra, the ultimate sports booking and community app. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Admin Access

To access the admin panel, you have two options:

### Option 1: Use Hardcoded Development Credentials (Recommended for Development)

Log in with:
- Email: `admin@playora.com`
- Password: `AdminPassword123!`

These credentials are hardcoded for development mode and will automatically be recognized as an admin user.

### Option 2: Add Your Own User as Admin

If you want to use your own email (`qasimtrustw@gmail.com`) as an admin:

1. Make sure the user exists in your Supabase authentication system
2. Run the [ADD_USER_AS_ADMIN.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/ADD_USER_AS_ADMIN.sql) script in your Supabase SQL editor to assign admin role

## Deployment to Vercel

### Environment Variables Configuration

For the admin login to work on your live site, you must configure environment variables in Vercel:

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

After adding the environment variables, redeploy your application.

## Troubleshooting

### Admin Login Works Locally But Not On Live Site

This is a common issue when deploying applications with hardcoded credentials. The environment variables must be configured in Vercel for the live site to work properly.

Solution:
1. Configure the environment variables as described in the "Deployment to Vercel" section
2. Redeploy your application
3. Try logging in again

### Persistent Access Denied Issues

If you're still getting "Access Denied" after confirming your user has an admin role, try these steps:

1. **Clear Browser Data**: Clear your browser's cache, cookies, and localStorage
2. **Log Out and Log Back In**: Completely log out and log in again
3. **Check Environment Variables**: Ensure your [.env](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/.env) file has the correct values
4. **Run Full Authentication Fix**: Execute [FULL_AUTH_FIX.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/FULL_AUTH_FIX.sql) in your Supabase SQL editor

### 500 Server Error When Accessing Admin Panel

If you encounter a 500 server error when trying to access the admin panel, it's likely due to Row Level Security (RLS) policies on the user_roles table. To fix this:

1. Run [FULL_AUTH_FIX.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/FULL_AUTH_FIX.sql) in your Supabase SQL editor
2. Try accessing the admin panel again

### 403 Forbidden Error When Creating Blog Posts

If you encounter "403 Forbidden" or "row-level security policy" errors when creating blog posts, run the following SQL scripts in your Supabase SQL editor:

1. **FIX_BLOG_POSTS_RLS.sql** - Fixes Row Level Security policies on blog_posts table
2. **FIX_USER_ROLES_RLS.sql** - Fixes Row Level Security policies on user_roles table

After applying these fixes, verify with:
- **VERIFY_RLS_FIXES.sql** - Verifies that the RLS fixes are working correctly

### "A listener indicated an asynchronous response" Error

This browser error typically occurs due to:
1. Browser extensions interfering with the application
2. Service workers caching issues
3. Network interruptions

To resolve:
1. Try in an incognito/private window
2. Disable browser extensions
3. Clear browser cache completely
4. Restart your development server

## 🛠 Supabase Setup

To use the dynamic blog system with admin panel, you need to set up a Supabase database:

1. Create a new Supabase project at https://supabase.com/
2. Follow the instructions in [README_SUPABASE.md](README_SUPABASE.md) to set up the database tables and authentication
3. Configure your environment variables with your Supabase project URL and anon key

### Quick Supabase Setup Files:
- [SUPABASE_TABLES_SETUP.sql](SUPABASE_TABLES_SETUP.sql) - Create database tables
- [INSERT_SAMPLE_BLOG_POSTS.sql](INSERT_SAMPLE_BLOG_POSTS.sql) - Add sample blog posts (optional)
- [SETUP_ADMIN_USER.sql](SETUP_ADMIN_USER.sql) - Configure admin user with hardcoded credentials

### Verification Tools

This project includes several tools to verify that everything is working correctly:

1. **VERIFY_CONNECTION.js** - Node.js script to verify Supabase connection
2. **ConnectionTest.tsx** - Frontend component to test connection
3. **TestConnection.tsx** - Test page route
4. **VERIFY_SUPABASE_SETUP.sql** - SQL verification script

To run the verification:
1. Execute `VERIFY_SUPABASE_SETUP.sql` in your Supabase SQL editor
2. Run `VERIFY_CONNECTION.js` with Node.js: `node VERIFY_CONNECTION.js`
3. Navigate to `/test-connection` in your browser

## 🎨 Theme Customization

### Changing Colors
Edit the `:root` variables in `src/index.css` to change the entire theme:

```css
:root {
  /* PlayOra Brand Colors - Edit these to change theme */
  --color-primary-dark: #123315;
  --color-primary-light: #33FF33;
  --color-text-light: #FFFFFF;
  --color-accent-gold: #FFD700;
  --color-neutral-dark: #222222;
  
  /* Add more custom colors as needed */
}
```

All components automatically use these CSS variables through the Tailwind configuration.

## 📝 Adding/Editing Blog Posts

### Dynamic Blog System
The project now includes a dynamic blog system with an admin panel:

1. Navigate to `/login` to access the admin panel
2. Sign in with the hardcoded admin credentials:
   - Email: admin@playora.com
   - Password: AdminPassword123!
3. Create, edit, and delete blog posts directly from the admin interface

### Static Blog Posts (Legacy)
Edit `/src/data/blogs.ts` and add to the `BLOGS` array:

```typescript
{
  id: 'unique-post-id',
  slug: 'url-friendly-slug',
  title: 'Your Blog Post Title',
  excerpt: 'Short description for cards and SEO.',
  content: \`# Markdown Title

Your markdown content here...

## Subheading
- List item
- Another item\`,
  date: '2024-07-15T10:00:00.000Z',
  author: { name: 'Author Name', avatar: '/images/authors/author.jpg' },
  tags: ['tag1', 'tag2'],
  cover: '/images/blog/cover.jpg'
}
```

### Content Format
- **Markdown**: Use standard markdown syntax
- **HTML**: Content starting with `<` is treated as HTML
- **Date**: Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **Slug**: lowercase, hyphens only, no spaces

## 🛠 Customization Guide

### App Store Links
Update download links in:
- `src/components/DownloadCTA.tsx` - `handlePlayStoreClick()` function
- `src/components/Screenshots.tsx` - Download buttons

### Contact Information
Update contact details in:
- `src/components/Contact.tsx` - Contact info section
- `src/components/Footer.tsx` - Footer contact details

### Meta Tags & SEO
Edit SEO information in:
- `index.html` - Meta tags, title, description
- Change social media handles, OG images, etc.

### Tailwind Color Mapping
The theme uses CSS variables mapped to Tailwind colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "var(--color-primary-dark)",
    light: "var(--color-primary-light)"
  },
  // ... more mappings
}
```

## 📱 Features

- ✅ Fully responsive (320px to 1920px+)
- ✅ SEO optimized with meta tags
- ✅ Accessible (ARIA, keyboard navigation)
- ✅ Blog system with search and filtering
- ✅ Smooth animations with Framer Motion
- ✅ Theme switching capability
- ✅ Image optimization and lazy loading
- ✅ Form validation and user feedback
- ✅ Dynamic blog system with admin panel

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features grid
│   └── ...
├── controllers/        # Business logic
│   └── blogController.ts
├── data/              # Static data
│   └── blogs.ts       # Blog posts (EDIT HERE)
├── hooks/             # Custom React hooks
├── models/            # TypeScript types
├── pages/             # Route components
├── utils/             # Helper functions
└── assets/            # Images, icons
```

## 🎯 Performance

- Lazy loading for images
- Code splitting for components
- Optimized animations
- Compressed assets
- Minimal bundle size

## 📄 License

MIT License - feel free to use this project for your own applications.

## 🤝 Support

For questions or support, contact:
- Email: support@playora.app
- Phone: +91 98765 43210

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Vite.