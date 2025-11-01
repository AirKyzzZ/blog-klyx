import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import CalendlyCTA from '@/components/CalendlyCTA';

export const metadata = {
  title: 'Accueil',
};

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 6);

  return (
    <div className="container-custom py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 py-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Bienvenue sur le{' '}
          <span className="text-primary">Blog Klyx</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Découvrez nos conseils, guides et actualités sur la création de sites web, 
          le SEO et le développement web à Bordeaux et ailleurs.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/tags" className="btn-primary">
            Explorer les thématiques
          </Link>
          <Link href="/about" className="btn-secondary">
            À propos de Klyx
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Articles récents</h2>
          {allPosts.length > 6 && (
            <Link href="/tags" className="text-primary hover:underline font-medium">
              Voir tous les articles →
            </Link>
          )}
        </div>
        
        {featuredPosts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              Aucun article disponible pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prêt à lancer votre projet web ?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Klyx Studio vous accompagne dans la création de votre site web sur mesure. 
          Discutons de votre projet lors d'un appel gratuit.
        </p>
        <CalendlyCTA variant="primary" location="inline" />
      </section>
    </div>
  );
}
