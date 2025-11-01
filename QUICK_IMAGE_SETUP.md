# 🚀 Quick Setup: Free AI Image Generation

## ⚡ Generate All 8 Cover Images in 3 Minutes

**100% FREE • No Credit Card • Fully Automated**

---

## Step 1: Get FREE API Key (1 minute)

1. **Go to**: https://huggingface.co/join
2. **Sign up** (free, no credit card)
3. **Go to**: https://huggingface.co/settings/tokens
4. **Click**: "New token"
5. **Name**: "Blog Klyx"
6. **Type**: Read
7. **Click**: "Generate"
8. **Copy** the token (starts with `hf_`)

---

## Step 2: Add API Key (30 seconds)

Edit `.env.local` and add this line:

```bash
HUGGING_FACE_API_KEY=hf_your_token_here
```

**Full .env.local should look like**:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://blog.klyx.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Step 3: Generate All Images (2-3 minutes)

```bash
# Install dependencies first (if not done)
npm install

# Generate all 8 cover images automatically!
npm run generate-all-images
```

**What happens**:
- ✅ Reads each article's title, description, tags
- ✅ Creates intelligent AI prompts
- ✅ Generates professional 1200x630px images
- ✅ Saves to `public/assets/posts/{slug}/cover.jpg`
- ✅ All in one command!

**Wait**: 2-3 minutes (3 seconds between each image)

---

## Step 4: Verify (10 seconds)

```bash
# Check images were created
ls public/assets/posts/*/cover.jpg

# You should see 8 files:
# public/assets/posts/creation-bordeaux/cover.jpg
# public/assets/posts/cout-creation/cover.jpg
# ... etc
```

---

## Step 5: Test in Browser (immediate)

Refresh http://localhost:3000

**You'll see**:
✅ All 8 blog posts with AI-generated covers!  
✅ Professional, content-relevant images  
✅ Consistent brand style (black/white/purple)

---

## 🎨 For Future Articles

Every time you create a new article:

```bash
# 1. Create article
touch content/posts/new-article.mdx
# Edit with content...

# 2. Generate AI cover (10 seconds)
npm run generate-image content/posts/new-article.mdx

# 3. Done! Image created automatically
```

---

## 🆓 Why This is FREE

- **Hugging Face Inference API**: Free tier forever
- **No credit card**: Never required
- **No limits**: Unlimited usage (with rate limiting)
- **Commercial use**: Allowed
- **Model**: Stable Diffusion XL (state-of-the-art)

---

## 🎯 Complete Commands

```bash
# One-time setup
# 1. Get free API key from huggingface.co
# 2. Add to .env.local

# Generate all images for existing articles
npm run generate-all-images

# Generate image for single new article
npm run generate-image content/posts/my-article.mdx

# Regenerate existing image (if not satisfied)
npm run generate-image content/posts/my-article.mdx --force
```

---

## ⚡ Super Quick Summary

1. Get free key: https://huggingface.co/settings/tokens
2. Add to `.env.local`
3. Run: `npm run generate-all-images`
4. Wait 2-3 minutes
5. ✅ **All 8 cover images created!**

**Total time**: 3-4 minutes  
**Total cost**: $0.00

---

## 🆘 Troubleshooting

**"Model is loading"**: Wait 20 seconds, retry  
**"Rate limit"**: Script auto-waits 3 seconds between images  
**"Invalid API key"**: Check it starts with `hf_` and is in `.env.local`

**See `AI_IMAGE_GENERATION.md` for complete documentation**

---

**Ready?** Get your free API key and run the command! 🎨🚀

