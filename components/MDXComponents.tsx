'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackKlyxLink } from '@/lib/analytics';

// Custom link component that tracks external links
const CustomLink = (props: any) => {
  const href = props.href;
  const isExternal = href && (href.startsWith('http') || href.startsWith('https'));
  const isKlyxLink = href && href.includes('klyx.fr');

  const handleClick = () => {
    if (isKlyxLink) {
      trackKlyxLink(href);
    }
  };

  if (isExternal) {
    return (
      <a
        {...props}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      />
    );
  }

  return <Link {...props} className="text-primary hover:underline" />;
};

// Custom heading components
const createHeading = (level: number) => {
  const Heading = ({ children, ...props }: any) => {
    const Tag = `h${level}` as any;
    return <Tag {...props}>{children}</Tag>;
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
};

// Custom image component using Next.js Image
const CustomImage = (props: any) => {
  if (props.src.startsWith('http')) {
    // External image
    return (
      <img
        {...props}
        alt={props.alt || ''}
        className="rounded-lg w-full h-auto"
      />
    );
  }

  // Local image
  return (
    <Image
      {...props}
      alt={props.alt || ''}
      width={1200}
      height={675}
      className="rounded-lg w-full h-auto"
    />
  );
};

// Custom code block
const CustomCode = ({ children, className, ...props }: any) => {
  const isInline = !className;

  if (isInline) {
    return <code {...props}>{children}</code>;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const MDXComponents = {
  // Headings
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  
  // Links
  a: CustomLink,
  
  // Images
  img: CustomImage,
  Image: CustomImage,
  
  // Code
  code: CustomCode,
  
  // Blockquote
  blockquote: (props: any) => (
    <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-6" />
  ),
  
  // Lists
  ul: (props: any) => <ul {...props} className="list-disc list-inside my-6 space-y-2" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside my-6 space-y-2" />,
  li: (props: any) => <li {...props} className="ml-4" />,
  
  // Horizontal rule
  hr: (props: any) => <hr {...props} className="my-12 border-gray-300" />,
  
  // Paragraphs
  p: (props: any) => <p {...props} className="mb-4 leading-relaxed" />,
  
  // Tables
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table {...props} className="min-w-full divide-y divide-gray-300" />
    </div>
  ),
  th: (props: any) => (
    <th {...props} className="px-4 py-2 text-left font-semibold bg-gray-50" />
  ),
  td: (props: any) => (
    <td {...props} className="px-4 py-2 border-t border-gray-200" />
  ),
};

