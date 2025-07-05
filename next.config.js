// next.config.js
module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Add this to ignore build errors during export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
