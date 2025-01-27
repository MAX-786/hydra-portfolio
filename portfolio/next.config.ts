import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/projects/:path*', // Matches any nested path under /projects
        destination: '/', // Redirects to the root path
      },
      {
        source: '/skills/:path*', // Matches any nested path under /skills
        destination: '/', // Redirects to the root path
      },
    ];
  },
};

export default nextConfig;
