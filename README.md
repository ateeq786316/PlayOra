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

To access the admin panel, use the following credentials:

- Email: `qasimtrustw@gmail.com`
- Password: `Playora01`

These credentials are now configured to work both in development and production environments.

## Environment Setup

A [.env](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/.env) file has been created with the necessary environment variables. For production deployment, make sure to configure these variables in your hosting platform (Vercel, Netlify, etc.).

## Troubleshooting

### "Access Denied - You must be an admin to access this page"

If you're still getting this error, follow these steps:

1. **Run Database Fix Script**: Execute [ENSURE_QASIM_ADMIN.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/ENSURE_QASIM_ADMIN.sql) in your Supabase SQL editor to ensure your user has admin role

2. **Fix RLS Policies**: Run [FIX_RLS_POLICIES_CLEAN.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/FIX_RLS_POLICIES_CLEAN.sql) to fix any Row Level Security issues

3. **Clear Browser Data**: Clear your browser's cache, cookies, and localStorage

4. **Restart Your Server**: If running locally, restart your development server

### Admin Login Works Locally But Not On Live Site

This issue has been resolved by:
1. Creating a proper [.env](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/.env) file with the correct credentials
2. Updating the authentication service to work in both development and production environments
3. Ensuring the hardcoded credentials are recognized regardless of the environment

### 500 Server Error When Accessing Admin Panel

If you encounter a 500 server error when trying to access the admin panel, it's likely due to Row Level Security (RLS) policies on the user_roles table. To fix this:

1. Run [FIX_RLS_POLICIES_CLEAN.sql](file:///d:/ATEEQ%20MERN%20PORTFOLIO/PlayOra-loveable/playora-court-connect-main/FIX_RLS_POLICIES_CLEAN.sql) in your Supabase SQL editor
2. Try accessing the admin panel again

### 403 Forbidden Error When Creating Blog Posts

If you encounter "403 Forbidden" or "row-level security policy" errors when creating blog posts, run the following SQL scripts in your Supabase SQL editor:

1. **FIX_RLS_POLICIES_CLEAN.sql** - Fixes Row Level Security policies on both blog_posts and user_roles tables

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