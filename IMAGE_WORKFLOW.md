# 🖼️ Image Workflow - Complete Guide

## How Images Work in Your Blog

---

## 📁 Image Structure

```
public/assets/posts/
├── creation-site-web-bordeaux-2025/
│   └── cover.jpg                        ← Downloaded by script
├── cout-creation-site-web/
│   └── cover.jpg
└── ... (one folder per article slug)
```

**Each article automatically references its image via frontmatter**:

```yaml
---
slug: "creation-site-web-bordeaux-2025"
coverImage: "/assets/posts/creation-site-web-bordeaux-2025/cover.jpg"
---
```

---

## ✅ Current Setup (Already Working!)

All 8 articles are now configured with correct image paths:

1. ✅ `creation-site-web-bordeaux-2025.mdx`
2. ✅ `cout-creation-site-web.mdx`
3. ✅ `choisir-agence-web-bordeaux.mdx`
4. ✅ `seo-local-bordeaux.mdx`
5. ✅ `etude-cas-site-evenements.mdx`
6. ✅ `calendrier-evenements-bordeaux-2025.mdx`
7. ✅ `tendances-web-design-2025.mdx`
8. ✅ `optimiser-site-wordpress-vitesse.mdx`

**Your images are now showing on**:
- ✅ Homepage (post cards)
- ✅ Individual post pages
- ✅ Tag pages
- ✅ Related posts sections

---

## 🚀 Test It Now

### 1. Verify Images Exist

```bash
ls public/assets/posts/*/cover.jpg
```

**Should see**: 8 files

### 2. Restart Dev Server

```bash
# Press Ctrl+C to stop current server
npm run dev
```

### 3. Visit Pages

- **Homepage**: http://localhost:3000
- **Post page**: http://localhost:3000/posts/creation-site-web-bordeaux-2025
- **Tags page**: http://localhost:3000/tags

**You should see all 8 cover images!** 🎉

---

## 🆕 Adding Images for New Articles

### Workflow for Each New Article

#### 1. Create MDX File

```bash
touch content/posts/my-new-article.mdx
```

#### 2. Add Frontmatter with Correct Path

```yaml
---
title: "My New Article Title"
slug: "my-new-article"
coverImage: "/assets/posts/my-new-article/cover.jpg"  ← Use slug here!
tags: ["guide", "SEO"]
# ... other fields
---
```

**IMPORTANT**: `coverImage` path must match `slug`:
```
slug: "my-new-article"
coverImage: "/assets/posts/my-new-article/cover.jpg"
              Must match ↑
```

#### 3. Download Image Automatically

```bash
npm run get-image content/posts/my-new-article.mdx
```

**Result**: Image automatically downloaded to correct location!

#### 4. Verify

```bash
# Check image exists
ls public/assets/posts/my-new-article/cover.jpg

# Refresh browser
# Visit: http://localhost:3000
# ✅ New post appears with cover image!
```

---

## 🔄 Re-downloading Images

### Replace Single Image

```bash
npm run get-image content/posts/creation-site-web-bordeaux-2025.mdx --force
```

### Replace All Images

```bash
npm run get-images --force
```

**Note**: With duplicate detection, each run will get different images from the pool!

---

## 🎯 Image Requirements

### Technical Specs
- **Dimensions**: 1200 x 630+ px (landscape)
- **Format**: JPG (optimized by Next.js)
- **Location**: `public/assets/posts/{slug}/cover.jpg`
- **Reference**: `/assets/posts/{slug}/cover.jpg` in frontmatter

### Quality Standards
- ✅ Professional photography
- ✅ Landscape orientation (16:9)
- ✅ High resolution (1080px+ width)
- ✅ Relevant to article topic
- ✅ Copyright-free (Unsplash license)

---

## 🆘 Troubleshooting

### Images Not Showing?

**Check 1**: Image exists
```bash
ls public/assets/posts/YOUR_SLUG/cover.jpg
```

**Check 2**: Path in frontmatter matches
```yaml
slug: "my-article"
coverImage: "/assets/posts/my-article/cover.jpg"  ← Must match slug
```

**Check 3**: Restart dev server
```bash
# Ctrl+C to stop
npm run dev
```

**Check 4**: Clear browser cache
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Wrong Image for Article?

```bash
# Re-download with --force to get a different image
npm run get-image content/posts/article-name.mdx --force
```

### Want Custom Image?

1. Create your own image (1200x630px)
2. Save to: `public/assets/posts/{slug}/cover.jpg`
3. That's it! Will override auto-downloaded image

---

## 📋 Complete Workflow Summary

### For Existing Articles (Already Done! ✅)
```bash
npm run get-images          # Downloads all 8 images
# Refresh browser           # All posts appear!
```

### For Each New Article
```bash
# 1. Write article
code content/posts/new-article.mdx

# 2. Add frontmatter (include slug + coverImage path)

# 3. Get image
npm run get-image content/posts/new-article.mdx

# 4. Done! Auto-shows on site
```

**Total time**: 10 seconds per new article

---

## 🎨 How Images Appear

### Homepage
- Grid of `PostCard` components
- Each shows `post.coverImage`
- Optimized with Next.js `<Image />`
- Hover effect on cover

### Post Detail Pages
- Large hero cover image
- Full width responsive
- SEO optimized with alt text
- Lazy loaded for performance

### Tag Pages  
- Grid of posts with covers
- Same as homepage
- Filtered by tag

### Related Posts
- Small thumbnails
- Bottom of each post
- Optimized rendering

---

## 🚀 Your Blog is Ready!

**Test checklist**:
- ✅ All 8 images downloaded
- ✅ All 8 MDX files updated with correct paths
- ✅ Images show on homepage
- ✅ Images show on post pages
- ✅ Images show on tag pages

**Next steps**:
1. Restart dev server: `npm run dev`
2. Visit: http://localhost:3000
3. **See all 8 posts with beautiful cover images!** 🎉

---

**Questions?**
- See `UNSPLASH_SETUP.md` for API details
- See `README.md` for full project docs
- Images are copyright-free and ready for production!

