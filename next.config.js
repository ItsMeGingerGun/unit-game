// next.config.js
module.exports = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // Temporarily disable ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily disable TypeScript errors
  }
};
