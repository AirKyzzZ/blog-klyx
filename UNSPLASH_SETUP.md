# 📸 Unsplash API - Copyright-Free Images

## Official Unsplash REST API Implementation

Uses Unsplash's official API to search and download high-quality, copyright-free images for blog posts.

---

## 🆓 Setup (3 minutes)

### Step 1: Create FREE Unsplash Developer Account

1. **Go to**: https://unsplash.com/developers
2. **Click**: "Register as a developer"
3. **Sign up** (free, no credit card needed)

### Step 2: Create Application

1. **Go to**: https://unsplash.com/oauth/applications
2. **Click**: "New Application"
3. **Accept** the API Use and Guidelines checkbox
4. **Fill in**:
   - Application name: "Klyx Blog"
   - Description: "Blog cover images"
5. **Submit**
6. **Copy your Access Key** (starts with a long string)

### Step 3: Add to .env.local

```bash
# Edit .env.local and add:
UNSPLASH_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
```

**Complete .env.local**:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://blog.klyx.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
UNSPLASH_ACCESS_KEY=YOUR_ACCESS_KEY_HERE
```

---

## 🚀 Usage

### Download All Images (1 command)

```bash
npm run get-images
```

**What happens**:
- ✅ Searches Unsplash for relevant photos
- ✅ Downloads best match for each article
- ✅ Saves to `public/assets/posts/{slug}/cover.jpg`
- ✅ Tracks downloads (required by Unsplash)

**Time**: ~80 seconds for 8 articles

### Download Single Image

```bash
npm run get-image content/posts/my-article.mdx
```

### Force Re-download

```bash
npm run get-image content/posts/my-article.mdx --force
```

---

## 🎯 How It Works

### Intelligent Search

The script analyzes your article and creates specific search queries:

| Article Topic | Unsplash Query |
|--------------|----------------|
| Création/Développement web | "web development workspace laptop code" |
| Coût/Prix/Budget | "business planning calculator finance" |
| Choisir agence | "business meeting collaboration office" |
| SEO/Référencement | "analytics data graph marketing" |
| Étude de cas | "success growth chart achievement" |
| Événements | "conference event networking" |
| Tendances/Design | "modern design workspace creative" |
| WordPress/Performance | "speed technology optimization" |
| Bordeaux (any) | "bordeaux france architecture" |

### Search Parameters

- **Orientation**: Landscape (perfect for 16:9 blog covers)
- **Content Filter**: High (family-friendly only)
- **Results**: Top 1 most relevant photo
- **Quality**: Regular (1080px width - perfect balance)

---

## ✅ Image License

All images from Unsplash are:
- ✅ **100% FREE** to use
- ✅ **Commercial use** allowed
- ✅ **No attribution** required (with API)
- ✅ **High quality** professional photos
- ✅ **No copyright** issues

**Unsplash License**: https://unsplash.com/license

---

## 📊 API Limits

### Demo Mode (Default)
- **50 requests/hour**
- **Perfect for**:
  - Testing
  - Small blogs (< 50 posts)
  - Occasional updates

### Production Mode (Apply for approval)
- **5000 requests/hour**
- **How to apply**: https://unsplash.com/documentation#creating-a-developer-account
- **Requirements**:
  - Active application
  - Following API guidelines
  - Proper attribution (automatic with API)

**For your blog**: Demo mode is MORE than enough! You have 8 articles = 8 requests.

---

## 🎨 Image Quality

Downloaded images are:
- ✅ Professional photography
- ✅ 1080px width (perfect for web)
- ✅ Landscape orientation (16:9 suitable)
- ✅ Content-safe (filtered)
- ✅ Optimized file size

---

## 🔄 Complete Workflow

```bash
# 1. Get FREE Unsplash API key (3 min)
# https://unsplash.com/developers

# 2. Add to .env.local
echo "UNSPLASH_ACCESS_KEY=your_key" >> .env.local

# 3. Download all images (80 sec)
npm run get-images

# 4. Verify
ls public/assets/posts/*/cover.jpg

# 5. Refresh browser
npm run dev
# Visit: http://localhost:3000

# ✅ All 8 posts appear with professional photos!
```

**Total time**: ~5 minutes

---

## 🆘 Troubleshooting

### "UNSPLASH_ACCESS_KEY not set"

**Solution**: Make sure `.env.local` has:
```bash
UNSPLASH_ACCESS_KEY=your_actual_key
```

### "No images found"

**Solution**: 
- Check your API key is valid
- Try broader search terms
- Check Unsplash API status: https://status.unsplash.com

### "Rate limit exceeded"

**Solution**: 
- Wait 1 hour (demo mode: 50/hour)
- Or apply for production (5000/hour)

### Permission errors

**Solution**:
```bash
sudo chown -R samsepiol:staff ~/Downloads/GithubRepos/Work/blog-klyx
```

---

## 🆚 Why Unsplash?

### vs Freepik
- ✅ Better API (Freepik hit limits)
- ✅ Higher quality photos
- ✅ Simpler integration
- ✅ More reliable

### vs Pexels
- ✅ Larger library
- ✅ Better search
- ✅ More consistent quality

### vs AI Generation
- ✅ No monthly limits
- ✅ Real professional photos
- ✅ Instant results
- ✅ 100% reliable

---

## 💡 Pro Tips

### Get Better Results

1. **Edit search queries** in `generateSearchQuery()` function
2. **Add more specific terms** for your niche
3. **Use `--force` flag** to try different images

### For New Articles

Every time you create a new article:
```bash
npm run get-image content/posts/new-article.mdx
```

**Takes 10 seconds!**

### Customize Images Later

Downloaded images can be:
- Cropped/edited with Photoshop/Canva
- Compressed with TinyPNG
- Replaced anytime with `--force`

---

## 📋 API Guidelines (Auto-followed)

The script automatically:
- ✅ Triggers download tracking (required)
- ✅ Uses proper API headers
- ✅ Respects rate limits (1s delay between requests)
- ✅ Filters content appropriately
- ✅ Uses landscape orientation

You don't need to do anything - it's all handled! 🎉

---

## 🎯 Quick Start

```bash
# 1. Get key (3 min)
# https://unsplash.com/developers

# 2. Add to .env.local
UNSPLASH_ACCESS_KEY=your_key

# 3. Run (80 sec)
npm run get-images

# ✅ Done! All 8 images downloaded!
```

---

**Ready?** Get your API key and run `npm run get-images`! 🚀

