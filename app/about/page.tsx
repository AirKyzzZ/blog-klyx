import CalendlyCTA from '@/components/CalendlyCTA';

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@klyx.fr';

export const metadata = {
  title: 'À propos',
  description: 'Découvrez Klyx Studio, agence de création de sites web à Bordeaux. Expertise en développement web, SEO et solutions digitales sur mesure.',
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            À propos de <span className="text-primary">Klyx Studio</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Agence de création de sites web à Bordeaux, spécialisée dans le développement 
            de solutions digitales performantes et optimisées pour le référencement.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <h2>Notre mission</h2>
          <p>
            Chez Klyx Studio, nous créons des sites web qui allient esthétique, performance 
            et résultats mesurables. Notre approche se concentre sur trois piliers fondamentaux :
          </p>

          <ul>
            <li>
              <strong>Design moderne et responsive</strong> - Des interfaces élégantes qui 
              s'adaptent à tous les appareils
            </li>
            <li>
              <strong>Performance optimale</strong> - Des sites rapides qui offrent une 
              expérience utilisateur exceptionnelle
            </li>
            <li>
              <strong>SEO intégré</strong> - Un référencement naturel pensé dès la conception 
              pour maximiser votre visibilité
            </li>
          </ul>

          <h2>Notre expertise</h2>
          <p>
            Nous maîtrisons les technologies web modernes (React, Next.js, Node.js) et les 
            meilleures pratiques en matière de SEO, d'accessibilité et de performance. Basés 
            à Bordeaux, nous accompagnons des entreprises de toutes tailles dans leur 
            transformation digitale.
          </p>

          <h2>Pourquoi ce blog ?</h2>
          <p>
            Ce blog est notre espace de partage. Nous y publions régulièrement des guides, 
            des conseils techniques et des analyses sur le développement web, le SEO et 
            les tendances digitales. Notre objectif : rendre le web plus accessible et 
            performant pour tous.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-gray-700 mb-6">
            Vous avez un projet de site web ? Discutons-en lors d'un appel gratuit de 30 minutes. 
            Nous analyserons vos besoins et vous proposerons une solution adaptée.
          </p>
          <div className="flex gap-4 flex-wrap">
            <CalendlyCTA variant="primary" location="inline" />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-secondary"
            >
              Nous contacter par email
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold mb-4">Nos services</h3>
          <ul className="space-y-3">
            <li>
              <a
                href={`${MAIN_SITE_URL}/#resources`}
                className="text-primary hover:underline font-medium flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Création de sites web
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={`${MAIN_SITE_URL}/#resources`}
                className="text-primary hover:underline font-medium flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                SEO & Référencement
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={MAIN_SITE_URL}
                className="text-primary hover:underline font-medium flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visiter klyx.fr
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

