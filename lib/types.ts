export interface PostFrontmatter {
  title: string;
  date: string;
  slug: string;
  description: string;
  keywords: string[];
  tags: string[];
  coverImage: string;
  canonical?: string;
  author: {
    name: string;
    email: string;
  };
}

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
  noindex?: boolean;
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    author: string;
    tags?: string[];
  };
}

