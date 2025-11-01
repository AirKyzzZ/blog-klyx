import CalendlyCTA from '@/components/CalendlyCTA';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@klyx.fr';
const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr';

export const metadata = {
  title: 'Contact',
  description: 'Contactez Klyx Studio pour discuter de votre projet de site web. Réservez un appel gratuit ou envoyez-nous un email.',
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-700">
            Une question ? Un projet ? Nous sommes à votre écoute.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calendly CTA */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-8">
            <div className="mb-4">
              <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Réserver un appel</h2>
            <p className="text-gray-700 mb-6">
              Discutons de votre projet lors d'un appel gratuit de 30 minutes. 
              Choisissez le créneau qui vous convient.
            </p>
            <CalendlyCTA variant="primary" location="inline" />
          </div>

          {/* Email Contact */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="mb-4">
              <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3">Par email</h2>
            <p className="text-gray-700 mb-6">
              Préférez-vous nous écrire ? Envoyez-nous un email et nous vous 
              répondrons dans les plus brefs délais.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-secondary inline-block"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Informations</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Localisation
              </h3>
              <p className="text-gray-700">Bordeaux, France</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Site web
              </h3>
              <a
                href={MAIN_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                klyx.fr
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-semibold mb-4">Horaires de disponibilité</h3>
            <p className="text-gray-700">
              Lundi - Vendredi : 9h00 - 18h00<br />
              Weekend : Sur rendez-vous
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

