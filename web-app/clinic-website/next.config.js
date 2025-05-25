/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ví dụ:
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
