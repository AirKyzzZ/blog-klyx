import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.klyx.fr',
      },
    ],
  },
  // Enable strict mode for better error handling
  reactStrictMode: true,
};

export default nextConfig;
