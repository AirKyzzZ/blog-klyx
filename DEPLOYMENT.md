# Deployment Guide - Blog Klyx

## Prerequisites

✅ Completed implementation (all files created)  
✅ Dependencies installed (`npm install`)  
✅ At least 1 blog post created  
✅ Environment variables configured  
✅ Build passes locally (`npm run build`)

---

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
# From project root
cd /Users/samsepiol/Downloads/GithubRepos/Work/blog-klyx

# Deploy (first time - will ask setup questions)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? blog-klyx
# - Directory? ./
# - Override settings? No
```

### Step 4: Configure Environment Variables

In Vercel Dashboard (vercel.com/dashboard):

1. Go to your project → Settings → Environment Variables
2. Add the following:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://blog.klyx.fr
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/klyx-studio/call-solution-site-internet
NEXT_PUBLIC_CONTACT_EMAIL=contact@klyx.fr
NEXT_PUBLIC_MAIN_SITE_URL=https://klyx.fr
```

3. Make sure to add them to **Production**, **Preview**, and **Development** environments

### Step 5: Configure Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add domain: `blog.klyx.fr`
3. Follow DNS configuration instructions (see below)

### Step 6: Redeploy

```bash
# Deploy to production
vercel --prod
```

---

## DNS Configuration

### Option A: CNAME Record (Recommended)

In your domain registrar (OVH, Cloudflare, etc.):

1. Go to DNS management
2. Add CNAME record:
   - **Type**: CNAME
   - **Name**: blog
   - **Target**: cname.vercel-dns.com
   - **TTL**: 3600 (or Auto)

### Option B: A Record

If CNAME is not supported:

1. Add A records pointing to Vercel IPs:
   - **Type**: A
   - **Name**: blog
   - **Value**: 76.76.21.21
   - **TTL**: 3600

2. Add another A record:
   - **Value**: 76.76.21.93

**Note**: Vercel IPs may change. Check vercel.com/docs/custom-domains for current IPs.

### SSL Certificate

- Vercel automatically provisions Let's Encrypt SSL certificates
- Wait 24-48 hours for DNS propagation
- Certificate renews automatically

---

## Option 2: Deploy to Custom Server

### Step 1: Build for Production

```bash
npm run build
```

### Step 2: Start Production Server

```bash
npm run start
# Or use PM2 for process management
pm2 start npm --name "blog-klyx" -- start
```

### Step 3: NGINX Configuration

Create `/etc/nginx/sites-available/blog-klyx`:

```nginx
server {
    listen 80;
    server_name blog.klyx.fr;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name blog.klyx.fr;

    # SSL certificates (use Certbot)
    ssl_certificate /etc/letsencrypt/live/blog.klyx.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.klyx.fr/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Cache images
    location ~* \.(jpg|jpeg|png|gif|webp|avif|svg)$ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/blog-klyx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: SSL with Certbot

```bash
sudo certbot --nginx -d blog.klyx.fr
```

---

## Post-Deployment Checklist

### Verification

- [ ] Site accessible at https://blog.klyx.fr
- [ ] SSL certificate valid (green padlock)
- [ ] Homepage loads correctly
- [ ] Blog posts display with images
- [ ] Navigation works (all links)
- [ ] Calendly CTAs open correctly
- [ ] Forms/contact page work
- [ ] Mobile responsive
- [ ] sitemap.xml accessible (/sitemap.xml)
- [ ] RSS feed accessible (/rss.xml)
- [ ] robots.txt accessible (/robots.txt)

### Performance

```bash
# Test with Lighthouse
npm install -g lighthouse
lighthouse https://blog.klyx.fr --view
```

Target scores:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: 100

---

## Google Search Console Setup

### Step 1: Add Property

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Choose "URL prefix"
4. Enter: `https://blog.klyx.fr`

### Step 2: Verify Ownership

**Method A: DNS TXT Record (Recommended)**

1. Copy the TXT record from GSC
2. Add to your domain's DNS:
   - **Type**: TXT
   - **Name**: @ or blog
   - **Value**: google-site-verification=XXXXXXXXXXXX
3. Wait for DNS propagation (5-30 minutes)
4. Click "Verify" in GSC

**Method B: HTML File**

1. Download verification file from GSC
2. Add to `public/` directory
3. Deploy
4. Click "Verify" in GSC

### Step 3: Submit Sitemap

1. In GSC, go to "Sitemaps"
2. Enter: `https://blog.klyx.fr/sitemap.xml`
3. Click "Submit"

### Step 4: Monitor Indexing

- Check "Coverage" report daily
- Fix any errors shown
- Monitor search queries in "Performance" report

---

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to https://analytics.google.com
2. Click "Admin"
3. Create Property:
   - Name: "Blog Klyx"
   - Timezone: France
   - Currency: EUR

### Step 2: Create Data Stream

1. Click "Data Streams"
2. Choose "Web"
3. Enter: `https://blog.klyx.fr`
4. Stream name: "Blog Klyx Web"

### Step 3: Get Measurement ID

1. Copy the Measurement ID (G-XXXXXXXXXX)
2. Add to `.env.local` and Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Step 4: Verify Tracking

1. Visit your site
2. In GA4, go to "Reports" → "Realtime"
3. You should see your visit

### Step 5: Set Up Conversions

1. Go to "Admin" → "Events"
2. Create custom events:
   - `calendly_cta_click` (Goal: Book Appointment)
   - `klyx_link_click` (Goal: Visit Main Site)
   - `share_click` (Goal: Social Share)

---

## Continuous Deployment

### Automatic Deployments (Vercel)

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a PR

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Rollback (If Needed)

### Vercel

1. Go to Deployments in Vercel Dashboard
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

### Custom Server

```bash
# Revert to previous commit
git revert HEAD
npm run build
pm2 restart blog-klyx
```

---

## Monitoring & Maintenance

### Weekly

- [ ] Check GSC for indexing errors
- [ ] Review GA4 traffic
- [ ] Test key pages (homepage, 2-3 posts)

### Monthly

- [ ] Review Lighthouse scores
- [ ] Update dependencies (`npm outdated`)
- [ ] Check broken links
- [ ] Review top-performing content

### Quarterly

- [ ] Full accessibility audit
- [ ] Performance optimization
- [ ] Content audit (update old posts)
- [ ] Backlink analysis

---

## Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### 404 on Dynamic Routes

- Check `generateStaticParams()` in dynamic routes
- Ensure posts exist in `content/posts/`
- Verify frontmatter `slug` matches filename

### Images Not Loading

- Check image paths start with `/`
- Verify images exist in `public/`
- Check Next.js Image configuration in `next.config.ts`

### GA4 Not Tracking

- Verify `NEXT_PUBLIC_GA_ID` environment variable
- Check browser console for errors
- Disable ad blockers for testing
- Use GA4 DebugView for real-time debugging

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Google Search Console**: https://support.google.com/webmasters
- **Contact**: contact@klyx.fr

