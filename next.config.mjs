/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use default distDir on Vercel; custom dir only for local Windows dev
  distDir: process.env.VERCEL ? '.next' : 'next-dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.cgify.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-940ccf6255b54fa799a9b01050e6c227.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    // Disable tracing to avoid writing the 'trace' file on Windows
    swcTraceProfiling: false,
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'react-icons',
      'framer-motion',
      'lucide-react',
    ],
  },

  // Video configuration
  // This allows importing video files directly
  webpack: (config, { dev, isServer }) => {
    // Add video file support
    config.module.rules.push({
      test: /\.(mp4|webm|mov|avi|m4v)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]',
      },
    });

    // Optimize for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // Better chunk splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
            priority: 30,
          },
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion|gsap|lottie)[\\/]/,
            name: 'animations',
            chunks: 'all',
            priority: 25,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 40,
          },
        },
      };
    }

    return config;
  },

  // Optional: For better video optimization
  // Enable if you want to use next/video features
  // (requires Next.js 13+)
  /*
  video: {
    // This enables the next/video component
    // and provides better video optimization
  },
  */

  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: false,

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/static/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;