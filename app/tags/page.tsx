import { getAllTags } from '@/lib/posts';
import TagBadge from '@/components/TagBadge';

export const metadata = {
  title: 'Thématiques',
  description: 'Explorez tous les sujets abordés sur le blog Klyx : développement web, SEO, Bordeaux et plus encore.',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="container-custom py-12">
      <header className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Thématiques
        </h1>
        <p className="text-xl text-gray-700">
          Explorez nos articles par thématique. Retrouvez tous nos conseils et guides 
          sur les sujets qui vous intéressent.
        </p>
      </header>

      {tags.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            Aucune thématique disponible pour le moment.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {tags.map(({ tag, count }) => (
            <TagBadge key={tag} tag={tag} count={count} />
          ))}
        </div>
      )}
    </div>
  );
}

