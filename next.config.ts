import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
    domains: ['ftp.goit.study'],
  },
};

module.exports = nextConfig;
