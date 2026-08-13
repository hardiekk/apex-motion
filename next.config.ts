import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js and related packages for Next.js compatibility
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
