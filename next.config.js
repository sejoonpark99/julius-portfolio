/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'use.typekit.net',
        },
      ],
    },
    // Add performance optimization with webpack
    webpack: (config) => {
      // Enable tree shaking for GSAP
      config.module.rules.push({
        test: /gsap/,
        sideEffects: true,
      });
      
      return config;
    },
  };
  
  module.exports = nextConfig;