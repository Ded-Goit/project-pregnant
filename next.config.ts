import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    /* config options here */
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'ftp.goit.study' },
    ],
  },
};

export default nextConfig;
