const imageHosts = process.env.NEXT_PUBLIC_IMAGE_HOSTS
  ? process.env.NEXT_PUBLIC_IMAGE_HOSTS.split(',')
      .map((h) => h.trim())
      .filter(Boolean)
  : [];

const extraPatterns = imageHosts.flatMap((hostname) => [
  { protocol: 'https', hostname, pathname: '/**' },
  { protocol: 'http', hostname, pathname: '/**' },
]);

const nextConfig = {
  // Самодостаточная сборка для Docker: .next/standalone содержит свой server.js
  // и только нужные node_modules. Образ получается компактным.
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
      { protocol: 'https', hostname: 'localhost', pathname: '/**' },
      ...extraPatterns,
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
