import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts';
import { MDXComponents } from '@/components/MDXComponents';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/json-ld';
import { formatDate } from '@/lib/utils';
import ShareButtons from '@/components/ShareButtons';
import AuthorCard from '@/components/AuthorCard';
import PostCard from '@/components/PostCard';
import CalendlyCTA from '@/components/CalendlyCTA';
import TagBadge from '@/components/TagBadge';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.klyx.fr';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article non trouvé',
    };
  }

  const canonicalUrl = post.canonical || `${SITE_URL}${post.url}`;
  
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      locale: 'fr_FR',
      images: [
        {
          url: `${SITE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
      url: canonicalUrl,
      siteName: 'Klyx Blog',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${SITE_URL}${post.coverImage}`],
      creator: '@klyx', // Add your Twitter handle
      site: '@klyx',
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const articleSchema = generateArticleSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: post.title, url: post.url },
  ]);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="container-custom py-12">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          {/* Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <ShareButtons title={post.title} url={`${SITE_URL}${post.url}`} />
          </div>

          {/* Cover Image */}
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Description */}
          <p className="text-xl text-gray-700 leading-relaxed">
            {post.description}
          </p>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={post.content} components={MDXComponents} />
          </div>

          {/* Inline CTA */}
          <CalendlyCTA variant="inline" location="inline" className="my-12" />

          {/* Author */}
          <div className="mt-12">
            <AuthorCard name={post.author.name} email={post.author.email} />
          </div>

          {/* Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Partager cet article</h3>
            <ShareButtons title={post.title} url={`${SITE_URL}${post.url}`} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="container-custom py-12 bg-gray-50">
          <h2 className="text-3xl font-bold mb-8">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

