const nextConfig = {
  async redirects() {
    return [
      { source: '/live-currency-gold-rates', destination: '/currency-gold-rates/', permanent: true },
      { source: '/live-currency-gold-rates/:path*', destination: '/currency-gold-rates/', permanent: true },
    ];
  },
};
module.exports = nextConfig;
