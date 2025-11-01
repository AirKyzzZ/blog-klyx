'use client';

import { trackCalendlyClick } from '@/lib/analytics';

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/klyx-studio/call-solution-site-internet';

interface CalendlyCTAProps {
  variant?: 'primary' | 'secondary' | 'inline';
  location: 'header' | 'footer' | 'inline' | 'modal';
  className?: string;
}

export default function CalendlyCTA({ variant = 'primary', location, className = '' }: CalendlyCTAProps) {
  const handleClick = () => {
    trackCalendlyClick(location);
  };

  if (variant === 'inline') {
    return (
      <div className={`my-8 p-6 bg-gray-50 border-2 border-primary rounded-lg ${className}`}>
        <h3 className="text-xl font-bold mb-2">Besoin d'un site web performant ?</h3>
        <p className="text-gray-700 mb-4">
          Discutons de votre projet lors d'un appel gratuit de 30 minutes.
        </p>
        <a
          href={CALENDLY_URL}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          Réserver un appel gratuit
        </a>
      </div>
    );
  }

  const buttonClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <a
      href={CALENDLY_URL}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`${buttonClass} ${className}`}
    >
      Réserver un appel
    </a>
  );
}

