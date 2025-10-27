import withMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/ah2n1vfr/bekk-blogg-prod/**',
      },
      {
        protocol: 'https',
        hostname: 'image-www.kode24.no',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['tsx', 'mdx'],
  reactCompiler: true,
  rewrites: async () => {
    return [{ source: '/drone', destination: '/drone/UserCertificate.pdf' }];
  },
};

export default withMDX()(nextConfig);
