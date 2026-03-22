const nextConfig = {
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
