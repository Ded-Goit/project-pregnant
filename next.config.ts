import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
<<<<<<< HEAD
    domains: ['ftp.goit.study'],
  },
  /* config options here */
=======
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
>>>>>>> main
};

export default nextConfig;
