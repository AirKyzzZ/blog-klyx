# Installation Guide - Blog Klyx

## Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Git
- Terminal access

---

## Step 1: Fix npm Permissions (One-Time)

If you encounter permission errors during `npm install`:

```bash
sudo chown -R $(whoami):staff ~/.npm
```

---

## Step 2: Install Dependencies

```bash
cd /Users/samsepiol/Downloads/GithubRepos/Work/blog-klyx
npm install
```

This will install:
- Next.js 16 + React 19
- Tailwind CSS v4
- next-mdx-remote (MDX processing)
- gray-matter (frontmatter parsing)
- reading-time, date-fns, clsx (utilities)
- TypeScript + ESLint + Prettier
- Jest + Testing Library (dev dependencies)

**Expected time**: 2-3 minutes

---

## Step 3: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
```

**Required variables**:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Get from Google Analytics 4
NEXT_PUBLIC_SITE_URL=https://blog.klyx.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
```

**Note**: Leave `GA_ID` as `G-XXXXXXXXXX` for local development. Update in Vercel for production.

---

## Step 4: Verify Installation

```bash
# Check for errors
npm run build
```

**Expected output**:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization
```

If build succeeds ✅ - you're ready to develop!

---

## Step 5: Start Development Server

```bash
npm run dev
```

**Visit**: http://localhost:3000

You should see:
- Blog homepage with hero section
- "Aucun article disponible" message (until you have posts with images)
- Header with navigation + Calendly CTA
- Footer with klyx.fr links

---

## Step 6: Add Cover Images

Before posts will display, you need cover images:

```bash
# Create placeholder images for each post
mkdir -p public/assets/posts/creation-bordeaux
# Add cover.jpg (1200x630px) to each directory
```

**Quick solution**: Use Canva or placeholder service:
- Go to https://placehold.co/1200x630/6b2fcd/white?text=Your+Title
- Save image as `cover.jpg`
- Place in `/public/assets/posts/{slug}/`

**See IMAGE_GUIDE.md** for detailed instructions.

---

## Step 7: Test Locally

With images added, refresh http://localhost:3000

You should now see:
✅ 8 blog posts on homepage  
✅ Post cards with images
✅ Click on a post → full article with MDX content  
✅ Tags page works  
✅ About & Contact pages work

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Posts Not Showing

**Check**:
1. MDX files exist in `content/posts/`
2. Frontmatter is valid YAML (no syntax errors)
3. Cover images exist in `/public/assets/posts/{slug}/cover.jpg`
4. Slug in frontmatter matches filename

**Debug**:
```bash
# Check for MDX files
ls content/posts/

# Check for images
ls public/assets/posts/*/cover.jpg
```

### TypeScript Errors

```bash
# Regenerate types
rm -rf .next
npm run dev
```

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

---

## Verification Checklist

Before proceeding to deployment:

- [ ] `npm install` completed without errors
- [ ] `npm run build` succeeds
- [ ] `npm run dev` starts without errors
- [ ] Homepage loads at localhost:3000
- [ ] At least 1 post displays (with image)
- [ ] Navigation works (all links)
- [ ] No console errors in browser DevTools
- [ ] Mobile view works (resize browser)

---

## Next Steps

Once local development works:

1. **Create more content** (see CONTENT_GUIDE.md)
2. **Run tests** (`npm test`)
3. **Deploy to Vercel** (see DEPLOYMENT.md)
4. **Configure DNS** for blog.klyx.fr
5. **Set up Google Services** (GA4 + Search Console)

---

## Quick Commands Reference

```bash
# Development
npm run dev                 # Start dev server (localhost:3000)
npm run build              # Build for production
npm run start              # Start production server

# Quality
npm run lint               # Run ESLint
npm run test               # Run tests
npm run test:coverage      # Test with coverage report

# Deployment
vercel                     # Deploy to preview
vercel --prod             # Deploy to production
```

---

## File Structure After Installation

```
blog-klyx/
├── node_modules/          # Dependencies (gitignored)
├── .next/                 # Build output (gitignored)
├── app/                   # Next.js pages
├── components/            # React components
├── lib/                   # Utilities
├── content/posts/         # MDX blog posts
├── public/assets/posts/   # Images
├── .env.local            # Environment variables (gitignored)
└── package.json          # Dependencies list
```

---

## Dependencies Installed

### Production
- `next` (16.0.1) - Framework
- `react` + `react-dom` (19.2.0) - UI library
- `next-mdx-remote` (5.0.0) - MDX processing
- `gray-matter` (4.0.3) - Frontmatter parsing
- `reading-time` (1.5.0) - Reading time calc
- `date-fns` (4.1.0) - Date formatting
- `clsx` (2.1.1) - Class name utility

### Development
- `typescript` (5.x) - Type safety
- `tailwindcss` (4.x) - Styling
- `eslint` + `eslint-config-next` - Linting
- `prettier` (3.1.0) - Code formatting
- `jest` + `@testing-library/*` - Testing

---

**Installation complete?** Great! Move on to CONTENT_GUIDE.md to create your first post, or DEPLOYMENT.md to deploy. 🚀

