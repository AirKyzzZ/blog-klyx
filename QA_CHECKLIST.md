# QA Checklist - Blog Klyx

## Pre-Deployment Testing

### ✅ Build & Installation

- [ ] `npm install` completes without errors
- [ ] `npm run build` completes successfully
- [ ] `npm run start` runs without errors
- [ ] No console errors in development mode
- [ ] TypeScript compilation passes without errors
- [ ] ESLint passes without errors

---

## Functionality Testing

### Homepage

- [ ] Hero section displays correctly
- [ ] Featured posts load (or "no posts" message)
- [ ] All links work (navigation, CTAs, posts)
- [ ] Calendly CTA opens correctly
- [ ] Mobile menu works on mobile devices
- [ ] Layout is responsive (mobile, tablet, desktop)

### Blog Post Pages

- [ ] Post content renders correctly
- [ ] MDX formatting works (headings, lists, links, code)
- [ ] Cover image displays
- [ ] Reading time shows correctly
- [ ] Tags display and link correctly
- [ ] Share buttons work (Twitter, LinkedIn, Copy)
- [ ] Internal links to klyx.fr work
- [ ] Internal blog links work
- [ ] Calendly inline CTA present
- [ ] Author card displays
- [ ] Related posts section shows (when available)
- [ ] Breadcrumb navigation present

### Tag Pages

- [ ] All tags page lists all tags with counts
- [ ] Individual tag pages filter posts correctly
- [ ] Tag navigation works
- [ ] Empty state shows when no posts (if applicable)

### About Page

- [ ] Content displays correctly
- [ ] Links to klyx.fr work
- [ ] Calendly CTA present
- [ ] Contact email link works

### Contact Page

- [ ] Email mailto link works
- [ ] Calendly CTA or embed present
- [ ] All information displayed correctly

### SEO Routes

- [ ] `/sitemap.xml` accessible and valid XML
- [ ] `/rss.xml` accessible and valid RSS 2.0
- [ ] `/robots.txt` accessible with correct content

---

## SEO Validation

### Meta Tags (Check on each page type)

- [ ] `<title>` tag present and unique per page
- [ ] Meta description present (150-160 chars)
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Twitter Card tags
- [ ] Canonical URL present
- [ ] Keywords meta tag (on blog posts)

### JSON-LD Structured Data

Test with: https://search.google.com/test/rich-results

- [ ] WebSite schema on homepage
- [ ] LocalBusiness schema on all pages
- [ ] Article schema on blog posts
- [ ] Breadcrumb schema on blog posts
- [ ] No errors in Rich Results Test

### Sitemap Validation

Test with: https://www.xml-sitemaps.com/validate-xml-sitemap.html

- [ ] Sitemap is valid XML
- [ ] All posts included
- [ ] Static pages included (/, /about, /contact, /tags)
- [ ] URLs are absolute (include https://blog.klyx.fr)
- [ ] lastmod dates present

### Social Media Preview

Test with:
- OG Debugger: https://www.opengraph.xyz/
- Twitter Validator: https://cards-dev.twitter.com/validator

- [ ] Cover images display correctly (1200x630)
- [ ] Title and description show correctly
- [ ] No broken images

---

## Performance Testing

### Lighthouse Audit (Run on 3 pages minimum)

Target scores:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: 100

**Pages to test**:
1. Homepage (/)
2. Blog post (/posts/creation-site-web-bordeaux-2025)
3. About page (/about)

### Core Web Vitals

- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1
- [ ] INP (Interaction to Next Paint): < 200ms

### Additional Performance Checks

- [ ] Images load with WebP/AVIF format
- [ ] Images are lazy-loaded below fold
- [ ] First Load JS < 200KB
- [ ] No render-blocking resources
- [ ] Fonts load with font-display: swap
- [ ] CSS is minified
- [ ] JS is minified

---

## Accessibility Testing

### Automated Testing

Run axe DevTools extension on:
- [ ] Homepage
- [ ] Blog post page
- [ ] Tags page
- [ ] About page
- [ ] Contact page

**Target**: 0 violations, 0 warnings

### Manual Accessibility Checks

- [ ] Skip-to-content link works (Tab on page load)
- [ ] All interactive elements keyboard accessible
- [ ] Focus states visible on all elements
- [ ] Color contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Images have descriptive alt text
- [ ] Headings are hierarchical (H1 → H2 → H3)
- [ ] Links have descriptive text (no "click here")
- [ ] Forms have proper labels
- [ ] ARIA labels where needed

### Screen Reader Testing (Optional)

- [ ] Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] Navigation makes sense
- [ ] Content is announced properly
- [ ] Images are described

---

## Mobile & Responsive Testing

### Devices to Test

**Mobile**:
- [ ] iPhone 13/14 (390x844)
- [ ] iPhone SE (375x667)
- [ ] Android (360x800)

**Tablet**:
- [ ] iPad (768x1024)
- [ ] iPad Pro (1024x1366)

**Desktop**:
- [ ] Laptop (1366x768)
- [ ] Desktop (1920x1080)

### Mobile-Specific Checks

- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scroll
- [ ] Font sizes readable (≥16px body text)
- [ ] Mobile menu works smoothly
- [ ] Forms usable on mobile
- [ ] Images scale properly
- [ ] Calendly modal works on mobile

---

## Browser Compatibility

Test on:

**Desktop**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Mobile**:
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)

---

## Analytics & Tracking

