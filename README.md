# Blog Klyx - Production-Ready SEO Blog

> Minimalist, high-performance blog built with Next.js 16, Tailwind CSS v4, and TypeScript. Optimized for SEO, Core Web Vitals, and conversions.

**Live URL**: https://blog.klyx.fr (after deployment)  
**Main Site**: https://klyx.fr  
**Stack**: Next.js 16 (App Router) • Tailwind v4 • TypeScript • MDX • GA4

---

## 🚀 Quick Start

### 1. Fix npm Cache (One-Time Fix)

```bash
sudo chown -R $(whoami):staff ~/.npm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
# Copy and edit environment variables
cp .env.example .env.local

# Add your GA4 tracking ID
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Create Your First Post

```bash
# Create a new MDX file
touch content/posts/mon-premier-article.mdx
```

See `CONTENT_GUIDE.md` for the complete frontmatter template and best practices.

### 5. Run Development Server

```bash
npm run dev
# Visit http://localhost:3000
```

### 6. Build & Deploy

```bash
# Test production build
npm run build
npm run start

# Deploy to Vercel (recommended)
npm i -g vercel
vercel
```

See `DEPLOYMENT.md` for complete deployment instructions.

---

## ✨ Features

### SEO Optimized
✅ Dynamic meta tags (title, description, OG, Twitter)  
✅ JSON-LD structured data (Article, WebSite, LocalBusiness)  
✅ Sitemap + RSS feed generation  
✅ robots.txt configuration  
✅ Canonical URLs  
✅ Semantic HTML

### Performance
✅ **Next.js 16** - Latest features & optimizations  
✅ **Static Site Generation (SSG)** - Pre-rendered pages  
✅ **Image Optimization** - Automatic WebP/AVIF  
✅ **Code Splitting** - Minimal JavaScript  
✅ **Font Optimization** - Geist Sans & Mono  
✅ **Target**: Lighthouse 90+ across all metrics

### Accessibility
✅ WCAG AA compliant  
✅ Skip-to-content link  
✅ Semantic HTML5  
✅ Keyboard navigation  
✅ Reduced motion support  
✅ High contrast (black & white + #6b2fcd accent)

### Analytics & Conversion
✅ Google Analytics 4 integration  
✅ Event tracking (CTAs, shares, outbound links)  
✅ Calendly CTAs (header, footer, inline)  
✅ Internal linking to klyx.fr  
✅ Social share buttons

---

## 📁 Project Structure

```
blog-klyx/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (GA4, schemas, Header, Footer)
│   ├── page.tsx             # Homepage (hero + featured posts)
│   ├── posts/[slug]/        # Dynamic post pages (SSG)
│   ├── tags/                # Tag filtering & listing
│   ├── about/               # About Klyx page
│   ├── contact/             # Contact page (Calendly + email)
│   ├── sitemap.ts           # Dynamic sitemap generator
│   ├── rss.xml/             # RSS feed route
│   └── robots.txt/          # robots.txt route
│
├── components/              # React components
│   ├── SEO.tsx             # Meta tags & OG management
│   ├── Header.tsx          # Navigation + Calendly CTA
│   ├── Footer.tsx          # Footer with klyx.fr links
│   ├── CalendlyCTA.tsx     # CTA component (primary/inline)
│   ├── PostCard.tsx        # Post preview card
│   ├── MDXComponents.tsx   # Custom MDX component mapping
│   ├── ShareButtons.tsx    # Social sharing
│   ├── TagBadge.tsx        # Tag pills
│   └── AuthorCard.tsx      # Author info
│
├── lib/                     # Utilities & helpers
│   ├── types.ts            # TypeScript types
│   ├── utils.ts            # Formatting, slugify, reading time
│   ├── json-ld.ts          # Schema.org generators
│   ├── analytics.ts        # GA4 event tracking
│   └── posts.ts            # Post fetching & filtering
│
├── content/                 # MDX blog posts
│   └── posts/
│       └── *.mdx           # Your blog articles
│
├── public/                  # Static assets
│   └── assets/
│       ├── posts/          # Post images (organized by slug)
│       └── og-default.jpg  # Default OG image
│
├── .env.local              # Environment variables (gitignored)
├── .env.example            # Environment template
├── CONTENT_GUIDE.md        # How to create blog posts
├── DEPLOYMENT.md           # Deployment instructions
└── IMPLEMENTATION_STATUS.md # What's done, what's next
```

---

## 📝 Creating Content

### Quick Template

Create `content/posts/my-post.mdx`:

```yaml
---
title: "Your Post Title (50-60 chars)"
date: "2025-11-01"
slug: "your-post-slug"
description: "Meta description 150-160 characters"
keywords: ["keyword1", "keyword2", "Klyx"]
tags: ["tag1", "tag2"]
coverImage: "/assets/posts/your-post-slug/cover.jpg"
author:
  name: "Klyx Studio"
  email: "contact@klyx.fr"
---

## Introduction

Your content here...

## Main Section

