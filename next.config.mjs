/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'dist',
  images: {
    // domains: ['ekdak.com'],
    unoptimized: true
  },
};

export default nextConfig;
