import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'Page non trouvée - 404',
  description: 'La page que vous recherchez n\'existe pas. Découvrez nos derniers articles sur le développement web et le SEO.',
};

export default function NotFound() {
  // Get latest 3 posts to suggest
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="container-custom py-12 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        {/* 404 Message */}
        <div className="mb-16">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Page non trouvée
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
            Mais ne vous inquiétez pas, nous avons plein d'autres contenus intéressants pour vous !
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/" className="btn-primary">
              <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Retour à l'accueil
            </Link>
            <Link href="/tags" className="btn-secondary">
              <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Parcourir par thématique
            </Link>
          </div>
        </div>

        {/* Popular Articles Suggestion */}
        {latestPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8">
              Articles populaires
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Helpful Links */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h3 className="text-xl font-bold mb-6">Pages utiles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <Link href="/" className="text-primary hover:underline font-medium">
              → Accueil
            </Link>
            <Link href="/tags" className="text-primary hover:underline font-medium">
              → Thématiques
            </Link>
            <Link href="/about" className="text-primary hover:underline font-medium">
              → À propos
            </Link>
            <Link href="/contact" className="text-primary hover:underline font-medium">
              → Contact
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-xl font-bold mb-4">Besoin d'aide ?</h3>
          <p className="text-gray-700 mb-6">
            Si vous pensez que cette page devrait exister, n'hésitez pas à nous contacter.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
          >
            Contactez-nous
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

