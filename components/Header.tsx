'use client';

import Link from 'next/link';
import { useState } from 'react';
import CalendlyCTA from './CalendlyCTA';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
        <nav className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-black hover:text-primary transition-colors">
              Klyx <span className="text-primary">Blog</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-black hover:text-primary transition-colors font-medium">
                Accueil
              </Link>
              <Link href="/tags" className="text-black hover:text-primary transition-colors font-medium">
                Thématiques
              </Link>
              <Link href="/about" className="text-black hover:text-primary transition-colors font-medium">
                À propos
              </Link>
              <Link href="/contact" className="text-black hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <CalendlyCTA variant="primary" location="header" />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <Link
                href="/"
                className="block text-black hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/tags"
                className="block text-black hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Thématiques
              </Link>
              <Link
                href="/about"
                className="block text-black hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="block text-black hover:text-primary transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2">
                <CalendlyCTA variant="primary" location="header" />
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

