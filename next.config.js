/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.credly.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'www.gstatic.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [

          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },

          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },

          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },

          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },

          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },

          {
            key: 'Content-Security-Policy',
            value: [

              "default-src 'self'",

              // ✅ Google Analytics + Microsoft Clarity
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",

              // styles
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // fonts
              "font-src 'self' https://fonts.gstatic.com",

              // images
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms https:",

              // connections
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://www.google-analytics.com https://region1.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",

              // frames
              "frame-src https://www.googletagmanager.com https://www.clarity.ms",

              // security hardening
              "object-src 'none'",
              "base-uri 'self'",

            ].join('; '),
          },

        ],
      },
    ];
  },
};

module.exports = nextConfig;
