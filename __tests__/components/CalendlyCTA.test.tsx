import { render, screen, fireEvent } from '@testing-library/react';
import CalendlyCTA from '@/components/CalendlyCTA';
import * as analytics from '@/lib/analytics';

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  trackCalendlyClick: jest.fn(),
}));

describe('CalendlyCTA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders primary variant correctly', () => {
    render(<CalendlyCTA variant="primary" location="header" />);
    const button = screen.getByText('Réserver un appel');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('renders secondary variant correctly', () => {
    render(<CalendlyCTA variant="secondary" location="footer" />);
    const button = screen.getByText('Réserver un appel');
    expect(button).toHaveClass('btn-secondary');
  });

  it('renders inline variant with extended content', () => {
    render(<CalendlyCTA variant="inline" location="inline" />);
    expect(screen.getByText('Besoin d'un site web performant ?')).toBeInTheDocument();
    expect(screen.getByText('Réserver un appel gratuit')).toBeInTheDocument();
  });

  it('tracks click events', () => {
    render(<CalendlyCTA variant="primary" location="header" />);
    const button = screen.getByText('Réserver un appel');
    
    fireEvent.click(button);
    
    expect(analytics.trackCalendlyClick).toHaveBeenCalledWith('header');
  });

  it('links to correct Calendly URL', () => {
    render(<CalendlyCTA variant="primary" location="header" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://calendly.com/klyx-studio/call-solution-site-internet');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