More content...

## FAQ

**Question?**
Answer...
```

**See CONTENT_GUIDE.md for:**
- Complete frontmatter reference
- SEO best practices
- Internal linking strategy
- Image optimization
- Publishing checklist

---

## 🎨 Design System

### Colors

```css
--color-primary: #6b2fcd  /* Accent color */
--color-black: #000000    /* Text & borders */
--color-white: #ffffff    /* Backgrounds */
```

### Typography

- **Base font**: 18px (Geist Sans)
- **H1**: 3-4rem, bold (used for titles)
- **H2**: 2.25-3rem, bold (section headings)
- **H3**: 1.875-2.25rem, semibold (subsections)
- **Responsive**: Uses clamp() for fluid scaling

### Components

- **`.btn-primary`** - Primary CTA (purple background)
- **`.btn-secondary`** - Secondary CTA (outlined)
- **`.card`** - Post cards with hover effect
- **`.prose`** - MDX content styling
- **`.container-custom`** - Max-width container (80rem)

---

## 🔧 Configuration

### Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://blog.klyx.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
```

### TypeScript

Strict mode enabled in `tsconfig.json`.

### Tailwind v4

CSS-based configuration in `app/globals.css` using `@theme` directive.

---

##  Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## 📊 SEO Features

### On-Page SEO
- Dynamic title tags (50-60 chars)
- Meta descriptions (150-160 chars)
- Keyword optimization
- Structured heading hierarchy (H1 → H2 → H3)
- Alt text on images
- Internal linking strategy

### Technical SEO
- Sitemap.xml (auto-generated)
- RSS feed
- robots.txt
- Canonical URLs
- Mobile-first responsive design
- Fast Core Web Vitals

### Structured Data
- Article schema for posts
- WebSite schema for blog
- LocalBusiness schema for Klyx
- Breadcrumb navigation
- FAQ schema (when applicable)

### Social SEO
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Optimized OG images (1200x630)

---

## 🎯 Conversion Strategy

Every blog post includes:
1. **2+ links to klyx.fr** (services, portfolio, main site)
2. **1 contextual Calendly CTA** (inline in content)
3. **Persistent CTAs** (header + footer)
4. **Share buttons** (Twitter, LinkedIn, copy link)
5. **Related posts** (tag-based recommendations)

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### DNS Configuration

Add CNAME record in your registrar:
- **Name**: blog
- **Value**: cname.vercel-dns.com

**See DEPLOYMENT.md for:**
- Complete Vercel setup
- Custom domain configuration
- SSL certificate setup
- Google Search Console
- Google Analytics 4
- Troubleshooting

---

## 📈 Post-Launch Checklist

### Immediate (Day 1)
- [ ] Deploy to production
- [ ] Configure custom domain (blog.klyx.fr)
- [ ] Verify SSL certificate
- [ ] Submit sitemap to Google Search Console
- [ ] Test GA4 tracking
- [ ] Verify all Calendly CTAs work
- [ ] Test on mobile devices

### Week 1
- [ ] Publish 6-10 initial blog posts
- [ ] Monitor GSC for indexing errors
- [ ] Run Lighthouse audit (target 90+)
- [ ] Check accessibility with axe DevTools
- [ ] Set up weekly backups

### Month 1
- [ ] Publish 8-12 new posts
- [ ] Review GA4 traffic patterns
- [ ] Optimize top-performing posts
- [ ] Build internal linking between posts
- [ ] Monitor conversion rates (Calendly clicks)

---

## 📚 Documentation

- **`README.md`** (this file) - Project overview
- **`CONTENT_GUIDE.md`** - How to create blog posts
- **`DEPLOYMENT.md`** - Deployment & DNS setup
- **`IMPLEMENTATION_STATUS.md`** - What's completed/pending

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Posts Not Showing

- Check MDX files are in `content/posts/`
- Verify frontmatter is valid YAML
- Ensure `slug` matches filename (without .mdx)
- Check for syntax errors in MDX content

### Images Not Loading

- Images must be in `public/` directory
- Paths must start with `/` (e.g., `/assets/posts/...`)
- Check image file extensions match frontmatter

### GA4 Not Tracking

- Verify `NEXT_PUBLIC_GA_ID` is set
- Check browser console for errors
- Disable ad blockers for testing
- Allow 24-48 hours for data to appear in GA4

---

## 🤝 Support

- **Email**: contact@klyx.fr
- **Main Site**: https://klyx.fr
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## 📄 License

Private project for Klyx Studio. All rights reserved.

---

## 🎉 What's Next?

1. **Create Content**: Use `CONTENT_GUIDE.md` to write your first 6 posts
2. **Deploy**: Follow `DEPLOYMENT.md` for Vercel deployment
3. **Monitor**: Set up Google Search Console and GA4
4. **Optimize**: Run Lighthouse and improve scores
5. **Grow**: Publish consistently, build backlinks, monitor analytics

**Ready to launch your blog? Start with `npm install` and follow this README!**
