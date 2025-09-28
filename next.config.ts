import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['ftp.goit.study'],
  },
  /* config options here */
  remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
};

export default nextConfig;
