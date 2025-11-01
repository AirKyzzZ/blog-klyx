import Link from 'next/link';
import CalendlyCTA from './CalendlyCTA';

const MAIN_SITE_URL = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'https://klyx.fr';
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@klyx.fr';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Klyx Studio</h3>
            <p className="text-gray-300 text-sm mb-4">
              Agence de création de sites web à Bordeaux. Découvrez nos conseils et actualités sur le développement web.
            </p>
            <CalendlyCTA variant="secondary" location="footer" />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/tags" className="text-gray-300 hover:text-primary transition-colors">
                  Thématiques
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services (klyx.fr) */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`${MAIN_SITE_URL}/services`}
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Création de sites web
                </a>
              </li>
              <li>
                <a
                  href={`${MAIN_SITE_URL}/services/seo`}
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SEO & Référencement
                </a>
              </li>
              <li>
                <a
                  href={`${MAIN_SITE_URL}/portfolio`}
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href={MAIN_SITE_URL}
                  className="text-gray-300 hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Site principal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="text-gray-300">Bordeaux, France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} Klyx Studio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

