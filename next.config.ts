import withMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  pageExtensions: ['tsx', 'mdx'],
  reactCompiler: true,
  rewrites: async () => {
    return [{ source: '/drone', destination: '/drone/UserCertificate.pdf' }];
  },
};

export default withMDX()(nextConfig);
