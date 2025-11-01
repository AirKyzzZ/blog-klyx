# 🎨 AI Image Generation Guide - 100% FREE

## Automated Cover Image Creation with AI

Your blog now includes **automatic AI-generated cover images** for all articles using Hugging Face's free Stable Diffusion API!

---

## 🆓 Setup (One-Time, 2 minutes)

### Step 1: Get FREE Hugging Face API Key

1. **Create account** (if you don't have one):
   - Go to https://huggingface.co/join
   - Sign up for free (no credit card required)

2. **Generate API token**:
   - Visit https://huggingface.co/settings/tokens
   - Click "New token"
   - Name: "Blog Klyx Image Generator"
   - Type: **Read** (free tier)
   - Click "Generate"
   - Copy your token (starts with `hf_`)

### Step 2: Add to Environment Variables

Edit `.env.local`:

```bash
# Add this line:
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**That's it!** No payment required, completely free! ✅

---

## 🚀 Usage

### Generate Image for One Article

```bash
npm run generate-image content/posts/my-article.mdx
```

**What happens**:
1. Reads article title, description, and tags
2. Creates intelligent prompt based on content
3. Generates 1200x630px cover image via AI
4. Saves to `public/assets/posts/{slug}/cover.jpg`

**Time**: ~10-15 seconds per image

### Generate Images for ALL Articles

```bash
npm run generate-all-images
```

**What happens**:
- Scans all `.mdx` files in `content/posts/`
- Generates AI cover image for each (if not exists)
- Automatically spaces requests (free API rate limit)

**Time**: ~2-3 minutes for 8 articles

### Regenerate Existing Images

```bash
npm run generate-image content/posts/my-article.mdx --force
```

The `--force` flag overwrites existing images.

---

## 🎨 How It Works

### Intelligent Prompt Generation

The script automatically creates prompts based on your article:

**Example Article**:
```yaml
title: "Création site web Bordeaux — Guide 2025"
description: "Guide complet pour créer un site web à Bordeaux"
tags: ["guide", "Bordeaux", "SEO"]
```

**Generated Prompt**:
```
minimalist professional blog header, clean design, modern, high quality, 
Création site web Bordeaux theme, guide, Bordeaux, SEO concept, 
black and white with purple accent color #6b2fcd, 16:9 aspect ratio, 
centered composition, generous whitespace, professional photography style, 
no text overlay, abstract modern design
```

**Result**: Professional, relevant, on-brand cover image ✨

### AI Model Used

**Stable Diffusion XL Base 1.0**:
- Free via Hugging Face
- High-quality 1200x630 images
- Fast generation (~10-15s)
- No daily limits on free tier
- Commercial use allowed

---

## 📋 Complete Workflow

### For New Articles

1. **Write your article**:
   ```bash
   # Create new post
   touch content/posts/my-new-article.mdx
   # Add frontmatter + content
   ```

2. **Generate AI cover image**:
   ```bash
   npm run generate-image content/posts/my-new-article.mdx
   ```

3. **Review image**:
   ```bash
   # Image saved at: public/assets/posts/my-new-article/cover.jpg
   # View in browser at localhost:3000
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "content: Add new article with AI-generated cover"
   git push
   # Auto-deploys to Vercel
   ```

### Batch Generate for Existing Articles

```bash
# Generate all missing images at once
npm run generate-all-images

# Wait 2-3 minutes...
# ✅ All 8 cover images created!
```

---

## 🎛️ Customization

### Modify Image Style

Edit `scripts/generate-cover-image.ts`, function `generatePrompt()`:

```typescript
function generatePrompt(title: string, description: string, tags: string[]): string {
  // Customize these variables:
  const baseStyle = 'minimalist professional blog header';
  const colorScheme = 'black and white with purple #6b2fcd';
  const layout = '16:9 aspect ratio, centered';
  
  // Add your custom style here
  const customStyle = 'modern tech aesthetic, gradient background';
  
  return `${baseStyle}, ${customStyle}, ${colorScheme}...`;
}
```

### Change AI Model (Still Free)

Other free Hugging Face models you can try:

```typescript
// In generate-cover-image.ts, line 9:
const HF_MODEL = 'runwayml/stable-diffusion-v1-5'; // Faster, simpler
// or
const HF_MODEL = 'stabilityai/stable-diffusion-2-1'; // Alternative
```

All are **100% free** on Hugging Face!

---

## 🔄 Alternative Free Options

### Option 1: Bing Image Creator (Manual but Free)

1. Visit https://www.bing.com/create
2. Use the generated prompt from the script
3. Download the best result
4. Save to `public/assets/posts/{slug}/cover.jpg`

**Pros**: Uses DALL-E 3 (excellent quality)  
**Cons**: Manual process, slower

### Option 2: Leonardo.AI (Free Tier)

1. Sign up at https://leonardo.ai (free)
2. 150 free credits daily
3. API available on free tier

Update script to use Leonardo API (similar approach).

### Option 3: Local Stable Diffusion (100% Free, No Limits)

For unlimited free generation:

1. **Install Stable Diffusion Web UI**:
   ```bash
   # Requires Python 3.10+
   git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
   cd stable-diffusion-webui
   ./webui.sh
   ```

2. **Modify script to use local API**:
   ```typescript
   // Change endpoint to:
   const LOCAL_API = 'http://localhost:7860/sdapi/v1/txt2img';
   ```

**Pros**: Unlimited free usage, no API keys  
**Cons**: Requires powerful computer (GPU recommended)

---

## 💡 Pro Tips

### For Best Results

1. **Specific prompts**: More detailed = better images
2. **Consistent style**: Keep the same base prompt for brand consistency
3. **Review and iterate**: If image isn't perfect, add `--force` to regenerate
4. **Batch processing**: Use `--all` for efficiency

### Cost-Free Forever

- **Hugging Face**: Free tier has no expiration
- **No credit card**: Never required
- **Commercial use**: Allowed with these models
- **Unlimited**: No hard limits on free tier (just rate limiting)

### Quality Optimization

If images aren't perfect:

1. **Refine the prompt** in `generatePrompt()` function
2. **Try different models** (all free)
3. **Increase inference steps** (slower but better quality):
   ```typescript
   num_inference_steps: 50 // Default is 30
   ```

---

## 🚨 Troubleshooting

### Error: "Model is loading"

**Solution**: Wait 20 seconds and retry. Free models cold-start on first use.

### Error: "Rate limit exceeded"

**Solution**: Free tier has rate limits. Script automatically waits 3 seconds between images.

### Error: "Invalid API key"

**Solution**: 
- Check `.env.local` has correct key
- Key should start with `hf_`
- Verify at https://huggingface.co/settings/tokens

### Images don't match brand

**Solution**: Edit the `generatePrompt()` function to emphasize your brand style:
```typescript
const colorScheme = 'MUST USE black and white ONLY with purple #6b2fcd accent';
```

---

## 📊 Comparison: AI vs Manual

### AI Generation (Recommended)

**Pros**:
- ✅ 100% free forever
- ✅ Fully automated
- ✅ Content-aware (based on article)
- ✅ Consistent style
- ✅ Fast (10-15s per image)
- ✅ Scalable (generate 100s of images)

**Cons**:
- Sometimes needs iteration
- Requires API key setup (one-time)

### Manual Creation (Canva)

**Pros**:
- ✅ Full control
- ✅ Pixel-perfect results

**Cons**:
- ❌ Time-consuming (5-10 min per image)
- ❌ Manual work for each article
- ❌ Consistency harder to maintain

---

## 🎯 Recommended Workflow

### Initial Setup (8 existing articles)

```bash
# 1. Get Hugging Face API key (free)
# 2. Add to .env.local
# 3. Generate all images at once:
npm run generate-all-images

# Wait 2-3 minutes...
# ✅ All 8 cover images created!
```

### For Each New Article

```bash
# 1. Write article (content/posts/new-article.mdx)
# 2. Generate cover:
npm run generate-image content/posts/new-article.mdx

# 3. Review at localhost:3000
# 4. If not perfect, regenerate:
npm run generate-image content/posts/new-article.mdx --force

# 5. Deploy when happy
```

---

## 🔐 API Key Security

### Local Development

Store in `.env.local` (gitignored):
```bash
HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxx
```

### GitHub Actions (Optional)

If you want automated image generation in CI:

1. Go to GitHub repo → Settings → Secrets
2. Add secret: `HUGGING_FACE_API_KEY`
3. Images generate automatically on new articles

### Vercel (Not Needed)

You don't need the API key in Vercel since image generation happens locally before deployment.

---

## 📈 Free Tier Limits

**Hugging Face Inference API (Free)**:
- ✅ Unlimited requests (with rate limiting)
- ✅ No expiration
- ✅ No credit card required
- ✅ Commercial use allowed
- ⚠️ Rate limit: ~1 request every 3 seconds
- ⚠️ Cold start: First request takes ~20s

**Perfect for**:
- Small to medium blogs (our case)
- Occasional image generation
- Budget-conscious projects

---

## 🎨 Example: Generate Now

Try it right now:

```bash
# 1. Add your API key to .env.local
echo "HUGGING_FACE_API_KEY=hf_your_key_here" >> .env.local

# 2. Install tsx (if not installed)
npm install

# 3. Generate all 8 images
npm run generate-all-images
```

**In 2-3 minutes, all your cover images will be created!** 🎉

---

## 🆘 Need Help?

### Getting API Key
- Visit: https://huggingface.co/settings/tokens
- Guide: https://huggingface.co/docs/hub/security-tokens

### Hugging Face Docs
- API Docs: https://huggingface.co/docs/api-inference
- Models: https://huggingface.co/models?pipeline_tag=text-to-image

### Contact
- Email: contact@klyx.fr
- Check script output for specific errors

---

## ✨ Summary

**Setup**: 2 minutes (get free API key)  
**Generate 8 images**: 2-3 minutes  
**Cost**: $0.00 forever  
**Quality**: Professional AI-generated covers  
**Automation**: Run 1 command per article  

**Your images will be created automatically based on article content!** 🚀

---

## 🎉 Quick Start

```bash
# 1. Get free API key from huggingface.co
# 2. Add to .env.local
# 3. Run this:
npm run generate-all-images

# ✅ Done! All 8 cover images created in 2-3 minutes!
```

**No payment. No subscription. 100% free forever.** 🎊

