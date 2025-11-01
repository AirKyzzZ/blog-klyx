# Image Guide - Blog Klyx

## Quick Reference

**Cover Images**: 1200x630px (OG image standard)  
**Format**: WebP or JPG  
**Max Size**: 200KB per image  
**Location**: `/public/assets/posts/{slug}/cover.jpg`

---

## Creating Cover Images

### Dimensions & Specs

- **Size**: 1200 x 630 pixels (1.91:1 ratio)
- **Format**: WebP (preferred) or JPG
- **Quality**: 85% compression
- **Max file size**: 200KB
- **Color space**: sRGB

### Design Guidelines

**Visual Style**:
- Minimalist black & white design
- Use accent color #6b2fcd for highlights
- Clear, readable typography
- Generous whitespace
- Klyx branding subtle

**Content**:
- Article title (shortened if needed)
- Klyx logo (small, corner)
- Simple icon or illustration
- No busy backgrounds

### Tools

**Free**:
- Canva (templates available)
- Figma (design from scratch)
- Photopea (Photoshop alternative)

**Paid**:
- Adobe Photoshop
- Sketch
- Affinity Designer

---

## Temporary Placeholder Solution

Until you create proper cover images, use placeholder images:

### Option 1: Text-Based Placeholders

Create simple colored backgrounds with article title text.

### Option 2: Use Placeholder Services

```markdown
# In frontmatter, temporarily use:
coverImage: "https://placehold.co/1200x630/6b2fcd/white?text=Article+Title"
```

### Option 3: Create Canva Template

1. Go to Canva.com
2. Create custom size: 1200 x 630px
3. Design template with:
   - Black background
   - White text for title
   - Purple (#6b2fcd) accent bar or element
   - "KLYX" text in corner

4. Save as template
5. Duplicate for each article
6. Export as JPG (high quality)

---

## Image Optimization

### Before Adding to Project

**Compress images**:

1. **TinyPNG** (https://tinypng.com)
   - Drag & drop your image
   - Download compressed version
   - 70-80% size reduction

2. **Squoosh** (https://squoosh.app)
   - More control over quality
   - Can convert to WebP/AVIF
   - Side-by-side comparison

3. **ImageOptim** (macOS app)
   - Batch process multiple images
   - Lossless compression

### Command Line (Optional)

```bash
# Install ImageMagick
brew install imagemagick

# Resize and optimize
convert input.jpg -resize 1200x630 -quality 85 output.jpg

# Convert to WebP
cwebp -q 85 input.jpg -o output.webp
```

---

## File Naming Convention

```
/public/assets/posts/
  {article-slug}/
    cover.jpg          # Main cover image
    image-1.jpg        # Additional images
    screenshot.jpg     # Screenshots
    diagram.jpg        # Diagrams
```

**Examples**:
```
/public/assets/posts/creation-site-web-bordeaux-2025/
  cover.jpg
  
/public/assets/posts/cout-creation-site-web/
  cover.jpg
  pricing-table.jpg
```

---

## In-Content Images

### Specs

- **Max width**: 1200px
- **Format**: WebP or JPG
- **Quality**: 85%
- **Max size**: 150-200KB each

### Usage in MDX

```markdown
![Description de l'image](/assets/posts/article-slug/image-name.jpg)
```

Next.js automatically optimizes images with the `<Image />` component through our MDXComponents.

---

## SEO for Images

### Alt Text Best Practices

**Good**:
```markdown
![Exemple de site web créé par Klyx Studio à Bordeaux](/assets/posts/creation-bordeaux/example-site.jpg)
```

**Bad**:
```markdown
![image](/assets/posts/creation-bordeaux/img1.jpg)
```

**Rules**:
- Describe what's in the image
- Include keywords naturally
- Keep it concise (125 characters max)
- Be specific and descriptive

---

## Quick Start: Create Your First Cover

### Using Canva (5 minutes)

1. **Go to Canva** → Custom size → 1200 x 630px

2. **Design**:
   - Background: Black (#000000)
   - Add title text (white, bold, 60-80pt)
   - Add accent element (purple #6b2fcd)
   - Add "KLYX" in corner (white, 24pt)

3. **Export**:
   - Download → JPG → High quality
   - Compress with TinyPNG
   - Save to `/public/assets/posts/{slug}/cover.jpg`

### Using Figma (10 minutes)

1. **Create frame** 1200 x 630px
2. **Design** following brand guidelines
3. **Export** → JPG 2x → 85% quality
4. **Compress** with Squoosh
5. **Save** to project

---

## Batch Creating Covers

If you need to create multiple covers quickly:

### Template Approach

1. Create one master template in Canva/Figma
2. Duplicate for each article
3. Change title text only
4. Batch export all
5. Batch compress with TinyPNG or ImageOptim

### Design System

Keep consistent:
- Same dimensions (1200x630)
- Same color scheme (black/white/purple)
- Same typography
- Same Klyx branding placement

---

## Image Checklist

Before publishing any article with images:

- [ ] Cover image is 1200x630px
- [ ] File size < 200KB
- [ ] Format is WebP or JPG
- [ ] Saved in correct directory (`/public/assets/posts/{slug}/`)
- [ ] Alt text is descriptive and includes keywords
- [ ] Image displays correctly in dev mode
- [ ] Mobile layout looks good
- [ ] OG image shows correctly (test with https://www.opengraph.xyz/)

---

## Testing Images

### Local Testing

```bash
npm run dev
# Visit http://localhost:3000/posts/{slug}
```

Check:
- Cover image loads
- Image is not pixelated
- Mobile display is correct
- Loading is fast

### OG Image Testing

Test how your cover appears on social media:

1. **OG Debugger**: https://www.opengraph.xyz/
2. **Twitter Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

---

## Troubleshooting

### Image Not Showing

**Check**:
1. File path starts with `/` (e.g., `/assets/posts/...`)
2. File exists in `public/` directory
3. File extension matches (`.jpg` vs `.jpeg` vs `.webp`)
4. No typos in frontmatter `coverImage` field

### Image Too Large

**Solutions**:
1. Compress with TinyPNG (https://tinypng.com)
2. Reduce dimensions if > 1200x630
3. Lower quality to 80-85%
4. Convert to WebP format

### Image Looks Bad on Social Media

**Solutions**:
1. Verify dimensions are exactly 1200x630
2. Increase image quality
3. Test with OG debugger tools
4. Clear social media cache (share new post to refresh)

---

## Resources

- **Canva**: https://canva.com (free tier sufficient)
- **Figma**: https://figma.com (free for personal use)
- **TinyPNG**: https://tinypng.com (compress images)
- **Squoosh**: https://squoosh.app (Google's optimizer)
- **PlaceIMG**: https://placehold.co (temporary placeholders)

---

## Current Placeholder Images Needed

Create cover images for these posts:

1. `/public/assets/posts/creation-bordeaux/cover.jpg`
2. `/public/assets/posts/cout-creation/cover.jpg`
3. `/public/assets/posts/choisir-agence/cover.jpg`
4. `/public/assets/posts/seo-local/cover.jpg`
5. `/public/assets/posts/etude-cas/cover.jpg`
6. `/public/assets/posts/calendrier-events/cover.jpg`
7. `/public/assets/posts/tendances-design/cover.jpg`
8. `/public/assets/posts/wordpress-speed/cover.jpg`

**Pro tip**: Create the first one perfectly, then use it as template for the others (just change the title text).

---

**Need help with image creation?** Contact the design team or refer to this guide.

