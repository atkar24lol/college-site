const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
      { protocol: 'https', hostname: 'localhost', pathname: '/**' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/ru',
      },
    ];
  },
};

export default nextConfig;
