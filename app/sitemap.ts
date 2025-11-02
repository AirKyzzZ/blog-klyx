import { MetadataRoute } from 'next';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { slugify } from '@/lib/utils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  // Post entries
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Tag page entries
  const tagEntries: MetadataRoute.Sitemap = tags.map(({ tag }) => ({
    url: `${SITE_URL}/tags/${slugify(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...staticPages, ...postEntries, ...tagEntries];
}

