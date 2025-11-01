import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostFrontmatter } from './types';
import { calculateReadingTime } from './utils';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string | undefined): Post | null {
  if (!slug) return null;
  
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const frontmatter = data as PostFrontmatter;
    
    return {
      ...frontmatter,
      content,
      readingTime: calculateReadingTime(content),
      url: `/posts/${frontmatter.slug}`,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  
  return posts;
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts();
  
  // Filter out current post and find posts with matching tags
  const related = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const matchingTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length;
      return { post, matchingTags };
    })
    .filter(({ matchingTags }) => matchingTags > 0)
    .sort((a, b) => b.matchingTags - a.matchingTags)
    .slice(0, limit)
    .map(({ post }) => post);
  
  // If not enough related posts, fill with recent posts
  if (related.length < limit) {
    const recentPosts = allPosts
      .filter((post) => 
        post.slug !== currentPost.slug && 
        !related.find((r) => r.slug === post.slug)
      )
      .slice(0, limit - related.length);
    
    related.push(...recentPosts);
  }
  
  return related;
}