### Google Analytics 4

- [ ] GA4 script loads (check Network tab)
- [ ] Page views tracked (check Realtime report)
- [ ] Custom events fire:
  - [ ] calendly_cta_click
  - [ ] klyx_link_click
  - [ ] share_click
- [ ] No console errors from GA4

### Event Tracking Test

1. Click Calendly CTA → Check GA4 Realtime events
2. Click klyx.fr link → Check event fires
3. Click share button → Check event fires

---

## Security & Headers

### HTTP Headers (check with browser DevTools)

- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-XSS-Protection: 1; mode=block
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Content-Security-Policy present (if configured)

### SSL Certificate

- [ ] HTTPS works
- [ ] Certificate valid
- [ ] No mixed content warnings
- [ ] HTTP redirects to HTTPS

---

## Content Quality

### Each Blog Post

- [ ] Title 50-60 characters
- [ ] Meta description 150-160 characters
- [ ] Frontmatter complete and valid
- [ ] Minimum 1200 words (for guides)
- [ ] 2+ links to klyx.fr
- [ ] 3+ internal blog links
- [ ] 1 inline Calendly CTA
- [ ] H2/H3 hierarchy logical
- [ ] No spelling/grammar errors
- [ ] Cover image exists and optimized
- [ ] Alt text on all images

---

## Link Validation

### Internal Links

- [ ] All navigation links work
- [ ] All internal blog links work
- [ ] Tag links work
- [ ] Author links work

### External Links

- [ ] Links to klyx.fr work
- [ ] Calendly links open in new tab
- [ ] All external links have rel="noopener noreferrer"
- [ ] Email mailto links work
- [ ] No broken links (use broken-link-checker)

**Tool**: Check with https://www.deadlinkchecker.com/

---

## Vercel Deployment

### Build

- [ ] Vercel build succeeds
- [ ] No build warnings
- [ ] Environment variables set correctly
- [ ] Build time < 3 minutes

### Preview Deployment

- [ ] Preview URL accessible
- [ ] All pages work on preview
- [ ] No differences from local

### Production Deployment

- [ ] Production URL accessible (blog.klyx.fr)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Auto-deployment on main branch works

---

## Google Search Console

### Setup

- [ ] Property added (blog.klyx.fr)
- [ ] Ownership verified
- [ ] Sitemap submitted (/sitemap.xml)
- [ ] No coverage errors

### Indexing (check after 48 hours)

- [ ] Pages indexed successfully
- [ ] No mobile usability issues
- [ ] No security issues
- [ ] Core Web Vitals in green zone

---

## Post-Launch Monitoring (Week 1)

### Daily Checks

- [ ] Check GSC for indexing errors
- [ ] Check GA4 for traffic
- [ ] Verify all CTAs still work
- [ ] Monitor server errors (Vercel dashboard)

### Weekly Checks

- [ ] Review top-performing pages
- [ ] Check for 404 errors
- [ ] Review page speed
- [ ] Update content if needed

---

## Critical Issues That Must Be Fixed

### Before Launch

🚨 **Blockers** (Must fix before deployment):
- Build failures
- Broken navigation
- Missing essential pages (homepage, about, contact)
- Security vulnerabilities
- Accessibility violations (critical)

### After Launch

⚠️ **High Priority** (Fix within 24-48h):
- Broken links
- Missing images
- SEO issues (missing meta tags)
- Performance below 80 score

⚡ **Medium Priority** (Fix within 1 week):
- Minor UI issues
- Non-critical accessibility warnings
- Performance optimization opportunities

---

## Testing Tools

### Performance
- Google PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- WebPageTest: https://www.webpagetest.org/

### SEO
- Google Rich Results Test: https://search.google.com/test/rich-results
- Screaming Frog SEO Spider (free tier)
- Ahrefs Webmaster Tools (free)

### Accessibility
- axe DevTools (Chrome extension)
- WAVE (Chrome extension)
- Lighthouse Accessibility audit

### Broken Links
- Dead Link Checker: https://www.deadlinkchecker.com/
- Check My Links (Chrome extension)

### Mobile
- Google Mobile-Friendly Test: https://search.google.com/test/mobile-friendly
- BrowserStack (paid, multi-device testing)

---

## Sign-Off Checklist

Before marking as "Production Ready":

### Technical
- ✅ All builds pass
- ✅ No console errors
- ✅ Lighthouse scores meet targets
- ✅ Accessibility passes WCAG AA
- ✅ SEO fundamentals implemented

### Content
- ✅ Minimum 6 blog posts published
- ✅ All posts have cover images
- ✅ Content follows editorial guidelines
- ✅ All links tested and working

### Analytics & SEO
- ✅ GA4 tracking works
- ✅ GSC property setup and verified
- ✅ Sitemap submitted
- ✅ All meta tags present

### Documentation
- ✅ README complete
- ✅ CONTENT_GUIDE created
- ✅ DEPLOYMENT docs ready
- ✅ Team trained (if applicable)

---

## Emergency Rollback Plan

If critical issues found post-deployment:

1. **Vercel Dashboard** → Deployments
2. Find last working deployment
3. Click "..." → Promote to Production
4. Fix issues in development
5. Redeploy when fixed

---

**QA Lead**: Sign off when all critical items pass  
**Developer**: Address all high/medium priority issues  
**Content**: Verify all posts meet quality standards  

**Ready for production?** Complete this checklist and sign off! ✅

