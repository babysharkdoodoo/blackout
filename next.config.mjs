/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const immutableAssetHeaders = [
  {
    key: 'Cache-Control',
    value: 'public, max-age=31536000, immutable',
  },
]

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/heroes/:path*',
        headers: immutableAssetHeaders,
      },
      {
        source: '/team/:path*',
        headers: immutableAssetHeaders,
      },
      {
        source: '/icon.svg',
        headers: immutableAssetHeaders,
      },
      {
        source: '/apple-icon.png',
        headers: immutableAssetHeaders,
      },
      {
        source: '/icon-light-32x32.png',
        headers: immutableAssetHeaders,
      },
      {
        source: '/storm-drain.png',
        headers: immutableAssetHeaders,
      },
      {
        source: '/manatee-underwater.png',
        headers: immutableAssetHeaders,
      },
      {
        source: '/lagoon-hero.png',
        headers: immutableAssetHeaders,
      },
      {
        source: '/about-hero.jpg',
        headers: immutableAssetHeaders,
      },
    ]
  },
}

export default nextConfig

