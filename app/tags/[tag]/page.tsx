import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { slugify } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: slugify(tag),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;
  // Find the original tag name from slug
  const allTags = getAllTags();
  const tagData = allTags.find((t) => slugify(t.tag) === tag);

  if (!tagData) {
    return {
      title: 'Thématique non trouvée',
    };
  }

  return {
    title: `Articles sur ${tagData.tag}`,
    description: `Découvrez tous nos articles sur le thème ${tagData.tag}. ${tagData.count} article${tagData.count > 1 ? 's' : ''} disponible${tagData.count > 1 ? 's' : ''}.`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  // Find the original tag name from slug
  const allTags = getAllTags();
  const tagData = allTags.find((t) => slugify(t.tag) === tag);

  if (!tagData) {
    notFound();
  }

  const posts = getPostsByTag(tagData.tag);

  return (
    <div className="container-custom py-12">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {tagData.tag}
        </h1>
        <p className="text-xl text-gray-700">
          {posts.length} article{posts.length > 1 ? 's' : ''} dans cette thématique
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            Aucun article disponible dans cette thématique.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

