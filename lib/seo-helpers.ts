/**
 * SEO Helper Functions
 * Advanced SEO utilities for optimal Google ranking
 */

import type { Post } from './types';

/**
 * Generate FAQ Schema for articles with Q&A sections
 */
export function generateFAQSchemaFromContent(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo Schema for tutorial articles
 */
export function generateHowToSchema(data: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  steps: { name: string; text: string; image?: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    image: data.image,
    totalTime: data.totalTime,
    step: data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Generate Blog Posting Schema (more specific than Article)
 */
export function generateBlogPostingSchema(post: Post, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    alternativeHeadline: post.description,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${post.coverImage}`,
      width: 1200,
      height: 630,
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      email: post.author.email,
      url: process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Klyx Studio',
      url: process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
    },
    description: post.description,
    articleBody: post.content,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}${post.url}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.tags,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: 'fr-FR',
  };
}

/**
 * Generate Organization Schema with enhanced details
 */
export function generateEnhancedOrganizationSchema() {
  const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Klyx Studio',
    url: mainSiteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Agence de création de sites web à Bordeaux',
    email: 'contact@klyx.fr',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bordeaux',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR',
    },
    sameAs: [
      siteUrl,
      // Add your social media URLs here when available:
      // 'https://www.linkedin.com/company/klyx',
      // 'https://twitter.com/klyx',
      // 'https://www.facebook.com/klyx',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 44.837789,
        longitude: -0.57918,
      },
      geoRadius: '50000', // 50km around Bordeaux
    },
  };
}

/**
 * Generate ItemList Schema for blog post listings
 */
export function generateItemListSchema(posts: Post[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}${post.url}`,
      name: post.title,
    })),
  };
}

/**
 * Extract excerpt from content (first 160 chars)
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  const plainText = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/#{1,6}\s/g, '') // Remove markdown headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/[*_`]/g, '') // Remove markdown formatting
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Calculate content quality score
 */
export function calculateContentScore(post: Post): {
  score: number;
  factors: Record<string, boolean>;
} {
  const wordCount = post.content.split(/\s+/).length;
  const hasImages = Boolean(post.coverImage && post.coverImage.length > 0);
  const hasLinks = post.content.includes('http');
  const hasHeadings = post.content.includes('##');
  const hasLists = post.content.includes('- ') || post.content.includes('1. ');
  const goodLength = wordCount >= 1500;
  const hasKeywords = Boolean(post.keywords && post.keywords.length >= 5);
  const hasTags = Boolean(post.tags && post.tags.length >= 2);
  
  const factors = {
    goodLength,
    hasImages,
    hasLinks,
    hasHeadings,
    hasLists,
    hasKeywords,
    hasTags,
  };
  
  const score = Object.values(factors).filter(Boolean).length;
  
  return { score, factors };
}

