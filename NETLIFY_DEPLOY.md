# 🚀 Netlify Deployment Guide

## Quick Deploy Instructions

---

## ✅ **Files Already Configured**

I've created the necessary config files:

1. **`netlify.toml`** - Netlify build configuration
2. **`.npmrc`** - NPM configuration for legacy peer deps
3. **`package.json`** - Updated testing library to React 19 compatible version

---

## 🎯 **Deploy Steps**

### 1. Commit the Config Files

```bash
git add netlify.toml .npmrc package.json
git commit -m "chore: add Netlify deployment config"
git push origin main
```

### 2. Re-Deploy on Netlify

**Option A: Auto Deploy** (if connected to GitHub)
- Just push to `main` branch
- Netlify auto-deploys

**Option B: Manual Trigger**
1. Go to Netlify dashboard
2. Click "Trigger deploy"
3. Select "Deploy site"

### 3. Verify Build Success

Check Netlify logs for:
```
✅ Build succeeded!
✅ Site deployed
```

---

## 🔧 **What Was Fixed**

### Problem
React Testing Library v14 requires React 18, but you're using React 19.

### Solution
1. **`netlify.toml`**: Added `NPM_FLAGS = "--legacy-peer-deps"`
2. **`.npmrc`**: Set `legacy-peer-deps=true` globally
3. **`package.json`**: Updated to `@testing-library/react@^16.0.0` (React 19 compatible)

---

## 📋 **netlify.toml** Configuration

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"
  NPM_FLAGS = "--legacy-peer-deps"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 🌍 **Environment Variables**

### Add to Netlify Dashboard

Go to: **Site settings → Environment variables**

Add these:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
UNSPLASH_ACCESS_KEY=your_unsplash_key
```

**Update `NEXT_PUBLIC_SITE_URL`** with your actual Netlify URL (or custom domain).

---

## 🎯 **Custom Domain Setup**

### 1. Add Custom Domain
1. Netlify dashboard → Domain settings
2. Add custom domain: `blog.klyx.fr`
3. Follow DNS configuration instructions

### 2. Configure DNS
Add CNAME record in your DNS provider:
```
Type: CNAME
Name: blog
Value: your-site.netlify.app
```

### 3. Enable HTTPS
Netlify auto-provisions SSL certificate (free).

---

## ✅ **Deployment Checklist**

Before deploying:

- ✅ All config files committed (`netlify.toml`, `.npmrc`)
- ✅ Environment variables added to Netlify
- ✅ At least 1 article with cover image exists
- ✅ All images in `public/assets/posts/` committed
- ✅ Build succeeds locally (`npm run build`)
- ✅ No console errors locally
- ✅ Preview works: http://localhost:3000

---

## 🔄 **Continuous Deployment**

### Daily Blog Posts

After you create a new post (via AI workflow):

```bash
# 1. Article created automatically by AI
# 2. Image downloaded automatically by AI

# 3. Commit and push
git add content/posts/{slug}.mdx
git add public/assets/posts/{slug}/cover.jpg
git commit -m "feat: add article about {topic}"
git push origin main

# 4. Netlify auto-deploys (takes 2-3 minutes)
# 5. New article live at: https://blog.klyx.fr/posts/{slug}
```

**Fully automated!** Just commit and push.

---

## 📊 **Build Time**

Expected Netlify build times:
- **First deploy**: 3-5 minutes
- **Subsequent deploys**: 1-2 minutes
- **Cache hits**: 30-60 seconds

---

## 🆘 **Troubleshooting**

### Build Still Failing?

**Check Netlify logs for**:
- Dependency errors → Verify `.npmrc` is committed
- Build errors → Run `npm run build` locally first
- Missing env vars → Check Netlify dashboard

### Images Not Showing?

**Verify**:
- Images committed to repo
- Paths in MDX match actual files
- `public` folder in git (not ignored)

### 404 Errors?

**Check**:
- Build output directory is `.next`
- Next.js plugin installed
- All routes generate properly

---

## 🎯 **Quick Fix Commands**

```bash
# Verify everything locally
npm run build
npm run start

# If works locally, commit everything
git add .
git commit -m "fix: deployment configuration"
git push origin main

# Monitor deploy
# Check Netlify dashboard for build status
```

---

## ✅ **After Successful Deploy**

1. **Test your site**:
   - Visit: https://your-site.netlify.app
   - Check all pages load
   - Verify images show
   - Test navigation

2. **Setup custom domain** (optional):
   - Add `blog.klyx.fr` in Netlify
   - Configure DNS CNAME
   - Wait for SSL (automatic)

3. **Submit to Google**:
   - Google Search Console
   - Submit sitemap: https://blog.klyx.fr/sitemap.xml
   - Verify ownership

4. **Monitor**:
   - Google Analytics
   - Netlify Analytics
   - Build status

---

## 🚀 **Deploy Now**

```bash
# 1. Commit config files
git add netlify.toml .npmrc package.json
git commit -m "chore: configure Netlify deployment"
git push origin main

# 2. Watch Netlify dashboard
# Build should succeed in 2-3 minutes

# ✅ Your blog will be LIVE!
```

---

**Next**: Push to GitHub and Netlify will auto-deploy! 🎉

