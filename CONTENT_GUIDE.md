# Content Creation Guide - Blog Klyx

## Quick Start: Creating a New Blog Post

### 1. Create a New MDX File

Create a file in `content/posts/` with the slug as filename:
```bash
# Example: content/posts/creation-site-web-bordeaux-2025.mdx
```

### 2. Add Frontmatter

Start every MDX file with YAML frontmatter between `---` markers:

```yaml
---
title: "Création site web Bordeaux — Guide complet 2025"
date: "2025-11-01"
slug: "creation-site-web-bordeaux-2025"
description: "Guide complet pour créer un site web à Bordeaux : coûts, étapes et comment choisir une agence web performante."
keywords: ["création site web", "agence web Bordeaux", "Klyx", "site internet Bordeaux", "développement web"]
tags: ["guide", "Bordeaux", "SEO"]
coverImage: "/assets/posts/creation-bordeaux/cover.jpg"
author:
  name: "Klyx Studio"
  email: "contact@klyx.fr"
canonical: ""
---
```

### 3. Write Your Content

After the frontmatter, write your content using Markdown/MDX:

```markdown
## Introduction

Votre introduction ici...

## Section Principale

Votre contenu...

### Sous-section

Plus de détails...

## FAQ

**Question 1 ?**
Réponse...

**Question 2 ?**
Réponse...
```

---

## Frontmatter Fields Explained

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | string | ✅ | Article title (50-60 chars for SEO) | "Guide complet..." |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) | "2025-11-01" |
| `slug` | string | ✅ | URL-friendly identifier (lowercase, hyphens) | "mon-article" |
| `description` | string | ✅ | Meta description (150-160 chars) | "Découvrez..." |
| `keywords` | array | ✅ | SEO keywords (5-10 keywords) | ["seo", "web"] |
| `tags` | array | ✅ | Categories (2-5 tags) | ["guide", "tech"] |
| `coverImage` | string | ✅ | Path to cover image | "/assets/posts/..." |
| `author.name` | string | ✅ | Author name | "Klyx Studio" |
| `author.email` | string | ✅ | Author email | "contact@klyx.fr" |
| `canonical` | string | ❌ | Canonical URL (if republished) | "" |

---

## Content Best Practices

### SEO Optimization

1. **Title**: 50-60 characters, include main keyword
2. **Description**: 150-160 characters, compelling summary
3. **Keywords**: 5-10 relevant keywords, include "Klyx"
4. **H1**: Only one per article (auto-generated from title)
5. **H2/H3**: Use logical hierarchy, include keywords naturally
6. **Length**: Aim for 1200-2200 words for comprehensive guides
7. **Images**: Add alt text, optimize size (<200KB)

### Internal Linking Strategy

**CRITICAL**: Every article must include:
- **2+ links to klyx.fr** (main site, services, portfolio)
- **3-5 internal blog links** (to other posts)
- **1 contextual Calendly CTA** (inline in content)

#### Example Internal Links

```markdown
Chez [Klyx Studio](https://klyx.fr), nous créons des sites web performants...

Pour en savoir plus sur nos [services de création de sites web](https://klyx.fr/services)...

Découvrez notre [portfolio de réalisations](https://klyx.fr/portfolio)...

Consultez aussi notre guide sur [le SEO local à Bordeaux](/posts/seo-local-bordeaux)...
```

### Calendly CTA Placement

Insert a Calendly CTA in the middle of long articles:

```markdown
## Votre section

Contenu avant le CTA...

> 💡 **Besoin d'aide pour votre projet web ?**  
> [Réservez un appel gratuit de 30 minutes](https://calendly.com/klyx-studio/call-solution-site-internet) avec notre équipe.

Contenu après le CTA...
```

---

## MDX Features & Syntax

### Headings

```markdown
## H2 Heading
### H3 Heading
#### H4 Heading
```

### Emphasis

```markdown
**Bold text**
*Italic text*
***Bold and italic***
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Links

```markdown
[Text to display](https://url.com)
[Internal link](/posts/autre-article)
```

### Images

```markdown
![Alt text](/assets/posts/mon-article/image.jpg)
```

### Code

Inline: \`code\`

Block:
\`\`\`javascript
const hello = "world";
\`\`\`

### Blockquotes

```markdown
> This is a blockquote
> Multiple lines
```

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

---

## Image Management

### Cover Images

1. **Size**: 1200x630px (optimal for OG images)
2. **Format**: WebP or AVIF (fallback to JPG)
3. **Location**: `/public/assets/posts/{slug}/cover.jpg`
4. **Optimization**: Use tools like Squoosh or ImageOptim

### In-Content Images

1. **Size**: Max width 1200px
2. **Optimization**: <200KB per image
3. **Alt text**: Descriptive, include keywords naturally
4. **Path**: `/public/assets/posts/{slug}/image-name.jpg`

---

## Article Structure Template

```markdown
---
# Frontmatter here
---

## Introduction (100-150 words)
- Hook the reader
- Present the problem
- Preview the solution

## Main Content
### Section 1: Problem Definition
- Explain the context
- Use examples

### Section 2: Solution/Process
- Step-by-step guide
- Include visuals

### Section 3: Advanced Tips
- Expert insights
- Best practices

## FAQ
**Question 1 ?**
Answer...

**Question 2 ?**
Answer...

## Conclusion
- Summarize key points
- Call to action (Calendly or contact)
```

---

## Publishing Checklist

Before publishing, verify:

- [ ] Frontmatter is complete and valid
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Cover image exists and is optimized
- [ ] 2+ links to klyx.fr
- [ ] 3+ internal blog links
- [ ] 1 Calendly CTA included
- [ ] H2/H3 hierarchy is logical
- [ ] Alt text on all images
- [ ] No spelling/grammar errors
- [ ] Keywords naturally integrated
- [ ] Article is 1200+ words (for guides)
- [ ] Preview in dev mode (`npm run dev`)

---

## Example: Complete Blog Post

See `content/posts/example-post.mdx` for a complete, ready-to-publish example article demonstrating all best practices.

---

## Need Help?

- Questions? Email contact@klyx.fr
- Review the existing posts in `content/posts/` for reference
- Check IMPLEMENTATION_STATUS.md for setup instructions

