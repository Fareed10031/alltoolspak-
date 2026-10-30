/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: "/tools/emergency-os",
        destination: "/tools/car-accident-settlement-calculator",
        permanent: true,
      },
      {
        source: "/emergency-os",
        destination: "/tools/car-accident-settlement-calculator",
        permanent: true,
      },
      {
        source: "/live-currency-gold-rates",
        destination: "/currency-gold-rates/",
        permanent: true,
      },
      {
        source: "/live-currency-gold-rates/:path*",
        destination: "/currency-gold-rates/",
        permanent: true,
      },
      {
        source: "/tools/accident-calculator",
        destination: "/global-accident-emergency",
        permanent: true,
      },
      {
        source: "/accident-calculator",
        destination: "/global-accident-emergency",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
