// Google Analytics 4 helper functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Initialize GA
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Custom event tracking
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track Calendly CTA clicks
export const trackCalendlyClick = (location: 'header' | 'footer' | 'inline' | 'modal') => {
  event({
    action: 'calendly_cta_click',
    category: 'engagement',
    label: location,
  });
};

// Track outbound links to klyx.fr
export const trackKlyxLink = (destination: string) => {
  event({
    action: 'klyx_link_click',
    category: 'navigation',
    label: destination,
  });
};

// Track social share clicks
export const trackShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
  event({
    action: 'share_click',
    category: 'engagement',
    label: platform,
  });
};

// Track search queries
export const trackSearch = (query: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: query,
  });
};

