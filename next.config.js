const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/app': path.resolve(__dirname, 'app')
    };
    return config;
  },
 eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};
