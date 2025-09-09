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

### Quick Method
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