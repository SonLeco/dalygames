import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sujeitoprogramador.com',
        port: '',
      }
    ]
  }
};

export default nextConfig;
