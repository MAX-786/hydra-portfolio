import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CMS_URL: 'http://52.66.140.114/mkhismkh/++api++',
  },
  async rewrites() {
    return [
      {
        source: "/projects/:path*", // Matches any nested path under /projects
        destination: "/", // Redirects to the root path
      },
      {
        source: "/skills/:path*", // Matches any nested path under /skills
        destination: "/", // Redirects to the root path
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080", // Only if needed
        pathname: "/my-portfolio/**",
      },
      // For production:
      // {
      //   protocol: 'https',
      //   hostname: 'production-domain.com',
      //   pathname: '/**',
      // }
    ],
  },
};

export default nextConfig;
