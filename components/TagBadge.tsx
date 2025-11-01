import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  count?: number;
}

export default function TagBadge({ tag, count }: TagBadgeProps) {
  const slug = slugify(tag);

  return (
    <Link
      href={`/tags/${slug}`}
      className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"
    >
      {tag}
      {count !== undefined && ` (${count})`}
    </Link>
  );
}

