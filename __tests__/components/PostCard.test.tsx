import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/types';

const mockPost: Post = {
  title: 'Test Article Title',
  date: '2025-11-01',
  slug: 'test-article',
  description: 'This is a test article description',
  keywords: ['test', 'article'],
  tags: ['test', 'guide'],
  coverImage: '/assets/posts/test/cover.jpg',
  author: {
    name: 'Klyx Studio',
    email: 'contact@klyx.fr',
  },
  content: 'Test content',
  readingTime: '5 min de lecture',
  url: '/posts/test-article',
};

describe('PostCard', () => {
  it('renders post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
  });

  it('renders post description', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('This is a test article description')).toBeInTheDocument();
  });

  it('renders reading time', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('5 min de lecture')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('guide')).toBeInTheDocument();
  });

  it('links to correct post URL', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/test-article');
  });

  it('renders cover image with correct alt text', () => {
    render(<PostCard post={mockPost} />);
    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
  });
});

